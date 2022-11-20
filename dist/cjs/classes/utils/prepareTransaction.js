"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTransaction = void 0;
const big_js_1 = __importDefault(require("big.js"));
const tinyBig_1 = require("../../shared/tinyBig/tinyBig");
const bytes_1 = require("../../utils/bytes");
/**
 * @param transaction
 * @example
 */
function prepareTransaction(transaction) {
    const preparedTransaction = Object.assign({}, transaction);
    Object.keys(transaction).forEach((key) => {
        switch (key) {
            case "gas":
            case "gasPrice":
            case "nonce":
            case "maxFeePerGas":
            case "maxPriorityFeePerGas":
            case "value": {
                const value = transaction[key];
                if (value instanceof tinyBig_1.TinyBig) {
                    preparedTransaction[key] = value.toHexString();
                }
                else if (value instanceof big_js_1.default) {
                    preparedTransaction[key] = `0x${BigInt(value.toString()).toString(16)}`;
                }
                else if (typeof transaction[key] === "number")
                    preparedTransaction[key] =
                        "0x" + transaction[key].toString(16);
                else
                    preparedTransaction[key] = transaction[key].toString();
                break;
            }
            case "data":
                preparedTransaction[key] = (0, bytes_1.hexlify)(transaction[key]);
                break;
        }
    });
    return preparedTransaction;
}
exports.prepareTransaction = prepareTransaction;
