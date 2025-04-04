import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const cards = [
    { title: "Editar Usuário", path: "/editUser/:userId" },
    { title: "Minhas Vendas", path: "/mySell" },
    { title: "Meu Perfil", path: "/myUser" },
    { title: "Meus Favoritos", path: "/myFavorites" },
    { title: "Meus Carros", path: "/myCars" },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Você não está Logado!");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Área do Usuário</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className="block p-6 bg-white border border-orange-300 rounded shadow-md text-center hover:bg-orange-100 transition"
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
