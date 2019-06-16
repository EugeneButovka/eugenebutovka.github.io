let str = prompt("введите строку", "НННКПРРРРОРППППР");
let sum=0;
const weights={"Н":1, "К":5, "П":2, "Р":4, "О":7};
console.log(weights);

for (let i=0;i<str.length;++i){
    let currWeight=weights[str[i]];
    if(currWeight!==undefined)
    {
        sum+=currWeight;
    }
    else
    {
        alert("no letter weight defined");
        break;
    }
}

console.log(sum);
alert(sum);
