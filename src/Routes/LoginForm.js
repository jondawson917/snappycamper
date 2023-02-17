import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import useFields from "../Hooks/useFields";

import { useHistory } from "react-router-dom";


function LoginForm({ login }) {
  const history = useHistory();
  const [formData, handleChange] = useFields({
    username: "",
    password: "",
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log("Form data", formData);
    let result = await login(formData);
    console.log("Login result", result)
    if (!result) {
      alert("Couldn't login successfully");
    } 
    history.push("/");
  };

  return (
    <div className="container" style={{left: '20%', position: 'absolute', margin: '40px', width: '50rem',
        background: "aliceblue",
        outline: "5px solid aliceblue",
      }}>
      <h3 className="form-h3 home-title">This is the login page</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label className="text-center" for="Username">Username</Label>
          <Input
            type="username"
            name="username"
            id="username"
            placeholder="Enter your username"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label className="text-center" for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="enter your secret password"
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit">Log in right now!</Button>
      </Form>
    </div>
  );
}

export default LoginForm;
