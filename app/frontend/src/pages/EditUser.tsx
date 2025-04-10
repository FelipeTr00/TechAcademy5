import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/utils/errors";
import {
  calcularForcaSenha,
  camposFormulario,
} from "../components/utils/formUtils";
import { useAuth } from "../contexts/AuthContext";
import styles from "../pages/EditUser.module.css";
import api from "../services/api";

const EditUser = () => {
  const [forcaSenha, setForcaSenha] = useState(0);
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
        const response = await api.get("/get-user");
        const { name, email } = response.data.user;

        const [nome, ...rest] = name.split(" ");
        const sobrenome = rest.join(" ");

        setFormData((prev) => ({
          ...prev,
          nome,
          sobrenome,
          email,
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
    if (name === "senha") {
      setForcaSenha(calcularForcaSenha(value));
    }
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
    if (formData.senha.length < 12) {
      setError("A senha deve ter pelo menos 12 caracteres.");
      setLoading(false);
      return;
    }
    if (formData.telefone.length < 11) {
      setError("Telefone inválido.");
      setLoading(false);
      return;
    }
    if (formData.cpf.length < 11) {
      setError("CPF inválido.");
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
    <div className={styles.register}>
      <h1 className={styles.title}>Editar Usuário</h1>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        {camposFormulario.map(({ label, name, type, placeholder }) => (
          <div className={styles.campo} key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              disabled={name === "email"}
            />
            {name === "senha" && (
              <div className={styles.forcaSenha}>
                <p>
                  Força da Senha:{" "}
                  <strong>
                    {
                      ["Fraca", "Fraca", "Fraca", "Média", "Boa", "Forte"][
                        forcaSenha
                      ]
                    }
                  </strong>
                </p>
                <div className={styles.barraContainer}>
                  <div
                    className={styles.barra}
                    style={{
                      width: `${(forcaSenha / 5) * 100}%`,
                      backgroundColor: [
                        "red",
                        "red",
                        "red",
                        "orange",
                        "yellowgreen",
                        "green",
                      ][forcaSenha],
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex flex-col items-center gap-4 mt-4">
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? "Aguarde" : "Salvar"}
          </button>

          <button
            className={styles.btnDelete}
            type="button"
            onClick={handleDeleteAccount}
            disabled={loading}
          >
            {loading ? "Aguarde" : "Deletar Conta"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
