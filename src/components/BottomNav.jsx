
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChurch,
  FaVideo,
  FaCalendarAlt,
  FaUsers,
  FaBroom,
} from "react-icons/fa";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Inicio", icon: <FaHome />, path: "/" },
    { label: "Cultos", icon: <FaChurch />, path: "/cultos" },
    { label: "Turnos", icon: <FaCalendarAlt />, path: "/turnos" },
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
        background: "#0F766E",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 0",
        boxShadow: "0 -4px 12px rgba(0,0,0,.2)",
        zIndex: 999,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          style={{
            background: "transparent",
            border: "none",
            color:
              location.pathname === tab.path
                ? "#FFFFFF"
                : "#D1FAE5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          <div style={{ fontSize: 22 }}>
            {tab.icon}
          </div>

          {tab.label}
        </button>
      ))}
    </div>
  );
}