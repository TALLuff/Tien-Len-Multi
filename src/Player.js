import React from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import { valid } from "./Valid";

class Player extends React.Component {
  state = {
    //Setup
    player1: false,
    player2: false,
    started: false,
    //Gameplay
    playerTurn: null,
    player: null,
    playerHand: null,
    playerRemaining: null,
    opponent: null,
    opponentRemaining: null,
    previousTurn: "Start",
    selected: {},
    //New games
    playerReady: false,
    playerPoints: 0,
    opponentReady: false,
    opponentPoints: 0
  };

  componentDidMount() {
    const gameId = this.props.id;
    var db = firebase
      .database()
      .ref()
      .child(gameId);
    db.child("player1Ready").on("value", snapshot => {
      this.setState({ player1: snapshot.val() });
    });
    db.child("player2Ready").on("value", snapshot => {
      this.setState({ player2: snapshot.val() });
    });
    db.child("playerTurn").on("value", snapshot => {
      this.setState({ playerTurn: snapshot.val() });
    });
  }

  componentDidUpdate() {
    const gameId = this.props.id;
    let db = firebase
      .database()
      .ref()
      .child(gameId);
    const player = this.props.player;
    const {
      started,
      player1,
      player2,
      opponent,
      playerRemaining,
      opponentRemaining,
      playerPoints,
      opponentPoints,
      playerReady,
      opponentReady
    } = this.state;
    //Start the game
    if (
      started === false &&
      ((player1 !== false &&
        player2 !== false &&
        playerPoints === 0 &&
        opponentPoints === 0) ||
        (playerReady === true && opponentReady === true))
    ) {
      //Determine players and set start point
      this.setState({ started: true, selected: {} });
      let opponent = player === player1 ? player2 : player1;
      db.child(player).set(false);

      this.setState({ player });

      this.setState({ opponent });

      db.child(`${player}Hand`).on("value", snapshot => {
        this.setState({ playerHand: snapshot.val() });
      });
      db.child(`previousTurn`).on("value", snapshot => {
        this.setState({ previousTurn: snapshot.val() });
      });
      db.child(`${player}Remaining`).set(13);
      db.child(`${player}Remaining`).on("value", snapshot => {
        this.setState({ playerRemaining: snapshot.val() });
      });
      db.child(`${opponent}Remaining`).set(13);
      db.child(`${opponent}Remaining`).on("value", snapshot => {
        this.setState({ opponentRemaining: snapshot.val() });
      });

      db.child(player).on("value", snapshot => {
        this.setState({ playerReady: snapshot.val() });
      });
      db.child(`${player}Points`)
        .once("value", snapshot => {
          if (snapshot.val() === null) {
            db.child(`${player}Points`).set(0);
          }
        })
        .then(() => {
          db.child(`${player}Points`).once("value", snapshot => {
            this.setState({ playerPoints: snapshot.val() });
          });
        });
      db.child(opponent).on("value", snapshot => {
        this.setState({ opponentReady: snapshot.val() });
      });
      db.child(`${opponent}Points`)
        .once("value", snapshot => {
          if (snapshot.val() === null) {
            db.child(`${opponent}Points`).set(0);
          }
        })
        .then(() => {
          db.child(`${opponent}Points`).once("value", snapshot => {
            this.setState({ opponentPoints: snapshot.val() });
          });
        });

      //Setting up deck

      if (player === player1) {
        let ranks = [
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "J",
          "Q",
          "K",
          "A",
          "2"
        ];
        let suits = ["Spades", "Clubs", "Diamonds", "Hearts"];
        let deck = [];
        for (let i = 0; i < 52; i++) {
          deck.push({
            rank: ranks[Math.floor(i / 4)],
            suit: suits[i % 4],
            value: i,
            shuffleNum: Math.floor(Math.random() * 1000)
          });
        }
        let sorted = deck.sort((card1, card2) => {
          if (card1.shuffleNum < card2.shuffleNum) {
            return -1;
          }
          if (card1.shuffleNum > card2.shuffleNum) {
            return 1;
          }
          return 0;
        });
        let playerCards = sorted.slice(0, 13);
        let opponentCards = sorted.slice(13, 26);
        let sortValue = (card1, card2) => {
          if (card1.value < card2.value) {
            return -1;
          }
          if (card1.value > card2.value) {
            return 1;
          }
          return 0;
        };
        playerCards.sort(sortValue);
        opponentCards.sort(sortValue);
        let playerTurn = Math.round(Math.random()) === 1 ? player1 : player2;
        let playerCardsObj = {};
        let opponentCardsObj = {};
        for (let i = 0; i < 13; i++) {
          playerCardsObj[playerCards[i].value] = playerCards[i];
          opponentCardsObj[opponentCards[i].value] = opponentCards[i];
        }
        db.child("playerTurn").set(playerTurn);
        db.child("previousTurn").set("Start");
        db.child(`${player}Hand`).set(playerCardsObj);
        db.child(`${opponent}Hand`).set(opponentCardsObj);
      }
    }

    if (playerRemaining === 0) {
      db.child(`${player}Points`)
        .set(playerPoints + 1)
        .then(() => {
          alert(`You win! ${player} is the champion! :D`);
        });
      db.child(`${player}Remaining`).set(13);
      this.setState({ started: "Waiting" });
      db.child(player).set(false);
    } else if (opponentRemaining === 0) {
      this.setState({ started: "Waiting" });
      db.child(`${opponent}Remaining`).set(13);
      db.child(player).set(false);
      alert(`You lose! ${opponent} is the champion! D:`);
    }
  }

