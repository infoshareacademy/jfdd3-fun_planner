'use strict';
$(document).ready(function () {

    var clientTime = 500;
    var comment;
    var musicTheme;
    var musicBeer;
    var musicGameOver;
    var crashBeer;

    var intervalIds = [];
    var setInterval = function (f, delay) {
        var intervalId = window.setInterval(f, delay);
        intervalIds.push(intervalId);
        return intervalId;
    };
    var clearAllIntervals = function () {
        intervalIds.forEach(clearInterval);
    };


    var $buttonNewGame = $('<button class="button-new-game">').html("Nowa Gra");

    var $BarmanPos1,
        $BarmanPos2,
        $BarmanPos3,
        $Position,
        $BarmanPos1Head,
        $BarmanPos2Head,
        $BarmanPos3Head,
        $PositionHead;

    var score = 0;

    $('form').submit(function(event) {
        event.preventDefault();
        console.log('submit');
        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        if (!isEmail($('#email').val())) {
            alert('To nie jest mail!');
        } else {


            var $container,
                $gameBoard,
                $form = $(".form");
            $form.css({
                display: "none"
            });

            $container = $('#AfterBeer');
            $gameBoard = createTable(20, 10);
            $container.append($gameBoard);
            $gameBoard.append('<div class="score">Score: ' + score);

            newGame(0);
        }
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

                $tr.append($td);
            }
            $table.append($tr);
        }

        return $table;
    }

    function moveClient() {

        var Y = getStartPointY();
        var X = 0;

        function getStartPointY() {
            var yPos = [1, 4, 7];
            return yPos[Math.round((Math.random() * 2))];
        }

        var typeOfClientRandom = ['client1', 'client2', 'client3', 'client4'];
        var typeOfClient = typeOfClientRandom[Math.round(Math.random() * 3)];

        var move = setInterval(function () {
            if (X < 17) {
                $("tr:eq(" + Y + ") td:eq(" + X + ")").removeClass(typeOfClient);
                X++;
                $("tr:eq(" + Y + ") td:eq(" + X + ")").addClass(typeOfClient).data('IntervalName', move);
                $("tr:eq(" + Y + ") td:eq(" + X + ")").data('ClientName', typeOfClient);

            } else {
                clearInterval(move);

                $("tr:eq(" + Y + ") td:eq(" + X + ")").removeClass(typeOfClient);

                gameOver()
            }
        }, clientTime);
    }

    var clientInterval = 500;

    function addClient() {
        setInterval(function () {
            moveClient();
        }, clientInterval);

    }

    function addBartender() {
        $BarmanPos1 = $('td[x=' + 18 + '][y=' + 8 + ']');
        $BarmanPos2 = $('td[x=' + 18 + '][y=' + 5 + ']');
        $BarmanPos3 = $('td[x=' + 18 + '][y=' + 2 + ']');
        $BarmanPos1Head = $('td[x=' + 18 + '][y=' + 7 + ']');
        $BarmanPos2Head = $('td[x=' + 18 + '][y=' + 4 + ']');
        $BarmanPos3Head = $('td[x=' + 18 + '][y=' + 1 + ']');
        $Position = $BarmanPos1;
        $PositionHead = $BarmanPos1Head;
        $Position.addClass('barman');
        $PositionHead.addClass('barman-head');
    }

    function actionBartender(key) {

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
        $PositionHead.removeClass('barman-head');
        switch ($Position) {
            case $BarmanPos1:
                $Position = $BarmanPos2;
                $PositionHead = $BarmanPos2Head;
                break;
            case $BarmanPos2:
                $Position = $BarmanPos3;
                $PositionHead = $BarmanPos3Head;
                break;
            case $BarmanPos3:
                console.log('Wyzej sie nie da!');
                break;
        }
        $Position.addClass('barman');
        $PositionHead.addClass('barman-head');
    }

    function moveDown() {
        $Position.removeClass('barman');
        $PositionHead.removeClass('barman-head');
        switch ($Position) {
            case $BarmanPos1:
                console.log('Nizej sie nie da');
                break;
            case $BarmanPos2:
                $Position = $BarmanPos1;
                $PositionHead = $BarmanPos1Head;
                break;
            case $BarmanPos3:
                $Position = $BarmanPos2;
                $PositionHead = $BarmanPos2Head;
                break;
        }
        $Position.addClass('barman');
        $PositionHead.addClass('barman-head');
    }

    function grabBeer(row, column, interval) {
        var clientRow = row - 1,
            hitClient = false;

        var typeOfClient = $("tr:eq(" + clientRow + ") td:eq(" + column + ")").data('ClientName');


        if ($("tr:eq(" + clientRow + ") td:eq(" + column + ")").hasClass(typeOfClient)) {

            var StopMove = $("tr:eq(" + clientRow + ") td:eq(" + column + ")").data('IntervalName');

            clearInterval(StopMove);
            $("tr:eq(" + clientRow + ") td:eq(" + column + ")").removeClass(typeOfClient);

            clearInterval(interval);
            $("tr:eq(" + row + ") td:eq(" + column + ")").removeClass('piwo');
            hitClient = true;
            addPoint();
        }
        return hitClient
    }

    function addPoint() {

        score += 10;
        $('div.score').html('Score: ' + score);
        if (score <= 70) {
            clientTime = 500;
        } else if (score <= 120) {
            clientTime = 350;
            clientInterval = 100;
        } else if (score <= 170) {
            clientTime = 200;
            clientInterval = 70;
        } else if (score <= 320) {
            clientTime = 150;
            clientInterval = 50;
        } else if (score <= 500) {
            clientTime = 100;
            clientInterval = 20;
        }
    }

    function moveBeer() {

        var Y = $Position.attr('y');
        var X = 18;
        var stopBeer;

        musicBeer = new Audio('game/music/beer.mp3');
        musicBeer.play();

        var piwo = setInterval(function () {
            if (X > 0) {
                $("tr:eq(" + Y + ") td:eq(" + X + ")").removeClass('piwo');
                stopBeer = grabBeer(Y, X, piwo);
                if (stopBeer === false) {
                    X--;
                    $("tr:eq(" + Y + ") td:eq(" + X + ")").addClass('piwo');
                    grabBeer(Y, X, piwo);
                }
            } else {
                clearInterval(piwo);

                $("tr:eq(" + Y + ") td:eq(" + X + ")").removeClass('piwo');
                crashBeer = new Audio('game/music/crash.mp3');

                crashBeer.play();
                gameOver();
            }
        }, 70);

    }

    function newGame(status) {
        if (status === 0) {
            $('.tableGra').append('<div class="apla-start">');
            $('.apla-start').append($buttonNewGame);
        }
        if (status === 1) {
            $('.tableGra').append('<div class="apla-loose">');
            $('.apla-loose').append('<div class="apla-comment-result">');
            $('div.apla-comment-result').text(comment);

            $('.apla-loose').append('<div class="apla-loose-finalscore">');
            $('.apla-loose-finalscore').append($('div.score').text());
            $buttonNewGame.addClass('button-end-game');
            $('.apla-loose').append($buttonNewGame);
        }
    }

    function chooseComment(score) {
        if (score <= 100) {
            comment = 'Słabo, spróbuj jeszcze raz!';
        } else if (score <= 200) {
            comment = 'Może być. Pij więcej!';
        } else if (score <= 300) {
            comment = 'Brawo, shot dla Ciebie!';
        } else if (score > 300) {
            comment = "Słuchasz Lionela Richie, szacun!";
        } else if (score > 500) {
            comment = "Rewelacja! I o to chodzi!";
        }
        return comment;
    }

    function gameOver() {

        musicTheme.pause();

        function gameOverMusic(score) {
            if (score <= 50) {
                musicGameOver = new Audio('game/music/gameover1.mp3');
            } else if (score <= 100) {
                musicGameOver = new Audio('game/music/gameover2.mp3');
            } else if (score <= 150) {
                musicGameOver = new Audio('game/music/gameover3.mp3');
            } else if (score <= 250) {
                musicGameOver = new Audio('game/music/gameover4.mp3');
            } else if (score <= 350) {
                musicGameOver = new Audio('game/music/gameover5.mp3');
            } else {
                musicGameOver = new Audio('game/music/gameover6.mp3');
            }
            musicGameOver.play();
        }

        gameOverMusic(score);


        chooseComment(score);
        clientTime = 500;
        clientInterval = 500;
        newGame(1);
        clearAllIntervals();
        score = 0;
        $('div.score').html('Score: ' + score);

        $(document).off('keydown');
    }

    $buttonNewGame.on('click', function () {
        $('.apla-start').css({display: "none"});
        $('.apla-loose').css({display: "none"});
        $('.apla-loose-finalscore').css({display: "none"});
        if (musicGameOver !== undefined) {
            musicGameOver.pause();
        }

        $(".piwo, .barman, .barman-head, .client1, .client2, .client3, .client4").attr("class", "").addClass("cell");

        musicTheme = new Audio('game/music/theme.mp3');
        musicTheme.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);

        musicTheme.play();

        addClient();
        addBartender();

        $(document).off('keydown').keydown(function (event) {
            event.preventDefault();
            actionBartender(event.which);
        });
    });
});