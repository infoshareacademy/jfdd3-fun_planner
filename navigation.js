'use strict';

function changeConditionNavigationButton(nodeAtags) {
    var $nodeInNavigation = $('nav li a');

        $nodeInNavigation.removeClass();
        nodeAtags.addClass('nav-clicked');

}

$(document).ready(function() {
    changeConditionNavigationButton($("[href='#zajawka']"));
});

$(window).on('scroll', function (event) {
    var scrollTop = $(window).scrollTop();

    if (scrollTop < 300) {

        changeConditionNavigationButton($("[href='#zajawka']"));
    }

    if (scrollTop > 400 && scrollTop < 700) {

        changeConditionNavigationButton($("[href='#pozycjaFunkcje']"));
    }

    if (scrollTop > 1000 && scrollTop < 1300) {

        changeConditionNavigationButton($("[href='#pozycjaZespol']"));
    }

    if (scrollTop > 1600 && scrollTop < 1700) {

        changeConditionNavigationButton($("[href='#pozycjaFormularz']"));
    }

});
