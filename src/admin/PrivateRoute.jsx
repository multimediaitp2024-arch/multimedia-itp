import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();
  }, []);

  // 🔥 IMPORTANTE: mientras carga no mostrar nada
  if (user === undefined) {
    return (
      <div style={{ padding: 20 }}>
        Cargando sesión...
      </div>
    );
  }

  // 🚫 si no hay usuario
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}