import axios from "axios";
import {BASE_URL} from "../index";
import {Items} from "../items/items";
import {
    IBlizzardProfessionDetail,
    IBlizzardProfessionRecipe,
    IBlizzardProfessions,
    IBlizzardProfessionSkillTier,
    IBlizzardReagent
} from "blizzard-types";
import {ISerializeProfession, ISerializeRecipe} from "types";
import {getMedia} from "../pure";
import {Profession} from "./profession";

const PROFESSIONS = '/data/wow/profession/index'
const PROFESSION_BY_INDEX = '/data/wow/profession/'
const PROFESSION_SKILL = '/data/wow/profession/'
const RECIPE = '/data/wow/recipe/'

export enum PROFESSION {
    BLACKSMITH = 164,
    LEATHER_WORKING = 165,
    ALCHEMY = 171,
    COOKING = 185,
    TAILORING = 197,
    ENGINEERING = 202,
    ENCHANTING = 333,
    JEWEL_CRAFTING = 755,
    INSCRIPTION = 773
}

const fs = require('fs');

export class Professions {
    private hash = <{ [key: number]: Profession }>{};
    private serializeHash = <{ [key: number]: ISerializeProfession }>{};
    private accessToken: string | undefined;

    constructor(private itemsService: Items) {
    }

    public updateToken(accessToken: string): Promise<void> {
        this.accessToken = accessToken;
        return this.readFromJson();
    }

    public async updateProfessions(): Promise<Profession[]> {
        const professionIds = Array.from(Object.values(PROFESSION))
            .filter(it => typeof it === "number");

        for (let i = 0; i < professionIds.length; i++) {
            await this.hash[professionIds[i] as number].update();
        }

        return Array.from(Object.values(this.hash))
    }

    public get() {

    }

    private async getAll(): Promise<IBlizzardProfessions[]> {
        const response = await axios.get(`${BASE_URL}${PROFESSIONS}?namespace=static-eu&locale=ru_RU&access_token=${this.accessToken}`)
        return response.data.professions
    }

    private async getById(professionId: number): Promise<IBlizzardProfessionDetail> {
        const response = await axios.get(`${BASE_URL}${PROFESSION_BY_INDEX}${professionId}?namespace=static-eu&locale=ru_RU&access_token=${this.accessToken}`)
        return response.data
    }

    private async getProfessionSkillTier(professionId: number, professionSkillId: number): Promise<IBlizzardProfessionSkillTier[]> {
        const response = await axios.get(`${BASE_URL}${PROFESSION_SKILL}${professionId}/skill-tier/${professionSkillId}?namespace=static-eu&locale=ru_RU&access_token=${this.accessToken}`)
        return response.data.categories
    }

    private async getRecipe(RecipeId: number): Promise<IBlizzardProfessionRecipe> {
        const response = await axios.get(`${BASE_URL}${RECIPE}${RecipeId}?namespace=static-eu&locale=ru_RU&access_token=${this.accessToken}`)
        return response.data
    }

    private async initProfessions(): Promise<void> {

        const professionIds = Array.from(Object.values(PROFESSION))
            .filter(it => typeof it === "number");

        for (let i = 0; i < professionIds.length; i++) {
            await this.initOneProfession(professionIds[i] as number)
        }

        this.writeToJson();

        this.createProfessions();
    }

    private createProfessions(): void  {
        const professionIds = Array.from(Object.values(PROFESSION))
            .filter(it => typeof it === "number");

        professionIds.forEach((it: number) => {
            this.hash[it] = new Profession(this.serializeHash[it], this.itemsService);
        })
    }

    private async initOneProfession(professionId: number): Promise<void> {
        const profession = await this.getById(professionId)
        const professionLastTier = await this.getProfessionSkillTier(professionId, profession.skill_tiers.pop().id);
        this.serializeHash[professionId] = await this.fillProfession(profession, professionLastTier);
        console.log(`profession load ready ${profession.name}`)
    }

    private async fillProfession(profession: IBlizzardProfessionDetail, professionTier: IBlizzardProfessionSkillTier[]): Promise<ISerializeProfession> {
        const assets = await getMedia(profession, this.accessToken)

        const categories: { name: string, recipes: ISerializeRecipe[] }[] = [];

        for (let i = 0; i < professionTier.length; i++) {
            const categ = professionTier[i];
            const promisesRecipe = categ.recipes.map(it => this.getRecipe(it.id))
            const recipes = await Promise.all(promisesRecipe)

            categories.push({
                name: categ.name,
                recipes: recipes.map(toSerializeRecipe)
            })
        }

        return {
            categories,
            assets,
            name: profession.name
        }
    }

    private writeToJson() {
        fs.writeFileSync('dist/src/professions/professions.json', JSON.stringify(this.serializeHash));
    }

    private async readFromJson(): Promise<void> {
        try {
            const tmp = fs.readFileSync('dist/src/professions/professions.json');
            this.serializeHash = JSON.parse(tmp);
            this.createProfessions();
        } catch (e) {
            console.log('err => has no professions.json')
            return this.initProfessions();
        }
    }
}

function toSerializeRecipe(data: IBlizzardProfessionRecipe): ISerializeRecipe {
// todo Какое то гавно с crafted_item. На клиенте виднее будет.
    if (!data.crafted_item) {
        return;
    }
    return {
        itemId: data.crafted_item.id,
        count: data.crafted_quantity.value,
        reagents: data.reagents.map(toSerializeReagent)
    }
}

function toSerializeReagent(reagent: IBlizzardReagent): { itemId: number, count: number } {
    return {
        itemId: reagent.reagent.id,
        count: reagent.quantity,
    }
}
