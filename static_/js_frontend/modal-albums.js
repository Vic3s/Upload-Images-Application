$(document).ready(function(){

    $('#btn-create-album').click(function() {
        $('.albums-modal').addClass('albums-modal-active')
    })

    $('.close-modal').click(function() {
        $('.albums-modal').removeClass('albums-modal-active')
    })
})