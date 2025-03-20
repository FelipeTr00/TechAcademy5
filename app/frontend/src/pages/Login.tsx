import axios from "axios";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      setSuccess("Login realizado com sucesso!");
      setEmail("");
      setPassword("");
      setLoading(false);

      navigate("/home");
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
