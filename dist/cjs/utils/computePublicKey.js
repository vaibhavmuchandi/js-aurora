"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computePublicKey = void 0;
const secp256k1_1 = require("@noble/secp256k1");
const bytes_1 = require("./bytes");
/**
 * Computes the public key from a given private key
 */
function computePublicKey(privKey) {
    privKey = (0, bytes_1.hexlify)(privKey).slice(2);
    return "0x" + secp256k1_1.Point.fromPrivateKey(privKey).toHex();
}
exports.computePublicKey = computePublicKey;
