"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAddress = void 0;
const __1 = require("..");
const validateTypes_1 = require("../shared/validateTypes");
/**
 * Returns a boolean as to whether the input is a valid address.
 * Does NOT support ICAP addresses
 */
function isAddress(address) {
    (0, validateTypes_1.validateType)(address, ["string"]);
    try {
        (0, __1.toChecksumAddress)(address);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.isAddress = isAddress;
