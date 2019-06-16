// Example 1
let a1 = 'Text';
let b1 = a1;//basic type = true copy
a1 = 'another text'; //b=='Text'
console.log('a1 = ', a1);
console.log('b1 = ', b1);

// Example 2
let a2 = 28;
let b2 = a2;//basic type = true copy
a2 = 41;//b==28
console.log('a2 = ', a2);
console.log('b2 = ', b2);

// Example 3
let a3 = {
    name: 'Ivan Ivanov',
    age: 41,
};
let b3 = a3;//object type = link copy
let b3_clone = shallowCopy(a3);
a3.name = 'Igor Petrov';//b3.name=='Igor Petrov'
console.log('a3 = ', a3);
console.log('b3 = ', b3);
console.log('b3_clone = ', b3_clone);

// Example 4
let a4 = [1, 3, 5, 7, 9];
let b4 = a4;//object type = link copy
let b4_clone = [...a4];//graceful array copy
b4_clone.push(0);//modifying clone
a4 = [2, 4, 6, 8, 10];//changing a4 link, b4 link stays ==[1,3,5,7,9]
console.log('a4 = ', a4);
console.log('b4 = ', b4);
console.log('b4_clone = ', b4_clone);

// Example 5
let a5 = [1, 2, 3, 4, 5];
let b5 = a5;//object type = link copy
let b5_clone = [...a5];//graceful array copy
a5[0] = 0;//changing initial object data a5==b5==[0,2,3,4,5]
console.log('a5 = ', a5);
console.log('b5 = ', b5);
console.log('b5_clone = ', b5_clone);

// Example 6
let a6 = [1, 2, 3, 4, 5];
let b6 = a6;//object type = link copy
let b6_clone = [...a6];//graceful array copy
a6.push(6);//changing initial object data a6==b6==[1,2,3,4,5,6]
console.log('a6 = ', a6);
console.log('b6 = ', b6);
console.log('b6_clone = ', b6_clone);

// Example 7
let a7 = [{
    name: 'Vasya',
    age: 12
}, {
    name: 'Misha',
    age: 14
}, {
    name: 'Pavel',
    age: 13
}];
let b7 = a7;//object type = link copy
let b7_clone_shallow = shallowCopy(a7);//making object with links to basic array objects
let b7_clone_shallow2 = [...a7];//making array with links to basic array objects
let b7_clone_deep = JSON.parse(JSON.stringify(a7));//deep copy with conversion to JSON . restrictions (!!!)
//lose any Javascript property that has no equivalent type in JSON, like Function or Infinity.
// Any property that’s assigned to undefined will be ignored by JSON.stringify, causing them to be missed on the cloned object.
//Also, some objects are converted to strings, like Date objects for example
// (also, not taking into account the timezone and defaulting to UTC), Set, Map and many others
//!!! This only works if you do not have any inner objects and functions, but just values. !!!

let b7_clone_deep2 = deepCopy(a7, false, true);//deep copy with custom recursive function
//let b7_clone_deep3 =lodash.clonedeep(a7);

a7.map((obj) => {
    obj.name = obj.name + ' Pupkin';
    obj.age = obj.age;
});//changing initial object data with map+callback function
console.log('a7 = ', a7);//+Pupkin
console.log('b7 = ', b7);//+Pupkin
console.log('b7_clone_shallow = ', b7_clone_shallow);
console.log('b7_clone_shallow2 = ', b7_clone_shallow2);
console.log('b7_clone_deep = ', b7_clone_deep);
console.log('b7_clone_deep2 = ', b7_clone_deep2);




function shallowCopy(obj) {
    let clone = {};
    for (let prop in obj) clone[prop] = obj[prop];
    return clone;
}


// obj — копируемый объект
// copyProto — будет ли скопирован прототип объекта
// copyNested — будут ли клонированы объекты, вложенные в текущий или сохранятся в виде ссылок
// в глобальный объект добавляем свойство
// определяем функцию deepCopy
function deepCopy(obj, copyProto, copyNested) {
    // создаем функцию-конструктор
    function Create() {
        // перебираем элементы объекта
        for (let item in obj) {
            // если у объекта есть свойство, то копируем его
            if (obj.hasOwnProperty(item)) {
                // через рекурсию копируем вложенные свойства
                this[item] = (copyNested && typeof obj[item] == "object") ? deepCopy(obj[item], true, true) : obj[item];
            }
        }
    }

    // если необходимо, то копируем прототип
    if (copyProto && "__proto__" in obj) {
        Create.prototype = obj.__proto__;  // IE затупит
    }

    // создаем и возвращаем экземпляр конструктора
    return new Create();
}


function cloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(obj[i] != null &&  typeof(obj[i])=="object")
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}