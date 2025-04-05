import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "./Veiculo.module.css";

const FiltroVeiculo = () => {
  const [filtros, setFiltros] = useState({
    tipo: "",
    marca: "",
    modelo: "",
    combustivel: "",
    anoModelo: "",
  });

  const [veiculos, setVeiculos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);

    try {
      const payload = Object.fromEntries(
        Object.entries(filtros).filter(([_, value]) => value !== "")
      );

      const response = await api.post("/get-vehicles", payload);
      setVeiculos(response.data);
    } catch (err: any) {
      setErro("Erro ao buscar veículos.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Filtrar Veículos</h2>
      <form onSubmit={handleSubmit} className={styles.filterForm}>
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={filtros.tipo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={filtros.marca}
          onChange={handleChange}
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={filtros.modelo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="combustivel"
          placeholder="Combustível"
          value={filtros.combustivel}
          onChange={handleChange}
        />
        <input
          type="number"
          name="anoModelo"
          placeholder="Ano do Modelo"
          value={filtros.anoModelo}
          onChange={handleChange}
        />
        <button type="submit" disabled={carregando}>
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {erro && <p className={styles.error}>{erro}</p>}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código Fipe</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Combustível</th>
            <th>Ano</th>
            <th>Valor</th>
            <th>Valor Fipe</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((v: any) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.CodigoFipe}</td>
              <td>{v.Tipo}</td>
              <td>{v.Marca}</td>
              <td>{v.Modelo}</td>
              <td>{v.Combustivel}</td>
              <td>{v.anoModelo}</td>
              <td>{v.Valor}</td>
              <td>{v.ValorFipe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FiltroVeiculo;