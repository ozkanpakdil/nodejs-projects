const express = require('express')
var apicache = require('apicache')
var cache = apicache.middleware
const net = require('net')
const app = express();
const port = process.env.PORT || 8080;
var whois = require('whois')
var counter = 0;

app.get('/whois', cache('48 hours'), (req, res) => {
    console.log(++counter + "-" + req.query.ip)
    if (net.isIP(req.query.ip)) {
        whois.lookup(req.query.ip, function (err, data) {
            res.send(data)
        })
    } else {
        res.send('NA')
    }
});

app.listen(port, () => {
    console.log(`Whois app listening on port ${port}!`)
});


