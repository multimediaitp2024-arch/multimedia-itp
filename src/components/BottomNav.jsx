
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaBible,
  FaUsers,
  FaVideo,
} from "react-icons/fa";

function BottomNav() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#102A43",
        display: "flex",
        justifyContent: "space-around",
        padding: "16px 0",
        zIndex: 1000,
        boxShadow: "0 -2px 10px rgba(0,0,0,.2)",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        <FaHome size={28} />
        <div style={{ fontSize: 12 }}>Inicio</div>
      </Link>

      <Link
        to="/turnos"
        style={{
          color: "white",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        <FaCalendarAlt size={28} />
        <div style={{ fontSize: 12 }}>Turnos</div>
      </Link>

      <Link
        to="/cultos"
        style={{
          color: "white",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        <FaBible size={28} />
        <div style={{ fontSize: 12 }}>Cultos</div>
      </Link>

      <Link
        to="/equipo"
        style={{
          color: "white",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        <FaUsers size={28} />
        <div style={{ fontSize: 12 }}>Equipo</div>
      </Link>

      <Link
        to="/envivo"
        style={{
          color: "white",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        <FaVideo size={28} />
        <div style={{ fontSize: 12 }}>En Vivo</div>
      </Link>
    </div>
  );
}

export default BottomNav;