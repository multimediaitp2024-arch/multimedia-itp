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
      collection(db, "cultos")
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
      doc(db, "cultos", form.fecha),
      form
    );

    setEditing(null);

    cargarCultos();
  }

  async function eliminar(id) {

    if (!confirm("¿Eliminar culto?"))
      return;

    await deleteDoc(
      doc(db, "cultos", id)
    );

    cargarCultos();
  }

  return (

    <div className="max-w-5xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">

        Administrar Cultos

      </h1>

      <CultoForm
        onSave={guardar}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      <div className="grid gap-4">

        {cultos.map((culto) => (

          <div
            key={culto.id}
            className="bg-white shadow rounded-xl p-5 flex justify-between items-start"
          >

            <div>

              <h2 className="font-bold text-lg">

                {culto.fecha}

              </h2>

              <p>
                <b>Día:</b> {culto.dia}
              </p>

              <p>
                <b>Predicador:</b>{" "}
                {culto.predicador}
              </p>

              <p>
                <b>Tema:</b>{" "}
                {culto.tema}
              </p>

              <p>
                <b>Versículos:</b>{" "}
                {culto.versiculos}
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setEditing(culto)
                }
                className="text-blue-600 text-xl"
              >
                <FaEdit />
              </button>

              <button
                onClick={() =>
                  eliminar(culto.id)
                }
                className="text-red-600 text-xl"
              >
                <FaTrash />
              </button>

            </div>

          </div>

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