const express = require('express');
const hyperswarm = require('hyperswarm');
const b4a = require('b4a');
const crypto = require('crypto');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let bolsa = "";
let tubos = [];

app.post('/conectar', (req, res) => {

console.log("esperando")
    const swarm = new hyperswarm();
    const topic = crypto.createHash('sha256').update(req.body.texto).digest();
    swarm.join(topic, { client: true, server: true });

    swarm.on('connection', (conn) => {
        console.log("conectado")
        tubos.push(conn);
        conn.on('data', data => {
            bolsa = b4a.toString(data);
        });
    });
    res.json({ ok: true });
});

app.get('/mensaje', (req, res) => {
    res.json({ msg: bolsa });
    bolsa = "";
});

app.post('/mimensaje', (req, res) => {
    tubos.forEach(t => t.write(req.body.texto));
    res.json({ ok: true });
});

app.listen(3000);