function f_input() {
    let input_age_id = document.getElementById("number");
    if( (input_age_id.value > 70) ||
        (document.getElementById("one").checked && document.getElementById("two").checked)){
            alert("Actually, u r a dinosaur o.O");
    }
    else alert("U r ok!");
}
