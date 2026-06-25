import { Link } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaBible,
  FaBroom,
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
        padding: "12px 0",
        zIndex: 1000,
      }}
    >
      <Link to="/" style={{ color: "white" }}>
        <FaHome />
      </Link>

      <Link to="/turnos" style={{ color: "white" }}>
        <FaCalendarAlt />
      </Link>

      <Link to="/cultos" style={{ color: "white" }}>
        <FaBible />
      </Link>

      <Link to="/limpieza" style={{ color: "white" }}>
        <FaBroom />
      </Link>

      <Link to="/envivo" style={{ color: "white" }}>
        <FaVideo />
      </Link>
    </div>
  );
}

export default BottomNav;