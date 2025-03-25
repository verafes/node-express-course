const fs = require('fs')

const stream = fs.createReadStream('../content/big.txt', {
    encoding: "utf8",
    highWaterMark: 1200,
});

let counter = 0;
stream.on('data', (result) => {
    counter++;
    console.log('Event result: ', result)
});
stream.on("end", () => {
    console.log('Total amount of chunks: ', counter)
});
stream.on('error', (err) => {
    console.log('An error occurred: ', err)
});