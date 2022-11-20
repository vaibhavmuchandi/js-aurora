"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUtf8Bytes = void 0;
/**
 * Converts a string into a UTF-8 Byte Array
 */
function toUtf8Bytes(data) {
    return new Uint8Array(Buffer.from(data));
}
exports.toUtf8Bytes = toUtf8Bytes;
