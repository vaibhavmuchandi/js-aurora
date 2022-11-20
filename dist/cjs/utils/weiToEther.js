"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weiToEther = void 0;
const tinyBig_1 = require("../shared/tinyBig/tinyBig");
const validateTypes_1 = require("../shared/validateTypes");
/**
 * Convert from Wei to Ether
 *
 * inspired from ["formatEther" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatEther)
 *
 * inspired from ["fromWei" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#fromwei)
 */
function weiToEther(weiQuantity) {
    (0, validateTypes_1.validateType)(weiQuantity, ["string", "number", "object"]);
    // eslint-disable-next-line no-useless-catch
    try {
        let _weiQuantity = weiQuantity;
        if (typeof weiQuantity === "string" && weiQuantity.slice(0, 2) === "0x") {
            _weiQuantity = BigInt(weiQuantity).toString();
        }
        const result = (0, tinyBig_1.tinyBig)(_weiQuantity).div("1000000000000000000");
        return (0, tinyBig_1.tinyBig)(result);
    }
    catch (error) {
        throw error;
    }
}
exports.weiToEther = weiToEther;
