
import { useNavigate } from "react-router-dom";

export default function Gate() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px"
    }}>
      <h1>Bienvenido Multimedia ITP</h1>

      <button
        style={{ padding: 12, fontSize: 16 }}
        onClick={() => navigate("/home")}
      >
        👀 Continuar como invitado
      </button>

      <button
        style={{ padding: 12, fontSize: 16 }}
        onClick={() => navigate("/login")}
      >
        🔐 Iniciar sesión (Admin)
      </button>
    </div>
  );
}