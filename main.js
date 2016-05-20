'use strict';

var $odnosnik1 = $('#odnosnik1');
var $odnosnik2 = $('#odnosnik2');
var $odnosnik3 = $('#odnosnik3');
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
};

zmianaTla();

var zmianaInterval = setInterval(zmianaTla, 12000);


$(document).ready(function(){
    return zmianaInterval;
});



$odnosnik3.on('click', function(event){
    event.preventDefault();
    clearInterval(zmianaInterval);
    $zajawka.css({
        opacity: 0,
        backgroundImage: 'url("images/fota-glowna.jpeg")'
    });
    $('#zajawka1').css({
        opacity: 100
    });
    $('#zajawka2').css({
        opacity: 100
    });
    $('#zajawka3').css({
        opacity: 100
    });
    $('#zajawka4').css({
        opacity: 100
    });
});

$odnosnik2.on('click', function(event){
    event.preventDefault();
    clearInterval(zmianaInterval);
    $zajawka.css({
        opacity: 0,
        backgroundImage: 'url("images/fota-glowna2.jpeg")'
    });
    $('#zajawka1').css({
        opacity: 100
    });
    $('#zajawka2').css({
        opacity: 100
    });
    $('#zajawka3').css({
        opacity: 100
    });
    $('#zajawka4').css({
        opacity: 100
    });
});

$odnosnik1.on('click', function(event){
    event.preventDefault();
    clearInterval(zmianaInterval);
    $zajawka.css({
        opacity: 0,
        backgroundImage: 'url("images/fota-glowna3.jpeg")'
    });
    $('#zajawka1').css({
        opacity: 100
    });
    $('#zajawka2').css({
        opacity: 100
    });
    $('#zajawka3').css({
        opacity: 100
    });
    $('#zajawka4').css({
        opacity: 100
    });
});

