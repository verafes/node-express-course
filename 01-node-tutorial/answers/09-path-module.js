// built-in Path module
const path = require('path');

console.log(path.sep)

const parts = ['/content', 'subfolder', 'test.txt']
const filePath = path.join(...parts)
console.log('Joined Path:', filePath)

const base = path.basename(filePath)
console.log(base)

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log('Absolute Path:', absolute)
