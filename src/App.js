import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./UserContext";
import useLocalStorage from "./Hooks/useLocalStorage";
import "./App.css"; 
import NavRoutes from "./NavRoutes";
import NavBar from "./NavBar";
import CampingApi from "./api/api"
const jwt = require("jsonwebtoken");

function App() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [token, setToken] = useLocalStorage("token", "");
  const [currentUser, setCurrentUser] = useState(null);
  console.debug("User is:", currentUser, "Token is:", token);
  console.debug("Page Loaded:", pageLoaded);

  useEffect(
    function loadUser() {
      async function getCurrentUser() {
        if (token !== "null") {
          try {
            CampingApi.token = token;

            console.log("Loaded Main DOM");
            let { username } = jwt.decode(token);
            let user = await CampingApi.getCurrentUser(username);

            setCurrentUser(user);
          } catch (e) {
            console.log("No token. See Error:", e);
          }
        }
        setPageLoaded(true);
      }
      getCurrentUser();
    },
    [token]
  );

  if (!pageLoaded)
    return (
      <div>
        <span className="loading">Loading...Please Wait</span>
        <div className="spinner-grow" role="status"></div>
      </div>
    );
  const login = async (loginData) => {
    try {
      console.log("LoginData", loginData);
      let res = await CampingApi.login(loginData);
      console.log("Inside Login. Token:", res.data.token);
      setToken(res.data.token);
      return res.data.token;
    } catch (e) {
      console.error("Login failed", e);
    }
  };
  const logout = (e) => {
    e.preventDefault();
    setCurrentUser(null);
    setToken(null);
  };
  const signUp = async (signUpData) => {
    try {
      let token = await CampingApi.register(signUpData);
      console.log("Inside register function", token);
      setToken(token);
      return token;
    } catch (e) {
      console.error("Signup failed", e);
    }
  };
  const getUser = async (username) => {
    let res = await CampingApi.getCurrentUser(username);
    return res.user;
  };

  const removeReservation = async (user_id, camp_id) => {
    let res = await CampingApi.removeReservation(user_id, camp_id);
    return res;
  };

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar logout={logout} />
        <NavRoutes
          login={login}
          signUp={signUp}
          removeReservation={removeReservation}
        />
      </UserContext.Provider></BrowserRouter>
    </div>
  );
}


export default App;
