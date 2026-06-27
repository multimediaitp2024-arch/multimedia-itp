
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Turnos from "./pages/Turnos";
import Equipo from "./pages/Equipo";
import Cultos from "./pages/Cultos";
import Limpieza from "./pages/Limpieza";
import EnVivo from "./pages/EnVivo";
import Splash from "./pages/Splash";
import AdminCultos from "./admin/AdminCultos";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import PrivateRoute from "./admin/PrivateRoute";

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
  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/cultos" element={<Cultos />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/limpieza" element={<Limpieza />} />
          <Route path="/envivo" element={<EnVivo />} />
        </Route>

        {/* Splash */}
        <Route path="/splash" element={<Splash />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Panel de Administración Único */}
       <Route element={<AdminLayout />}>

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

</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;