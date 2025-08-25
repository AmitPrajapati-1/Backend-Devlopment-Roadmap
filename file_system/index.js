const fs=require('fs');
const path=require('path');
const datafolder=path.join(__dirname,'data');
if(!fs.existsSync(datafolder)){
    fs.mkdirSync(datafolder);
    console.log('Data folder created');
}else{
    console.log('Data folder already exists');
}
const filepath=path.join(datafolder,'file.txt');
//sync way of creating file
fs.writeFileSync(filepath,'Hello World');
console.log('File created');
const readcontent=fs.readFileSync(filepath,'utf-8');
console.log(readcontent);
fs.appendFileSync(filepath,'\nThis is appended text');
const updatedcontent=fs.readFileSync(filepath,'utf-8');
console.log(updatedcontent);

//async way of creating file
const asyncfilepath=path.join(datafolder,'asyncfile.txt');
fs.writeFile(asyncfilepath,"hello world",(err)=>{
    if(err) throw err;
    console.log('Async File created');
})
fs.readFile(asyncfilepath,'utf-8',(err,data)=>{
    if(err) throw err;
    console.log(data);
    fs.appendFile(asyncfilepath,'\nThis is appended text',(err)=>{
        if(err) throw err;
        console.log('Async File updated');
        fs.readFile(asyncfilepath,'utf-8',(err,data)=>{
            if(err) throw err;
            console.log(data);
        })
    })
})