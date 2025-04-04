import styles from "./Card.module.css";

type CarProps = {
  marca: string;
  modelo: string;
  anoModelo: string;
  valor: string;
  fipe: string;
  imagem: string;
};

const Card = ({ marca, modelo, anoModelo, valor, fipe, imagem }: CarProps) => {
  return (
    <div className={styles.card}>
      <img src={imagem} alt={modelo} className={styles.photo} />
      <h2 className={styles.name}>
        {marca} {modelo}
      </h2>
      <p className={styles.description}>Ano: {anoModelo}</p>
      <p className={styles.description}>Valor: {valor}</p>
      <p className={styles.description}>FIPE: {fipe}</p>
    </div>
  );
};

export default Card;
