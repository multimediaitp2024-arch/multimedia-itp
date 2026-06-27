import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

function AdminCultos() {
  const [cultos, setCultos] = useState([]);

  const [form, setForm] = useState({
    fecha: "",
    dia: "Miércoles",
    predicador: "",
    tema: "",
    versiculos: "",
  });

  const [editando, setEditando] = useState(false);

  useEffect(() => {
    cargarCultos();
  }, []);

  async function cargarCultos() {
    const snapshot = await getDocs(collection(db, "Cultos"));

    const lista = [];

    snapshot.forEach((docu) => {
      lista.push({
        id: docu.id,
        ...docu.data(),
      });
    });

    lista.sort((a, b) => a.fecha.localeCompare(b.fecha));

    setCultos(lista);
  }

  async function guardarCulto() {
    if (!form.fecha) return alert("Seleccione una fecha.");

    await setDoc(doc(db, "Cultos", form.fecha), form);

    limpiar();

    cargarCultos();
  }

  function editar(culto) {
    setForm(culto);
    setEditando(true);
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar este culto?")) return;

    await deleteDoc(doc(db, "Cultos", id));

    cargarCultos();
  }

  function limpiar() {
    setForm({
      fecha: "",
      dia: "Miércoles",
      predicador: "",
      tema: "",
      versiculos: "",
    });

    setEditando(false);
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "20px auto",
        padding: 20,
      }}
    >
      <h1>📅 Administrar Cultos</h1>

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 15,
          marginBottom: 30,
          boxShadow: "0 4px 15px rgba(0,0,0,.1)",
        }}
      >
        <input
          type="date"
          value={form.fecha}
          onChange={(e) =>
            setForm({
              ...form,
              fecha: e.target.value,
            })
          }
          style={input}
        />

        <select
          value={form.dia}
          onChange={(e) =>
            setForm({
              ...form,
              dia: e.target.value,
            })
          }
          style={input}
        >
          <option>Miércoles</option>
          <option>Domingo</option>
        </select>

        <input
          placeholder="Predicador"
          value={form.predicador}
          onChange={(e) =>
            setForm({
              ...form,
              predicador: e.target.value,
            })
          }
          style={input}
        />

        <input
          placeholder="Tema"
          value={form.tema}
          onChange={(e) =>
            setForm({
              ...form,
              tema: e.target.value,
            })
          }
          style={input}
        />

        <input
          placeholder="Versículos"
          value={form.versiculos}
          onChange={(e) =>
            setForm({
              ...form,
              versiculos: e.target.value,
            })
          }
          style={input}
        />

        <button
          onClick={guardarCulto}
          style={botonGuardar}
        >
          {editando ? "Actualizar" : "Guardar"}
        </button>

        {editando && (
          <button
            onClick={limpiar}
            style={botonCancelar}
          >
            Cancelar
          </button>
        )}
      </div>

      {cultos.map((culto) => (
        <div
          key={culto.id}
          style={{
            background: "#fff",
            padding: 18,
            borderRadius: 15,
            marginBottom: 15,
            boxShadow: "0 3px 12px rgba(0,0,0,.08)",
          }}
        >
          <h3>
            {culto.dia} - {culto.fecha}
          </h3>

          <p>
            <b>Predicador:</b> {culto.predicador}
          </p>

          <p>
            <b>Tema:</b> {culto.tema}
          </p>

          <p>
            <b>Versículos:</b> {culto.versiculos}
          </p>

          <button
            onClick={() => editar(culto)}
            style={botonEditar}
          >
            Editar
          </button>

          <button
            onClick={() => eliminar(culto.id)}
            style={botonEliminar}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 10,
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

const botonGuardar = {
  padding: "10px 18px",
  background: "#0F766E",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
  marginRight: 10,
};

const botonCancelar = {
  padding: "10px 18px",
  background: "#888",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};

const botonEditar = {
  marginRight: 10,
  padding: "8px 15px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const botonEliminar = {
  padding: "8px 15px",
  background: "#DC2626",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

export default AdminCultos;