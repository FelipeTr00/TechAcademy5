import { getErrorMessage } from "@/components/utils/errors";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Buy.module.css";

type DadosCars = {
  Marca: string;
  Modelo: string;
  anoModelo: string;
  valor: string;
  fipe: string;
  imagem: string;
};

const Buy = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [carros, setCarros] = useState<DadosCars[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Você não está Logado!");
      navigate("/login");
    }

    const fetchCarros = async () => {
      try {
        const { data } = await api.get<DadosCars[]>("/getByFilters");
        setCarros(data);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchCarros();
  }, [isAuthenticated, navigate]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <input
          type="text"
          placeholder="Buscar carros..."
          className={styles.searchInput}
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            setCarros((prevCarros) =>
              prevCarros.filter((carro) =>
                carro.Modelo.toLowerCase().includes(searchTerm)
              )
            );
          }}
        />
      </aside>
      <div className={styles.content}>
        <h1>Página de Compra</h1>
        <div className={styles.grid}>
          {carros.map((carro) => (
            <Card key={carro.id} {...carro} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buy;
