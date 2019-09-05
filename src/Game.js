//Choose player names and ready up

//Maybe add a play again option

import React from "react";
import { navigate } from "@reach/router";
import * as firebase from "firebase/app";
import "firebase/database";

class Game extends React.Component {
  state = {
    chooseName: ""
  };

  chooseName = () => {};

  storeInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.chooseName(this.state.createId);
          }}
        >
          <input
            required
            id="chooseName"
            placeholder="Choose Name"
            onChange={this.storeInput}
          ></input>
          <button type="submit">Submit Name</button>
        </form>
      </div>
    );
  }
}

export default Game;
