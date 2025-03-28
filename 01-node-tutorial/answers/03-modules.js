//Modules
const names = require('./04-names.js')
const sayHi = require('./05-utils.js')
const data = require('./06-alternative-flavor.js')
require('./07-mind-grenade.js');

sayHi('Susan')
sayHi(names.anna)
sayHi(names.alex)
sayHi(names.victoria)
sayHi(names.tom)
console.log('names:', names)
console.log('data:', data)