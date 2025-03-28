const { writeFile, readFile } = require("fs").promises;
const path = require('path')

const filePath = path.join(__dirname, 'temporary', 'temp.txt')

const writer = async () => {
    try {
        const first = "Hello this is first text line\n";
        const second = "Hello this is second text line\n";
        const third = "Hello this is third text line\n";

        result = await writeFile("./temporary/temp.txt", `${first}${second}${third}`);
        console.log("File 'temp.txt' has been written.");
        return result;
    } catch (error) {
        console.log("An error occurred: ", error);
    }
};

const reader = async () => {
    try {
        const content = await readFile("./temporary/temp.txt", "utf8");
        console.log("File content:\n", content);
    } catch (error) {
        console.log("An error occurred: ", error);
    }
};

const readWrite = async () => {
    try {
        await writer();
        await reader();
    }
    catch(err) {
        console.log("An error occurred: ", err);
    }
};

readWrite();
