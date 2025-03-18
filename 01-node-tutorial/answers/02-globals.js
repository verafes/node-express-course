console.log('__dirname:', __dirname);
console.log('process.env.MY_VAR:', process.env.MY_VAR);
console.log('__filename', __filename );
console.log('module', module);
console.log("Node.js version:", process.version);

const interval = setInterval(() => {
    console.log('hello world');
}, 1000)

setTimeout(() => {
    clearInterval(interval);
    console.log('Interval stopped after 10 seconds.');
}, 10000);

// 1. cd 01-node-tutorial/answers
// in terminal print
// bash: export MY_VAR="Hi there!"
// powershell: $env:MY_VAR = "Hi there!"
// cmd: set "MY_VAR=Hi there!"

// 2. then run file
// node 02-globals.js
// or node ./01-node-tutorial/answers/02-globals.js from home dir