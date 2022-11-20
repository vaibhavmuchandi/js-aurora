"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanBlock = void 0;
const __1 = require("../..");
const tinyBig_1 = require("../../shared/tinyBig/tinyBig");
const cleanTransaction_1 = require("./cleanTransaction");
const hexToDecimal_1 = require("./hexToDecimal");
/**
 * Converts RPC block response to more JS-friendly format
 */
function cleanBlock(block, returnTransactionObjects) {
    const cleanedBlock = Object.assign({}, block);
    Object.keys(block).forEach((key) => {
        // pending blocks have null instead of a difficulty
        // pending blocks have null instead of a miner address
        if (!block[key])
            return;
        switch (key) {
            case "difficulty":
            case "totalDifficulty":
            case "gasLimit":
            case "gasUsed":
            case "size":
            case "timestamp":
            case "baseFeePerGas":
                cleanedBlock[key] = (0, tinyBig_1.tinyBig)((0, hexToDecimal_1.hexToDecimal)(block[key]));
                break;
            case "number":
                cleanedBlock[key] = Number((0, hexToDecimal_1.hexToDecimal)(block[key]));
                break;
            case "miner":
                cleanedBlock[key] = (0, __1.toChecksumAddress)(block[key]);
                break;
        }
    });
    // for all full transactions
    if (returnTransactionObjects) {
        const txns = block.transactions;
        txns.forEach((transaction, index) => {
            cleanedBlock.transactions[index] = (0, cleanTransaction_1.cleanTransaction)(transaction);
        });
    }
    return cleanedBlock;
}
exports.cleanBlock = cleanBlock;
