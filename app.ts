import {clientId, clientSecret} from "./settings";

const http = require('http');
import axios from "axios";

const auc = 'data/wow/connected-realm/eu/auctions'

// https://develop.battle.net/documentation/world-of-warcraft/community-api-migration-status
https://us.api.blizzard.com/data/wow/connected-realm/1146/auctions?namespace=dynamic-us&locale=en_US&access_token=US63qljebf8E5YKxdf16wg1LGlNB5Vyd2g
let accessToken = '';
let tmp = {};

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(tmp);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

run();


async function run() {
    await func();
    const x = await getAuctionData();
    console.log('uGame', typeof x.data.auctions)
    const data = x.data.auctions;
    const map = new Map();
    for (let i = 0; i <= data.length; i++) {
        let id = 0
        try {
            id = data[i].item.id;
        } catch (e) {
        }
        
        map.has(id)
            ? map.get(id).push(data)
            : map.set(id, [data])
    }
    console.log('uGame', map.get(171415)[0])
}

async function func() {
    const response = await axios.get(`https://eu.battle.net/oauth/token`, {
        auth: {
            username: clientId,
            password: clientSecret,
        },
        params: {
            grant_type: 'client_credentials',
        },
    });
    accessToken = response.data.access_token;
    console.log(accessToken)
}

async function getAuctionData(): Promise<any> {
    return axios.get(`https://eu.api.blizzard.com/data/wow/connected-realm/1602/auctions?namespace=dynamic-eu&locale=ru_RU&access_token=${accessToken}`)
}
