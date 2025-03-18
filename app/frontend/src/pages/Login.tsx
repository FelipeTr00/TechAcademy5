import { Link, useParams } from "react-router-dom";

const Login = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Login</h1>
      <p>Seu ID é: {id}</p>
      <Link to={`/home/${id}`}>Ir para Home</Link>
    </div>
  );
};

export default Login;

//slr
