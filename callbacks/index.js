function person(name,callbackfn){
    console.log('person name:',name);
    callbackfn();
}
function address(){
    console.log('address function');
}
person('amit',address);