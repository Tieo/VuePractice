let obj = {};
obj.num = 10;
console.log(obj)

let obj2 = {};
obj2['num'] = 20;
console.log(obj2)

let arr = [];
arr[0] = 10; // [10]
arr.push(100); // [10, 100]
arr.push(20); // [10, 100, 20]
arr.splice(0,2,30,40); // 0부터 1번째까지 30, 40으로 변경 
arr.pop()
console.log(arr);


for (let i = 0; i < 10; i++){
    arr.push(i)
}
console.log(arr)


arr.forEach(function(value, index, array){
    console.log('array index: ' + index + ' value: ' + value + ' array ' + array );
});

let arr2 = [100, 200, 300];
let obj3 = {
    num: 10,
    str: 'hi',
    arr2: [],
}

for (let key in arr2){
    console.log(arr2[key]);
}

for (let key in obj3) {
    console.log(obj3[key])
}


let data = 50;

function fetchData(data){
    let receivedData;
    if (data === undefined){
        receivedData = localStorage.getItem('item');
        console.log(receivedData);
    }
}

fetchData(50);


function fetchData1(data){ // if 구문을 생략할 수 있다. 
    let receivedData;
    receivedData = data || localStorage.getItem('item');
    console.log(receivedData);
}

fetchData1(50);

if (data !== undefined){ // if문 사용 
    num = 50;
    if (num > 10){
        num = 100;
    } else{
        num = 0;
    }
}
console.log(num)

if (data !== undefined) { // 삼항 연산자 사용
    num = 5; 
    num = num > 10 ? 100: 0;
}

console.log(num)

function sumNumbers(a, b){
    return a + b;
}

sumNumbers(10, 20); // 30 

// 함수 표현식 
let notSumNumbers1 = function(a,b){
    return a - b;
}
console.log(notSumNumbers1(10, 20));

// 함수 선언문
function notSumNumbers2(a,b){
    return a * b;
}

console.log(notSumNumbers2(20, 30));

//then ??? 

console.log(this);

let obj4 = {
    num: 999999,
    printNum: function(){
        console.log(this.num);
    }
};

obj4.printNum(); // 10 

function showComment(){
    console.log(this);
}

showComment(); // window

function Developer(){
    console.log(this);
}

let dev = new Developer();


/*function fetchData() {
    axios.get('index.html').then(function() {
        console.log(this);
    })
}

fetchData();
*/

function functionName(){
    console.log('functionName');
}

let devs = new functionName();
devs

