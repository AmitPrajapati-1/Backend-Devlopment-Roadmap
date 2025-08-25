const path=require('path');
console.log('directory name',path.dirname(__filename));
console.log('file name',path.basename(__filename));
console.log('file extension',path.extname(__filename));
const joinPath = path.join(__dirname, 'subfolder', 'file.txt');
console.log('joined path', joinPath);
const resolvedPath = path.resolve( 'subfolder', 'file.txt');//absoulte path
console.log('resolved path', resolvedPath);