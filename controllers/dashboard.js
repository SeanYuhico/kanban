$(document).ready(function(){
    // TODO: put script for update and delete
    $("button.delete").click(function(){
        console.log($(this).attr("data-id"))
        $.ajax({
            url: "delete",
            method: "POST",
            data:{
                id: $(this).attr("data-id")
            },
            success: function(result){
                if(result.ok == 1){
                    alert("successfully deleted")
                    $("tr[data-id='"+id+"']").remove()
                } else {
                    alert("something went wrong")
                }
            }
        })
    })
})