import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  FaYoutube,
  FaBroadcastTower,
} from "react-icons/fa";

function EnVivo() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    const docRef = doc(
      db,
      "Configuracion",
      "streaming"
    );

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setConfig(docSnap.data());
    }
  };

  if (!config) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div
      style={{
        padding: "20px",
        paddingBottom: "100px",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg,#DC2626,#B91C1C)",
          color: "white",
          padding: "20px",
          borderRadius: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <FaYoutube size={60} />

        <h1>Transmisión en Vivo</h1>

        <p>Accesos rápidos Multimedia ITP</p>
      </div>

      <a
        href={config.youtubeCanal}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "block",
          textDecoration: "none",
          background: "#FF0000",
          color: "white",
          padding: "18px",
          borderRadius: "15px",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        <FaYoutube /> Abrir Canal de YouTube
      </a>

      <a
        href={config.youtubeStudio}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "block",
          textDecoration: "none",
          background: "#102A43",
          color: "white",
          padding: "18px",
          borderRadius: "15px",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        <a
  href={config.grupoWhatsapp}
  target="_blank"
  rel="noreferrer"
  style={{
    display: "block",
    textDecoration: "none",
    background: "#25D366",
    color: "white",
    padding: "18px",
    borderRadius: "15px",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "20px",
  }}
>
  <FaWhatsapp /> Grupo Multimedia
</a>
        <FaBroadcastTower /> Abrir YouTube Studio
      </a>

      <div
        style={{
          background: "#FFF7ED",
          padding: "20px",
          borderRadius: "15px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,.15)",
        }}
      >
        <h2>📋 Checklist de Transmisión</h2>

        <p>✅ Abrir YouTube Studio</p>

        <p>✅ Verificar título de la prédica</p>

        <p>✅ Revisar miniatura</p>

        <p>✅ Verificar audio</p>

        <p>✅ Iniciar transmisión</p>
      </div>
    </div>
  );
}

export default EnVivo;