import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { LRUCache } from 'lru-cache'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const cache = new LRUCache({
    ttl: 1000 * 60 * 60,
})

let counter = 0;

app.get('/', (req: Request, res: Response) => {
    counter++;
    if (counter % 100)
        console.log('Req count:{}', counter);
    if (cache.get(req.url)) {
        console.log('returning from cache')
        return res.end(cache.get(req.url));
    }
    console.log('file operation...')

    const d = fs.readFileSync('./data/db.json');
    res.write(d);
    res.end();
    cache.set(req.url, d);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});