import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/utils/errors";
import api from "../services/api";
import styles from "./RegisterUser.module.css";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    confirmarSenha: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "telefone" || name === "cpf"
          ? value.replace(/\D/g, "")
          : value,
    });
  };

  const validarFormulario = () => {
    const { nome, sobrenome, email, telefone, cpf, senha, confirmarSenha } =
      formData;

    if (
      !nome ||
      !sobrenome ||
      !email ||
      !telefone ||
      !cpf ||
      !senha ||
      !confirmarSenha
    ) {
      setError("Preencha todos os campos");
      return false;
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem");
      return false;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      setError("Email inválido.");
      return false;
    }

    if (senha.length < 12) {
      setError("A senha deve ter no mínimo 12 caracteres.");
      return false;
    }

    if (telefone.length < 11) {
      setError("O telefone deve ter no mínimo 11 dígitos.");
      return false;
    }
    if (cpf.length < 11) {
      setError("O CPF deve ter no mínimo 11 dígitos.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    if (!validarFormulario()) {
      setLoading(false);
      return;
    }

    try {
      await api.post("/usuarios", formData);
      setSuccess("Cadastro realizado com sucesso!");

      //LIMPAR CAMPO APOS SUCESSO
      setFormData({
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cpf: "",
        senha: "",
        confirmarSenha: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Faça seu cadastro</h1>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        {[
          {
            label: "Nome",
            name: "nome",
            type: "text",
            placeholder: "*Digite seu nome",
          },
          {
            label: "Sobrenome",
            name: "sobrenome",
            type: "text",
            placeholder: "*Digite seu sobrenome",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "*Email",
          },
          {
            label: "Telefone",
            name: "telefone",
            type: "tel",
            placeholder: "*Telefone",
          },
          { label: "CPF", name: "cpf", type: "text", placeholder: "*CPF" },
          {
            label: "Senha",
            name: "senha",
            type: "password",
            placeholder: "*Senha",
          },
          {
            label: "Confirmar Senha",
            name: "confirmarSenha",
            type: "password",
            placeholder: "*Confirmar Senha",
          },
        ].map(({ label, name, type, placeholder }) => (
          <div className={styles.campo} key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Cadastrando" : "Finalizar"}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
