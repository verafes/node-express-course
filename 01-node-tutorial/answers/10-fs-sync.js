const { readFileSync, writeFileSync }  = require('fs')

const first = readFileSync('./content/first.txt', 'utf-8')
const second = readFileSync('./content/second.txt', 'utf-8')
const third = 'Hello this is third text line\n'

try {
    writeFileSync(
        './temporary/fileA.txt',
        `Here is the result :\n${first}, \n${second}, \n${third}`,
        { flag: 'a' }
    )
} catch (error) {
    console.error('Error:', error.message)
}

const result = readFileSync('./temporary/fileA.txt', 'utf-8')
console.log(result)
