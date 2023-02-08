import React from "react";
import { useHistory } from "react-router-dom";
import useFields from "../Hooks/useFields";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";




const SignupForm = ({ signUp }) => {
  const history = useHistory();
  const [formData, handleChange] = useFields({
    username: "",
    password: "",
    fullName: "",
    state: "",
  });



  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if(formData.state === ''){ formData.state = 'CA'};
    let token = await signUp(formData);
    console.log("Form Data:", formData);
    console.log("Signup submitted", token);
    if (!token) {
      alert("Couldn't create new user");
    }
    history.push("/");
  };

  return (
    <div className="container"
      style={{ margin: '40px', width: '50rem',
        background: "aliceblue",
        outline: "5px solid aliceblue",
      }}
    ><h3 className="form-h3 home-title">This is the SignUp Page!</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="Enter username"
            type="username"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="enter password"
            type="password"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="enter Full Name"
            type="text"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="state">State</Label>
          <Input
            id="state"
            name="state"
            placeholder="enter state" 
            type="select"
            onChange={handleChange} autoFocus={true}
          >
            <option value="AL" >Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </Input>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default SignupForm;
