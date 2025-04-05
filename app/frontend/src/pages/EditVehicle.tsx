import { getErrorMessage } from "@/components/utils/errors";
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

  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    anoModelo: "",
    valor: "",
    fipe: "",
    imagem: "",
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imagem: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await api.put(`/update-Vehicle/${vehicleId}`, formData);
      setSuccess("Veículo atualizado com sucesso!");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 border border-gray-300 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Editar Veículo</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) =>
          key !== "imagem" ? (
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
          ) : (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="mb-1 font-medium">
                Imagem
              </label>
              <input
                type="file"
                accept="image/*"
                id={key}
                name={key}
                onChange={handleImageChange}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {formData.imagem && (
                <img
                  src={formData.imagem}
                  alt="Pré-visualização"
                  className="mt-2 max-h-40 object-contain"
                />
              )}
            </div>
          )
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
};

export default EditVehicle;
