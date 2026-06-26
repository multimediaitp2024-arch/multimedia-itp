
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FaUserCircle, FaWhatsapp } from "react-icons/fa";

function Equipo() {
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    cargarEquipo();
  }, []);

  const cargarEquipo = async () => {
    const querySnapshot = await getDocs(collection(db, "Equipo"));

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push(doc.data());
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
          padding: "18px",
          borderRadius: "20px",
          textAlign: "center",
          marginBottom: "20px",
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

      {equipo.map((persona, index) => {
        // Convierte 0991234567 -> 593991234567
        const numeroWhatsapp =
          "593" + persona.telefono.substring(1);

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fff",
              padding: "16px",
              borderRadius: "18px",
              marginBottom: "15px",
              boxShadow: "0 4px 15px rgba(0,0,0,.10)",
              transition: ".2s",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <FaUserCircle
                size={52}
                color="#0F766E"
              />

              <div>
                <h3
                  style={{
                    margin: "0 0 6px 0",
                    color: "#102A43",
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
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "15px",
                  }}
                >
                  <FaWhatsapp size={18} />
                  {persona.telefono}
                </a>
              </div>
            </div>
          </div>
        );
      })}

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