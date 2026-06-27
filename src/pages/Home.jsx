import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import {
  FaCalendarAlt,
  FaUsers,
  FaVideo,
  FaBroom,
  FaChurch,
  FaLock,
} from "react-icons/fa";

export default function Home() {
  const cards = [
    {
      titulo: "Turnos",
      icono: <FaCalendarAlt size={38} />,
      color: "#1e3a8a",
      ruta: "/turnos",
    },
    {
      titulo: "Cultos",
      icono: <FaChurch size={38} />,
      color: "#92400e",
      ruta: "/cultos",
    },
    {
      titulo: "Equipo",
      icono: <FaUsers size={38} />,
      color: "#0f766e",
      ruta: "/equipo",
    },
    {
      titulo: "Limpieza",
      icono: <FaBroom size={38} />,
      color: "#15803d",
      ruta: "/limpieza",
    },
    {
      titulo: "En Vivo",
      icono: <FaVideo size={38} />,
      color: "#7e22ce",
      ruta: "/envivo",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto p-6">

        {/* ENCABEZADO */}

        <div className="text-center mb-10">

          <img
            src="/logo.png"
            alt="Logo"
            className="w-28 mx-auto mb-5"
          />

          <h1 className="text-5xl font-bold text-slate-900">
            Iglesia Tabernáculo
            <br />
            Pentecostal
          </h1>

          <p className="text-2xl text-teal-700 mt-3">
            Ministerio de Multimedia 2026
          </p>

        </div>

        {/* TARJETAS */}

        <div className="grid md:grid-cols-2 gap-6">

          {cards.map((card) => (

            <Link
              key={card.titulo}
              to={card.ruta}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition p-10 text-center"
            >

              <div
                className="mb-4 flex justify-center"
                style={{ color: card.color }}
              >
                {card.icono}
              </div>

              <h2 className="text-2xl font-bold text-gray-700">
                {card.titulo}
              </h2>

            </Link>

          ))}

        </div>

        {/* BOTÓN ADMIN */}

        <div className="mt-10 mb-24 flex justify-center">

          <Link
            to="/login"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <FaLock />
            Iniciar sesión (Admin)
          </Link>

        </div>

      </div>
       <BottomNav />

    </div>
  );
}