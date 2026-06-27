
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import {
  FaChurch,
  FaVideo,
  FaUsers,
  FaBroom,
  FaBroadcastTower,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  async function cerrarSesion() {
    await signOut(auth);
    navigate("/");
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
          color: "white",
          borderRadius: "20px",
          padding: "25px",
          marginBottom: "25px",
        }}
      >
        <h1 style={{ margin: 0 }}>
          ⚙️ Panel de Administración
        </h1>

        <p style={{ marginTop: 10 }}>
          Bienvenido Franklin 👋
        </p>
      </div>

      <div
        style={tarjeta}
        onClick={() => navigate("/admin/cultos")}
      >
        <FaChurch size={34} color="#0F766E" />

        <div>
          <h3 style={{ margin: 0 }}>
            Administrar Cultos
          </h3>

          <small>
            Crear, editar y eliminar cultos.
          </small>
        </div>
      </div>

      <div
        style={tarjeta}
        onClick={() => navigate("/admin/turnos")}
      >
        <FaVideo size={34} color="#0F766E" />

        <div>
          <h3 style={{ margin: 0 }}>
            Administrar Turnos
          </h3>

          <small>
            Gestionar servidores.
          </small>
        </div>
      </div>

      <div
        style={tarjeta}
        onClick={() => navigate("/admin/equipo")}
      >
        <FaUsers size={34} color="#0F766E" />

        <div>
          <h3 style={{ margin: 0 }}>
            Administrar Equipo
          </h3>

          <small>
            Editar teléfonos y miembros.
          </small>
        </div>
      </div>

      <div
        style={tarjeta}
        onClick={() => navigate("/admin/limpieza")}
      >
        <FaBroom size={34} color="#0F766E" />

        <div>
          <h3 style={{ margin: 0 }}>
            Administrar Limpieza
          </h3>

          <small>
            Editar cronograma.
          </small>
        </div>
      </div>

      <div
        style={tarjeta}
        onClick={() => navigate("/admin/streaming")}
      >
        <FaBroadcastTower size={34} color="#0F766E" />

        <div>
          <h3 style={{ margin: 0 }}>
            Configuración Streaming
          </h3>

          <small>
            YouTube y WhatsApp.
          </small>
        </div>
      </div>

      <div
        style={{
          ...tarjeta,
          background: "#ef4444",
          color: "white",
        }}
        onClick={cerrarSesion}
      >
        <FaSignOutAlt size={34} />

        <h3 style={{ margin: 0 }}>
          Cerrar sesión
        </h3>
      </div>
    </div>
  );
}

export default Dashboard;