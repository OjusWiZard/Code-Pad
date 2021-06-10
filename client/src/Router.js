import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Form from "./components/editor/Form";
import Events from "./components/events/Events";
import EventDetails from "./components/eventDetails/EventDetails";
import SignUp from "./components/auth/signup/SignUp";
import Login from "./components/auth/login/Login";
import Profile from "./components/auth/editProfile/Profile";
import Default from "./components/default/Default";
import Footer from "./components/footer/Footer";
import Modal from "./components/modal/Modal";

function Router() {
  return (
    <>
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
    </>
  );
}

export default Router;
