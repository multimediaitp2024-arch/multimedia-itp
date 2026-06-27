import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function PrivateRoute({ children }) {
  const [usuario, setUsuario] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return unsubscribe;
  }, []);

  if (usuario === undefined) {
    return <h2 style={{ textAlign: "center" }}>Cargando...</h2>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // SOLO TU CORREO PUEDE ENTRAR
  if (usuario.email !== "nico_0229@hotmail.com") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;