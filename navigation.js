'use strict';

// zmiana stanu przycisku nawigacji

function navClicked(sekcja) {
    var $node = $('nav li a');

    $node.removeClass();
    $(sekcja).addClass('nav-clicked');

}

// odczytywanie pozycji strony

$(window).on('scroll', function (event) {
    //console.log(event);
    var sekcja;
    var scrollTop = $(window).scrollTop();
    var zespolOffset = $('#zespol').offset().top;

    if (zespolOffset - scrollTop < 140) {
        //alert ('zespół')
        navClicked($('[href="#pozycjaZespol"]'));
    }

    console.log(scrollTop, zespolOffset);
});



//navClicked();