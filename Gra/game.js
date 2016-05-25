
/**
 * Created by robert on 24.05.16.
 */
'use strict';

var $przyciskNowaGra = $('<button>').html("Nowa Gra");

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
            $td.addClass('cell').attr("pozY", y).attr("pozX", x);
            $tr.append($td);
        }
        $table.append($tr);
    }

    return $table;
}

function getStartPointY () {
    var yPos = [1, 4, 7];
    return yPos[Math.round((Math.random() * 2))];
}

function getStartPointX () {
    var xPos = Math.round((Math.random() * 10));
    return xPos;
}

var Y = getStartPointY ();
var X = getStartPointX ();

function moveClient () {

    var move = setInterval (function() {
        if (X <17) {
            $("tr:eq("+Y+") td:eq("+X+")").removeClass('red');
            X ++;
            $("tr:eq("+Y+") td:eq("+X+")").addClass('red');
            console.log(X);
        } else {
            clearInterval(move);
            alert('koniec');
            $("tr:eq("+Y+") td:eq("+X+")").removeClass('red');

        }
    }, 500);


}

$przyciskNowaGra.on('click', function(){
    moveClient ();
});

console.log(X);


