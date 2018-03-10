$(function(){
    function formatDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = (date.getMonth()+1);
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        return year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
    }


    // toggle the star (orange/black) when clicked
    $(".fa-star").click(function(){
        $(".star_check").toggleClass("star_checked");
    });

    // Get a reference to the database service
    var database = firebase.database();
    var ref = database.ref('msg');

    console.log(formatDate());

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
        // Reset input field
        $(".text_new_msg").val("");
        $(".star_check").removeClass("star_checked");
    });

    ref.on('value',function(snapshot){
        snapshot.forEach(function(child){
            var childData = child.val();
            //console.log(childData.message);
            $("#msg_list").append("<li class=\"list-group-item\">"+childData.message+"</li>");
        });
    })
});