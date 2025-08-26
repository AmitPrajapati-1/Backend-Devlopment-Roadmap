const eventemitter = require('events')
const myfirstemiiter=new eventemitter();
myfirstemiiter.on('greet',(name)=>{
    console.log(`Hello, ${name}`)
})
myfirstemiiter.emit('greet','Amit');