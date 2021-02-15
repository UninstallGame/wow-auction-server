import axios, {AxiosResponse} from "axios";
import {BASE_URL} from "../index";

const AUCTION = '/data/wow/connected-realm/1602/auctions'
// todo type
declare type AUCTION_DATA = any;

export class Auction {

    private accessToken: string | undefined
    private actualData: AUCTION_DATA;

    public updateToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    public async getLastActualData(): Promise<AUCTION_DATA> {
        if (!this.actualData) return this.updateAuctionData();
        return this.actualData;
    }

    public async updateAuctionData(): Promise<AUCTION_DATA> {
        const response = await this.getAuctionData();
        this.process(response.data);
        this.actualData = response.data;
        return response.data
    }

    // todo обработка аук инфы, и выставление цен предметам
    private process(auctionData: any): void {
    }

    private getAuctionData<T>(): Promise<AxiosResponse<T>> {
        return axios.get(`${BASE_URL}${AUCTION}?namespace=dynamic-eu&locale=ru_RU&access_token=${this.accessToken}`)
    }
}
