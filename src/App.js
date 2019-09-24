import React from "react";
import { Router } from "@reach/router";
import "firebase/database";
import Header from "./Header";
import Home from "./Home";
import Game from "./Game";
import Player from "./Player";

class App extends React.Component {
  render() {
    return (
      <div>
        <div id="landscape">
          <h1>Please play this game in landscape!</h1>
        </div>
        <Header />
        <Router>
          <Home path="/" />
          <Game path="/:gameId" />
          <Player path="/:gameId/:player" />
        </Router>
      </div>
    );
  }
}

export default App;
