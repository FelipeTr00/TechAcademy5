import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../components/utils/errors";
import {
  calcularForcaSenha,
  camposFormulario,
} from "../components/utils/formUtils";
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

  const [forcaSenha, setForcaSenha] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const novoValor = ["telefone", "cpf"].includes(name)
      ? value.replace(/\D/g, "")
      : value;

    setFormData((prev) => ({ ...prev, [name]: novoValor }));

    if (name === "senha") setForcaSenha(calcularForcaSenha(value));
  };

  const validarFormulario = (): boolean => {
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
    if (senha !== confirmarSenha)
      return setError("As senhas não coincidem"), false;
    if (!email.includes("@") || !email.includes(".com"))
      return setError("Email inválido."), false;
    if (senha.length < 12)
      return setError("A senha deve ter no mínimo 12 caracteres."), false;
    if (calcularForcaSenha(senha) < 4) {
      return (
        setError(
          "Senha fraca. Use letras maiúsculas, minúsculas, números e símbolos."
        ),
        false
      );
    }
    if (telefone.length < 11) return setError("Telefone inválido."), false;
    if (cpf.length < 11) return setError("CPF inválido."), false;

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    if (!validarFormulario()) return setLoading(false);

    const payload = {
      name: `${formData.nome.trim()} ${formData.sobrenome.trim()}`,
      email: formData.email,
      passwd: formData.senha,
      passwdCheck: formData.confirmarSenha,
      cpf: formData.cpf,
      access: "user",
    };

    try {
      await api.post("/new-user", payload);
      setSuccess("Cadastro realizado com sucesso!");

      setFormData({
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cpf: "",
        senha: "",
        confirmarSenha: "",
      });
      setForcaSenha(0);

      setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      setError(getErrorMessage(err));
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
        {camposFormulario.map(({ label, name, type, placeholder }) => (
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
            {name === "senha" && (
              <div className={styles.forcaSenha}>
                <p>
                  Força da Senha:{" "}
                  <strong>
                    {
                      ["Fraca", "Fraca", "Fraca", "Média", "Boa", "Forte"][
                        forcaSenha
                      ]
                    }
                  </strong>
                </p>
                <div className={styles.barraContainer}>
                  <div
                    className={styles.barra}
                    style={{
                      width: `${(forcaSenha / 5) * 100}%`,
                      backgroundColor: [
                        "red",
                        "red",
                        "red",
                        "orange",
                        "yellowgreen",
                        "green",
                      ][forcaSenha],
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Cadastrando..." : "Finalizar"}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
