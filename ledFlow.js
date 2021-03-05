const Gpio = require('onoff').Gpio;
const LED04 = new Gpio(4, 'out');
const LED17 = new Gpio(17, 'out');
const LED27 = new Gpio(27, 'out');
const LED22 = new Gpio(22, 'out');
const LED05 = new Gpio(5, 'out');
const LED06 = new Gpio(6, 'out');
const LED13 = new Gpio(13, 'out');
const LED26 = new Gpio(26, 'out');

const leds = [LED04, LED17, LED27, LED22, LED05, LED06, LED13, LED26];
let indexCount = 0;
let dir = 'up';

const ledFlow = () => {
    leds.forEach((val) => {
        val.writeSync(0);
    });
    if (indexCount === 0) dir = "up";
    if (indexCount >= leds.length) dir = "down";
    if (dir === "down") indexCount--;
    leds[indexCount].writeSync(1);
    if (dir === 'up') indexCount++;
};

let flowInt = setInterval(ledFlow, 100);

const unexportOnClose = () => {
    clearInterval(flowInt);
    leds.forEach((led) => {
        led.writeSync(0);
        led.unexport();
    });
};

process.on('SIGINT', unexportOnClose);
