import React, { useContext } from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBListGroup,
    MDBListGroupItem,
    MDBContainer,
    MDBBtn,
  } from "mdb-react-ui-kit";

import UserContext from '../UserContext';
import { useHistory } from 'react-router-dom';

function CampDetails(){
    const {user} = useContext(UserContext);
    const history = useHistory();
}