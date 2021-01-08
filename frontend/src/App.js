import React from "react";
import "./App.css";
import { Route, Switch } from 'react-router-dom';
import Form from "./components/editor/Form";
import Home from "./components/home/Home";
import Events from "./components/events/Events";

function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/editor" component={Form} />
        <Route exact path="/events" component={Events} />
      </Switch>      
    </div>
  );
}

export default App;
