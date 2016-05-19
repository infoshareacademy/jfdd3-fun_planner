
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
                    $('#zajawka1').fadeIn(6000);
            });
        });
    }, 10000);
});



    // $(document).ready(function(){
    // setInterval(function (){
    //     $("#zajawka1").fadeOut(6000);
    //     $('#zajawka2').delay(7000).fadeOut(6000);
    //     // $('#zajawka3').delay(7000).fadeOut(6000);
    //     $('#zajawka1').fadeIn(6000);
    //     $('#zajawka2').delay(7000).fadeIn(6000);
    //
    // },20000);
    //
    // });

//
// function start() {
//
//     $("#zajawka1").fadeOut(6000, function() {
//         $('#zajawka2').delay(3000.fadeOut(6000);
//
//
//         $('#zajawka1').delay(3000).fadeIn(6000, function() {
//             $('#zajawka2').delay(3000).fadeIn(6000, start);
//
//             setTimeout(start, 6000)
//         });
//     })
// }
// start();

