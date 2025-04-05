// utils/formUtils.ts
export const calcularForcaSenha = (senha: string) => {
  let forca = 0;
  if (senha.length >= 12) forca++;
  if (/[A-Z]/.test(senha)) forca++;
  if (/[a-z]/.test(senha)) forca++;
  if (/\d/.test(senha)) forca++;
  if (/[^A-Za-z0-9]/.test(senha)) forca++;
  return forca;
};

export const camposFormulario = [
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
  { label: "Email", name: "email", type: "email", placeholder: "*Email" },
  {
    label: "Telefone",
    name: "telefone",
    type: "tel",
    placeholder: "*Telefone",
  },
  { label: "CPF", name: "cpf", type: "text", placeholder: "*CPF" },
  { label: "Senha", name: "senha", type: "password", placeholder: "*Senha" },
  {
    label: "Confirmar Senha",
    name: "confirmarSenha",
    type: "password",
    placeholder: "*Confirmar Senha",
  },
];
