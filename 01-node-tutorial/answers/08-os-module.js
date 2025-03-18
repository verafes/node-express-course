// built-in OS module
const os = require('os');

console.log('Information about my computer:');
const myPC = os.cpus();
console.log(myPC);

console.log('Information about my user:');
const user = os.userInfo();
console.log(user);

console.log(`The System Uptime is ${os.uptime()} seconds`)

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalmem: os.totalmem(),
    freemem: os.freemem(),
    homedir: os.homedir(),
    platform: os.platform(),
    host: os.hostname(),
}
console.log('Information about my operation system:')
console.log(currentOS)