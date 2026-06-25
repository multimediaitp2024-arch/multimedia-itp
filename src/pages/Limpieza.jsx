
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Limpieza() {
  const [limpiezaActual, setLimpiezaActual] = useState(null);

  useEffect(() => {
    cargarLimpieza();
  }, []);

  const cargarLimpieza = async () => {
    const querySnapshot = await getDocs(
      collection(db, "Limpieza")
    );

    const lista = [];

    querySnapshot.forEach((doc) => {
      lista.push(doc.data());
    });

    const hoy = new Date()
      .toISOString()
      .split("T")[0];

    const actual = lista.find(
      (l) =>
        hoy >= l.fechaInicio &&
        hoy <= l.fechaFin
    );

    setLimpiezaActual(actual || null);
  };

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
            "linear-gradient(135deg,#F59E0B,#D97706)",
          color: "white",
          padding: "20px",
          borderRadius: "20px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h1>🧹 Limpieza</h1>
        <p>
          Ministerio Multimedia ITP
        </p>
      </div>

      {!limpiezaActual && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,.15)",
          }}
        >
          No existe responsable asignado.
        </div>
      )}

      {limpiezaActual && (
        <div
          style={{
            background: "#FFF7ED",
            border: "2px solid #F59E0B",
            padding: "20px",
            borderRadius: "15px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,.15)",
          }}
        >
          <h2>
            🧹 Responsable Actual
          </h2>

          <p>
            <strong>Desde:</strong>{" "}
            {limpiezaActual.fechaInicio}
          </p>

          <p>
            <strong>Hasta:</strong>{" "}
            {limpiezaActual.fechaFin}
          </p>

          <p>
            <strong>Responsable:</strong>{" "}
            {limpiezaActual.responsable}
          </p>
        </div>
      )}
    </div>
  );
}

export default Limpieza;