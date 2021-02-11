export interface IAuctionPosition {
    id: number,
    item: { id: number },
    quantity: number,
    unit_price: number,
    time_left: AUCTION_TIME_LEFT
}

export enum AUCTION_TIME_LEFT {
    SHORT,
    MEDIUM,
    LONG,
    VERY_LONG
}
