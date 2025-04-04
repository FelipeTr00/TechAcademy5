import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/utils/errors";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const EditUser = () => {
  const { token, userId } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/get-user/${userId}`);
        const { name, email, cpf } = response.data;
        const [nome, ...rest] = name.split(" ");
        const sobrenome = rest.join(" ");

        setFormData((prev) => ({
          ...prev,
          nome,
          sobrenome,
          email,
          cpf,
        }));
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, userId, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "telefone" || name === "cpf"
          ? value.replace(/\D/g, "")
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const updatePayload = {
        name: `${formData.nome} ${formData.sobrenome}`,
        passwd: formData.senha || undefined,
        cpf: formData.cpf,
        access: "user",
      };

      await api.put(`/update-user`, updatePayload);
      setSuccess("Usuário atualizado com sucesso!");
      setTimeout(() => navigate(`/home/${userId}`), 3000);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja deletar sua conta?"
    );
    if (!confirmDelete) return;

    setLoading(true);
    setError(null);
    try {
      await api.delete(`/delete-user/${userId}`);
      alert("Conta deletada com sucesso.");
      navigate("/login");
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md border-t-4 border-blue-600">
      <h1 className="text-lg font-semibold mb-3">Editar Usuário</h1>

      {error && (
        <div className="mb-3 p-2 text-red-700 bg-red-100 border border-red-500 rounded text-sm">
          <strong>Erro:</strong> {error}
        </div>
      )}

      {success && (
        <div className="mb-3 p-2 text-green-700 bg-green-100 border border-green-500 rounded text-sm">
          <strong>Sucesso:</strong> {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        {[
          "nome",
          "sobrenome",
          "email",
          "telefone",
          "cpf",
          "senha",
          "confirmarSenha",
        ].map((field) => (
          <div key={field} className="flex flex-col items-center">
            <label
              htmlFor={field}
              className="font-medium text-sm capitalize mb-1 w-full max-w-[350px]"
            >
              {field === "confirmarSenha"
                ? "Confirmar Senha"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field.includes("senha") ? "password" : "text"}
              id={field}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              disabled={field === "email"}
              placeholder={
                field === "email" ? "*Não é possível editar o email" : ""
              }
              required={field !== "email"}
              className="w-72 md:w-[350px] h-9 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>
        ))}

        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="w-28 md:w-[210px] bg-orange-600 text-white py-2 text-base rounded-md hover:bg-orange-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center">
        <button
          className="w-28 md:w-[210px] mt-3 bg-red-600 text-white py-2 text-base rounded-md hover:bg-red-800 disabled:bg-gray-400 cursor-pointer"
          onClick={handleDeleteAccount}
          disabled={loading}
        >
          {loading ? "Deletando..." : "Deletar Conta"}
        </button>
      </div>
    </div>
  );
};
export default EditUser;
