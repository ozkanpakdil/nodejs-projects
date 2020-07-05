const { flag, code, name, countries } = require('country-emoji');
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
var db = new JsonDB(new Config("myDataBase", true, false, "/"));
var fs = require('fs')
var Twit = require("twit");
const { data } = require("jquery");

var T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
});

function sendTweet() {
    T.post("statuses/update", { status: "hello world!!" },
        function (err, data, response) {
            console.log(data);
        }
    );
}

function sendTweetWithImage(filePath, dataMap, textFor) {
    var b64content = fs.readFileSync(filePath, { encoding: 'base64' })
    let resultString = "";
    for (const [key, value] of dataMap.entries()) {
        resultString += flag(key) + ":" + value;
    }
    console.log(filePath + ' ' + resultString);
    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        var mediaIdStr = data.media_id_string
        var altText = "linux mint donations"
        var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

        T.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
                var params = { status: textFor + resultString, media_ids: [mediaIdStr] }

                T.post('statuses/update', params, function (err, data, response) {
                    console.log('tweet sent..')
                })
            }
        })
    });
}

module.exports = {
    sendTweet: sendTweet,
    sendTweetStats: sendTweetWithImage,
    help: function () {
        console.log('This module sends tweet...')
    },
};

// try {
//     let dbPath = `/2020/June/stats`;
//     let data = db.getData(dbPath);

//     let map = new Map(JSON.parse(data));
//     sendTweetWithImage('2020-June.png', map,'stats:');
// } catch (error) { console.error(error) }


// T.get('statuses/show/1279359048173920256', { count: 10 }, function(err, data, response) {
//     console.log(data)
//   })