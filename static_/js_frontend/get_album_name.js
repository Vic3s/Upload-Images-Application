// Get album names when clickling in porofile page

$(document).ready(function() {
    $('.container-album-card').click(function() {

        let index1 = $(this).html().indexOf('<h3');
        let index2 = $(this).html().indexOf('</h3>');
        let subStringName = $(this).html().substring(index1, index2).slice(25);

        $.ajax({
            url: "/details",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({
                title_post: subStringName
            })
            ,success: function(){
                window.location.replace('http://localhost:5000/details')
                // window.location.reload()
            }
        })
    })
})