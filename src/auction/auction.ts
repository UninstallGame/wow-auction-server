import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "../index";
import {AUCTION_TIME_LEFT, IBlizzardAuctionItem} from "blizzard-types";
import {IAuctionData} from "types";

const AUCTION = '/data/wow/connected-realm/1602/auctions'
// todo type
declare type AUCTION_DATA = any;

export class Auction {

    private accessToken: string | undefined
    private actualData: IBlizzardAuctionItem[];

    public updateToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    public async getLastActualData(): Promise<AUCTION_DATA> {
        if (!this.actualData) return this.updateAuctionData();
        return this.actualData;
    }

    public async updateAuctionData(): Promise<Map<number, IAuctionData>> {
        const response = await this.getAuctionData();
        this.actualData = response.data.auctions;
        return this.xxx(response.data.auctions)
    }

    private getAuctionData<T>(): Promise<AxiosResponse<{ auctions: IBlizzardAuctionItem[] }>> {
        return axios.get(`${BASE_URL}${AUCTION}?namespace=dynamic-eu&locale=ru_RU&access_token=${this.accessToken}`)
    }

    private xxx(data: IBlizzardAuctionItem[]): Map<number, IAuctionData> {
        const tmp = new Map<number, IBlizzardAuctionItem[]>();
        data.forEach(it => {
            if (tmp.has(it.item.id)) {
                tmp.get(it.item.id).push(it)
                return;
            }

            tmp.set(it.item.id, [it])
        })

        const hash = new Map<number, IAuctionData>();
        tmp.forEach((it, key) => {

            let allCount: number = 0;
            let shortCount: number = 0;
            let mediumCount: number = 0;
            let longCount: number = 0;
            let veryLongCount: number = 0;
            let price: number = Number.MAX_VALUE;
            const auctionIds: number[] = []

            it.forEach(item => {
                allCount += item.quantity
                if (item.time_left === 'SHORT') shortCount += item.quantity;
                if (item.time_left === 'MEDIUM') mediumCount += item.quantity;
                if (item.time_left === 'LONG') longCount += item.quantity;
                if (item.time_left === 'VERY_LONG') veryLongCount += item.quantity;
                auctionIds.push(item.id);
                price = Math.min(price, item.unit_price | item.buyout);
            })

            hash.set(key, {
                allCount,
                auctionIds,
                id: key,
                longCount,
                mediumCount,
                price,
                shortCount,
                veryLongCount
            })
        })
        return hash;
    }
}
