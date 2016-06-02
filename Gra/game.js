'use strict';

var clientTime = 400;
var comment;
var musicTheme;
var musicBeer;
var crashBeer;
var oldSetInterval = setInterval;
var intervalIds = [];

var setInterval = function(f, delay) {
    var intervalId = oldSetInterval(f, delay);
    intervalIds.push(intervalId);
    return intervalId;
};
var clearAllIntervals = function () {
    intervalIds.forEach(clearInterval);
};

var $przyciskNowaGra = $('<button>').html("Nowa Gra");

var $BarmanPoz1,
    $BarmanPoz2,
    $BarmanPoz3,
    $Position;

var score = 0;

$("#zacznijgre").on("click", function () {
    var $container,
        $gameBoard,
        $form = $(".formularz");

    $form.css({

        display: "none"

    });

    $container = $('#AfterBeer');

    $gameBoard = createTable(20, 10);

    $container.append($gameBoard);

    $gameBoard.append('<div class="score">Score: ' + score);

    nowaGra(0);

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

    var typeOfClientRandom = ['client1', 'client2', 'client3'];
    var typeOfClient = typeOfClientRandom[Math.round(Math.random() * 2)];

    var move = setInterval (function() {
        if (X <17) {
            $("tr:eq("+Y+") td:eq("+X+")").removeClass(typeOfClient);
            X ++;
            $("tr:eq("+Y+") td:eq("+X+")").addClass(typeOfClient).data('IntervalName', move);
            $("tr:eq("+Y+") td:eq("+X+")").data('ClientName', typeOfClient);



        } else {
            clearInterval(move);

            $("tr:eq("+Y+") td:eq("+X+")").removeClass(typeOfClient);

            gameOver()
        }
    }, clientTime);


}

function addClient () {
    setInterval(function () {
            moveClient();
    }, 700);

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

    var typeOfClient =  $("tr:eq(" + rzadKlienta + ") td:eq(" + kolumna + ")").data('ClientName');

    // console.log(rzadKlienta + ', ' + kolumna );
    if( $("tr:eq(" + rzadKlienta + ") td:eq(" + kolumna + ")").hasClass(typeOfClient)) {
        // console.log('ok');
        var StopMove =  $("tr:eq(" + rzadKlienta + ") td:eq(" + kolumna + ")").data('IntervalName');



        clearInterval(StopMove);
        $("tr:eq(" + rzadKlienta + ") td:eq(" + kolumna + ")").removeClass(typeOfClient);

        clearInterval(interval);
        $("tr:eq(" + rzad + ") td:eq(" + kolumna + ")").removeClass('piwo');
        hitClient = true;
        addPoint();
    }
    return hitClient
}

function addPoint() {

    score += 10;
    $('div.score').html('Score: ' + score);
    if (score <= 100) {
        clientTime = 300;
    } else if (score <= 200) {
        clientTime = 200;
    } else if (score <= 300) {
        clientTime = 100;
    }

}

function moveBeer () {

    var Y = $Position.attr('y');
    var X = 18;
    var stopBeer;

    musicBeer= new Audio('beer.mp3');

    musicBeer.play();


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
                crashBeer = new Audio('crash.mp3');

                crashBeer.play();
                gameOver();

            }
        }, 100);
        console.log('lejToPIWO');

}

function nowaGra (status) {
    if (status === 0) {
        $('.tableGra').append('<div class="apla-start">');
        $('.apla-start').append($przyciskNowaGra);
    }
    if (status === 1) {
        $('.tableGra').append('<div class="apla-loose">');
        $('.apla-loose').append('<div class="apla-comment-result">');
        $('div.apla-comment-result').text(comment);


        $('.apla-loose').append('<div class="apla-loose-finalscore">');
        $('.apla-loose-finalscore').append($('div.score').text());
        $('.apla-loose').append($przyciskNowaGra);

    }
}

function chooseComment (score) {
    if (score <= 100) {
        comment = 'Słabo, spróbuj jeszcze raz!';
    } else if (score <= 200) {
        comment = 'Może być. Pij więcej';
    } else if (score <= 300) {
        comment = 'Brawo, szot dla Ciebie!';
    } else if (score > 300) {
        comment = "Słuchasz Lionela Richie, szacun!";
    }
    return comment;
}

function gameOver () {

    musicTheme.pause();
    //window.alert("PRZEGRANA");

    //window.alert("PRZEGRANA");
    chooseComment(score);
    clientTime = 400;
    nowaGra(1);
    clearAllIntervals();
    score = 0;
    $('div.score').html('Score: ' + score);

    $(document).off('keydown');
}
$przyciskNowaGra.on('click', function(){
    $('.apla-start').css({display: "none"});
    $('.apla-loose').css({display: "none"});
    $('.apla-loose-finalscore').css({display: "none"});

    $(".klient, .piwo, .barman, .client1, .client2, .client3").attr("class", "").addClass("cell");



    musicTheme = new Audio('theme.mp3');

    musicTheme.play();


    addClient();
    addBartender();

    $(document).off('keydown').keydown(function(event){
        event.preventDefault();
        actionBartender(event.which);
    });
});