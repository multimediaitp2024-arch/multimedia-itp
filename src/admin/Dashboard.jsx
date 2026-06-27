import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

import {
  FaChurch,
  FaVideo,
  FaUsers,
  FaBroom,
  FaBroadcastTower,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  async function cerrarSesion() {
    await signOut(auth);
    navigate("/login");
  }

  const tarjeta = {
    background: "#fff",
    borderRadius: "18px",
    padding: "20px",
    marginBottom: "18px",
    boxShadow: "0 5px 18px rgba(0,0,0,.10)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    transition: ".2s",
  };

  return (
    <div
      style={{
        background: "#F4F7FB",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg,#0F766E,#14B8A6)",
          color: "#fff",
          borderRadius: "20px",
          padding: "25px",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: 0 }}>
          Panel de Administración
        </h1>

        <p style={{ marginTop: 10 }}>
          Ministerio Multimedia ITP
        </p>
      </div>

      <div style={tarjeta} onClick={() => navigate("/admin/cultos")}>
        <FaChurch size={34} color="#0F766E" />
        <div>
          <h3 style={{ margin: 0 }}>Cultos</h3>
          <small>Administrar cultos.</small>
        </div>
      </div>

      <div style={tarjeta} onClick={() => navigate("/admin/turnos")}>
        <FaVideo size={34} color="#0F766E" />
        <div>
          <h3 style={{ margin: 0 }}>Turnos</h3>
          <small>Administrar turnos.</small>
        </div>
      </div>

      <div style={tarjeta} onClick={() => navigate("/admin/equipo")}>
        <FaUsers size={34} color="#0F766E" />
        <div>
          <h3 style={{ margin: 0 }}>Equipo</h3>
          <small>Administrar integrantes.</small>
        </div>
      </div>

      <div style={tarjeta} onClick={() => navigate("/admin/limpieza")}>
        <FaBroom size={34} color="#0F766E" />
        <div>
          <h3 style={{ margin: 0 }}>Limpieza</h3>
          <small>Administrar cronograma.</small>
        </div>
      </div>

      <div style={tarjeta} onClick={() => navigate("/admin/streaming")}>
        <FaBroadcastTower size={34} color="#0F766E" />
        <div>
          <h3 style={{ margin: 0 }}>Streaming</h3>
          <small>Configurar enlaces.</small>
        </div>
      </div>

      <div
        style={{
          ...tarjeta,
          background: "#DC2626",
          color: "#fff",
        }}
        onClick={cerrarSesion}
      >
        <FaSignOutAlt size={34} />
        <div>
          <h3 style={{ margin: 0 }}>Cerrar sesión</h3>
          <small>Salir del panel administrativo.</small>
        </div>
      </div>
    </div>
  );
}