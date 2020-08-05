var cron = require('node-cron');
const { flag, code, name, countries } = require('country-emoji');
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
var fs = require('fs')
var Twit = require("twit");

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

function searchTweet(yearAndMonth) {
    return T.get('statuses/user_timeline', {
        screen_name: process.env.search_user_screen, include_rts: true, since_id: 1279861242153373693, count: 1000
    }).then(function (result) {
        for (d in result.data) {
            if (result.data[d].text.indexOf('linuxmint donation stats for ' + yearAndMonth) > 0) {
                return true;
            }
        }
        return false;
    });
}

module.exports = {
    sendTweet: sendTweet,
    sendTweetStats: sendTweetWithImage,
    getTweet: searchTweet,
    startCron: function () {
        cron.schedule('0 1 * * *', () => {
            console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
            index();
        }, {
            scheduled: true,
            timezone: "America/Sao_Paulo"
        });
    }
};