import React from "react";
import Home from "./Home";
import { Route, Switch, Redirect } from "react-router-dom";
import CampList from "./Routes/CampList";
import LoginForm from "./Routes/LoginForm";
import SignupForm from "./Routes/SignupForm";
import Profile from "./Routes/Profile";

function NavRoutes({login, signUp, removeReservation}) {
  
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/camplist">
          <CampList />
        </Route>
        <Route exact path="/profile">
          <Profile removeReservation={removeReservation}/>
        </Route>
        <Route exact path="/login">
          <LoginForm login={login}/>
        </Route>
        <Route exact path="/signup">
          <SignupForm signUp={signUp}/>
        </Route>
        <Route exact path="/profile">
          <Profile/>
        </Route>
        <Redirect to="/"/>
      </Switch>
      
    </div>
  );
}

export default NavRoutes;
