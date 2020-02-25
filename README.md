## Tien-Len Card Game

This is a vietnamese card game where the aim is to use tactics and knowledge to get rid of your cards before the opponent can.

Rules can be found here - https://www.pagat.com/climbing/thirteen.html

Project made with React and uses firebase live database for the backend.

# Initial setup

You will need to setup a live firebase database and to connect your project to it using a config file 
```
export default firebaseConfig = {
  apiKey: "AIzaSyCU36VI_s7BD2aCJTBCTxAomUXh_e0xOsE",
  authDomain: "tien-len-multi.firebaseapp.com",
  databaseURL: "https://tien-len-multi.firebaseio.com",
  projectId: "tien-len-multi",
  storageBucket: "",
  messagingSenderId: "137319330002",
  appId: "1:137319330002:web:34caa6f7891f5a67"
};
```
Then run `npm start` to host locally, I hosted mine on netlify to play with friends.

Thanks and hope you have fun playing!

-Tommy
