"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tinyBig = exports.TinyBig = void 0;
const big_js_1 = __importDefault(require("big.js"));
const hexToDecimal_1 = require("../../classes/utils/hexToDecimal");
const helpers_1 = require("./helpers");
class TinyBig extends big_js_1.default {
    constructor(value) {
        if (typeof value === "string" && value.startsWith("0x")) {
            value = (0, hexToDecimal_1.hexToDecimal)(value);
        }
        super(value);
        /**
         * Eithers pads or shortens a string to a specified length
         */
        this.padAndChop = (str, padChar, length) => {
            return (Array(length).fill(padChar).join("") + str).slice(length * -1);
        };
    }
    /**
     * Used anytime you're passing in "value" to ethers or web3
     */
    toHexString() {
        return `0x${BigInt(this.toString()).toString(16)}`;
    }
    toNumber() {
        return Number((0, helpers_1.scientificStrToDecimalStr)(super.toString()));
    }
    toString() {
        if (this.toNumber() === 0) {
            return "0";
        }
        return (0, helpers_1.scientificStrToDecimalStr)(super.toString());
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
exports.TinyBig = TinyBig;
/**
 * Helper factory function so that you don't have to type "new" when instantiating a new TinyBig
 */
function tinyBig(value) {
    return new TinyBig(value);
}
exports.tinyBig = tinyBig;
