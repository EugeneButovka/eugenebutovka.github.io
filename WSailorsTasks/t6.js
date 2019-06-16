let  min= Number(prompt("введите минимальное значение", "0"));
let  max= Number(prompt("введите максимальное значение", "5"));

let arr=[max - min];
fillArray(arr,min,max);
console.log("Массив изначальный: ",arr);
console.log("Элементов: ", arr.length);
let arr_clone=[...arr];
//arr_clone[0]=77;
console.log("Массив клонированный: ",arr_clone);
let arr_filtered=filterArray(arr_clone);
console.log("Массив фильтрованный: ",arr_filtered);

function fillArray(array,min,max){
    min=min||0;
    max=max||0;
    let counter=0;
    for(let i=min;i<max;++i){
        array[counter++]=i;
    }
}

function filterArray(array) {
    return array.filter((item)=>{return item%3==1;});
}


