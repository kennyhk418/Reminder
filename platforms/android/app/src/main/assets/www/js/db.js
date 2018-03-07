$(function(){
  var config = {
    apiKey: "AIzaSyDh7bwZweGFiKYp9MEENtC4HB3C1w3U2yU",
    authDomain: "reminder-cd42f.firebaseapp.com",
    databaseURL: "https://reminder-cd42f.firebaseio.com/"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
  $(".add_new_item").click(function(){
      database.ref('msg').set({
        message: "OMG YEAH",
      });
  })

});