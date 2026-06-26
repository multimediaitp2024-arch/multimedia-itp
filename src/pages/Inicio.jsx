
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import logo from "../assets/logo-itp.png";
import {
  FaCalendarAlt,
  FaBible,
  FaVideo,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Inicio() {
  const [culto, setCulto] = useState(null);
  const [turno, setTurno] = useState(null);

  useEffect(() => {
    cargarCulto();
    cargarTurno();
  }, []);

  const cargarCulto = async () => {
    const querySnapshot = await getDocs(collection(db, "Cultos"));

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push(doc.data());
    });

    const hoy = new Date().toISOString().split("T")[0];

    const proximos = lista
      .filter((c) => c.fecha >= hoy)
      .sort((a, b) => a.fecha.localeCompare(b.fecha));

    if (proximos.length > 0) {
      setCulto(proximos[0]);
    }
  };

  const cargarTurno = async () => {
    const querySnapshot = await getDocs(collection(db, "Turnos"));

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push(doc.data());
    });

    const hoy = new Date().toISOString().split("T")[0];

    const proximos = lista
      .filter((t) => t.fecha >= hoy)
      .sort((a, b) => a.fecha.localeCompare(b.fecha));

    if (proximos.length > 0) {
      setTurno(proximos[0]);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        padding: "15px",
        background: "#fff",
        borderRadius: window.innerWidth > 768 ? "25px" : "0px",
        maxWidth: window.innerWidth > 768 ? "1200px" : "100%",
        margin:
          window.innerWidth > 768
            ? "20px auto"
            : "0",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img src={logo} alt="ITP" width="120" />

        <h1
          style={{
            color: "#102A43",
            fontSize: "clamp(1.6rem,4vw,3rem)",
            lineHeight: "1.2",
            marginBottom: "10px",
          }}
        >
          Iglesia Tabernáculo
          <br />
          Pentecostal
        </h1>

        <h2 style={{ color: "#0F766E" }}>
          Ministerio de Multimedia 2026
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <Link
          to="/turnos"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,.12)",
            }}
          >
            <FaCalendarAlt size={40} color="#081c77" />
            <h3>Turnos</h3>
          </div>
        </Link>

        <Link
          to="/cultos"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,.12)",
            }}
          >
            <FaBible size={40} color="#924a20" />
            <h3>Cultos</h3>
          </div>
        </Link>

        <Link
          to="/equipo"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,.12)",
            }}
          >
            <FaUsers size={40} color="#0F766E" />
            <h3>Equipo</h3>
          </div>
        </Link>

        <Link
          to="/envivo"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,.12)",
            }}
          >
            <FaVideo size={40} color="#700874" />
            <h3>En Vivo</h3>
          </div>
        </Link>
      </div>

      {culto && (
        <div
          style={{
            background: "linear-gradient(135deg,#0F766E,#14B8A6)",
            color: "white",
            padding: "12px",
            borderRadius: "15px",
            marginTop: "25px",
            boxShadow: "0 4px 15px rgba(0,0,0,.15)",
          }}
        >
         <h3
  style={{
    margin: "0 0 10px 0",
    fontSize: "1.15rem",
  }}
>
  📖 Próximo Culto
</h3>

          <p><strong>Fecha:</strong> {culto.fecha}</p>

          <p><strong>Día:</strong> {culto.dia}</p>

          <p><strong>Tema:</strong> {culto.tema || "Por confirmar"}</p>

          <p>
            <strong>Predicador:</strong>{" "}
            {culto.predicador || "Por confirmar"}
          </p>
        </div>
      )}

      {turno && (
        <div
          style={{
            background: "#FFF8F0",
            border: "2px solid #F97316",
            padding: "18px",
            borderRadius: "15px",
            marginTop: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,.10)",
          }}
        >
          <h3
  style={{
    margin: "0 0 10px 0",
    fontSize: "1.15rem",
  }}
>
  🎛 Próximo Turno
</h3>

          <p><strong>Fecha:</strong> {turno.fecha}</p>

          <p><strong>Día:</strong> {turno.dia}</p>

          {turno.cabina && (
            <p><strong>Cabina:</strong> {turno.cabina}</p>
          )}

          {turno.cabinaCulto && (
            <p>
              <strong>Cabina Culto:</strong>{" "}
              {turno.cabinaCulto}
            </p>
          )}

          {turno.cabinaDevocional && (
            <p>
              <strong>Cabina Devocional:</strong>{" "}
              {turno.cabinaDevocional}
            </p>
          )}

          {turno.transmision && (
            <p>
              <strong>Transmisión:</strong>{" "}
              {turno.transmision}
            </p>
          )}

          {turno.fotos && (
            <p>
              <strong>Fotos:</strong> {turno.fotos}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Inicio;