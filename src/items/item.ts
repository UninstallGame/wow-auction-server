import {IBlizzardAsset, IBlizzardItem} from "blizzard-types";
import {IAucData, IItem} from "types";


export class Item implements IItem {
    auctionData: IAucData[];

    constructor(public data: IBlizzardItem, public assets: IBlizzardAsset[]) {
    }

}
