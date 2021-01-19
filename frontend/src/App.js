import React from "react";
import "./App.css";
import { Route, Switch } from 'react-router-dom';
import Form from "./components/editor/Form";
import Home from "./components/home/Home";
import Events from "./components/events/Events";
import Default from "./components/default/Default";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/Navbar'

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/editor" component={Form} />
        <Route exact path="/events" component={Events} />
        <Route component={Default} />
      </Switch>      
    </div>
  );
}

export default App;
