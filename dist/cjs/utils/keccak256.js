"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keccak256 = void 0;
const sha3_1 = require("sha3");
/**
 * Hashes data into a Keccak256 hex string
 */
function keccak256(data) {
    let bufferableData;
    if (typeof data === "string") {
        bufferableData = Buffer.from(data.replace(/^0x/, ""), "hex");
    }
    else {
        bufferableData = Buffer.from(data);
    }
    const keccak = new sha3_1.Keccak(256);
    const addressHash = "0x" + keccak.update(bufferableData).digest("hex");
    return addressHash;
}
exports.keccak256 = keccak256;
