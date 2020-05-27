import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Components/LoginForm";
import Signup from "./Components/SignupForm";
import Home from "./Components/Home";
import UserPage from "./Components/UserPage";

import './App.css';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
      <Link to="/">Home</Link> 
      <Link to="/Login">Login</Link>
      <Link to="/Signup">Signup</Link>
      
      {/* you can comment the logo out  */}
         {/* <img src={logo} className="App-logo" alt="logo" />  */}
        <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/Login">
              <Login/>
            </Route>
            <Route exact path="/Signup">
              <Signup/>
            </Route>
            <PrivateRoute exact path='/userpage' component={UserPage} />
        </Switch>
      </header>
    </div>
    </Router>
  );
}

export default App;
