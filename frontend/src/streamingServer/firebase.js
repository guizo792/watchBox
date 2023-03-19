import firebase from "firebase8";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_LIVE_STREAMING_KEY, // Add API Key
  databaseURL:
    "https://live-video-streaming-b0312-default-rtdb.europe-west1.firebasedatabase.app/", // Add databaseURL
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase;

var firepadRef = firebase.database().ref();

// export const userName = prompt("What's your name?");
const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");
if (window.location.href.includes("live-stream"))
  if (roomId) {
    firepadRef = firepadRef.child(roomId);
  } else {
    firepadRef = firepadRef.push();
    window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);

    window.onbeforeunload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      // const streamId = store;
      // console.log(streamId);
      // deleteVideo(streamId).then((res) => console.log(res));
      firepadRef.remove().then(() => {
        console.log("All data removed successfully.");
      });
    };
  }

export default firepadRef;
