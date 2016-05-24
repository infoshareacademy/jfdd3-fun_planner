
/**
 * Created by robert on 24.05.16.
 */
'use strict';


$("#zacznijgre").on("click", function () {
    var $container,
        $gameBoard,
        $form = $(".formularz");


    $form.css({

        display: "none"

    });

    $container = $('#AfterBeer');

    $gameBoard = createTable(15, 10);


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
            $td.addClass('cell');
            $tr.append($td);
        }
        $table.append($tr);
    }

    return $table;
}



