import axios from "axios";
import {BASE_URL} from "../index";
import {Items} from "../items/items";
import {
    IBlizzardProfessionDetail,
    IBlizzardProfessionRecipe,
    IBlizzardProfessions,
    IBlizzardProfessionSkillTier
} from "blizzard-types";

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
    private hash = {};
    private accessToken: string | undefined;

    constructor(private itemsService: Items) {
        // this.readFromJson();
    }


    updateToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    public async start() {
        this.initProfession();
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

    private async initProfession(): Promise<void> {
        const professionIds = Array.from(Object.values(PROFESSION))
            .filter(it => typeof it === "number");

    }

    private writeToJson() {
        fs.writeFileSync('dist/src/professions/professions.json', JSON.stringify(this.hash));
    }

    private readFromJson(): void {
        try {
            const tmp = fs.readFileSync('dist/src/professions/professions.json');
            this.hash = JSON.parse(tmp);
        } catch (e) {
            console.log('err => has no professions.json')
        }
    }
}
