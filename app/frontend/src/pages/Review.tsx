import { useEffect, useState } from "react";
import api from "@/services/api";
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
  Valor: string; // já vem formatado (ex: "R$ 54.560,00")
};

const ReviewPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [codigoFipe, setCodigoFipe] = useState("");
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  const fetchReviews = async () => {
    const { data } = await api.get("/reviews");
    setReviews(data.reverse());
  };

  const fetchVehicle = async () => {
    try {
      const { data } = await api.get(`/get-vehicle?CodigoFipe=${codigoFipe}`);
      setVehicle(data);
    } catch (error) {
      setVehicle(null);
      alert("Veículo não encontrado.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/reviews", {
      title,
      content,
      rating,
      CodigoFipe: codigoFipe,
    });
    setTitle("");
    setContent("");
    setRating(5);
    setCodigoFipe("");
    setVehicle(null);
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Postar Novo Review</h2>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <input
          placeholder="Código Fipe (ex: 031056-5)"
          value={codigoFipe}
          onChange={(e) => setCodigoFipe(e.target.value)}
          onBlur={fetchVehicle}
          required
        />

        {vehicle && (
          <div className={styles.vehiclePreview}>
            <p>
              <strong>
                {vehicle.Marca} - {vehicle.Modelo} {vehicle.anoModelo}
              </strong>
            </p>
            <p>Preço FIPE: {vehicle.Valor}</p>
          </div>
        )}

        <input
          placeholder="Título do review"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Conteúdo do review..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button type="submit">Publicar</button>
      </form>

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
  );
};

const VehicleInfo = ({ codigoFipe }: { codigoFipe: string }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/get-vehicle?CodigoFipe=${codigoFipe}`);
        setVehicle(data);
      } catch (err) {
        setVehicle(null);
      }
    };
    fetch();
  }, [codigoFipe]);

  if (!vehicle) return null;

  return (
    <div style={{ marginBottom: 8 }}>
      <p>
        🚗 <strong>{vehicle.Marca} - {vehicle.Modelo} {vehicle.anoModelo}</strong>
      </p>
      <p>💰 Preço FIPE: {vehicle.Valor}</p>
    </div>
  );
};

export default ReviewPage;
