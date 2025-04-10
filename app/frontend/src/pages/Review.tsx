import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Review.module.css";

type Review = {
  id: number;
  title: string;
  content: string;
  rating: number;
  CodigoFipe: string;
};

type Vehicle = {
  id: number;
  CodigoFipe: string;
  Tipo: string;
  Marca: string;
  Modelo: string;
  Combustivel: string;
  anoModelo: number;
  Valor: string;
};

const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const [tipo, setTipo] = useState("carros");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anoModelo, setAnoModelo] = useState<number | null>(null);

  const [marcas, setMarcas] = useState<string[]>([]);
  const [modelos, setModelos] = useState<string[]>([]);
  const [anos, setAnos] = useState<number[]>([]);

  const [codigoFipe, setCodigoFipe] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [title, setTitle] = useState(""); // agora preenchido automaticamente
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Você não está Logado!");
      navigate("/login");
    }
    fetchReviews();
  }, [isAuthenticated, navigate]);

  const fetchReviews = async () => {
    const { data } = await api.get("/reviews");
    setReviews(data.reverse());
  };

  // Carrega marcas ao trocar tipo
  useEffect(() => {
    resetAll();
    if (tipo) {
      api.post("/get-vehicles", { Tipo: tipo }).then(({ data }) => {
        setMarcas([...new Set(data.map((v: Vehicle) => v.Marca))]);
      });
    }
  }, [tipo]);

  // Carrega modelos ao trocar marca
  useEffect(() => {
    setModelo("");
    setAnoModelo(null);
    setModelos([]);
    setAnos([]);
    setCodigoFipe("");
    setTitle("");
    if (tipo && marca) {
      api
        .post("/get-vehicles", { Tipo: tipo, Marca: marca })
        .then(({ data }) => {
          setModelos([...new Set(data.map((v: Vehicle) => v.Modelo))]);
        });
    }
  }, [marca]);

  // Carrega anos ao trocar modelo
  useEffect(() => {
    setAnoModelo(null);
    setAnos([]);
    setCodigoFipe("");
    setTitle("");
    if (tipo && marca && modelo) {
      api
        .post("/get-vehicles", { Tipo: tipo, Marca: marca, Modelo: modelo })
        .then(({ data }) => {
          setAnos([...new Set(data.map((v: Vehicle) => v.anoModelo))]);
        });
    }
  }, [modelo]);

  // Seleciona veículo e preenche título
  useEffect(() => {
    if (tipo && marca && modelo && anoModelo) {
      api
        .post("/get-vehicles", {
          Tipo: tipo,
          Marca: marca,
          Modelo: modelo,
          anoModelo,
        })
        .then(({ data }) => {
          const selected = data[0];
          if (selected) {
            setCodigoFipe(selected.CodigoFipe);
            setVehicle(selected);
            setTitle(
              `${selected.Marca} - ${selected.Modelo} ${selected.anoModelo}`
            );
          }
        });
    }
  }, [anoModelo]);

  const resetAll = () => {
    setMarca("");
    setModelo("");
    setAnoModelo(null);
    setModelos([]);
    setAnos([]);
    setCodigoFipe("");
    setVehicle(null);
    setTitle("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/reviews", {
      title,
      content,
      rating,
      CodigoFipe: codigoFipe,
    });

    setContent("");
    setRating(5);
    resetAll();
    fetchReviews();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>O que achou do Veículo?</h2>

      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <div className={styles.vehicleSelectors}>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="carros">Carros</option>
            <option value="motos">Motos</option>
            <option value="caminhoes">Caminhões</option>
          </select>

          {marcas.length > 0 && (
            <select value={marca} onChange={(e) => setMarca(e.target.value)}>
              <option value="">Marca</option>
              {marcas.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          )}

          {modelos.length > 0 && (
            <select value={modelo} onChange={(e) => setModelo(e.target.value)}>
              <option value="">Modelo</option>
              {modelos.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          )}

          {anos.length > 0 && (
            <select
              value={anoModelo ?? ""}
              onChange={(e) => setAnoModelo(Number(e.target.value))}
            >
              <option value="">Ano</option>
              {anos.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          )}
        </div>

        {title && (
          <div className={styles.generatedTitle}>
            <p>
              <strong>{title}</strong>
            </p>
          </div>
        )}

        <textarea
          placeholder="Conteúdo do review..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className={styles.formFooter}>
          <div className={styles.ratingGroup}>
            <label htmlFor="rating">Nota:</label>
            <input
              id="rating"
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className={styles.ratingInput}
            />
          </div>
          <button type="submit" disabled={!codigoFipe}>
            Publicar
          </button>
        </div>
      </form>

      <div className={styles.sectionReviews}>
        <h2 className={styles.sectionTitle}>Reviews Recentes</h2>
        <div className={styles.timeline}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.card}>
              <h3>{review.title}</h3>
              {review.CodigoFipe && (
                <VehicleInfo codigoFipe={review.CodigoFipe} />
              )}
              <p>{review.content}</p>
              <p>⭐ Nota: {review.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VehicleInfo = ({ codigoFipe }: { codigoFipe: string }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/get-vehicle?CodigoFipe=${codigoFipe}`);
        setVehicle(data);
      } catch {
        setVehicle(null);
      }
    };
    fetch();
  }, [codigoFipe]);

  if (!vehicle) return null;

  return (
    <div style={{ marginBottom: 8 }}>
      <p>
        🚗{" "}
        <strong>
          {vehicle.Marca} - {vehicle.Modelo} {vehicle.anoModelo}
        </strong>
      </p>
      <p>💰 Preço FIPE: {vehicle.Valor}</p>
    </div>
  );
};

export default ReviewPage;
