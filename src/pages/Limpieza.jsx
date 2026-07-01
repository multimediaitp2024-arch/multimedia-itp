import BottomNav from "../components/BottomNav";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Limpieza() {
 const [limpiezaActual, setLimpiezaActual] = useState(null);
const [proximaLimpieza, setProximaLimpieza] = useState(null);

  useEffect(() => {
    cargarLimpieza();
  }, []);

  const cargarLimpieza = async () => {
  const querySnapshot = await getDocs(
    collection(db, "Limpieza")
  );

  const lista = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  lista.sort((a, b) =>
    a.fechaInicio.localeCompare(b.fechaInicio)
  );

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  let actual = null;
  let siguiente = null;

  for (let i = 0; i < lista.length; i++) {
    const inicio = new Date(lista[i].fechaInicio + "T00:00:00");
    const fin = new Date(lista[i].fechaFin + "T00:00:00");

    inicio.setHours(0, 0, 0, 0);
    fin.setHours(0, 0, 0, 0);

    if (hoy >= inicio && hoy <= fin) {
      actual = lista[i];
      siguiente = lista[i + 1] || null;
      break;
    }

    if (!actual && inicio > hoy) {
      siguiente = lista[i];
      break;
    }
  }

  setLimpiezaActual(actual);
  setProximaLimpieza(siguiente);
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
      {proximaLimpieza && (
  <div
    style={{
      background: "#ffffff",
      border: "2px solid #14B8A6",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 2px 10px rgba(0,0,0,.15)",
      marginTop: "20px",
    }}
  >
    <h2 style={{ color: "#0F766E" }}>
      ⏭️ Próxima Semana
    </h2>

    <p>
      <strong>Desde:</strong> {proximaLimpieza.fechaInicio}
    </p>

    <p>
      <strong>Hasta:</strong> {proximaLimpieza.fechaFin}
    </p>

    <p>
      <strong>Responsable:</strong> {proximaLimpieza.responsable}
    </p>
  </div>
)}
      
 <BottomNav />
    </div>
  );
}

export default Limpieza;