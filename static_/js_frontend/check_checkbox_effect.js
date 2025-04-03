$(document).ready(function(){
    $(".album-li").click(function(){
        if($(this).hasClass('checked-box')){
            $(this).removeClass('checked-box');
            console.log($(this).children('p').html())
        }else{
            $(this).addClass('checked-box');
            $(this).children('p').css("color", "blue")

        }
    })
})