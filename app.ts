import {clientId, clientSecret} from "./settings";
import axios, {AxiosResponse} from "axios";
import {IAuctionPosition} from "./types";

const http = require('http');

const BASE_URL = 'https://eu.api.blizzard.com'
const AUCTION = '/data/wow/connected-realm/1602/auctions'
const PROFESSIONS = '/data/wow/profession/index'
const PROFESSION_BY_INDEX = '/data/wow/profession/'
const PROFESSION_SKILL = '/data/wow/profession/'
const ITEM = '/data/wow/item/'
const RECIPE = '/data/wow/recipe/'

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
    await auth();
    const x = await getAuctionData<{ auctions: IAuctionPosition[] }>();
    const data = x.data.auctions;
    const map = new Map();
    for (let i = 0; i <= data.length; i++) {
        let id = 0
        try {
            id = data[i].item.id;
        } catch (e) {
        }

        map.has(id)
            ? map.get(id).push(data[i])
            : map.set(id, [data[i]])
    }
    // console.log('uGame done')

    const professions = await getProfessions()
    console.log('professions', professions.data)
    const blacksmiting = await getProf(164, 2751);
    console.log('profession', blacksmiting.data.categories.find(it => it.name === 'Специализированные доспехи').recipes)
    const rec = await getRecipe(45589);
    console.log('recipe', rec.data.reagents)
    console.log('price reagent', map.get(172437))
}

async function auth() {
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

async function getAuctionData<T>(): Promise<AxiosResponse<T>> {
    return axios.get(`${BASE_URL}${AUCTION}?namespace=dynamic-eu&locale=ru_RU&access_token=${accessToken}`)
}

async function getProfessions(): Promise<AxiosResponse<any>> {
    return axios.get(`${BASE_URL}${PROFESSIONS}?namespace=static-eu&locale=ru_RU&access_token=${accessToken}`)
}

async function getProfessionById(professionId: number): Promise<AxiosResponse<any>> {
    return axios.get(`${BASE_URL}${PROFESSION_BY_INDEX}${professionId}?namespace=static-eu&locale=ru_RU&access_token=${accessToken}`)
}

async function getItemInfo(itemId: number): Promise<AxiosResponse<any>> {
    return axios.get(`${BASE_URL}${ITEM}${itemId}?namespace=static-eu&locale=ru_RU&access_token=${accessToken}`)
}

async function getProf(professionId: number, skillTierId: number) {
    // {professionId}/skill-tier/{}'
    return axios.get(`${BASE_URL}${PROFESSION_SKILL}${professionId}/skill-tier/${skillTierId}?namespace=static-eu&locale=ru_RU&access_token=${accessToken}`)
}

async function getRecipe(recipeId: number) {
    return axios.get(`${BASE_URL}${RECIPE}${recipeId}?namespace=static-eu&locale=ru_RU&access_token=${accessToken}`)
}
