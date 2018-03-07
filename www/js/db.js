$(function(){
    var config = {
        apiKey: "AIzaSyDh7bwZweGFiKYp9MEENtC4HB3C1w3U2yU",
        authDomain: "reminder-cd42f.firebaseapp.com",
        databaseURL: "https://reminder-cd42f.firebaseio.com/"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();
    var ref = database.ref('msg');

    $(".btn_submit").click(function(){
        let text_msg = $(".text_new_msg").val();
        if (text_msg != ""){
            ref.set({
                message: text_msg
            });
        }
        $(".text_new_msg").val("");
    });

    ref.on('value',function(snapshot){
    console.log(snapshot.val());
    })

});