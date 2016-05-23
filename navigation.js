'use strict';

// zmiana stanu przycisku nawigacji

function navClicked() {
    var $node = $('nav li a');

    $node.click(function () {
        $node.removeClass();
        $(this).addClass('nav-clicked');
    })
}

// odczytywanie pozycji strony

//???????

navClicked();