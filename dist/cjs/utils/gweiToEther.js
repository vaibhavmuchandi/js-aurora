"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gweiToEther = void 0;
const tinyBig_1 = require("../shared/tinyBig/tinyBig");
const validateTypes_1 = require("../shared/validateTypes");
/**
 * Convert from Gwei to Ether
 *
 * No direct equivalent in ethers.js; requires multiple functions to achieve.
 *
 * No direct equivalent in web3; requires multiple functions to achieve.
 */
function gweiToEther(gweiQuantity) {
    (0, validateTypes_1.validateType)(gweiQuantity, ["string", "number", "object"]);
    const result = (0, tinyBig_1.tinyBig)(gweiQuantity).div("1000000000");
    return (0, tinyBig_1.tinyBig)(result);
}
exports.gweiToEther = gweiToEther;
