import { useNavigate } from "react-router-dom";
export default function AdminButton({
  children,
  onClick,
  type = "button",
  color = "primary",
  full = false,
}) {
  const styles = {
    primary: {
      background: "#0F766E",
      color: "#fff",
    },
    danger: {
      background: "#DC2626",
      color: "#fff",
    },
    secondary: {
      background: "#6B7280",
      color: "#fff",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...styles[color],
        border: "none",
        padding: "10px 16px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bold",
        width: full ? "100%" : "auto",
        transition: ".2s",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.opacity = 0.85)
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.opacity = 1)
      }
    >
      {children}
    </button>
  );
}