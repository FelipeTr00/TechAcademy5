import { useEffect, useState } from "react";
import { FaHeart, FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/navbar.png";
import styles from "./NavBar.module.css";

function Navbar() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link to={"/"}>
        <img src={logo} alt="Logo" />
      </Link>
      {/*CODIGO DO CENTRO*/}
      <ul className={styles.centerGroup}>
        <li className={styles.item}>
          <Link to="/">Inicio</Link>
        </li>
        <li className={styles.item}>
          <Link to="/buy">Comprar</Link>
        </li>
        <li className={styles.item}>
          <Link to="/sell">Vender</Link>
        </li>
        <li className={styles.item}>
          <Link to="/services">Serviços</Link>
        </li>
        <li className={styles.item}>
          <Link to="/about">Sobre</Link>
        </li>
      </ul>

      {/*CODIGO DO LADO DIREITO*/}
      <div className={styles.rightGroup}>
        <div className={styles.verticalLine}></div>
        <ul className={styles.list}>
          <li className={styles.item}>
            {userName ? (
              <span>Olá, {userName}!</span>
            ) : (
              <Link to="/login">Entrar</Link>
            )}
          </li>
          <li className={styles.item}>
            <Link to="/contact">
              <FaMessage />
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/favorites">
              <FaHeart />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
