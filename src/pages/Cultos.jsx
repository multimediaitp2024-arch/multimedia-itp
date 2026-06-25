import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Cultos() {
  const [culto, setCulto] = useState(null);

  useEffect(() => {
    cargarCulto();
  }, []);

  const cargarCulto = async () => {
    const querySnapshot = await getDocs(collection(db, "Cultos"));

    querySnapshot.forEach((doc) => {
      setCulto(doc.data());
    });
  };

  if (!culto) {
    return <h2>Cargando culto...</h2>;
  }

  return (
    <div style={{ padding: "20px", paddingBottom: "90px" }}>
      <div
        style={{
          background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
          color: "white",
          padding: "25px",
          borderRadius: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h1>📖 Próximo Culto</h1>
        <p>Información para Multimedia</p>
      </div>

      <div
        style={{
          background: "#EFF6FF",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 2px 10px rgba(0,0,0,.15)",
        }}
      >
        <p>
          <strong>📅 Fecha:</strong> {culto.Fecha}
        </p>

        <p>
          <strong>🎤 Predicador:</strong> {culto.Predicador}
        </p>

        <p>
          <strong>📚 Tema:</strong> {culto.Tema}
        </p>
      </div>
<div
  style={{
    whiteSpace: "pre-line",
    lineHeight: "1.8",
  }}
>
  {culto.Versiculos}
</div>
    </div>
  );
  {culto.Notas && (
  <div
    style={{
      background: "#FFF7ED",
      padding: "20px",
      borderRadius: "15px",
      marginTop: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,.15)",
    }}
  >
    <h2>📝 Notas Multimedia</h2>

    <div
      style={{
        whiteSpace: "pre-line",
        lineHeight: "1.8",
      }}
    >
      {culto.Notas}
    </div>
  </div>
)}
}

export default Cultos;