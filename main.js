'use strict';

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
    var nrPrzycisku = $(this).val();   //zmienna ustalająca który przycisk został naciśnięty
    switch (nrPrzycisku) {             //w zależności który przycisk został naciśnięty takie tło zostaje ustawione
        case "1":
            $zajawka.css({
                opacity: 100,
                backgroundImage: 'url("images/fota-glowna.jpeg")'
            });
            break;
        case "2":
            $zajawka.css({
                opacity: 100,
                backgroundImage: 'url("images/fota-glowna2.jpeg")'
            });
            break;
        case "3":
            $zajawka.css({
                opacity: 100,
                backgroundImage: 'url("images/fota-glowna3.jpeg")'
            });
            break;
    }
    $('#zajawka1').css({
        opacity: 0
    });
    $('#zajawka2').css({
        opacity: 0
    });
    $('#zajawka3').css({
        opacity: 0
    });
});


