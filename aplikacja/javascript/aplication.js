'use strict';

$(document).ready(function () {

    var formatter = new Intl.DateTimeFormat('pl');

    var cityEvents = [
        {name: 'Dream Club', address: 'Sopot, Bohaterów Monte Cassino 53',
            info: 'Suspendisse sed consectetur quam. Duis vel nulla sit amet neque suscipit faucibus. Nullam ut odio tempor, lacinia arcu vitae, efficitur mauris. Vivamus.',
            date: {}, stars: stars(5), foto: 'images1'},
        {name: 'TAN', address: 'Sopot, Bohaterów Monte Cassino 63/6', info: 'Ut ac orci viverra, eleifend odio eu, feugiat quam. Curabitur mattis interdum urna. Ut pulvinar faucibus dictum. Etiam felis nibh, ornare ac.',
            date: {}, stars: stars(5), foto: 'images2'},
        {name: '3 Siostry', address: 'Sopot, Powstańców Warszawy 6', info: 'Suspendisse facilisis lectus tellus, a pulvinar erat iaculis scelerisque. Duis sit amet lacinia ipsum. Nulla vestibulum malesuada arcu ut laoreet. Fusce eget.',
            date: {}, stars: stars(5), foto: 'images3'},
        {name: 'Sfinks700', address: 'Sopot, al. Franciszka Mamuszki 1', info: 'Duis sed ullamcorper ante, a luctus ex. Cras maximus enim vitae massa aliquet ornare sodales sit amet leo. Nullam id sodales sem.',
            date: {}, stars: stars(5), foto: 'images4'},


        {name: 'Miasto Aniołów Club & Restaurant', address: 'Gdańsk, Chmielna 26', info: 'Sed id dui eget libero blandit commodo id et sem. Ut ut ligula ipsum. In hac habitasse platea dictumst. Phasellus ut felis.',
            date: {}, stars: stars(5), foto: 'images5'},
        {name: 'Klub Parlament', address: 'Gdańsk, Świętego Ducha 2', info: 'Duis aliquam arcu quam, molestie varius urna tincidunt a. Phasellus ac mi feugiat, tincidunt leo id, laoreet dolor. Ut a nibh vitae.',
            date: {}, stars: stars(5), foto: 'images6'},
        {name: "Jack's Bar & Restaurant Fahrenheit", address: 'Gdańsk, Długi Targ 39/40', info: 'Vestibulum eget massa dui. Fusce sit amet aliquam mauris, quis tincidunt lacus. Nunc fringilla ultrices lectus ut aliquam. Aliquam id posuere metus.',
            date: {}, stars: stars(5), foto: 'images7'},
        {name: 'Club Echo', address: 'Gdańsk, Wały Jagiellońskie 2/4', info: 'Praesent et tortor vel sem iaculis interdum. Nulla semper dapibus eros et porttitor. Ut condimentum libero id condimentum ultricies. Fusce nibh augue.',
            date: {}, stars: stars(5), foto: 'images8'},


        {name: 'Pokład Gdynia', address: 'Gdynia, al. Jana Pawła II 11', info: 'Fusce lobortis porttitor blandit. Cras diam quam, maximus vel elit eu, auctor euismod dolor. Duis tortor nisl, laoreet non turpis sit amet.',
            date: {}, stars: stars(5), foto: 'images9'},
        {name: 'Blues Club', address: 'Gdynia, Portowa 9', info: 'Curabitur gravida odio lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam sollicitudin quis neque eu.',
            date: {}, stars: stars(5), foto: 'images10'},
        {name: 'Klub Atlantic', address: 'Gdynia, 3 Maja 28', info: 'Donec fringilla quis urna at tristique. Maecenas blandit leo libero, ac dictum dui pulvinar in. Sed quis mi non tortor hendrerit efficitur.',
            date: {}, stars: stars(5), foto: 'images11'},
        {name: 'Desdemona', address: 'Gdynia, Antoniego Abrahama 37', info: 'Curabitur laoreet magna ut nisi accumsan, vel fermentum ipsum vulputate. Duis eget orci sem. Pellentesque ullamcorper justo at augue volutpat, eget tempus.',
            date: {}, stars: stars(5), foto: 'images12'}
    ];

    function randomValue (endOfrange) {

        return (Math.round(Math.random() * (endOfrange -1)) + 1);

    }

    function createDate () {

        var day = randomValue(31);
        var month = randomValue(12);

        //if (day < 10) {
        //    day =  ('0' + day);
        //} else {
        //    day.toString();
        //}
        //
        //if (month < 10) {
        //    month = ('0' + month);
        //} else {
        //    month.toString();
        //}

        return formatter.format(new Date(2016, month, day));
    }
    console.log(createDate());
    console.log(Date.parse(createDate()));
    function stars (size) {

        var stars = [];
        var starsNumber = randomValue(size);

        for (var i=0; i < size; i++) {

            if (i < starsNumber ) {
                stars.push('<span class="glyphicon glyphicon-star-empty star-fill"></span>');
            } else {
                stars.push('<span class="glyphicon glyphicon-star-empty"></span>');
            }

        }

        return stars = stars.toString().replace(/,/g,'');

    }

    function randomCityEvent (tableSize) {

        var randomCityEventTable = [];

        for(var i = 0; i < tableSize; i++) {

            var possibleValues = Math.round(Math.random() * ((cityEvents.length) - 1));

            randomCityEventTable.push({
                name: cityEvents[possibleValues].name,
                address: cityEvents[possibleValues].address,
                info: cityEvents[possibleValues].info,
                date: createDate(),
                stars: cityEvents[possibleValues].stars,
                foto: cityEvents[possibleValues].foto
            });
        }


        //return randomCityEventTable;
        return randomCityEventTable.sort(function (a, b) {

            return (Date.parse(a.date)) - (Date.parse(b.date));

        });

    }

    function showRandomCityEvents () {

        var $ul = $('<ul class="media-list list-box">');

        $('.events').append($ul);

        randomCityEvent(100).forEach(function (i) {

            $ul.append('<li class="media list-element"><div class="media-body"><h4 class="media-heading">'
                    + i.name +'<br/><small>'
                    + i.address +'</small></h4>'
                    + i.info +'<div class="star">'
                    + i.stars +'</div></div><div class="media-right"><h4 class="media-heading">'
                    + i.date +'</h4><a href="#"><img class="media-object" src="images/'
                    + i.foto +'.jpg" alt=""></a></div></li>'

            );

        });

        sortCityEvents();
    }

    function sortCityEvents () {

        $( '.media-list' ).sortable({
            connectWith: '.media-list',
            containment: '.row',
            cursor: 'move'

        }).disableSelection();
    }

    showRandomCityEvents ();

});