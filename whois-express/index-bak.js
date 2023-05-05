const express = require('express')
var apicache = require('apicache')
var cache = apicache.middleware
const net = require('net')
const app = express();
const port = 8000;
var whois = require('whois')

app.get('/whois', cache('48 hours'), (req, res) => {
    console.log(req.query.ip)
    console.log(net.isIP(req.query.ip))
    if (net.isIP(req.query.ip)) {
        whois.lookup(req.query.ip, function (err, data) {
            res.send(data)
        })
    } else {
        res.send('NA')
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});


