$(function(){
    var database = firebase.database();
    var ref = database.ref("msg").orderByChild('star');

    // Convert date format to include special characters
    function convertDate(time){
        let year = time.slice(0,4);
        let month = time.slice(4,6);
        let day = time.slice(6,8);
        let hour = time.slice(8,10);
        let min = time.slice(10,12);
        let sec = time.slice(12);
        return year+"-"+month+"-"+day+","+hour+":"+min+":"+sec;
    }

    // Update the list when there is new data
    ref.on('child_added',function(child){
        let message = child.val().message;
        let time = child.key;
        let star = child.val().star;

        // Add a star if the message is starred
        let add_star = (star==true? '<i class="fa fa-star" style="color:orange"></i>': '')
        // Build the dynamic message
        let append_list = '<li class="list-group-item"><b>'+ add_star+" "+'<span class=msg_'+time+'>'+message + '</span></b>';

        append_list += '<button class="btn btn-link float-right del_'+ time+ '">';
        append_list += '<i class="far fa-trash-alt fa-2x"></i></button>';

        append_list += '<button data-toggle="modal" class="btn btn-link float-right edit_'+ time+ '"><i class="fas fa-edit fa-2x"></i></button><br>';
        append_list += '<span style="font-size:10px">'+convertDate(time)+'</span>';
        append_list += '</li>';
        $("#msg_list").append(append_list);
    });

    // Refresh the page after an element is removed or changed
    ref.on('child_removed',function(child){
        location.reload();
    });

    ref.on ('child_changed',function(child){
        location.reload();
    })

    $(document).on('click','[class*="edit_"]',function(){
        // Getting the message key from the class attr
        let class_name = $(this).attr("class");
        let start_pos = class_name.search("edit_") + 5;
        let firebase_key = class_name.slice(start_pos);

        // Load the modal confirmation page
        $("#edit_modal").load("./edit_modal.html",function(){
            $("#edit_modal").modal('show');

            $("#edit_message").val($(".msg_"+firebase_key).text());

            // toggle the star (orange/black) when clicked
            $("#edit_star_check").click(function(){
                $("#edit_star_check").toggleClass("star_checked");
            });

            // Confirm button and cancel button
            $("#confirm_edit").click(function(){
                $("#edit_modal").modal('hide');
                let updates = {};
                updates["message"] = $("#edit_message").val();
                updates["star"] = $("#edit_star_check").hasClass("star_checked");
                database.ref("msg/"+ firebase_key).update(updates);
            });

            $("#cancel_edit").click(function(){
                $("#edit_modal").modal('hide');
            });
        });
    });


    // Add remove listener to the trash button: removal
    $(document).on('click','[class*="del"]',function(){
        // Getting the message key from the class attr
        let class_name = $(this).attr("class");
        let start_pos = class_name.search("del_") + 4;
        let firebase_key = class_name.slice(start_pos);

        // Load the modal confirmation page
        $("#del_modal").load("./del_modal.html",function(){
            $("#del_modal").modal('show');
            $("#del_msg").text($(".msg_"+firebase_key).text());
            $("#del_time").text(convertDate(firebase_key));

            // Confirm button and cancel button
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