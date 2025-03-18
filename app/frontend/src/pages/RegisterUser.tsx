import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Register User</h1>
      <button onClick={() => navigate("/login/:id")}>Cadastro</button>
    </div>
  );
};

export default RegisterUser;
