// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13
    });
    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        //MY CODE BEGIN
        getWeather(place.geometry.location.lat(),place.geometry.location.lng());
        //console.log(place.geometry.location.lat(),place.geometry.location.lng());
        //getWeather(place.geometry.location);//transfer location to outer code
        //currLocation = place.geometry.location;
        //MY CODE END

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        radioButton.addEventListener('click', function () {
            autocomplete.setTypes(types);
        });
    }

    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);

    document.getElementById('use-strict-bounds')
        .addEventListener('click', function () {
            console.log('Checkbox clicked! New state=' + this.checked);
            autocomplete.setOptions({strictBounds: this.checked});
        });
}


function getWeatherJQ(lat, long) {
    $.getJSON(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=0b078dc7f8ba04372a3c93f3eecba42c&units=metric`,
        function (data) {
            console.log(data);
        }
    );


    //https://samples.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid=0b078dc7f8ba04372a3c93f3eecba42c
    /*$.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            id: "2172797",
            APPID: "35000cdad97645316c048563e4183021"
        },
        success: function( response ) {
            console.log( response ); // server response
            $('.current').html('<img src="http://openweathermap.org/img/w/' + response.weather[0].icon + '.png" /> ' + response.weather[0].main);
        }
    });*/
}

// get weather data according to the location
function getWeather(lat, long) {
    let result;
    const root = "https://api.openweathermap.org/data/2.5/forecast?appid=0b078dc7f8ba04372a3c93f3eecba42c&units=metric";
    fetch(`${root}&lat=${lat}&lon=${long}`, { method: "get" })
        .then(resp => resp.json())
        .then(data => {

            makeWeatherTable(weatherDataToArray(data));
            /*
            let weatherTable = arrayToTable(weatherDataToArray(data), {
                thead: true,
                attrs: {class: 'table'}
            });
            $('body').append(weatherTable);
            */
            //console.log(data);
            //makeWeatherTable(data);
            //console.log(weatherDataToArray(data));
        })
        .catch(function(err) {
            console.error(err);
        });
    //return result;
}
/*
var options = {
    era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};
*/

function weatherDataToArray(weatherData){
    /*
    console.log(weatherData.city.name);
    console.log(weatherData.list[0].main.temp);
    console.log(weatherData.list[0].weather[0].main);
    console.log(weatherData.list[0].dt);
    var date = new Date(+weatherData.list[0].dt*1000);
    console.log(date.getMinutes().toString().length);
    console.log(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().length<2?"0"+date.getMinutes():date.getMinutes()}`);
    //console.log(date.toLocaleString("ru", options));
    */
    let arr = [];
    let arrRow = [];

    for(let currData of weatherData.list){
        arrRow.push(getDateTimeStringFromUnixUTC(currData.dt));
        arrRow.push(currData.main.temp);
        arrRow.push(currData.weather[0].main);
        arr.push(arrRow);
        arrRow = [];
    }
    return arr;
    //console.log(getDateTimeStringFromUnixUTC(weatherData.list[0].dt));
}

function getDateTimeStringFromUnixUTC(dateUnixUTC) {
    let date = new Date(parseInt(dateUnixUTC)*1000);
    //console.log(date.getMinutes().toString().length);
    //console.log(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().length<2?"0"+date.getMinutes():date.getMinutes()}`);
    let standardFormatTime = `${date.getHours()}:${date.getMinutes().toString().length<2?"0"+date.getMinutes().toString():date.getMinutes().toString()}`;
    let standardFormatDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

    return `${standardFormatDate} ${standardFormatTime}`;
}

function makeWeatherTable(arr)
{
    $('#pac-card table').remove();
    arr.unshift(['Date','Temp,&#x2103;', 'Weather Condition']);
    var table = arrayToTable(arr, {
        thead: true,
        attrs: {class: 'table table-bordered table-responsive'}
    });

    $('#pac-card').append(table);


}




$(document).ready(function(){

    //getWeather(35,139);

/*

    var api = 'http://api.openweathermap.org/data/2.5/weather?id=2172797&APPID=35000cdad97645316c048563e4183021';
        api = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=0b078dc7f8ba04372a3c93f3eecba42c";
        //api = "http://api.openweathermap.org/data/2.5/weather?id=2172797&appid=0b078dc7f8ba04372a3c93f3eecba42c";
    $.getJSON(api, {format:'json'},function(data){console.log(data.weather, "\n", data.main.temp)});
*/

/*
    var data = [['Name', 'Age', 'Email'],['John Doe', '27', 'john@doe.com'],['Jane Doe', '29', 'jane@doe.com']];

    var table = arrayToTable(data, {
        thead: true,
        attrs: {class: 'table'}
    });

    $('body').append(table);
*/




/*

    weatherData = getWeather(35,139);
    console.log(weatherData);
    var weatherTable = arrayToTable(weatherDataToArray(weatherData), {
        thead: true,
        attrs: {class: 'table'}
    });
    $('body').append(weatherTable);*/

});




//BODY
//getWeatherJQ(35,139);

//console.log(getWeather2(35,139));
//console.log(getWeather2);



function arrayToTable(data, options) {

    "use strict";

    var table = $('<table />'),
        thead,
        tfoot,
        rows = [],
        row,
        i,
        j,
        defaults = {
            th: true, // should we use th elemenst for the first row
            thead: false, //should we incldue a thead element with the first row
            tfoot: false, // should we include a tfoot element with the last row
            attrs: {} // attributes for the table element, can be used to
        };

    options = $.extend(defaults, options);

    table.attr(options.attrs);

    // loop through all the rows, we will deal with tfoot and thead later
    for (i = 0; i < data.length; i = i + 1) {
        row = $('<tr />');
        for (j = 0; j < data[i].length; j = j + 1) {
            if (i === 0 && options.th) {
                row.append($('<th />').html(data[i][j]));
            } else {
                row.append($('<td />').html(data[i][j]));
            }
        }
        rows.push(row);
    }

    // if we want a thead use shift to get it
    if (options.thead) {
        thead = rows.shift();
        thead = $('<thead />').append(thead);
        table.append(thead);
    }

    // if we want a tfoot then pop it off for later use
    if (options.tfoot) {
        tfoot = rows.pop();
    }

    // add all the rows
    for (i = 0; i < rows.length; i = i + 1) {
        table.append(rows[i]);
    }

    // and finally add the footer if needed
    if (options.tfoot) {
        tfoot = $('<tfoot />').append(tfoot);
        table.append(tfoot);
    }

    return table;
};


