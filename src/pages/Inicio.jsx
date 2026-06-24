
import logo from "../assets/logo-itp.png";

function Inicio() {
  return (
    <div style={{padding:"20px", textAlign:"center"}}>
      <img
        src={logo}
        alt="ITP"
        width="180"
      />

      <h1>Iglesia Tabernáculo Pentecostal</h1>

      <h2>Ministerio de Multimedia</h2>

      <div
        style={{
          marginTop:"20px",
          padding:"15px",
          borderRadius:"15px",
          background:"#E8F4F4"
        }}
      >
        <h3>Próximo Servicio</h3>
        <p>Domingo 28 Junio - 10:00 AM</p>
      </div>
    </div>
  );
}

export default Inicio;