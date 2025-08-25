function delay(time){
    return new Promise(resolve => setTimeout(resolve, time));
}
console.log("promise start");
delay(2000).then(() => console.log("promise resolved"));
console.log("promise end");

function divide(num1,num2){
    return new Promise((resolve,reject)=>{
        if(num2 === 0){
            reject("Division by zero error");
        }else{
            resolve(num1 / num2);
        }
    });
}
divide(4,2).then(res=>console.log(res)).catch(err=>console.log(err));
divide(4,0).then(res=>console.log(res)).catch(err=>console.log(err));