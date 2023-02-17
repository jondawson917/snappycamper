import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

export default function NavBar({ logout }) {
  const [showNavCentred, setShowNavCentred] = useState(false);
const {currentUser} = useContext(UserContext);

function loggedInNav() {
  return (
    <>
                
                <MDBNavbarItem>
                  <MDBNavbarLink  href="/" onClick={logout}>Logout</MDBNavbarLink>
                </MDBNavbarItem>
              </>
  );
}

// if user is not logged in, shows login/signup links in navbar
function loggedOutNav() {
  return (
<><MDBNavbarItem>
              <MDBNavbarLink href="/signup">Signup</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/login">Login</MDBNavbarLink>
            </MDBNavbarItem></>);
}

/*Conditionally render parts that require a currentUser */
  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarCenteredExample"
          aria-controls="navbarCenteredExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavCentred(!showNavCentred)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse
          navbar
          show={showNavCentred}
            
          id="navbarCenteredExample"
        >
          <MDBNavbarNav fullWidth={true} className="mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <MDBDropdown>
          <MDBDropdownToggle tag="a" className="nav-link" role="button">
            Menu
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link href="/camplist">
              Camp List
            </MDBDropdownItem>
            <MDBDropdownItem link href="/profile">
              View Profile
            </MDBDropdownItem>
            
          </MDBDropdownMenu>
        </MDBDropdown>
            </MDBNavbarItem>
            {currentUser ? loggedInNav()
             : loggedOutNav()}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
