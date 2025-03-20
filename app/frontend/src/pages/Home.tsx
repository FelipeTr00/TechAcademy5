import { Link, useParams } from "react-router-dom";
import principal from "../assets/xcarrosPrincipal.png";
import LinkButton from "../components/layout/LinkButton";
import styles from "./Home.module.css";

const Home = () => {
  const { id, name } = useParams<{ id: string; name: string }>();

  return (
    <section className={styles.home_container}>
      <h1>
        Bem vindo ao <span>WEB-CARROS</span>
      </h1>
      <Link to="/">
        <img src={principal} alt="xcarros" />{" "}
      </Link>
      <p>Compre e venda de veículos em geral.</p>
      <div className="button_container">
        <LinkButton to="/login">Fazer Login</LinkButton>
        <LinkButton to="/registerUser">Cadastro</LinkButton>
      </div>

      {id && <p>Home - ID: {id}</p>}
      {name && <p>Home - Nome: {name}</p>}
    </section>
  );
};

export default Home;
