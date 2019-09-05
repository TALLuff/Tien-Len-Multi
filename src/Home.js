import React from "react";
import { navigate } from "@reach/router";
import * as firebase from "firebase/app";
import "firebase/database";

class Home extends React.Component {
  state = {
    createId: "",
    joinId: ""
  };

  createLobby = gameId => {
    let time = new Date().getTime();
    var db = firebase.database().ref();
    console.log(gameId, time);
    db.child(gameId)
      .child(`timeCreated`)
      .set(time)
      .then(() => {
        db.child(gameId)
          .child(`player1Ready`)
          .set(false);
      })
      .then(() => {
        db.child(gameId)
          .child(`player2Ready`)
          .set(false);
      })
      .then(() => {
        this.navigateToLobby(gameId);
      });
  };

  navigateToLobby = gameId => {
    navigate(`/${gameId}`);
  };

  storeInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Tien Len</h1>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.createLobby(this.state.createId);
          }}
        >
          <input
            required
            id="createId"
            placeholder="Choose Lobby ID"
            onChange={this.storeInput}
          ></input>
          <button type="submit">Create Lobby</button>
        </form>
        <div></div>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.navigateToLobby(this.state.joinId);
          }}
        >
          <input
            required
            id="joinId"
            placeholder="Enter Lobby ID"
            onChange={this.storeInput}
          ></input>
          <button type="submit">Join Lobby</button>
        </form>
      </div>
    );
  }
}

export default Home;
