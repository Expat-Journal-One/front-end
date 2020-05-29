import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Components/LoginForm";
import Signup from "./Components/SignupForm";
import Home from "./Components/Home";
import UserPage from "./Components/UserPage";
import EditPost from "./Components/EditPost";
import './App.css';


function App() {
  return (
    <Router>
    <div className="App">
    <div className="App-links">
      <Link to="/">Home</Link> 
      <Link to="/Login">Login</Link>
      <Link to="/Signup">Signup</Link>
      <Link to="/UserPage">UserPage</Link>
      </div>
      <header className="App-header">
      
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
  
            <PrivateRoute exact path='/UserPage' component={UserPage} />
            <PrivateRoute exact path='/EditPost' component={EditPost} />
        </Switch>
      </header>
    </div>
    </Router>
  );
}

export default App;
