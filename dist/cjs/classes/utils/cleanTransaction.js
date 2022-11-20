"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanTransaction = void 0;
const __1 = require("../..");
const hexToDecimal_1 = require("./hexToDecimal");
/**
 * Converts RPC transaction response to more JS-friendly format
 */
function cleanTransaction(transaction) {
    const cleanedTransaction = Object.assign({}, transaction);
    Object.keys(transaction).forEach((key) => {
        // pending blocks have null instead of a difficulty
        // pending blocks have null instead of a miner address
        if (!transaction[key])
            return;
        switch (key) {
            case "blockNumber":
            case "chainId":
            case "transactionIndex":
            case "type":
            case "v":
                cleanedTransaction[key] = Number((0, hexToDecimal_1.hexToDecimal)(transaction[key]));
                break;
            case "from":
            case "to":
                if (transaction[key]) {
                    cleanedTransaction[key] = (0, __1.toChecksumAddress)(transaction[key]);
                }
                break;
            case "value":
            case "gas":
            case "gasPrice":
            case "maxFeePerGas":
            case "maxPriorityFeePerGas":
            case "nonce":
                cleanedTransaction[key] = (0, __1.tinyBig)((0, hexToDecimal_1.hexToDecimal)(transaction[key]));
                break;
        }
    });
    return cleanedTransaction;
}
exports.cleanTransaction = cleanTransaction;
