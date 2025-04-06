import { getErrorMessage } from "@/components/utils/errors";
import { VehicleData } from "@/components/utils/TypesVehicle";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditVehicle = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<VehicleData>({
    CodigoFipe: "",
    Tipo: "Carro",
    Marca: "",
    Modelo: "",
    Combustivel: "",
    anoModelo: "",
    Valor: "",
    ValorFipe: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Você não está Logado!");
      navigate("/login");
      return;
    }

    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/get-Vehicle/${vehicleId}`);
        setFormData(response.data);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [isAuthenticated, vehicleId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        ...formData,
        anoModelo: Number(formData.anoModelo),
        ValorFipe: Number(formData.ValorFipe),
      };
      await api.put(`/update-vehicle`, payload);
      setSuccess("Veículo Atualizado com sucesso!");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-8 mb-8 border border-gray-300 rounded shadow-md ">
      <h2 className="text-2xl font-bold mb-4">Atualizar Veículo</h2>
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Sucesso</p>
          <p>{success}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="flex flex-col">
            <label htmlFor={key} className="mb-1 font-medium capitalize">
              {key}
            </label>
            <input
              id={key}
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Atualizando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
};

export default EditVehicle;
