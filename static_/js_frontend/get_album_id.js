
$(document).ready(function() {
    $('.container-album-card').click(function() {
        let __id = $(this).attr("id")

        $.ajax({
            url: "/details",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({
                id_album: __id
            })
            ,success: function(){
                console.log("success")
                window.location.replace('http://localhost:5000/details')
            }
        })
    })
})