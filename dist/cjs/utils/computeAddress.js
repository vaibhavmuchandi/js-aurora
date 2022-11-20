"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeAddress = void 0;
const __1 = require("..");
const bytes_1 = require("./bytes");
const keccak256_1 = require("./keccak256");
/**
 * Computes the address that corresponds to a specified public or private key
 */
function computeAddress(key) {
    // compressed public keys start with 0x04
    // uncompressed public keys start with 0x03 or 0x02
    if (!key.startsWith("0x04") &&
        !key.startsWith("0x03") &&
        !key.startsWith("0x02")) {
        key = (0, __1.computePublicKey)(key);
    }
    return (0, __1.toChecksumAddress)((0, bytes_1.hexDataSlice)((0, keccak256_1.keccak256)((0, bytes_1.hexDataSlice)(key, 1)), 12));
}
exports.computeAddress = computeAddress;
