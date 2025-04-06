import { getErrorMessage } from "@/components/utils/errors";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Vehicle = {
  id: number;
  CodigoFipe: string;
  Tipo: string;
  Marca: string;
  Modelo: string;
  Combustivel: string;
  anoModelo: number;
  Valor: string;
  ValorFipe: string;
};

const MyAds = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [ads, setAds] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Você não está Logado!");
      navigate("/login");
    } else {
      FetchAds();
    }
  }, [isAuthenticated, navigate]);

  const FetchAds = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/get-Vehicle/:vehicleId`);
      setAds(response.data);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Você tem certeza que deseja excluir este anúncio?")) return;

    try {
      setLoading(true);
      await api.delete(`/delete-Vehicle/${id}`);
      setSuccess("Anúncio excluído com sucesso!");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/editVehicle/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Meus Anúncios</h2>

      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-500 rounded">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-500 rounded">
          {success}
        </div>
      )}

      {loading ? (
        <p className="text-center">Carregando anúncios...</p>
      ) : ads.length === 0 ? (
        <p className="text-center">Você ainda não possui anúncios.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="p-4 bg-white border border-orange-300 rounded-lg shadow hover:bg-orange-50 transition"
            >
              <h3 className="text-lg font-semibold mb-2">{ad.modelo}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Marca: {ad.marca} | Ano: {ad.ano}
              </p>
              <p className="text-sm text-gray-700 mb-2">{ad.descricao}</p>
              <p className="text-base font-bold text-green-700 mb-4">
                R$ {ad.preco.toLocaleString("pt-BR")}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(ad.id)}
                  className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(ad.id)}
                  className="bg-red-600 text-white px-4 py-1.5 rounded hover:bg-red-700 cursor-pointer"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAds;
