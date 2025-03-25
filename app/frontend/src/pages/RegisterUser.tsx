import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterUser.module.css";

const RegisterUser = () => {
  const navigate = useNavigate();

  //ESTADO PARA ARMAZENAR DADOS DO USER
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  //ESTADO PARA RESPOSTAS AO USUARIO
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  //LIDAR COM O ENVIO FORM
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    //VALIDAÇÕES DO FORMULÁRIO
    if (
      !nome ||
      !sobrenome ||
      !email ||
      !telefone ||
      !cpf ||
      !senha ||
      !confirmarSenha
    ) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (!email.includes("@") || !email.includes(".com")) {
      setError("Email inválido");
      setLoading(false);
      return;
    }

    if (senha.length < 12) {
      setError("Senha tem que ter no minimo 12 caracteres");
      setLoading(false);
      return;
    }

    if (telefone.length < 11) {
      setError("Telefone tem ser maior que 11 digitos");
      setLoading(false);
      return;
    }

    // FIM DAS VALIDAÇÕES

    const dados = {
      nome,
      sobrenome,
      email,
      telefone,
      cpf,
      senha,
      confirmarSenha,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/usuarios",
        dados
      );
      setSuccess("Cadastro realizado com sucesso!");

      //LIMPAR CAMPO APOS SUCESSO
      setNome("");
      setSobrenome("");
      setEmail("");
      setTelefone("");
      setCpf("");
      setSenha("");
      setConfirmarSenha("");
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message || "Erro ao realizar cadastro.");
        } else {
          setError("Erro de conexão");
        }
      } else {
        setError("Erro inesperado");
      }
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Faça seu cadastro</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.campo}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="*Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className={styles.campo}>
          <label htmlFor="lastname">Sobrenome</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="*Digite seu sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </div>
        <div className={styles.campo}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="*Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.campo}>
          <label htmlFor="phone">Telefone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="*Telefone"
            value={telefone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setTelefone(value);
            }}
          />
        </div>
        <div className={styles.campo}>
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="*CPF"
            value={cpf}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setCpf(value);
            }}
          />
        </div>
        <div className={styles.campo}>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className={styles.campo}>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="*Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Cadastrando" : "Finalizar"}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
