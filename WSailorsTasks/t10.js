function initMap() {
    var input = document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name']);


    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        //MY CODE BEGIN------------------------------------------------------------------------------------
        getWeather(place.geometry.location.lat(),place.geometry.location.lng());
        //MY CODE END--------------------------------------------------------------------------------------

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    });

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

// get weather data according to the location
function getWeather(lat, long) {
    const root = "https://api.openweathermap.org/data/2.5/forecast?appid=0b078dc7f8ba04372a3c93f3eecba42c&units=metric";


    fetch(`${root}&lat=${lat}&lon=${long}`, { method: "get" })
        .then(resp => resp.json())
        .then(data => {
            makeWeatherTable(weatherDataToArray(data));
        })
        .catch(function(err) {
            console.error(err);
        });
}

function weatherDataToArray(weatherData){
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
}

function getDateTimeStringFromUnixUTC(dateUnixUTC) {
    let date = new Date(parseInt(dateUnixUTC)*1000);
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
}


function httpGet(url) {

    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });
}

httpGet("https://eugenebutovka.github.io/user.json")
    .then(
        response => console.log(`Fulfilled: ${response}`),
        error => console.log(`Rejected: ${error}`)
    );
