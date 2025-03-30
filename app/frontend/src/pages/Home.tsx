import { Link } from "react-router-dom";
import principal from "../assets/xcarrosPrincipal.png";
import LinkButton from "../components/layout/LinkButton";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Home.module.css";

interface HomeProps {
  showPublicContent?: boolean;
}

const Home = ({ showPublicContent = false }: HomeProps) => {
  const { token, logout, userName, userId } = useAuth();

  const isPublic = showPublicContent || !token;

  return (
    <section className={styles.home_container}>
      <h1>
        <span>WEB-CARROS</span>
      </h1>
      <Link to="/">
        <img src={principal} alt="xcarros" />
      </Link>
      <p>Compre e venda de veículos em geral.</p>
      {/* Conteúdo público */}
      {isPublic ? (
        <div>
          <LinkButton to="/login">Fazer Login</LinkButton>
          <LinkButton to="/registerUser">Cadastro</LinkButton>
        </div>
      ) : (
        /* Conteúdo privado */
        <div>
          <button className={styles.button_container} onClick={logout}>
            Sair
          </button>
          <p>Seja bem-vindo, {userName}!</p>
          <p>Seu ID é: {userId}</p>
        </div>
      )}
    </section>
  );
};

export default Home;
