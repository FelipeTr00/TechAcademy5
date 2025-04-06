import api from "@/services/api";
import { useState } from "react";
import styles from "./Buy.module.css";

type Vehicle = {
  id: number;
  CodigoFipe: string;
  Tipo: string;
  Marca: string;
  Modelo: string;
  Combustivel: string;
  anoModelo: number;
  Valor: string;
  ValorFipe: string;
};

const Buy = () => {
  const [tipo, setTipo] = useState("carros");
  const [anoModelo, setAnoModelo] = useState<number>(2020);
  const [veiculos, setVeiculos] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarVeiculos = async () => {
    setLoading(true);
    try {
      const { data } = await api.post<Vehicle[]>("/get-vehicles", {
        Tipo: tipo,
        anoModelo,
      });
      setVeiculos(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Erro ao buscar veículos.");
    } finally {
      setLoading(false);
    }
  };

  const veiculosFiltrados = veiculos.filter((v) =>
    v.Modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3>Filtros</h3>
        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="carros">Carros</option>
            <option value="motos">Motos</option>
            <option value="caminhoes">Caminhões</option>
          </select>
        </label>
        <label>
          Ano Modelo:
          <input
            type="number"
            value={anoModelo}
            onChange={(e) => setAnoModelo(Number(e.target.value))}
          />
        </label>
        <button onClick={buscarVeiculos} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>

        <input
          type="text"
          placeholder="Buscar por modelo"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </aside>

      <div className={styles.content}>
        <h1>Veículos disponíveis</h1>
        {loading && <p>Carregando...</p>}
        {veiculosFiltrados.length === 0 && !loading && (
          <p>Utilize os filtros para encontrar o que deseja.</p>
        )}
        <div className={styles.grid}>
          {veiculosFiltrados.map((v) => (
            <div key={v.id} className={styles.card}>
              <h3>
                {v.Marca} - {v.Modelo}
              </h3>
              <p>
                <strong>Ano:</strong> {v.anoModelo}
              </p>
              <p>
                <strong>Combustível:</strong> {v.Combustivel}
              </p>
              <p>
                <strong>Preço:</strong> R${" "}
                {parseFloat(v.ValorFipe).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p>
                <strong>Código Fipe:</strong> {v.CodigoFipe}
              </p>{" "}
              {}
              {veiculosFiltrados.length > 0 && (
                <div className={styles.bottomButton}>
                  <button
                    onClick={() =>
                      alert("Oferta enviada para o email cadastrado")
                    }
                  >
                    Receber Oferta
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Buy;
