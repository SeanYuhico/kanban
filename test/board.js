$( document ).ready(function() {
    $('.add-lane-form').toggle();
    $(".edit").click(function() {
        $(this).hide();
        $(".description-container").addClass("description-editable");
        $(".description-text").attr("contenteditable", "true");
        $(".save").show();
      });
      
      $(".save").click(function() {
        $(this).hide();
        /*
            This is where you save the text
            description-text will contain the new text
            save contents of description-text to db
        */
    
        $(".description-container").removeClass("description-editable");
        $(".description-text").removeAttr("contenteditable");
        $(".edit").show();
    });
    
    $(document).on( "click", function( event ) {
        if (event.target.matches(".add-lane-toggle")) {
            $('.add-lane-form').toggle();
        } else if (!event.target.matches(".add-lane-form") && $('.add-lane-form').is(":visible") === true) {
            $('.add-lane-form').toggle();
        } 
    });

    $("button#save-edit-card").click(function(){


        let id = $(this).attr("data-id"),
            name = $("#edit-card-name").text(),
            desc = $("#edit-card-desc").text(),
            img = $("#edit-img").val();

        console.log(id);
        console.log(name);
        console.log(desc);
        console.log(img);
        
        $.ajax({
            url: "../board/" + id,
            method: "PUT",
            data:{
                id: id,
                cardname: name,
                carddesc: desc,
                filename: img
            }, 
            success: function(result){
                console.log(result);
                
                //place db shit here
                
            }
        });
        /*
         $.ajax({
                type:'PUT',
                url: '/events/update/'+$(this).data('id'),
                data: {event_name: change}
            }).done(function(response){
                console.log(response);
                window.location.replace('http://localhost:3030/');
            }).fail(function(response){
                console.log("Oops not working");
            });
            

            
    });
});
        */
    });
});