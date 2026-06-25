
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Cultos() {
  const [cultos, setCultos] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [cultoActual, setCultoActual] = useState(null);

  useEffect(() => {
    cargarCultos();
  }, []);

  const cargarCultos = async () => {
    const querySnapshot = await getDocs(collection(db, "Cultos"));

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push(doc.data());
    });

    setCultos(lista);

    const hoy = new Date().toISOString().split("T")[0];

    const proximos = lista
      .filter((c) => c.fecha >= hoy)
      .sort((a, b) => a.fecha.localeCompare(b.fecha));

    if (proximos.length > 0) {
      setCultoActual(proximos[0]);
      setFechaSeleccionada(new Date(proximos[0].fecha));
    }
  };

  const buscarCulto = (fecha) => {
    const fechaTexto = fecha.toISOString().split("T")[0];

    const encontrado = cultos.find(
      (c) => c.fecha === fechaTexto
    );

    setCultoActual(encontrado || null);
  };

  const mes = fechaSeleccionada
    .toLocaleDateString("es-ES", { month: "short" })
    .toUpperCase();

  return (
    <div style={{ padding: "20px", paddingBottom: "100px" }}>
      <div
        style={{
          background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
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
            color: "#2563EB",
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
          Calendario de Cultos
        </h2>

        <p
          style={{
            margin: 0,
            fontSize: "0.9rem",
          }}
        >
          Ministerio de Multimedia ITP
        </p>
      </div>

      <Calendar
        onChange={(value) => {
          setFechaSeleccionada(value);
          buscarCulto(value);
        }}
        value={fechaSeleccionada}
        tileClassName={({ date }) => {
          const fechaTexto = date
            .toISOString()
            .split("T")[0];

          const culto = cultos.find(
            (c) => c.fecha === fechaTexto
          );

          if (!culto) return null;

          switch (culto.dia) {
            case "Miercoles":
              return "dia-miercoles";

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
          gap: "20px",
          marginTop: "15px",
          flexWrap: "wrap",
        }}
      >
        <span>🔵 Miércoles</span>
        <span>🔴 Domingo</span>
      </div>

      <div
        style={{
          marginTop: "20px",

          background:
            cultoActual?.dia === "Miercoles"
              ? "#DBEAFE"
              : cultoActual?.dia === "Domingo"
              ? "#FEE2E2"
              : "#FFFFFF",

          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,.15)",
        }}
      >
        <h2>
          {cultoActual
            ? `📖 ${cultoActual.dia} ${cultoActual.fecha}`
            : "📖 Culto seleccionado"}
        </h2>

        {!cultoActual && (
          <p>No existe culto para esta fecha.</p>
        )}

        {cultoActual && (
          <>
            <p>
              <strong>🎤 Predicador:</strong>{" "}
              {cultoActual.predicador}
            </p>

            <p>
              <strong>📚 Tema:</strong>{" "}
              {cultoActual.tema || "Pendiente"}
            </p>

            <hr />

            <h3>📖 Versículos</h3>

            {cultoActual.versiculo1 && (
              <p>📖 {cultoActual.versiculo1}</p>
            )}

            {cultoActual.versiculo2 && (
              <p>📖 {cultoActual.versiculo2}</p>
            )}

            {cultoActual.versiculo3 && (
              <p>📖 {cultoActual.versiculo3}</p>
            )}

            {cultoActual.versiculo4 && (
              <p>📖 {cultoActual.versiculo4}</p>
            )}

            {cultoActual.versiculo5 && (
              <p>📖 {cultoActual.versiculo5}</p>
            )}

            {cultoActual.versiculo6 && (
              <p>📖 {cultoActual.versiculo6}</p>
            )}

            {cultoActual.versiculo7 && (
              <p>📖 {cultoActual.versiculo7}</p>
            )}

            {cultoActual.versiculo8 && (
              <p>📖 {cultoActual.versiculo8}</p>
            )}

            {cultoActual.versiculo9 && (
              <p>📖 {cultoActual.versiculo9}</p>
            )}

            {cultoActual.versiculo10 && (
              <p>📖 {cultoActual.versiculo10}</p>
            )}

            {cultoActual.notas && (
              <>
                <hr />

                <h3>📝 Notas Multimedia</h3>

                <div
                  style={{
                    whiteSpace: "pre-line",
                    lineHeight: "1.8",
                  }}
                >
                  {cultoActual.notas}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Cultos;