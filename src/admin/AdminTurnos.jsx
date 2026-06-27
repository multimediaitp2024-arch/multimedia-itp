
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import AdminHeader from "../components/AdminHeader";
import AdminCard from "../components/AdminCard";
import TurnoForm from "../components/TurnoForm";

export default function AdminTurnos() {

  const [turnos, setTurnos] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    cargarTurnos();
  }, []);

  async function cargarTurnos() {
    const snapshot = await getDocs(collection(db, "turnos"));

    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    lista.sort((a, b) => b.fecha.localeCompare(a.fecha));

    setTurnos(lista);
  }

  async function guardar(form) {
    await setDoc(doc(db, "turnos", form.fecha), form);

    setEditing(null);
    cargarTurnos();
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar este turno?")) return;

    await deleteDoc(doc(db, "turnos", id));
    cargarTurnos();
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

      <AdminHeader
        titulo="Administrar Turnos"
        subtitulo="Gestiona los turnos del ministerio."
      />

      <TurnoForm
        onSave={guardar}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      {turnos.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No existen turnos registrados.
        </div>
      ) : (
        <div className="grid gap-4">

          {turnos.map((turno) => (
            <AdminCard
              key={turno.id}
              titulo={turno.fecha}
              subtitulo={turno.dia}
              onEdit={() => setEditing(turno)}
              onDelete={() => eliminar(turno.id)}
            >
              {turno.dia === "Miércoles" ? (
                <>
                  <p><strong>Cabina:</strong> {turno.cabina}</p>
                  <p><strong>Transmisión:</strong> {turno.transmision}</p>
                  <p><strong>Fotos:</strong> {turno.fotos}</p>
                </>
              ) : (
                <>
                  <p><strong>Cabina Culto:</strong> {turno.cabinaCulto}</p>
                  <p><strong>Cabina Devocional:</strong> {turno.cabinaDevocional}</p>
                  <p><strong>Transmisión:</strong> {turno.transmision}</p>
                  <p><strong>Fotos:</strong> {turno.fotos}</p>
                </>
              )}
            </AdminCard>
          ))}

        </div>
      )}
    </div>
  );
}