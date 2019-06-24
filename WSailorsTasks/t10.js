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
    httpGet(`${root}&lat=${lat}&lon=${long}`)
        .then(resp => JSON.parse(resp))
        .then(data => makeWeatherTable(weatherDataToArray(data)))
        .catch(err => console.error(err));
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
    let oldTable = document.body.querySelector('#pac-card table');
    if(oldTable)oldTable.remove();

    arr.unshift(['Date','Temp,&#x2103;', 'Weather Condition']); // add starting row with table head captions
    let table = arrayToTableDOMStyle(arr, {class: 'table table-bordered table-responsive'});

    document.body.querySelector('#pac-card').appendChild(table);
}


function arrayToTableDOMStyle(data, attrs) {
    var table = document.createElement("table");

    function setAttributes(elem, obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                elem.setAttribute(prop, obj[prop]);
            }
        }
    }

    setAttributes(table, attrs);

    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");

    //creating table head
    data[0].forEach(function(el) {
        var th=document.createElement("th");
        th.innerHTML = el;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);

    //creating table body
    table.appendChild(thead);
    data.forEach(function(rowElement, i) {
        if(i===0)return;//skip first data row - it is in the head
        var tr = document.createElement("tr");
        rowElement.forEach((element, j) =>{
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(element));
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

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
