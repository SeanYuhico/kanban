



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
    
    
});
$(document).on( "click", function( event ) {
    console.log("1");
    if (event.target.matches(".add-lane-toggle")) {
        console.log("1.2");
        $('.add-lane-form').toggle();
    } else if (!event.target.matches(".add-lane-form") && $('.add-lane-form').is(":visible") === true) {
        console.log("1.1");
        $('.add-lane-form').toggle();
    } 
});