import {IBlizzardAsset, IBlizzardItem} from "blizzard-types";

export interface IItem {
    data: IBlizzardItem;
    assets: IBlizzardAsset;
    auctionData: IAucData[];
}

export interface IAucData {
    time: number;
    count: number;
    price: {
        bestForSell: number;
        bestToBuy: number;
    }
}

export interface IProfession {
    name: string;
    assets: IBlizzardAsset
    categories: {
        item: IItem
        recipes: {
            item: IItem;
            count: number;
        }[]
    }[]
}
