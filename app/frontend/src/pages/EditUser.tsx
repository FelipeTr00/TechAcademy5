import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/utils/errors";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import styles from "./EditUser.module.css";

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

  return (
    <div className={styles.editUser}>
      <h1 className={styles.title}>Editar Usuário</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        {[
          "nome",
          "sobrenome",
          "email",
          "telefone",
          "cpf",
          "senha",
          "confirmarSenha",
        ].map((field) => (
          <div className={styles.campo} key={field}>
            <label htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={
                field === "senha" || field === "confirmarSenha"
                  ? "password"
                  : field === "telefone"
                  ? "tel"
                  : field === "cpf"
                  ? "text"
                  : "text"
              }
              id={field}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              disabled={field === "email"}
              placeholder={
                field === "email" ? "*Não é possível editar o email" : ""
              }
              required={field !== "email"}
            />
          </div>
        ))}
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Salvando" : "Salvar"}
        </button>
      </form>
    </div>
  );
};

export default EditUser;