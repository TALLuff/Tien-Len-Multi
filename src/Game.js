import React from "react";
import { navigate } from "@reach/router";
import * as firebase from "firebase/app";
import "firebase/database";

class Game extends React.Component {
  state = {
    chooseName: ""
  };

  chooseName = () => {
    var db = firebase.database().ref();
    const gameId = this.props.id;

    db.child(gameId).once("value", snapshot => {
      if (snapshot.child("player1Ready").val() === false) {
        this.playerReady(1);
      } else if (snapshot.child("player2Ready").val() === false) {
        this.playerReady(2);
      } else {
        alert("Lobby full");
        navigate(`/`);
      }
    });
  };

  playerReady = num => {
    var db = firebase.database().ref();
    const gameId = this.props.id;
    const name = this.state.chooseName;

    db.child(gameId)
      .child(`player${num}Ready`)
      .set(name)
      .then(() => {
        db.child(gameId)
          .child(name)
          .set(true);
      })
      .then(() => {
        db.child(gameId)
          .child("gameTotal")
          .set(-1);
      })
      .then(() => {
        db.child(gameId)
          .child(`player${num}Ready`)
          .once("value", snapshot => {
            navigate(`/${gameId}/${snapshot.val()}`);
          });
      });
  };

  storeInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Lobby: {this.props.id}</h2>
        <h3>Please enter your name below to ready up</h3>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.chooseName();
          }}
        >
          <input
            required
            id="chooseName"
            placeholder="Choose Name"
            onChange={this.storeInput}
          ></input>
          <button type="submit">Ready</button>
        </form>
      </div>
    );
  }
}

export default Game;
