function delay(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}
async function delayedgreet(name){
    await delay(2000);
    console.log(`Hello, ${name}!`);
}
delayedgreet('Amit');

async function divide(num1,num2){
    if(num2 === 0){
        throw new Error("Division by zero error");
    }else{
        return num1 / num2;
    }
}
async function performDivision(){
    try {
        const result = await divide(4, 2);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    try {
        const result = await divide(4, 0);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
performDivision();