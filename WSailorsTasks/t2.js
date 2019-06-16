function dayToString_if(day) {
    let day_number=+day;
    if (day_number == 1) return "понедельник";
    if (day_number == 2) return "вторник";
    if (day_number == 3) return "среда";
    if (day_number == 4) return "четверг";
    if (day_number == 5) return "пятница";
    if (day_number == 6) return "суббота";
    if (day_number == 7) return "воскресенье";
    return "нет такого дня";
}

function dayToString_switch(day) {
    let result;
    let day_number=+day;

    switch (day_number) {
        case 1:
            result="понедельник";
            break;
        case 2:
            result="вторник";
            break;
        case 3:
            result="среда";
            break;
        case 4:
            result="четверг";
            break;
        case 5:
            result="пятница";
            break;
        case 6:
            result="суббота";
            break;
        case 7:
            result="воскресенье";
            break;
        default:
            result="нет такого дня";
            break;
    }

    return result;
}


//MAIN
let day = prompt("введите номер дня недели", 1);
let dayIfUse=dayToString_if(day);
let daySwitchUse=dayToString_if(day);


console.log ("if use: ", dayIfUse);
document.getElementById("out1").innerHTML="if use: "+String(dayIfUse);

console.log ("switch use: ", daySwitchUse);
document.getElementById("out2").innerHTML="switch use: "+String(daySwitchUse);


