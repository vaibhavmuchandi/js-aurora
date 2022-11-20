"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanLog = void 0;
const toChecksumAddress_1 = require("../../utils/toChecksumAddress");
const hexToDecimal_1 = require("./hexToDecimal");
/**
 * Converts RPC log receipt response to more JS-friendly format
 */
function cleanLog(log, receiptLog) {
    const cleanedLog = Object.assign({}, log);
    Object.keys(log).forEach((key) => {
        switch (key) {
            case "address":
                cleanedLog[key] = (0, toChecksumAddress_1.toChecksumAddress)(log[key]);
                break;
            case "blockNumber":
            case "logIndex":
            case "transactionIndex":
                cleanedLog[key] = Number((0, hexToDecimal_1.hexToDecimal)(log[key]));
                break;
            case "removed":
                if (receiptLog) {
                    delete cleanedLog[key];
                }
                else if (log[key] == null) {
                    cleanedLog[key] === false;
                }
                break;
        }
    });
    return cleanedLog;
}
exports.cleanLog = cleanLog;
