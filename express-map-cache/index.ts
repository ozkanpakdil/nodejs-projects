import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let cache = new Map<string, object>();

app.get('/', (req: Request, res: Response) => {
    if (cache.get(req.url))
        return res.end(cache.get(req.url));

    const d = fs.readFileSync('./data/db.json');
    res.write(d);
    res.end();
    cache.set(req.url, d);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});