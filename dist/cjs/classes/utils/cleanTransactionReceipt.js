"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanTransactionReceipt = void 0;
const __1 = require("../..");
const cleanLog_1 = require("./cleanLog");
const cleanTransaction_1 = require("./cleanTransaction");
const hexToDecimal_1 = require("./hexToDecimal");
/**
 * Converts RPC transaction receipt response to more JS-friendly format
 */
function cleanTransactionReceipt(transactionReceipt) {
    const cleanedTransaction = (0, cleanTransaction_1.cleanTransaction)(transactionReceipt);
    const cleanedTransactionReceipt = Object.assign({}, cleanedTransaction);
    Object.keys(transactionReceipt).forEach((key) => {
        if (!transactionReceipt[key])
            return;
        switch (key) {
            case "status":
                cleanedTransactionReceipt[key] = Number((0, hexToDecimal_1.hexToDecimal)(transactionReceipt[key]));
                break;
            case "contractAddress":
                if (transactionReceipt[key]) {
                    cleanedTransactionReceipt[key] = (0, __1.toChecksumAddress)(transactionReceipt[key]);
                }
                break;
            case "cumulativeGasUsed":
            case "effectiveGasPrice":
            case "gasUsed":
                cleanedTransactionReceipt[key] = (0, __1.tinyBig)((0, hexToDecimal_1.hexToDecimal)(transactionReceipt[key]));
                break;
            case "logs":
                transactionReceipt[key].forEach((log, index) => {
                    cleanedTransactionReceipt[key][index] = (0, cleanLog_1.cleanLog)(log, true);
                });
        }
    });
    cleanedTransactionReceipt.byzantium =
        cleanedTransactionReceipt.blockNumber >= 4370000;
    return cleanedTransactionReceipt;
}
exports.cleanTransactionReceipt = cleanTransactionReceipt;
