
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-itp.png";

function Splash() {

  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigate("/");
    },3000);

    return ()=>clearTimeout(timer);

  },[]);

  return(

<div
style={{
height:"100vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
background:"#ffffff"
}}
>

<img
src={logo}
width="170"
/>

<h2
style={{
marginTop:"25px",
color:"#102A43"
}}
>
Ministerio Multimedia
</h2>

<p
style={{
color:"#0F766E"
}}
>
Iglesia Tabernáculo Pentecostal
</p>

<div
style={{
marginTop:"40px",
fontSize:"18px"
}}
>
Cargando...
</div>

</div>

  )

}

export default Splash;