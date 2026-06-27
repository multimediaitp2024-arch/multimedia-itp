
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import logoITP from "../assets/logo-itp.png";

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
  const [proximoTurno, setProximoTurno] = useState(null);
  const [proximoCulto, setProximoCulto] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      // TURNOS
      const turnosSnap = await getDocs(collection(db, "turnos"));

      const turnos = turnosSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      turnos.sort((a, b) => a.fecha.localeCompare(b.fecha));

      if (turnos.length > 0) {
        setProximoTurno(turnos[0]);
      }

      // CULTOS

      const cultosSnap = await getDocs(collection(db, "cultos"));

      const cultos = cultosSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      cultos.sort((a, b) => a.fecha.localeCompare(b.fecha));

      if (cultos.length > 0) {
        setProximoCulto(cultos[0]);
      }
    }

    cargarDatos();
  }, []);

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
          padding: "20px",
        }}
      >
        {/* LOGO */}

        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <img
            src={logoITP}
            alt="Logo"
            style={{
              width: 120,
              display: "block",
              margin: "0 auto 20px",
            }}
          />

          <h1
            style={{
              margin: 0,
              fontSize: 38,
              color: "#102A43",
            }}
          >
            Iglesia Tabernáculo
            <br />
            Pentecostal
          </h1>

          <p
            style={{
              marginTop: 12,
              color: "#0F766E",
              fontSize: 22,
            }}
          >
            Ministerio Multimedia 2026
          </p>
        </div>

        {/* PROXIMO TURNO */}

        <div
          style={{
            display: "grid",
            gap: 15,
            marginBottom: 25,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 18,
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              📅 Próximo Turno
            </h3>

            {proximoTurno ? (
              <>
                <p>
                  <strong>Fecha:</strong> {proximoTurno.fecha}
                </p>

                <p>
                  <strong>Día:</strong> {proximoTurno.dia}
                </p>
              </>
            ) : (
              <p>No existen turnos registrados.</p>
            )}
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: 18,
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              ⛪ Próximo Culto
            </h3>

            {proximoCulto ? (
              <>
                <p>
                  <strong>Fecha:</strong> {proximoCulto.fecha}
                </p>

                <p>
                  <strong>Día:</strong> {proximoCulto.dia}
                </p>
              </>
            ) : (
              <p>No existen cultos registrados.</p>
            )}
          </div>
        </div>

        {/* TARJETAS */}

      <div className="home-grid">
          {cards.map((card) => (
            <Link
              key={card.titulo}
              to={card.ruta}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 25,
                textAlign: "center",
                textDecoration: "none",
                color: "#374151",
                boxShadow: "0 5px 18px rgba(0,0,0,.10)",
              }}
            >
              <div style={{ marginBottom: 15 }}>
                {card.icono}
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: 22,
                }}
              >
                {card.titulo}
              </h2>
            </Link>
          ))}
        </div>

        {/* ADMIN */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Link
            to="/login"
            style={{
              background: "#2563EB",
              color: "#fff",
              padding: "15px 30px",
              borderRadius: 15,
              textDecoration: "none",
              display: "flex",
              gap: 10,
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            <FaLock />
            Administración
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}