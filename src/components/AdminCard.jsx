
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AdminCard({
  titulo,
  subtitulo,
  children,
  onEdit,
  onDelete,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "20px",
        marginBottom: "18px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        borderLeft: "6px solid #0F766E",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: 0,
              color: "#0F766E",
              fontSize: "20px",
            }}
          >
            {titulo}
          </h3>

          {subtitulo && (
            <p
              style={{
                marginTop: 6,
                color: "#666",
              }}
            >
              {subtitulo}
            </p>
          )}

          <div style={{ marginTop: 15 }}>
            {children}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginLeft: "20px",
          }}
        >
          <button
            onClick={onEdit}
            style={{
              background: "#2563EB",
              border: "none",
              color: "#fff",
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <FaEdit />
          </button>

          <button
            onClick={onDelete}
            style={{
              background: "#DC2626",
              border: "none",
              color: "#fff",
              width: "42px",
              height: "42px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}