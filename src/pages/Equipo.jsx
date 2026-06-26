
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FaUserCircle, FaWhatsapp } from "react-icons/fa";

// Cargar automáticamente todas las fotos
const fotos = import.meta.glob("../assets/equipo/*.jpg", {
  eager: true,
  import: "default",
});

function Equipo() {
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    cargarEquipo();
  }, []);

  const cargarEquipo = async () => {
    const querySnapshot = await getDocs(collection(db, "Equipo"));

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

    setEquipo(lista);
  };

  return (
    <div
      style={{
        padding: "20px",
        paddingBottom: "110px",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      {/* Encabezado */}
      <div
        style={{
          background: "linear-gradient(135deg,#0F766E,#14B8A6)",
          color: "white",
          padding: "20px",
          borderRadius: "20px",
          textAlign: "center",
          marginBottom: "25px",
          boxShadow: "0 5px 18px rgba(0,0,0,.15)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "1.8rem",
          }}
        >
          👥 Equipo Multimedia
        </h1>

        <p
          style={{
            marginTop: "8px",
            opacity: ".95",
          }}
        >
          Ministerio Multimedia ITP
        </p>
      </div>

      {/* Tarjetas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "18px",
        }}
      >
        {equipo.map((persona) => {
          const foto =
            fotos[`../assets/equipo/${persona.id}.jpg`];

          const numeroWhatsapp =
            "593" + persona.telefono.substring(1);

          return (
            <div
              key={persona.id}
              style={{
                background: "#fff",
                borderRadius: "18px",
                padding: "18px",
                textAlign: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,.10)",
              }}
            >
              {foto ? (
                <img
                  src={foto}
                  alt={persona.nombre}
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "12px",
                    border: "3px solid #14B8A6",
                  }}
                />
              ) : (
                <FaUserCircle
                  size={90}
                  color="#0F766E"
                />
              )}

              <h3
                style={{
                  margin: "10px 0",
                  color: "#102A43",
                  fontSize: "17px",
                }}
              >
                {persona.nombre}
              </h3>

              <a
                href={`https://wa.me/${numeroWhatsapp}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#25D366",
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  justifyContent: "center",
                }}
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            </div>
          );
        })}
      </div>

      {equipo.length === 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "#777",
          }}
        >
          No existen integrantes registrados.
        </div>
      )}
    </div>
  );
}

export default Equipo;