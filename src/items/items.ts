import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "../index";
import Timeout = NodeJS.Timeout;
import {IBlizzardItem} from "blizzard-types";

const fs = require('fs');

const ITEM = '/data/wow/item/'

export class Items {
    private hash = {};
    private writeTimeout: Timeout;
    private accessToken: string | undefined

    constructor() {
        this.readFromJson();
    }

    public updateToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    public async get(id: number): Promise<IBlizzardItem> {
        // @ts-ignore
        if (this.hash[id]) {
            console.log('has item')
            // @ts-ignore
            return this.hash[id]
        }
        let response
        try {
            response = await this.getItemInfo(id);
        } catch (e) {
            console.log(`fail load item ${id}`)
            return;
        }
        const item = response.data;
        // @ts-ignore
        this.hash[id] = item;
        this.writeToJson();
        return item;
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
        const tmp = fs.readFileSync('dist/src/items/items.json');
        this.hash = JSON.parse(tmp);
    }

    private async initHash() {

    }


    private async getItemInfo(itemId: number): Promise<AxiosResponse> {
        console.log('load item')
        return axios.get(`${BASE_URL}${ITEM}${itemId}?namespace=static-eu&locale=ru_RU&access_token=${this.accessToken}`)
    }
}
