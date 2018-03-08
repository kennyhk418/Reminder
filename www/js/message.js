$(function(){
    // toggle the star (orange/black) when clicked
    $(".fa-star").click(function(){
        $(".star_check").toggleClass("star_checked");
    });

    // Get a reference to the database service
    var database = firebase.database();
    var ref = database.ref('msg');

    $(".btn_submit").click(function(){
        let text_msg = $(".text_new_msg").val();
        if (text_msg != ""){
            ref.set({
                message1: {
                    message: "hehe"
                },
                message2: {
                    message: "hoho"
                }
            });
        }
        $(".text_new_msg").val("");
    });

    ref.on('value',function(snapshot){
        snapshot.forEach(function(child){
            var childData = child.val();
            console.log(childData.message);
        });
    })
});