const express = require('express');
const path = require('path');
const player = require('node-wav-player');
const pathWav = path.resolve(__dirname, `audio_file.wav`)

const defaultPort = 8888;
const staticDir = path.resolve('.');
const htmlFile = 'index.html';

const app = express();
app.use(express.static(staticDir));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/${htmlFile}`);
})

app.get('/play', (req, res) => {
    player.play({
        path: pathWav,
    }).then(() => {
        console.log('The wav file started to be played successfully.');
    }).catch((error) => {
        console.error(error);
    });

    return res.send('play')
});

app.get('/stop', (req, res) => {
    try {
        player.stop()
    } catch (e) {
        console.log('err',);
    }

    return res.send('stop')
})

app.listen(defaultPort, () => {
    console.info(`App start on PORT ${defaultPort}`);
});