  passTurn = () => {
    const gameId = this.props.id;
    const { opponent } = this.state;
    var db = firebase
      .database()
      .ref()
      .child(gameId);
    db.child("previousTurn").set("Passed");
    db.child("playerTurn").set(opponent);
    this.setState({ selected: {} });
  };

  submitTurn = selected => {
    const gameId = this.props.id;
    const { player, opponent } = this.state;
    var db = firebase
      .database()
      .ref()
      .child(gameId);
    let keys = Object.keys(selected);
    let count = 0;
    db.child("previousTurn").set({});
    for (let i = 0; i < keys.length; i++) {
      db.child(`${player}Hand`)
        .child(keys[i])
        .remove();
      db.child("previousTurn")
        .child(keys[i])
        .set(selected[keys[i]]);
      count++;
    }
    db.child(`${player}Remaining`).set(this.state.playerRemaining - count);
    db.child("playerTurn").set(opponent);
  };

  selectCard = card => {
    if (this.state.selected[card.value] === undefined) {
      this.setState(state => {
        state.selected[card.value] = card;
        return state;
      });
    } else {
      this.setState(state => {
        let newSelected = state.selected;
        delete newSelected[card.value];
        return (state.selected = newSelected);
      });
    }
  };

  makeArray = obj => {
    if (obj === null) return [];
    let keys = Object.keys(obj);
    let arr = [];
    for (let i = 0; i < keys.length; i++) {
      arr.push(obj[keys[i]]);
    }
    return arr;
  };

  restart = () => {
    const gameId = this.props.id;
    var db = firebase
      .database()
      .ref()
      .child(gameId);
    this.setState({ started: false });
    db.child(this.state.player).set(true);
  };

  render() {
    const {
      player1,
      player2,
      playerTurn,
      player,
      playerHand,
      opponent,
      opponentRemaining,
      previousTurn,
      selected,
      playerPoints,
      opponentPoints,
      playerReady,
      started
    } = this.state;
    return player1 && player2 ? (
      <div>
        <h1>{`${player}-${playerPoints}/${opponent}-${opponentPoints}`}</h1>
        {/*Top Buttons*/}
        {playerTurn === player ? (
          <div>
            <button
              onClick={() => {
                if (this.makeArray(selected).length !== 0) {
                  if (valid(selected, previousTurn)) {
                    this.submitTurn(selected);
                    this.setState({ selected: {} });
                  } else {
                    alert("Invalid cards");
                  }
                }
              }}
            >
              Submit
            </button>
            <button onClick={this.passTurn}>Pass</button>
          </div>
        ) : (
          <div>{opponent} is thinking</div>
        )}
        <div>
          <h2>
            <div>
              {playerTurn}'s turn, {opponent}'s Cards:{opponentRemaining}
            </div>
            <br />
            {previousTurn === "Passed" || previousTurn === "Start" ? (
              <div>{previousTurn}</div>
            ) : (
              <div>
                Last turn:
                {this.makeArray(previousTurn).map(card => {
                  return (
                    <img
                      key={`${card.value}`}
                      id="card"
                      alt={`${card.rank} of ${card.suit}`}
                      src={require(`./cards/${card.rank}_of_${card.suit}.png`)}
                    />
                  );
                })}
              </div>
            )}
            <br />
            {Object.keys(selected).length === 0 ? (
              <div>Selected</div>
            ) : (
              <div>
                Selected:
                {this.makeArray(selected).map(card => {
                  return (
                    <img
                      key={`${card.value}`}
                      id="card"
                      alt={`${card.rank} of ${card.suit}`}
                      src={require(`./cards/${card.rank}_of_${card.suit}.png`)}
                    />
                  );
                })}
              </div>
            )}
          </h2>
          <div>
            {this.makeArray(playerHand).map(card => {
              return (
                <img
                  key={`${card.value}`}
                  onClick={() => {
                    this.selectCard(card);
                  }}
                  id="card"
                  alt={`${card.rank} of ${card.suit}`}
                  src={require(`./cards/${card.rank}_of_${card.suit}.png`)}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div />
          {started === "Waiting" || started === false ? (
            <div>
              {playerReady === false ? (
                <div>
                  <button onClick={this.restart}>Play Again</button>
                </div>
              ) : (
                <div>Waiting for {opponent} to play again.</div>
              )}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    ) : (
      <div>Waiting for other player to join</div>
    );
  }
}

export default Player;
