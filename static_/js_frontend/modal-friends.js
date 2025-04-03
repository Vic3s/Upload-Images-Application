$(document).ready(function(){

    $('.friends-menu-button').click(function() {
        $.ajax({

            url: '/profile',
            type: 'get',
            contentType: 'application/json',
            data: {
            }, 
            success: function(response){
                $('.friends-modal').addClass('friends-modal-active')
                $('html').css('overflow','hidden')

            }
        })
    })
    $('.close-modal').click(function() {
        $.ajax({

            url: '/profile',
            type: 'get',
            contentType: 'application/json',
            data: {
            }, 
            success: function(response){
                $('.friends-modal').removeClass('friends-modal-active')
                $('html').css('overflow-y','scroll')

                
            }
        })
    })

})
    