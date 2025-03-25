const { writeFile, readFile } = require("fs").promises;
const path = require('path')

const filePath = path.join(__dirname, 'temporary', 'temp2.txt')

writeFile(filePath, "New text for lesson2 for writeWithPromisesThen\n")
    .then(() => {
        return writeFile(filePath, "New text for lesson2 for writeWithPromisesThen\n", {flag: "a"})
    })
    .then(() => {
        return writeFile(filePath, "New text for lesson2 for writeWithPromisesThen\n", {flag: "a"})
    })
    .then(() => {
        return readFile(filePath, "utf-8")
    })
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log("An error occurred: ", error)
    })