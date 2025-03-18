import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_links}>
        <li>
          <FaFacebook />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaTwitter />
        </li>
        <li>
          <FaYoutube />
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>XCARROS</span> &copy; 2025
      </p>
    </footer>
  );
}

export default Footer;
