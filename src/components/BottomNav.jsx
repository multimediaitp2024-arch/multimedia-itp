import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChurch,
  FaVideo,
  FaUsers,
  FaBroom,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
    <div>
      <Link to="/login">🔐 Admin</Link>
    </div>
  );
}
export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Inicio", icon: <FaHome />, path: "/" },
    { label: "Cultos", icon: <FaChurch />, path: "/cultos" },
    { label: "Turnos", icon: <FaVideo />, path: "/turnos" },
    { label: "Equipo", icon: <FaUsers />, path: "/equipo" },
    { label: "Limpieza", icon: <FaBroom />, path: "/limpieza" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          style={{
            background: "none",
            border: "none",
            color:
              location.pathname === tab.path
                ? "#0F766E"
                : "#6B7280",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: "18px" }}>
            {tab.icon}
          </div>
          {tab.label}
        </button>
      ))}
    </div>
  );
}