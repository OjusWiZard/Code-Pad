import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/";
import Home from "./components/home";
import Form from "./components/editor";
import Events from "./components/events";
import EventDetails from "./components/eventDetails";
import SignUp from "./components/auth/signup";
import Login from "./components/auth/login";
import Profile from "./components/auth/editProfile";
import Default from "./components/default";
import Footer from "./components/footer";
import Modal from "./components/modal";
import ForgotPassword from "./components/auth/forgotPassword/forgotPassword";
import Problem from "./components/problems";
import ResetPassword from "./components/auth/resetPassword/ResetPassword";
import PrivateLayout from "./components/Guards/PrivateLayout";

function Router() {
  let user = localStorage.getItem("user") || null;
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/editor" component={Form} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/events/:slug" component={EventDetails} />
        <Route exact path="/problems/:slug" component={Problem} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/problems" component={Problem} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/i/have/bad/memory/password/:uid/:token"
          component={() => (user ? <Redirect to="/" /> : <ResetPassword />)}
        />
        <Route component={Default} />
      </Switch>
      <Modal />
      <Footer />
    </>
  );
}

export default Router;
