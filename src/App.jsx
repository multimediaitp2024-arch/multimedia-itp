import { BrowserRouter, Routes, Route } from "react-router-dom";

import Gate from "./pages/Gate";
import Home from "./pages/Home";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import PrivateRoute from "./admin/PrivateRoute";

import Cultos from "./pages/Cultos";
import Turnos from "./pages/Turnos";
import Equipo from "./pages/Equipo";
import Limpieza from "./pages/Limpieza";
import EnVivo from "./pages/EnVivo";

import AdminCultos from "./admin/AdminCultos";
import AdminTurnos from "./admin/AdminTurnos";
import AdminEquipo from "./admin/AdminEquipo";
import AdminLimpieza from "./admin/AdminLimpieza";
import AdminStreaming from "./admin/AdminStreaming";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 PANTALLA INICIAL */}
        <Route path="/" element={<Home />} />

        {/* 👀 PUBLICO */}
        
        <Route path="/cultos" element={<Cultos />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/equipo" element={<Equipo />} />
        <Route path="/limpieza" element={<Limpieza />} />
        <Route path="/envivo" element={<EnVivo />} />

        {/* 🔐 LOGIN ADMIN */}
        <Route path="/login" element={<Login />} />

        {/* 🛡 ADMIN PROTEGIDO */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/cultos"
          element={
            <PrivateRoute>
              <AdminCultos />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/turnos"
          element={
            <PrivateRoute>
              <AdminTurnos />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/equipo"
          element={
            <PrivateRoute>
              <AdminEquipo />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/limpieza"
          element={
            <PrivateRoute>
              <AdminLimpieza />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/streaming"
          element={
            <PrivateRoute>
              <AdminStreaming />
            </PrivateRoute>
          }
        />

      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;