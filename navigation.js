'use strict';

// zmiana stanu przycisku nawigacji

function changeConditionNavigationButton() {
    var $nodeInNavigation = $('nav li a');

    $nodeInNavigation.click(function () {
        $nodeInNavigation.removeClass();
        $(this).addClass('nav-clicked');
    })
}

// odczytywanie pozycji strony

//???????????????

changeConditionNavigationButton();