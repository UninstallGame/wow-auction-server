export interface IBlizzardAuctionPosition {
    id: number,
    item: { id: number },
    quantity: number,
    unit_price: number,
    time_left: AUCTION_TIME_LEFT
}

export enum AUCTION_TIME_LEFT {
    SHORT = 'SHORT',
    MEDIUM = 'MEDIUM',
    LONG = 'LONG',
    VERY_LONG = 'VERY_LONG'
}

export enum QUALITY {
    COMMON = 'COMMON',
    EPIC = 'EPIC'
}

export enum INVENTORY_TYPE {
    NON_EQUIP = 'NON_EQUIP'
}

export interface IBlizzardItem {
    "id": number,
    "name": string,
    "quality": {
        "type": QUALITY,
        "name": string
    },
    "level": number,
    "required_level": number,
    "media": {
        "key": {
            "href": string
        },
        "id": number
    },
    "item_class": {
        "key": {
            "href": string
        },
        "name": string,
        "id": number
    },
    "item_subclass": {
        "key": {
            "href": string
        },
        "name": string,
        "id": number
    },
    "inventory_type": {
        "type": INVENTORY_TYPE,
        "name": string
    },
    "purchase_price": number,
    "sell_price": number,
    "max_count": number,
    "is_equippable": boolean,
    "is_stackable": boolean,
    "preview_item": {
        "item": {
            "key": {
                "href": string
            },
            "id": number
        },
        "quality": {
            "type": QUALITY,
            "name": string
        },
        "name": string,
        "media": {
            "key": {
                "href": string
            },
            "id": number
        },
        "item_class": {
            "key": {
                "href": string
            },
            "name": string,
            "id": number
        },
        "item_subclass": {
            "key": {
                "href": string
            },
            "name": string,
            "id": number
        },
        "inventory_type": {
            "type": INVENTORY_TYPE,
            "name": string
        },
        "sell_price": {
            "value": number,
            "display_strings": {
                "header": string,
                "gold": string,
                "silver": string,
                "copper": string
            }
        },
        "requirements": {
            "skill": {
                "profession": {
                    "key": {
                        "href": string
                    },
                    "name": string,
                    "id": number
                },
                "display_string": string
            }
        },
        "is_subclass_hidden": boolean,
        "crafting_reagent": string
    },
    "purchase_quantity": number
}

export interface IBlizzardProfessions {
    key: {
        href: string
    },
    name: string,
    id: number
}

export interface IBlizzardProfessionDetail {
    name: string;
    media: {
        key: {
            href: string
        },
        id: number
    },
    skill_tiers: {
        key: {
            href: string
        },
        name: string,
        id: number
    }[]
}

export interface IBlizzardProfessionSkillTier {
    name: string,
    recipes: {
        key: {
            href: string
        },
        name: string,
        id: number
    }[]
}

export interface IBlizzardProfessionRecipe {
    id: number,
    name: string,
    media: {
        key: {
            href: string
        },
        id: number
    },
    crafted_item: {
        key: {
            href: string
        },
        name: string,
        id: number
    },
    reagents: IBlizzardReagent[],
    crafted_quantity: { value: number }
}

export interface IBlizzardReagent {
    reagent: {
        key: {
            href: string
        },
        name: string,
        id: number
    },
    quantity: number
}

export interface IBlizzardAsset {
    "key": "icon",
    "value": "https://render-us.worldofwarcraft.com/icons/56/inv_sword_39.jpg"
}

export interface IBlizzardAuctionItem {
    id: 771984692,
    item: {id: number},
    quantity: number,
    time_left: AUCTION_TIME_LEFT
    unit_price?: number,
    buyout?: number,
}
