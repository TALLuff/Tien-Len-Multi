import React from "react";
import { navigate } from "@reach/router";
import * as firebase from "firebase/app";
import "firebase/database";

class Header extends React.Component {
  state = {
    createId: "",
    joinId: ""
  };

  createLobby = gameId => {
    let time = new Date().getTime();
    var db = firebase.database().ref();
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

  joinLobby = gameId => {
    this.navigateToLobby(gameId);
  };

  navigateToLobby = gameId => {
    navigate(`/${gameId}`);
  };

  storeInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    return (
      <div id="header">
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          Tien Len
        </h1>
        <div>
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
            <button type="submit">New Lobby</button>
          </form>
          <form
            onSubmit={event => {
              event.preventDefault();
              this.joinLobby(this.state.joinId);
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
      </div>
    );
  }
}

export default Header;
