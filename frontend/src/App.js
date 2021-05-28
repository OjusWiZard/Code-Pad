import React from "react";
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
import { Profiler } from "react";
import EventDetails from "./components/eventDetails/EventDetails";

function App() {

  return (
    <div className="App">
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
