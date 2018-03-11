$(function(){
    // To generate the date format
    function formatDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = (date.getMonth()+1);
        month = (month < 10? "0"+month:month);
        var day = date.getDate();
        day = (day < 10? "0"+day:day);
        var hour = date.getHours();
        hour = (hour < 10? "0"+hour:hour);
        var min = date.getMinutes();
        min = (min < 10? "0"+min:min);
        var sec = date.getSeconds();
        sec = (sec < 10? "0"+sec:sec);
        return year+"-"+month+"-"+day+","+hour+":"+min+":"+sec;
    }


    // toggle the star (orange/black) when clicked
    $(".fa-star").click(function(){
        $(".star_check").toggleClass("star_checked");
    });

    // Get a reference to the database service
    var database = firebase.database();
    var ref = database.ref('msg');

    // To handle the submit button
    $(".btn_submit").click(function(){
        let text_msg = $(".text_new_msg").val();
        let hasStar = $(".star_checked").hasClass("star_checked");
        if (text_msg != ""){
            database.ref('msg/'+formatDate()).set({
               message: text_msg,
               star: hasStar
               // time: formatDate()
            });
        }
        // Reset input field
        $(".text_new_msg").val("");
        $(".star_check").removeClass("star_checked");
    });
});