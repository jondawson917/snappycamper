import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
const SearchForm = ({ search }) => {
  const [campSearchTerm, setCampSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  
  const userHandleSubmit = (evt) => {
    evt.preventDefault();
    search(userSearchTerm.trim() || undefined);
    search(campSearchTerm.trim() || undefined);
    setUserSearchTerm(userSearchTerm.trim());
    setCampSearchTerm(campSearchTerm.trim());
  };

  

  const userHandleChange = (evt) => {
    setUserSearchTerm(evt.target.value);
  };

  const campHandleChange = (evt) => {
    setCampSearchTerm(evt.target.value);
  };

  return (
    <div className="searchform" style={{
      left: "35vw",
      top: "10vh",
      position: "absolute",
      background: "aliceblue",
      outline: "5px solid aliceblue",
    }}>
      <Form onSubmit={userHandleSubmit}>
        <FormGroup>
          <Label for="name">Search by users </Label>
          <Input name="name" value={userSearchTerm} onChange={userHandleChange}></Input>
        </FormGroup>
        <br/>
        <FormGroup>
          <Label for="name">Search by camps </Label>
          <Input name="name" value={campSearchTerm} onChange={campHandleChange}></Input>
        </FormGroup>
        <Button type="submit">Search Users and Camps</Button>
      </Form>
    </div>
  );
};

export default SearchForm;
