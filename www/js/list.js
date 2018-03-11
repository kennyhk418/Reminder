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
        let star = child.val().star;
        let add_star = (star==true? '<span class="fa fa-star" style="color:orange"></span>': '')
        let append_list = '<li class="list-group-item ' +time+'""><b>'+ add_star+" "+message + '</b><br>';
        append_list += '<span style="font-size:10px">'+time+'</span>';
        append_list += '</li>';
        $("#msg_list").append(append_list);
    });
});