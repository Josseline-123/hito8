import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/Context";

const Profile = () => {
  const { token } = useContext(MiContexto);
  const [datosUsuario, setDatosUsuario] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://localhost:10000/api/auth/me', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();

      setDatosUsuario(data);
    }

    getData();

  }, []);


  if (!datosUsuario.email)
    return (<div>Cargando datos</div>)

  return (<div>
    <h1>Perfil de usuario</h1>
    <hr />
    <div className="d-flex">
      <strong>Email:</strong>
      <span>{datosUsuario.email}</span>
    </div>
    <div className="d-flex">
      <strong>ID:</strong>
      <span>{datosUsuario.id}</span>
    </div>
  </div>);
};
export default Profile;
