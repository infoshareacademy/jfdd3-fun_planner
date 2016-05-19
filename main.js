
$(document).ready(function() {

});

$(document).ready(function() {

    $('a[href^="#"]').on('click', function(event) {

        var target = $( $(this).attr('href') );

        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

});


$(document).ready(function(){
    setInterval(function(){
        $("#zajawka1").fadeOut(6000, function(){
            $('#zajawka2').fadeOut(6000, function(){
                    $('#zajawka1').fadeIn(6000, function () {
                        $('#zajawka2').show();
                    });
            });
        });
    }, 15000);
});



