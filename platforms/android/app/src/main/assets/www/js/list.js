$(function(){
    var database = firebase.database();
    var ref = database.ref("msg").orderByChild('star');

    // // This is not necessary, becuz child_added will load once at first
    // ref.once('value',function(snapshot){
    //     snapshot.forEach(function(child){
    //         let childData = child.val();
    //         $("#msg_list").append("<li class=\"list-group-item\">"+childData.message+"</li>");
    //     });
    // });

    // Update the list when there is new data
    ref.on('child_added',function(child){
        let message = child.val().message;
        let time = child.key;
        console.log(time);
        $("#msg_list").append('<li class="list-group-item ' +time+'">'+message+"</li>");
    });
});