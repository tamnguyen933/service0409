const express = require('express');
const jsonParser = require('body-parser').json();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

app.get('/tinh/:tenPhepTinh/:soA/:soB', (req, res) => {
    const { tenPhepTinh, soA, soB } = req.params;
    const pt = new PhepTinh(soA, soB, tenPhepTinh);
    res.send(pt.getResult() + '');
});

app.post('/tinh', jsonParser, (req, res) => {
    const { tenPhepTinh, soA, soB } = req.body;
    const pt = new PhepTinh(soA, soB, tenPhepTinh);
    res.send(pt.getResult() + '');
});

app.listen(3000);

class PhepTinh {
    constructor(soA, soB, tenPhepTinh) {
        this.soA = soA;
        this.soB = soB;
        this.tenPhepTinh = tenPhepTinh;
    }

    getResult() {
        switch (this.tenPhepTinh) {
            case 'CONG': return +this.soA + +this.soB;
            case 'TRU': return this.soA - this.soB;
            case 'NHAN': return this.soA * this.soB;
            default: return this.soA / this.soB;
        }
    }
}

// https://github.com/vanpho93/async0409/blob/master/server.js
