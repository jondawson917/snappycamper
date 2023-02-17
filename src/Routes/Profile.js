import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import ProfileForm from "./ProfileForm";
// import "./Profile.css"
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";


function Profile({removeReservation}) {
  const { currentUser } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
 
const handleDelete = async (e) =>{
  e.preventDefault();
  let camp_id = e.target.dataset.value; 
  console.log("Camp ID:",camp_id, "User Id:", currentUser.id);
  
  await removeReservation(currentUser.id, camp_id);
  e.target.parentElement.remove();
}

  useEffect(
    function generateProfile() {
      async function makeProfileCard() {
        if (currentUser) {
          setProfile(
            <Card 
              style={{
                position: "absolute",
                top: '10%',
                left: '0%',
                width: "20%",
              }}
            >
              <CardBody>
                <CardTitle className="font-weight-bold text-center">
                  {currentUser.fullname}'s Profile
                </CardTitle>
                <ListGroup>
                  <ListGroupItem>
                    Username: {currentUser.username}
                  </ListGroupItem>{" "}
                  <ListGroupItem>
                    Full Name: {currentUser.fullname}
                  </ListGroupItem>
                  Home State: {currentUser.state}{" "}
                  {currentUser.isAdmin ? (
                    <ListGroupItem>Admin Status: I'm an Admin</ListGroupItem>
                  ) : (
                    <ListGroupItem>
                      Admin Status: I'm not an Admin
                    </ListGroupItem>
                  )}
                </ListGroup>
              </CardBody>

              <ProfileForm/>
            </Card>
          );
        } else {setProfile(<Card 
          style={{
            position: "absolute",
            top: '10%',
            left: '0%',
            width: "20%",
          }}
        >
          <CardBody>
            <CardTitle className="font-weight-bold text-center">
              Login to view profile
            </CardTitle>
            <ListGroup>
              <ListGroupItem>
                Username: Login to view USERNAME
              </ListGroupItem>{" "}
              <ListGroupItem>
                Full Name: Login to view FULL NAME
              </ListGroupItem>
              Home State: Login to view STATE
            </ListGroup>
          </CardBody>


        </Card>)}
      }
      makeProfileCard();
    },
    [currentUser]
  );

  return (
    <div class="Profile">
      {currentUser ? (<h1>{currentUser.fullname}'s Profile</h1>) : (<h1>Login to View Profile</h1>)}
      
      <div className="d-inline-flex flex-column flex-fill border border-primary">
      {profile}    <h3><u>Reserved campgrounds</u></h3>{currentUser ? (
            currentUser.camps.map((c) => (
             <div className="d-inline-flex" style={{marginBottom: '10px', marginLeft: '20px'}}>
              <button className="p-2 row btn btn-outline-info">{c.parkname} Details</button>
              <button  className="btn btn-danger" data-value={c.camp_id} onClick={handleDelete} style={{marginLeft: '20px', marginRight: '10px'}}>Delete</button></div>))) : null}
        </div>
        
      </div>
  );
}

export default Profile;
