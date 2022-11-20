import Big from "big.js";
import { hexToDecimal } from "../../classes/utils/hexToDecimal";
import { scientificStrToDecimalStr } from "./helpers";
export class TinyBig extends Big {
    constructor(value) {
        if (typeof value === "string" && value.startsWith("0x")) {
            value = hexToDecimal(value);
        }
        super(value);
        this.padAndChop = (str, padChar, length) => {
            return (Array(length).fill(padChar).join("") + str).slice(length * -1);
        };
    }
    toHexString() {
        return `0x${BigInt(this.toString()).toString(16)}`;
    }
    toNumber() {
        return Number(scientificStrToDecimalStr(super.toString()));
    }
    toString() {
        if (this.toNumber() === 0) {
            return "0";
        }
        return scientificStrToDecimalStr(super.toString());
    }
    toTwos(bitCount) {
        let binaryStr;
        if (this.gte(0)) {
            const twosComp = this.toNumber().toString(2);
            binaryStr = this.padAndChop(twosComp, "0", bitCount || twosComp.length);
        }
        else {
            binaryStr = this.plus(Math.pow(2, bitCount)).toNumber().toString(2);
            if (Number(binaryStr) < 0) {
                throw new Error("Cannot calculate twos complement");
            }
        }
        const binary = `0b${binaryStr}`;
        const decimal = Number(binary);
        return tinyBig(decimal);
    }
}
export function tinyBig(value) {
    return new TinyBig(value);
}
