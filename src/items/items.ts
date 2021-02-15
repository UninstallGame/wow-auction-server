import axios from "axios";
import {BASE_URL} from "../index";
import {IItem} from "types";
import {Item} from "./item";
import {getMedia} from "../pure";
import {IBlizzardItem} from "blizzard-types";
import Timeout = NodeJS.Timeout;

const fs = require('fs');

const ITEM = '/data/wow/item/'

export class Items {
    private hash = <{ [key: number]: IItem }>{};
    private writeTimeout: Timeout;
    private accessToken: string | undefined

    constructor() {
        this.readFromJson();
    }

    public updateToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    public async get(id: number): Promise<IItem> {
        if (this.hash[id]) {
            console.log(`has item ${this.hash[id].data.name}`)
            return this.hash[id]
        }
        let item
        try {
            item = await this.getItemInfo(id);
        } catch (e) {
            console.log(`fail load item ${id}`)
            return;
        }

        const assets = await getMedia(item, this.accessToken)
        const newItem = new Item(item, assets);
        this.hash[id] = newItem
        this.writeToJson();
        return newItem;
    }

    // todo
    public updateAucInfo(itemId: number) {
        this.hash[itemId].auctionData = [];
        this.writeToJson();
    }

    private writeToJson() {
        if (this.writeTimeout) clearTimeout(this.writeTimeout)
        this.writeTimeout = setTimeout(() => {
            this.writeTimeout = null;
            console.log('write items')
            fs.writeFileSync('dist/src/items/items.json', JSON.stringify(this.hash));
        }, 10000)
    }

    private readFromJson(): void {
        try {
            const tmp = fs.readFileSync('dist/src/items/items.json');
            this.hash = JSON.parse(tmp);
        } catch (e) {
            console.log('has no items.json')
        }
    }


    private async getItemInfo(itemId: number): Promise<IBlizzardItem> {
        const response = await axios.get(`${BASE_URL}${ITEM}${itemId}?namespace=static-eu&locale=ru_RU&access_token=${this.accessToken}`)
        console.log(`item loaded ${response.data.name}`)
        return response.data;
    }
}
