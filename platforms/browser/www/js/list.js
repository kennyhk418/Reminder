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

        // Add a star if the message is starred
        let add_star = (star==true? '<i class="fa fa-star" style="color:orange"></i>': '')
        // Build the dynamic message
        let append_list = '<li class="list-group-item"><b>'+ add_star+" "+message + '</b>';

        append_list += '<button class="btn btn-link float-right del_'+ time+ '">';
        append_list += '<a href="./del_modal.html" data-target="#delmodal" data-toggle="modal"><i class="far fa-trash-alt fa-3x">';
        append_list += '</i></a></button>';

        append_list += '<button data-toggle="modal" class="btn btn-link float-right edit_'+ time+ '"><i class="fas fa-edit fa-3x"></i></button><br>';
        append_list += '<span style="font-size:10px">'+time+'</span>';
        append_list += '</li>';
        $("#msg_list").append(append_list);
    });

    // Refresh the page after an element is removed
    ref.on('child_removed',function(child){
        location.reload();
    });

    // Add remove listener to the trash button
    $(document).on('click','[class*="del"]',function(){
        let class_name = $(this).attr("class");
        let start_pos = class_name.search("del_") + 4;
        let firebase_key = class_name.slice(start_pos);
        console.log(firebase_key);
        // database.ref("msg/"+ firebase_key).remove();
        $("#del_modal").load("./del_modal.html",function(){
            $("#del_modal").modal('show');
            $("#message_time").html(firebase_key);
            $("#confirm_del").click(function(){
                $("#del_modal").modal('hide');
                database.ref("msg/"+ firebase_key).remove();
            })
            $("#cancel_del").click(function(){
                $("#del_modal").modal('hide');
            });
        });
    });
});