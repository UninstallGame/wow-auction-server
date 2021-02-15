import {IBlizzardAsset, IBlizzardItem} from "blizzard-types";

export interface IItem {
    data: IBlizzardItem;
    assets: IBlizzardAsset[];
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

export interface ISerializeProfession {
    name: string;
    assets: IBlizzardAsset[];
    categories: {
        name: string
        recipes: ISerializeRecipe[]
    }[]
}

export interface ISerializeRecipe {
    itemId: number;
    count: number;
    reagents: {
        itemId: number;
        count: number;
    }[]
}

export interface IProfession {
    name: string;
    assets: IBlizzardAsset[];
    categories: {
        name: string
        recipes: IRecipe[]
    }[]
}

export interface IRecipe {
    item: IItem;
    count: number;
    reagents: {
        item: IItem;
        count: number;
    }[]
}
