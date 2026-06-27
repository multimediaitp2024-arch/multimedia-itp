import BottomNav from "../components/BottomNav";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Turnos() {
  const [turnos, setTurnos] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [turnoActual, setTurnoActual] = useState(null);

  useEffect(() => {
    cargarTurnos();
  }, []);

  const cargarTurnos = async () => {
    const querySnapshot = await getDocs(collection(db, "Turnos"));

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push(doc.data());
    });

    setTurnos(lista);

    const hoy = new Date().toISOString().split("T")[0];

    const proximos = lista
      .filter((t) => t.fecha >= hoy)
      .sort((a, b) => a.fecha.localeCompare(b.fecha));

    if (proximos.length > 0) {
      setTurnoActual(proximos[0]);
      setFechaSeleccionada(new Date(proximos[0].fecha));
    }
  };

  const buscarTurno = (fecha) => {
    const fechaTexto = fecha.toISOString().split("T")[0];

    const encontrado = turnos.find(
      (t) => t.fecha === fechaTexto
    );

    setTurnoActual(encontrado || null);
  };

  const mes = fechaSeleccionada
    .toLocaleDateString("es-ES", { month: "short" })
    .toUpperCase();

  return (
    <div style={{ padding: "20px", paddingBottom: "100px" }}>
      <div
        style={{
          background: "linear-gradient(135deg,#F97316,#EA580C)",
          color: "white",
          padding: "12px",
          borderRadius: "20px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "60px",
            margin: "0 auto",
            background: "white",
            color: "#F97316",
            borderRadius: "15px",
            padding: "6px",
            boxShadow: "0 2px 10px rgba(0,0,0,.2)",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {fechaSeleccionada.getDate()}
          </div>

          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            {mes}
          </div>
        </div>

        <h2
          style={{
            marginTop: "8px",
            marginBottom: "4px",
            fontSize: "1.2rem",
          }}
        >
          Calendario Multimedia
        </h2>

        <p
          style={{
            margin: "0",
            fontSize: "0.9rem",
          }}
        >
          Ministerio de Multimedia ITP
        </p>
      </div>

      <Calendar
        onChange={(value) => {
          setFechaSeleccionada(value);
          buscarTurno(value);
        }}
        value={fechaSeleccionada}
        tileClassName={({ date }) => {
          const fechaTexto = date
            .toISOString()
            .split("T")[0];

          const turno = turnos.find(
            (t) => t.fecha === fechaTexto
          );

          if (!turno) return null;

          switch (turno.dia) {
            case "Miercoles":
              return "dia-miercoles";

            case "Jueves":
              return "dia-jueves";

            case "Sabado":
              return "dia-sabado";

            case "Domingo":
              return "dia-domingo";

            default:
              return null;
          }
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginTop: "15px",
          flexWrap: "wrap",
        }}
      >
        <span>🔵 Miércoles</span>
        <span>🟢 Jueves</span>
        <span>🟠 Sábado</span>
        <span>🔴 Domingo</span>
      </div>

      <div
        style={{
          marginTop: "20px",

          background:
            turnoActual?.dia === "Miercoles"
              ? "#DBEAFE"
              : turnoActual?.dia === "Jueves"
              ? "#DCFCE7"
              : turnoActual?.dia === "Sabado"
              ? "#FFEDD5"
              : turnoActual?.dia === "Domingo"
              ? "#FEE2E2"
              : "#FFFFFF",

          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,.15)",
        }}
      >
        <h2>
          {turnoActual
            ? `📌 ${turnoActual.dia} ${turnoActual.fecha}`
            : "📌 Turno seleccionado"}
        </h2>

        {!turnoActual && (
          <p>No existe turno para esta fecha.</p>
        )}

        {turnoActual && (
          <>
            {turnoActual.cabina && (
              <p>🎛 Cabina: {turnoActual.cabina}</p>
            )}

            {turnoActual.cabinaCulto && (
              <p>
                🎛 Cabina Culto: {turnoActual.cabinaCulto}
              </p>
            )}

            {turnoActual.cabinaDevocional && (
              <p>
                🎚 Cabina Devocional: {turnoActual.cabinaDevocional}
              </p>
            )}

            {turnoActual.transmision && (
              <p>
                📡 Transmisión: {turnoActual.transmision}
              </p>
            )}

            {turnoActual.fotos && (
              <p>
                📸 Fotos: {turnoActual.fotos}
              </p>
            )}
          </>
        )}
      </div>
       <BottomNav />
    </div>
  );
}

export default Turnos;