'use strict';


$(document).ready(function() {

    $(window).scroll(function() {

            $('.hide').each( function(i){

                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height();

                if(bottom_of_window > bottom_of_object) {

                    $(this).animate({'opacity':'1'},2000);

                }
            });
        }
    );


});


var przyciskZmianaTla = $('.przycisk-zmiana-tla');
var $zajawka = $('#zajawka4');

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

function zmianaTla (){
    $("#zajawka1").fadeOut(4000, function(){
        $('#zajawka2').fadeOut(4000, function(){
            $('#zajawka1').fadeIn(4000, function () {
                $('#zajawka2').show();
            });
        });
    });
}

zmianaTla();

var InterwalowaZmianaTla = setInterval(zmianaTla, 12000);


$(document).ready(function(){
    return InterwalowaZmianaTla;
});


przyciskZmianaTla.on('click', function(event){      //funkcja zmieniająca tło przy użyciu przycisków
    event.preventDefault();
    clearInterval(InterwalowaZmianaTla);
    var nrPrzycisku = $(this).attr('id');   //zmienna ustalająca który przycisk został naciśnięty
    console.log(nrPrzycisku);
    switch (nrPrzycisku) {             //w zależności który przycisk został naciśnięty takie tło zostaje ustawione
        case "tlo1":
            $zajawka.css({
                opacity: 100,
                backgroundImage: 'url("images/fota-glowna.jpeg")'
            });
            break;
        case "tlo2":
            $zajawka.css({
                opacity: 100,
                backgroundImage: 'url("images/fota-glowna2.jpeg")'
            });
            break;
        case "tlo3":
            $zajawka.css({
                opacity: 100,
                backgroundImage: 'url("images/fota-glowna3.jpeg")'
            });
            break;
    }
    $('#zajawka1, #zajawka2, #zajawka3').css({
        opacity: 0
    });
});




