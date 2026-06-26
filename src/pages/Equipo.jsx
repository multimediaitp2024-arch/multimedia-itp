
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FaUserCircle, FaWhatsapp } from "react-icons/fa";

function Equipo() {
  const [equipo, setEquipo] =useState([]);

  useEffect(() => {
    cargarEquipo();
  }, []);

  const cargarEquipo = async () => {
    const querySnapshot = await getDocs(collection(db, "Equipo"));

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push(doc.data());
    });

    lista.sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );

    setEquipo(lista);
  };

  return (
    <div
      style={{
        padding: "20px",
        paddingBottom: "90px",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg,#0F766E,#14B8A6)",
          color: "white",
          padding: "20px",
          borderRadius: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>
          👥 Equipo Multimedia
        </h1>

        <p style={{ marginTop: "8px" }}>
          Ministerio Multimedia ITP
        </p>
      </div>

      {equipo.map((persona, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#fff",
            padding: "15px",
            borderRadius: "15px",
            marginBottom: "12px",
            boxShadow: "0 3px 12px rgba(0,0,0,.12)",
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
              size={45}
              color="#0F766E"
            />

            <div>
              <h3
                style={{
                  margin: 0,
                  color: "#102A43",
                }}
              >
                {persona.nombre}
              </h3>
<a
  href={`https://wa.me/${persona.telefono}`}
  target="_blank"
  rel="noreferrer"
  style={{
    color: "#25D366",
    textDecoration: "none",
    fontWeight: "bold",
  }}
>
  <FaWhatsapp /> {persona.telefono}
</a>
            </div>
          </div>
        </div>
      ))}

      {equipo.length === 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "#666",
          }}
        >
          No existen integrantes registrados.
        </div>
      )}
    </div>
  );
}

export default Equipo;