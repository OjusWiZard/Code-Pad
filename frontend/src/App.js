import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch } from 'react-router-dom';
import Form from "./components/editor/Form";
import Home from "./components/home/Home";
import Events from "./components/events/Events";
import Default from "./components/default/Default";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/Navbar'
import SignUp from "./components/auth/signup/SignUp";
import Login from "./components/auth/login/Login";
import Profile from "./components/auth/editProfile/Profile";
import Footer from "./components/footer/Footer";
import EventDetails from "./components/eventDetails/EventDetails";
import { userInfo } from "./api";

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  useEffect(() => {
    userInfo();
  }, [])
  return (
    <div className="App">
      <div className="scan-lines">
        <div></div>
      </div>
      <div className="dots">
        <div className="dot-1"></div>
        <div className="dot-2"></div>
        <div className="dot-3"></div>
        <div className="dot-4"></div>
        <div className="dot-5"></div>'
      </div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/editor" component={Form} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/:id" component={EventDetails} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route component={Default} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
