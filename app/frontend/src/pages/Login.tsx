import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/utils/errors";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [passwd, setSenha] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !passwd) {
      setError("Preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/login", { email, passwd });
      const { token, userId, userName } = response.data;

      login(token, userId.toString(), userName, rememberMe);

      setEmail("");
      setSenha("");
      navigate(`/home/${userId}`);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login_container}>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <h2>Digite o seu e-mail e senha</h2>
        <div className={styles.input_container}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            name="email"
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
            name="senha"
            value={passwd}
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
