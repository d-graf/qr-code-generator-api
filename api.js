const express = require('express');
const qrcode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

app.get('/qr', (req, res) => {
    const url = req.query.url;
    let color = req.query.color;

    if (!url) {
        return res.status(400).send('Missing URL parameter');
    }

    const hexColorRegex = /^[0-9A-Fa-f]{6}$/;
    if (color && !hexColorRegex.test(color)) {
        return res.status(400).send('Input is not a valid hex color without #');
    }

    qrcode.toDataURL(url, { color: { dark: color }, margin: 1}, (err, dataUrl) => {
        if (err) {
            return res.status(500).send('Error generating QR code');
        }

        res.json({ dataUrl });
    });
});

app.listen(port);