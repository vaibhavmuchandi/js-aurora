"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashMessage = void 0;
const index_1 = require("../index");
const messagePrefix = "\x19Aurora Signed Message:\n";
/**
 * Computes the EIP-191 personal message digest of message.
 */
function hashMessage(message) {
    if (typeof message === "string") {
        message = (0, index_1.toUtf8Bytes)(message);
    }
    return (0, index_1.keccak256)((0, index_1.concat)([
        (0, index_1.toUtf8Bytes)(messagePrefix),
        (0, index_1.toUtf8Bytes)(String(message.length)),
        message,
    ]));
}
exports.hashMessage = hashMessage;
