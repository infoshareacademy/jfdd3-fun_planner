'use strict';

var nodeInNavigation = ('nav li a');

function changeConditionNavigationButton(nodeAtags) {

        $(nodeInNavigation).removeClass();
        $(nodeAtags).addClass('nav-clicked');

}

$(document).ready(function() {
    changeConditionNavigationButton(nodeInNavigation +("[href='#zajawka']"));
});

$(window).on('scroll', function () {
    var scrollTop = window.scrollY;

    if (scrollTop < 300) {

        changeConditionNavigationButton(nodeInNavigation +("[href='#zajawka']"));
    }

    if (scrollTop > 400 && scrollTop < 700) {

        changeConditionNavigationButton(nodeInNavigation +("[href='#pozycjaFunkcje']"));
    }

    if (scrollTop > 1400 && scrollTop < 1600) {

        changeConditionNavigationButton(nodeInNavigation +("[href='#pozycjaZespol']"));
    }

    if (scrollTop > 800 && scrollTop < 1300) {

        changeConditionNavigationButton(nodeInNavigation +("[href='#pozycjaFormularz']"));
    }

});
