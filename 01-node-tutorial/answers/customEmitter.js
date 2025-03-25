const EventEmitter = require('events')
const emitter = new EventEmitter()

const countdown = setInterval(() => {
    emitter.emit('countdown', 'Countdown in progress...')
}, 1000)

// to stop countdown event
setTimeout(() => {
    clearInterval(countdown);
}, 7000);

emitter.on('countdown', (msg) => console.log(msg))

const waitForEvent = () => {
    return new Promise((resolve, reject) => {
        emitter.on('launch', (msg) => resolve(msg));
        emitter.on('error occurred', (error) => reject(error))
    })
}

const doWait = async () => {
    try {
        const msg = await waitForEvent();
        console.log("New event detected: ", msg)
        emitter.emit('complete', 'Your task is completed!')
    } catch (e) {
        console.log("Oops! Something went wrong: ", e)
    }
};

emitter.on('complete', (msg) => console.log(msg))

doWait();
setTimeout(() => {
    emitter.emit('launch', 'Launch successful!');
}, 3000);


setTimeout(() => {
    doWait();
}, 3000);

setTimeout(() => {
    emitter.emit('error occurred', 'Mission aborted.');
}, 7000)
