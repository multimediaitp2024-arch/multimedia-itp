import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({
  titulo,
  subtitulo = "",
}) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#0F766E,#14B8A6)",
        color: "#fff",
        padding: "22px",
        borderRadius: "18px",
        marginBottom: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "18px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigate("/admin")}
          style={{
            background: "rgba(255,255,255,.15)",
            border: "none",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
            transition: ".2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,.25)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,.15)")
          }
        >
          <FaArrowLeft />
          Volver al Panel
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "#fff",
            border: "none",
            color: "#0F766E",
            padding: "10px 16px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
            transition: ".2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <FaHome />
          Dashboard
        </button>
      </div>

      <h1
        style={{
          margin: 0,
          fontSize: "30px",
          fontWeight: "700",
        }}
      >
        {titulo}
      </h1>

      {subtitulo && (
        <p
          style={{
            marginTop: "8px",
            opacity: ".9",
            fontSize: "15px",
          }}
        >
          {subtitulo}
        </p>
      )}
    </div>
  );
}