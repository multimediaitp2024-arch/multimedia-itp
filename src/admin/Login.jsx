
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const credencial = await signInWithEmailAndPassword(
        auth,
        correo,
        password
      );

      // Solo tú podrás ingresar
      if (credencial.user.email !== "nico_0229@hotmail.com") {
        await auth.signOut();
        setError("No tienes permisos para acceder.");
        return;
      }

      navigate("/admin");
    } catch (err) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
        padding: 20,
      }}
    >
      <form
        onSubmit={iniciarSesion}
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          padding: 30,
          borderRadius: 20,
          boxShadow: "0 5px 20px rgba(0,0,0,.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#0F766E",
            marginBottom: 30,
          }}
        >
          ⚙️ Administración
        </h2>

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
            borderRadius: 10,
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 20,
            borderRadius: 10,
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: 15,
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "#0F766E",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;