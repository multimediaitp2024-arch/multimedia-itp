import AdminHeader from "../components/AdminHeader";
import AdminCard from "../components/AdminCard";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

import { db } from "../firebase";

import CultoForm from "../components/CultoForm";

import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function AdminCultos() {

  const [cultos, setCultos] = useState([]);

  const [editing, setEditing] = useState(null);

  async function cargarCultos() {

    const snapshot = await getDocs(
      collection(db, "Cultos")
    );

    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    lista.sort((a, b) =>
      a.fecha.localeCompare(b.fecha)
    );

    setCultos(lista);
  }

  useEffect(() => {
    cargarCultos();
  }, []);

  async function guardar(form) {

    await setDoc(
      doc(db, "Cultos", form.fecha),
      form
    );

    setEditing(null);

    cargarCultos();
  }

  async function eliminar(id) {

    if (!confirm("¿Eliminar culto?"))
      return;

    await deleteDoc(
      doc(db, "Cultos", id)
    );

    cargarCultos();
  }

  return (

    <div className="max-w-5xl mx-auto p-5">

     <AdminHeader
  titulo="Administrar Cultos"
  subtitulo="Crear, editar y eliminar cultos."
/>

      <CultoForm
        onSave={guardar}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      <div className="grid gap-4">

      {cultos.map((culto) => (

  <AdminCard
    key={culto.id}
    titulo={culto.fecha}
    subtitulo={culto.predicador}
    onEdit={() => setEditing(culto)}
    onDelete={() => eliminar(culto.id)}
  >

    <p>
      <strong>Día:</strong> {culto.dia}
    </p>

    <p>
      <strong>Tema:</strong> {culto.tema}
    </p>

    <p>
      <strong>Versículos:</strong> {culto.versiculos}
    </p>

  </AdminCard>

))}

        {cultos.length === 0 && (

          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">

            No existen cultos registrados.

          </div>

        )}

      </div>

    </div>

  );

}