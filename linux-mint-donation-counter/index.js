
const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
var img = require('./generateBarchart');
var twit = require('./twittersend');

const fetch = require("node-fetch");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;

var $ = (jQuery = require("jquery")(window));
console.log("jQueryVersion:" + $().jquery);

let Parser = require("rss-parser");
let parser = new Parser();
var db = new JsonDB(new Config("myDataBase", true, false, "/"));
let year = new Date().getFullYear();

function index() {
  (async () => {
    let feed = await parser.parseURL("https://blog.linuxmint.com/?feed=atom");
    console.debug(feed.title);

    feed.items.forEach((item) => {
      if (item.title.includes("Monthly News")) {
        var month = item.title.split(" ")[3];

        console.log(item.title + ":" + item.link);
        let dbPath = `/${year}/${month}/stats`;
        var data = null;
        try {
          data = db.getData(dbPath);
        } catch (error) { }
        if (data == null) {
          fetch(item.link)
            .then((resp) => resp.text())
            .then((body) => {
              m = new Map();
              let resultMap = new Map();
              $("<body>")
                .append($.parseHTML(body))
                .find(".entry-content img.flag")
                .each(function () {
                  n = this.src.split("/").pop().substring(0, 2);
                  if (isNaN(n)) {
                    let count = m.get(n);
                    m.set(n, count ? count + 1 : 1);
                  }
                });
              m[Symbol.iterator] = function* () {
                yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
              };
              console.log(month);
              let mapSize = m.size;
              for (let [key, value] of m) {
                mapSize--;
                let country = key;
                let count = value;
                if (mapSize < 11) {
                  resultMap.set(country, count);
                }
              }
              console.log(resultMap);
              db.push(dbPath, JSON.stringify([...resultMap]));
              const imagePath = `${year}-${month}.png`;

              img.drawImageToDisk(Array.from(resultMap.keys()), Array.from(resultMap.values()), imagePath);
              twit.sendTweetStats(imagePath, resultMap, '#linuxmint donation stats:');
            });
        }
      }
    });
  })();
  twit.startCron();
}

index();