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
import Modal from "./components/modal/Modal";

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [modal, setModal] = useState(localStorage.getItem("modal") || false);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      userInfo();
    }
  }, [modal]);
  return (
    <div className="App">
      <div className="scan-lines">
        <div></div>
      </div>
      <div className="dots">
        <div className="dot-left-1"></div>
        <div className="dot-left-2"></div>
        <div className="dot-left-3"></div>
        <div className="dot-left-4"></div>
        <div className="dot-left-5"></div>
        <div className="dot-right-1"></div>
        <div className="dot-right-2"></div>
        <div className="dot-right-3"></div>
        <div className="dot-right-4"></div>
        <div className="dot-right-5"></div>
      </div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/editor" component={Form} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/:slug" component={EventDetails} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route component={Default} />
      </Switch>
      <Modal />
      <Footer />
    </div>
  );
}

export default App;
