import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Rooms from "./Rooms";
import RoomAdmin from "./RoomAdmin";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id" component={RoomAdmin} />
        <Route exact path="/" component={Rooms} />
      </Switch>
    </Router>
  );
}

export default App;
