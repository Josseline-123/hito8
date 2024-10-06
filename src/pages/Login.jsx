import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MiContexto } from "../context/Context";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(MiContexto);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:10000/api/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      });
      const data = await res.json();

      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        navigate('/profile');
      } else {
        alert('Error en usuario o contraseña');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" id="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" id="exampleForm.ControlTextarea1">
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Enviar</Button>
      </Form>
    </div>
  );
};
export default Login;
