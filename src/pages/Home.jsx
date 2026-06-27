import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaUsers,
  FaVideo,
  FaBroom,
  FaChurch,
  FaLock,
} from "react-icons/fa";

import BottomNav from "../components/BottomNav";

export default function Home() {
  const cards = [
    {
      titulo: "Turnos",
      icono: <FaCalendarAlt size={42} color="#1E3A8A" />,
      ruta: "/turnos",
    },
    {
      titulo: "Cultos",
      icono: <FaChurch size={42} color="#92400E" />,
      ruta: "/cultos",
    },
    {
      titulo: "Equipo",
      icono: <FaUsers size={42} color="#0F766E" />,
      ruta: "/equipo",
    },
    {
      titulo: "Limpieza",
      icono: <FaBroom size={42} color="#15803D" />,
      ruta: "/limpieza",
    },
    {
      titulo: "En Vivo",
      icono: <FaVideo size={42} color="#7E22CE" />,
      ruta: "/envivo",
    },
  ];

  return (
    <div
      style={{
        background: "#F3F4F6",
        minHeight: "100vh",
        paddingBottom: "90px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "25px",
        }}
      >
        {/* Logo */}

        <div style={{ textAlign: "center", marginBottom: 35 }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              width: 110,
              marginBottom: 15,
            }}
          />

          <h1
            style={{
              margin: 0,
              fontSize: 50,
              color: "#102A43",
            }}
          >
            Iglesia Tabernáculo
            <br />
            Pentecostal
          </h1>

          <p
            style={{
              marginTop: 15,
              fontSize: 24,
              color: "#0F766E",
            }}
          >
            Ministerio Multimedia 2026
          </p>
        </div>

        {/* Tarjetas */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 25,
          }}
        >
          {cards.map((card) => (
            <Link
              key={card.titulo}
              to={card.ruta}
              style={{
                background: "#fff",
                borderRadius: 25,
                padding: 40,
                textAlign: "center",
                textDecoration: "none",
                color: "#374151",
                boxShadow: "0 5px 18px rgba(0,0,0,.12)",
              }}
            >
              <div
                style={{
                  marginBottom: 18,
                }}
              >
                {card.icono}
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: 28,
                }}
              >
                {card.titulo}
              </h2>
            </Link>
          ))}
        </div>

        {/* Botón Admin */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 35,
          }}
        >
          <Link
            to="/login"
            style={{
              background: "#2563EB",
              color: "white",
              textDecoration: "none",
              padding: "14px 28px",
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontWeight: "bold",
            }}
          >
            <FaLock />
            Iniciar sesión (Admin)
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}