
/**
 * Created by robert on 24.05.16.
 */
'use strict';

var $przyciskNowaGra = $('<button>').html("Nowa Gra");
var $BarmanPoz1,
    $BarmanPoz2,
    $BarmanPoz3,
    $Position;

$("#zacznijgre").on("click", function () {
    var $container,
        $gameBoard,
        $form = $(".formularz");


    $form.css({

        display: "none"

    });

    $container = $('#AfterBeer');

    $gameBoard = createTable(20, 10);



    $container.append($przyciskNowaGra);
    $container.append($gameBoard);


});




function createTable(width, height) {
    var $table, $tr, $td;
    $table = $('<table>');
    $table.addClass("tableGra");
    for (var y = 0; y < height; y += 1) {
        $tr = $('<tr>');
        for (var x = 0; x < width; x += 1) {
            $td = $('<td>');
            $td.addClass('cell').attr('x', x).attr('y', y);
            //$td.attr("id",y+'x'+x);
            $tr.append($td);
        }
        $table.append($tr);
    }

    return $table;
}



function moveClient () {

    var Y = getStartPointY ();
    var X = 0;

    function getStartPointY () {
        var yPos = [1, 4, 7];
        return yPos[Math.round((Math.random() * 2))];
    }

    /*function getStartPointX () {
        var xPos = Math.round((Math.random() ));
        return xPos;
    }*/

    var move = setInterval (function() {
        if (X <17) {
            $("tr:eq("+Y+") td:eq("+X+")").removeClass('klient');
            X ++;
            $("tr:eq("+Y+") td:eq("+X+")").addClass('klient').data('IntervalName', move);

        } else {
            clearInterval(move);

            $("tr:eq("+Y+") td:eq("+X+")").removeClass('klient');

        }
    }, 500);

    //console.log(X);

}

function addClient () {
    setInterval(function () {
            moveClient();
    }, 1000);
    //clearInterval(add);
}

function addBartender() {
    $BarmanPoz1 = $('td[x=' + 18 +'][y=' + 8 +']');
    $BarmanPoz2 = $('td[x=' + 18 +'][y=' + 5 +']');
    $BarmanPoz3 = $('td[x=' + 18 +'][y=' + 2 +']');
    //$BarmanPoz1.addClass('barman');
    $Position = $BarmanPoz1;
    $Position.addClass('barman');
}

function actionBartender(key){

    switch (key) {
        case 38:
            moveUp();
            break;
        case 40:
            moveDown();
            break;
        case 32:
            moveBeer();
            break;
    }
}

function moveUp() {
    $Position.removeClass('barman');
    switch ($Position) {
        case $BarmanPoz1:
            $Position = $BarmanPoz2;
            break;
        case $BarmanPoz2:
            $Position = $BarmanPoz3;
            break;
        case $BarmanPoz3:
            console.log('Wyzej sie nie da!');
            break;
    }
    $Position.addClass('barman');
}

function moveDown() {
    $Position.removeClass('barman');
    switch ($Position) {
        case $BarmanPoz1:
            console.log('Nizej sie nie da');
            break;
        case $BarmanPoz2:
            $Position = $BarmanPoz1;
            break;
        case $BarmanPoz3:
            $Position = $BarmanPoz2;
            break;
    }
    $Position.addClass('barman');
}

function grabBeer (rzad, kolumna, interval) {
    var rzadKlienta = rzad-1,
        hitClient = false;

    // console.log(rzadKlienta + ', ' + kolumna );
    if( $("tr:eq(" + rzadKlienta + ") td:eq(" + kolumna + ")").hasClass('klient')) {
        // console.log('ok');
        var StopMove =  $("tr:eq(" + rzadKlienta + ") td:eq(" + kolumna + ")").data('IntervalName');
        clearInterval(StopMove);
        $("tr:eq(" + rzadKlienta + ") td:eq(" + kolumna + ")").removeClass('klient');

        clearInterval(interval);
        $("tr:eq(" + rzad + ") td:eq(" + kolumna + ")").removeClass('piwo');
        hitClient = true;
        addPoint();
    }
    return hitClient
}

function addPoint() {
    console.log('Zdobyles punkt!');

}

function moveBeer () {

    var Y = $Position.attr('y');
    var X = 17;
    var stopBeer;

        var piwo = setInterval(function () {
            if (X > 0) {
                $("tr:eq(" + Y + ") td:eq(" + X + ")").removeClass('piwo');
                stopBeer = grabBeer(Y,X,piwo);
                if (stopBeer===false) {
                    X--;
                    $("tr:eq(" + Y + ") td:eq(" + X + ")").addClass('piwo');
                    grabBeer(Y, X, piwo);
                }
            } else {
                clearInterval(piwo);

                $("tr:eq(" + Y + ") td:eq(" + X + ")").removeClass('piwo');

            }
        }, 100);
        console.log('lejToPIWO');

}

$przyciskNowaGra.on('click', function(){
    addClient();
    addBartender();

    $(document).keydown(function(event){
        event.preventDefault();
        actionBartender(event.which);
    });
});

