import { useNavigate } from "react-router-dom";
import styles from "./LinkButton.module.css";

function LinkButton({ to, children }) {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(to)} className={styles.btn}>
      {children}
    </button>
  );
}

export default LinkButton;
