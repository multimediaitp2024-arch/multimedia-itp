import { BrowserRouter, Routes, Route } from "react-router-dom";

import Inicio from "./pages/Inicio";
import Turnos from "./pages/Turnos";
import Cultos from "./pages/Cultos";
import Limpieza from "./pages/Limpieza";
import EnVivo from "./pages/EnVivo";

import BottomNav from "./components/BottomNav";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/turnos" element={<Turnos />} />
        <Route path="/cultos" element={<Cultos />} />
        <Route path="/limpieza" element={<Limpieza />} />
        <Route path="/envivo" element={<EnVivo />} />
      </Routes>

      <BottomNav />
    </BrowserRouter>
  );
}

export default App;