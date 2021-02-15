import {Auth} from "./app/auth";
import {Items} from "./items/items";
import {Auction} from "./auction/auction";
import {Server} from "./app/server";
import {Professions} from "./professions/professions";

const fs = require('fs');

export const BASE_URL = 'https://eu.api.blizzard.com'
//                    min  sec    ms
const UPDATE_TIME_MS = 10 * 60 * 1000

const serverService = new Server()
const authService = new Auth();
const itemService = new Items();
const auctionService = new Auction();
const professionService = new Professions(itemService);

serverService.create();

run()

function run() {
    const cicle = async () => {
        console.log('uGame run')
        const token = await authService.getToken();
        console.log('uGame', token)
        itemService.updateToken(token);
        auctionService.updateToken(token);
        professionService.updateToken(token);
        professionService.start();
        // const data = await auctionService.updateAuctionData();

        // itemService.get(31331)
        // for (let i = 0; i <= data.auctions.length; i++) {
        //     const item = data.auctions[i];
        //     console.log(`item ${i} from ${data.auctions.length}`)
        //     await itemService.get(item.item.id);
        // }
    }

    cicle();

    setInterval(async () => {
        // cicle();
    }, UPDATE_TIME_MS)
}
