import {IItem, IProfession, IRecipe, ISerializeProfession, ISerializeRecipe} from "types";
import {IBlizzardAsset} from "blizzard-types";
import {Items} from "../items/items";

export class Profession implements IProfession {
    public name: string;
    assets: IBlizzardAsset[];
    categories: { name: string; recipes: { item: IItem; count: number; reagents: { item: IItem; count: number }[] }[] }[] = [];

    constructor(
        private serializeProfession: ISerializeProfession,
        private itemsService: Items,
    ) {
    }

    public async update(): Promise<void> {
        const categories = this.serializeProfession.categories
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const promises = category.recipes.map(it => toRecipe(it, this.itemsService))
            this.categories.push({
                name: category.name,
                recipes: await Promise.all(promises),
            })
        }
    }

}

async function toRecipe(data: ISerializeRecipe, itemsService: Items): Promise<IRecipe> {
// todo Какое то гавно с data. На клиенте виднее будет.
    if (!data) {
        return
    }
    const promiseReagents = data.reagents.map(it => toReagent(it, itemsService))
    const item = await itemsService.get(data.itemId)
    return {
        item,
        count: data.count,
        reagents: await Promise.all(promiseReagents)
    }
}

async function toReagent(reagent: { itemId: number, count: number }, itemsService: Items): Promise<{ item: IItem, count: number }> {
    const item = await itemsService.get(reagent.itemId)
    return {
        item,
        count: reagent.count,
    }
}
