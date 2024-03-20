import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Form } from 'react-bootstrap';

export const Login = () => {
  
  const googleAuth = () => {
    window.open(
      `http://localhost:8800/auth/google/callback`,
      "_self"
    );
  };

  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" }); 

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8800/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          localStorage.setItem("currentuser", JSON.stringify(data));
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ textAlign: 'center', padding: '30px' }}>
        <Card.Body>
          <h4>Login</h4>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Enter email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="mt-2"
            >
              Login
            </Button>
            <br />
            <Button
              onClick={googleAuth}
              variant="success"
              className="mt-2"
            >
              Register with Google
            </Button>
            <p className="mt-2">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};
export default Login;