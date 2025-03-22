import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import principal from "../assets/xcarrosPrincipal.png";
import LinkButton from "../components/layout/LinkButton";
import styles from "./Home.module.css";

const Home = () => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {}, [navigate, token, userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <section className={styles.home_container}>
      <h1>
        <span>WEB-CARROS</span>
      </h1>
      <Link to="/">
        <img src={principal} alt="xcarros" />{" "}
      </Link>
      <p>Compre e venda de veículos em geral.</p>
      <div className="button_container">
        {token && userId && (
          <button onClick={handleLogout}>Sair</button> // Botão de Sair (Logout)
        )}
        {(!token || !userId) && (
          <>
            <LinkButton to="/login">Fazer Login</LinkButton>
            <LinkButton to="/registerUser">Cadastro</LinkButton>
          </>
        )}
      </div>

      {token && userId && (
        <>
          <p>Seja bem vindo - {userName}! </p>
          <p>Seu Id é: {userId}</p>
        </>
      )}
    </section>
  );
};

export default Home;
