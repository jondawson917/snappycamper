import React, {useContext} from "react";
import UserContext from './UserContext';

import { MDBCard, MDBCardImage, MDBCardOverlay, MDBCardTitle, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import "./Home.css"
function Home() {

  const {currentUser} = useContext(UserContext);
  
  return (
    <MDBCard background='dark' className='text-white' style={{left: '20%', width: '700px' }}>
    <MDBCardImage overlay src='https://mdbootstrap.com/img/new/slides/017.webp' alt='...' />
    <MDBCardOverlay>
      <MDBCardTitle>Welcome To Snappy Camper</MDBCardTitle>
      <MDBCardText>
        Strap up your bootstraps
      </MDBCardText>
      {currentUser ? (<>  <MDBCardText>Logged in as: {currentUser.fullname}</MDBCardText></>) : null}
      <MDBBtn className="signup-btn" size='lg' style={{margin: '20px'}} href='/signup'>Signup </MDBBtn>
      <br/>
      {!currentUser ? (<><MDBBtn className="login-btn" size='md' rounded color='info'style={{margin: '20px'}} href='/login'>Login</MDBBtn></>) : null}
    </MDBCardOverlay>
  </MDBCard>
  );
}

export default Home;
