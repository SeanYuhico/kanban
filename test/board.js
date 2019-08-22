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

    // this is for editing a lane
    $(".lanename").click(function() {
        let lane = this;
        $(document).on( "click", function( event ) {

            // new name gets saved when you click outside the doc
            if (!event.target.matches(lane)) {
                let id = $(lane).attr("data-id"),
                    name = lane.text();

                $.ajax({
                    url: "../edit-lanename/" + id,
                    method: "PUT",
                    data:{
                        id: id,
                        listname: name
                    }, 
                    success: function(result){
                        console.log(result);
                        
                        //place db shit here
                        
                    }
                });
            }
        });
    });

    // this is for editing a lane
    $("#boardname").click(function() {
        let board = this;
        $(document).on( "click", function( event ) {

            // new name gets saved when you click outside the doc
            if (!event.target.matches(board)) {
                let id = $("#boardname").attr("data-id"),
                    name = lane.text();

                $.ajax({
                    url: "../edit-boardname/" + id,
                    method: "PUT",
                    data:{
                        id: id,
                        boardname: name
                    }, 
                    success: function(result){
                        console.log(result);
                        
                        //place db shit here
                        
                    }
                });
            }
        });
    });


    // this is for adding  a lane
    $("button#new-lane-button").click(function(){
        let name = $("#new-lane-name").text();

        // let boardid = ???
        console.log(name);
        
        $.ajax({
            url: "../new-lane/" + id,
            method: "POST",
            data:{
                listname: name
            }, 
            success: function(result){
                console.log(result);
                
                //place db shit here
                
            }
        });
    });

    // this is for adding a card
    // this needs to be changed to accomodate the list id since wala pa yun
    $("button#save-new-card").click(function(){
        let name = $("#new-card-name").text(),
            desc = $("#new-card-desc").text(),
            img = $("#new-img").val();

        // let listid = ???

        console.log(name);
        console.log(desc);
        console.log(img);
        
        $.ajax({
            url: "../new-card/" + id,
            method: "POST",
            data:{
                cardname: name,
                carddesc: desc,
                filename: img
            }, 
            success: function(result){
                console.log(result);
                
                //place db shit here
                
            }
        });
    });


    // this is for updating a card
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
            url: "../edit-card/" + id,
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
    });
});