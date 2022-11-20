import Big from "big.js";
export declare class TinyBig extends Big {
    constructor(value: string | number | TinyBig | Big);
    toHexString(): string;
    toNumber(): number;
    toString(): string;
    private padAndChop;
    toTwos(bitCount: number): Big;
}
export declare function tinyBig(value: string | number | TinyBig | Big): TinyBig;
