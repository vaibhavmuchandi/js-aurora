"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.etherToGwei = void 0;
const tinyBig_1 = require("../shared/tinyBig/tinyBig");
const validateTypes_1 = require("../shared/validateTypes");
/**
 * Convert from Ether to Gwei
 */
function etherToGwei(etherQuantity) {
    (0, validateTypes_1.validateType)(etherQuantity, ["string", "number", "object"]);
    const result = (0, tinyBig_1.tinyBig)(etherQuantity).times("1000000000");
    return (0, tinyBig_1.tinyBig)(result);
}
exports.etherToGwei = etherToGwei;
