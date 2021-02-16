import {Auth} from "./app/auth";
import {Items} from "./items/items";
import {Auction} from "./auction/auction";
import {Server} from "./app/server";
import {Professions} from "./professions/professions";

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
    const cycle = async () => {
        await updateToken();
        const aucData = await auctionService.updateAuctionData();
        aucData.forEach(it => {
            console.log('uGame', it);
        })


        // const professions = await professionService.updateProfessions();
        // console.log('uGame', professions[0].categories[0].recipes[0].item)
    }

    cycle();

    setInterval(async () => {
        // cicle();
    }, UPDATE_TIME_MS)
}

async function updateToken(): Promise<void> {
    console.log('uGame run')
    const token = await authService.getToken();
    console.log('uGame', token)
    itemService.updateToken(token);
    auctionService.updateToken(token);
    await professionService.updateToken(token);
}
