import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Páginas Públicas
import Inicio from "./pages/Inicio";
import Cultos from "./pages/Cultos";
import Turnos from "./pages/Turnos";
import Equipo from "./pages/Equipo";
import Limpieza from "./pages/Limpieza";
import EnVivo from "./pages/EnVivo";
import Splash from "./pages/Splash";

// Administración
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import PrivateRoute from "./admin/PrivateRoute";
import AdminCultos from "./admin/AdminCultos";
import AdminTurnos from "./admin/AdminTurnos";
import AdminEquipo from "./admin/AdminEquipo";
import AdminLimpieza from "./admin/AdminLimpieza";
import AdminStreaming from "./admin/AdminStreaming";

// Componentes
import BottomNav from "./components/BottomNav";

function PublicLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}

function AdminLayout() {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ========================= */}
        {/* RUTAS PÚBLICAS */}
        {/* ========================= */}

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/cultos" element={<Cultos />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/limpieza" element={<Limpieza />} />
          <Route path="/envivo" element={<EnVivo />} />
        </Route>

        {/* Splash */}

        <Route path="/splash" element={<Splash />} />

        {/* Login */}

        <Route path="/login" element={<Login />} />

        {/* ========================= */}
        {/* ADMINISTRACIÓN */}
        {/* ========================= */}

        

         <Route path="/login" element={<Login />} />

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

    </BrowserRouter>
  );
}

export default App;