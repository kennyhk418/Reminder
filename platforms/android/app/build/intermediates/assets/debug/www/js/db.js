$(function(){
    var config = {
        apiKey: "AIzaSyDh7bwZweGFiKYp9MEENtC4HB3C1w3U2yU",
        authDomain: "reminder-cd42f.firebaseapp.com",
        databaseURL: "https://reminder-cd42f.firebaseio.com/"
    };
    firebase.initializeApp(config);

    // Check if the db is connected and reflect in the title
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function(snap) {
      if (snap.val() === true) {
        $(".connection_status").css("color","green");
        $(".connection_status").html("Connected");
      } else {
        $(".connection_status").css("color","red");
        $(".connection_status").html("Disconnected");
      }
    });
});