import React from "react";
import { Router } from "@reach/router";
import "firebase/database";
import Home from "./Home";
import Game from "./Game";
import Player from "./Player";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Home path="/" />
          <Game path="/:id" />
          <Player path="/:id/:player" />
        </Router>
      </div>
    );
  }
}

export default App;
