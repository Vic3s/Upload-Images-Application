$(document).ready(function () {

    $('.private-albums').prop("disabled", true);

    $('.public-albums').on('click', function(){
        $('#slider-sections')
        .animate({right: "+=1382.4px",
                left: '-=1382.4px'
        })
        $('.private-albums').prop("disabled", false);
        $(this).prop("disabled", true);
    })

    $('.private-albums').on('click', function(){
        $('#slider-sections')
        .animate({left: '+=1382.4px',
                  right: '-=1382.4px'
        })
        $('.public-albums').prop("disabled", false);
        $(this).prop("disabled", true);


    })
})