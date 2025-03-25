import axios from "axios";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email || !senha) {
      setLoading(false);
      return setError("Preencha todos os campos");
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/usuarios/login",
        {
          email,
          senha,
        }
      );

      // ARMAZENA OS DADOS LOCALSTORAGE
      if (rememberMe || !rememberMe) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.userName);
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("userName", data.userName);
      }
      setSuccess("Login realizado com sucesso!");
      setEmail("");
      setSenha("");
      setLoading(false);

      navigate(`/home/:id/:name`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message || "Erro ao realizar login");
        } else {
          setError("Erro de conexão");
        }
      } else {
        setError("Erro inesperado");
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.login_container}>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <h2>Digite o seu e-mail e senha</h2>
        <div className={styles.input_container}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.input_container}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className={styles.recallForget}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Lembrar-me
          </label>
          <a href="/forget" className={styles.forgotPassword}>
            Esqueceu a senha?
          </a>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>

        <div className={styles.register}>
          <p>
            Não tem uma conta? <a href="/registerUser">Cadastre-se</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
