const Gpio = require('onoff').Gpio;
const LED = new Gpio(4, 'out');
const pushBtn = new Gpio(17, 'in', 'both');

pushBtn.watch((err, val) => {
    if (err) {
        console.error('Error: ', err);
        return;
    }
    LED.writeSync(val);
});

const unexportOnClose = () => {
    LED.writeSync(0);
    LED.unexport();
    pushBtn.unexport();
};

process.on('SIGINT', unexportOnClose);
