import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  FaUserCircle,
  FaWhatsapp,
  FaVideo,
  FaCamera,
  FaCalendarAlt,
} from "react-icons/fa";

const fotos = import.meta.glob("../assets/equipo/*.jpg", {
  eager: true,
  import: "default",
});

function Equipo() {
  const [equipo, setEquipo] = useState([]);
  const [turnoHoy, setTurnoHoy] = useState(null);

  useEffect(() => {
    cargarEquipo();
    cargarTurno();
  }, []);

  async function cargarEquipo() {
    const querySnapshot = await getDocs(collection(db, "Equipo"));

    const lista = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

    setEquipo(lista);
  }

  async function cargarTurno() {
    const querySnapshot = await getDocs(collection(db, "Turnos"));

    const hoy = new Date();

    const lista = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    lista.sort((a, b) => a.fecha.localeCompare(b.fecha));

    const proximo = lista.find((t) => {
      const fecha = new Date(t.fecha + "T00:00:00");
      return fecha >= hoy;
    });

    if (proximo) {
      setTurnoHoy(proximo);
    }
  }

  function formatearFecha(fechaTexto) {
    const fecha = new Date(fechaTexto + "T00:00:00");

    return fecha.toLocaleDateString("es-EC", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 110,
        maxWidth: 750,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg,#0F766E,#14B8A6)",
          color: "#fff",
          borderRadius: 20,
          padding: 20,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <h1 style={{ margin: 0 }}>
          👥 Equipo Multimedia
        </h1>

        <p style={{ marginTop: 8 }}>
          Ministerio Multimedia ITP
        </p>
      </div>

      {turnoHoy && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: 20,
            padding: 20,
            marginBottom: 25,
            boxShadow: "0 5px 18px rgba(0,0,0,.12)",
            borderLeft: "8px solid #22c55e",
          }}
        >
          <h2
            style={{
              color: "#16a34a",
              marginTop: 0,
            }}
          >
            🟢 DE TURNO HOY
          </h2>

          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontWeight: "bold",
            }}
          >
            <FaCalendarAlt />

            {formatearFecha(turnoHoy.fecha)}
          </p>

          {turnoHoy.dia === "Miércoles" ? (
            <>
              <p>
                🎛 <b>Cabina</b>
                <br />
                {turnoHoy.cabina}
              </p>

              <p>
                <FaVideo /> <b>Transmisión</b>
                <br />
                {turnoHoy.transmision}
              </p>

              <p>
                <FaCamera /> <b>Fotos</b>
                <br />
                {turnoHoy.fotos}
              </p>
            </>
          ) : (
            <>
              <p>
                🎛 <b>Cabina Culto</b>
                <br />
                {turnoHoy.cabinaCulto}
              </p>

              <p>
                🎛 <b>Cabina Devocional</b>
                <br />
                {turnoHoy.cabinaDevocional}
              </p>

              <p>
                <FaVideo /> <b>Transmisión</b>
                <br />
                {turnoHoy.transmision}
              </p>

              <p>
                <FaCamera /> <b>Fotos</b>
                <br />
                {turnoHoy.fotos}
              </p>
            </>
          )}
        </div>
      )}

      <h2
        style={{
          marginBottom: 20,
          color: "#0F766E",
        }}
      >
        👥 Todo el equipo
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 18,
        }}
      >
        {equipo.map((persona) => {
          const foto =
            fotos[
              `../assets/equipo/${persona.id}.jpg`
            ];

          const numeroWhatsapp =
            "593" +
            persona.telefono.substring(1);
                      return (
            <div
              key={persona.id}
              style={{
                background: "#fff",
                borderRadius: 20,
                padding: 18,
                textAlign: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,.10)",
                transition: "0.2s",
              }}
            >
              {foto ? (
                <img
                  src={foto}
                  alt={persona.nombre}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #14B8A6",
                    marginBottom: 12,
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
                  fontSize: 17,
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
                  gap: 6,
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
            marginTop: 40,
            color: "#777",
          }}
        >
          No existen integrantes registrados.
        </div>
      )}
      <BottomNav />
    </div>
  );
}

export default Equipo;