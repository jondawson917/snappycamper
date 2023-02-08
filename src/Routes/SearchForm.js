import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import './SearchForm.css';

// Search form for Crops
// filters the API with params
function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState('');

  // parent filters
  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm">
      <Form className="search-form" onSubmit={handleSubmit}>
        <FormGroup floating>
          <Input
            id="searchTerm"
            className="SearchField"
            name="searchTerm"
            placeholder="Searching for something?"
            type="search"
            value={searchTerm}
            onChange={handleChange}
          />
          <Label className="text-center" for="searchTerm">
            Searching for something?
          </Label>
          <MDBBtn className="search-btn" color="success" outline>
            Find them crops!
          </MDBBtn>
        </FormGroup>
      </Form>
    </div>
  );
}

export default SearchForm;
