import React, { useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import useFields from "../Hooks/useFields";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
const CampingApi = require("../api/api");
const ProfileForm = () => {
  const { currentUser, updateUser } = useContext(UserContext);
  const history = useHistory();
  const [formData, handleChange] = useFields({
    username: currentUser.username,
    fullName: currentUser.fullName,
    state: currentUser.state,
    password: ""
  });


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if(formData.state === ''){formData.state = 'CA'};
    console.log("Submit Data:", formData);
    let res = await CampingApi.updateUserInfo(currentUser.username, formData);
    if(!res){alert("Couldn't update user");}
    console.log("Response from Submission", res.data);
    history.push("/profile");
  };
  return (
    <div className="container"
    style={{ margin: '20px', width: '86%', 
      background: "aliceblue",
      outline: "5px solid aliceblue",
    }}>    <h3 className="form-h3 home-title">Update User Page</h3>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="enter Username"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="fullName">Full Name</Label>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="enter Full Name"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="state">state</Label>
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
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="enter password"
            onChange={handleChange}
          />
        </FormGroup>

        <Button type="submit">Update User!</Button>
      </Form>
    </div>
  );
};
export default ProfileForm;
