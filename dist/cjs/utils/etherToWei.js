"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.etherToWei = void 0;
const tinyBig_1 = require("../shared/tinyBig/tinyBig");
const validateTypes_1 = require("../shared/validateTypes");
/**
 * Convert Ether to Wei
 *
 * Similar to ["parseEther" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-parseEther)
 *
 * Similar to ["toWei" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#towei)
 */
function etherToWei(etherQuantity) {
    (0, validateTypes_1.validateType)(etherQuantity, ["string", "number", "object"]);
    const result = (0, tinyBig_1.tinyBig)(etherQuantity).times("1000000000000000000");
    return (0, tinyBig_1.tinyBig)(result);
}
exports.etherToWei = etherToWei;
