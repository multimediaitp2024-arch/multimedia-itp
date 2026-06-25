
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import logo from "../assets/logo-itp.png";
import { FaCalendarAlt, FaBible, FaUsers, FaVideo } from "react-icons/fa";

function Inicio() {
  const [culto, setCulto] = useState(null);
  const [turno, setTurno] = useState(null);

  useEffect(() => {
    cargarCulto();
    cargarTurno();
  }, []);

  const cargarCulto = async () => {
    const querySnapshot = await getDocs(collection(db, "Cultos"));

    querySnapshot.forEach((doc) => {
      setCulto(doc.data());
    });
  };

  const cargarTurno = async () => {
    const querySnapshot = await getDocs(collection(db, "Turnos"));

    querySnapshot.forEach((doc) => {
      setTurno(doc.data());
    });
  };

  return (
    <div
  style={{
    maxWidth: "1200px",
    margin: "20px auto",
    background: "#fff",
    borderRadius: "25px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
  }}
>
    <img
  src={logo}
  alt="ITP"
  width="120"
/>

 <h1
  style={{
    color: "#102A43",
    fontSize: "clamp(1.6rem, 4vw, 3rem)",
    lineHeight: "1.2",
    marginBottom: "10px",
  }}
>
  Iglesia Tabernáculo
  <br />
  Pentecostal
</h1>

<h2
  style={{
    color: "#0F766E"
  }}
>
  Ministerio de Multimedia 2026
</h2>

      <div
 style={{
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  marginTop: "20px",
}}
>
  <div className="card">
  <FaCalendarAlt size={40} color="#081c77" />
  <h3>Turnos</h3>
</div>

<div className="card">
  <FaBible size={40} color="#924a20" />
  <h3>Cultos</h3>
</div>

<div className="card">
  <FaUsers size={40} color="#0F766E" />
  <h3>Equipo</h3>
</div>

<div className="card">
  <FaVideo size={40} color="#700874" />
  <h3>En Vivo</h3>
</div>
</div>

      {culto && (
        <div
          style={{
            background: "linear-gradient(135deg,#0F766E,#14B8A6)",
            color: "white",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "20px",
          }}
        >
          <h3>Próximo Culto</h3>

          <p><strong>Fecha:</strong> {culto.Fecha}</p>
          <p><strong>Tema:</strong> {culto.Tema}</p>
          <p><strong>Predicador:</strong> {culto.Predicador}</p>
        </div>
      )}

      {turno && (
        <div
          style={{
            
            background: "#FFF8F0",
            border: "2px solid #F97316",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "20px",
          }}
        >
          <h3>Turnos</h3>

          <p><strong>Fecha:</strong> {turno.Fecha}</p>
          <p><strong>Cabina Culto:</strong> {turno["Cabina Culto"]}</p>
          <p><strong>Cabina Devocional:</strong> {turno["Cabina Devocional"]}</p>
          <p><strong>Fotos:</strong> {turno.Fotos}</p>
          <p><strong>Transmisión:</strong> {turno.Transmision}</p>
          <p><strong>Limpieza:</strong> {turno.Limpieza}</p>
        </div>
      )}
    </div>
  );
}

export default Inicio;