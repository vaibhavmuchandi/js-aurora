"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitSignature = void 0;
const logger_1 = require("./../logger/logger");
const bytes_1 = require("./bytes");
/**
 * Expands a signature into the full signature object and fills in missing properties.
 *
 * inspired from ["splitSignature" in ethers.js](https://docs.ethers.io/v5/api/utils/bytes/#utils-splitSignature)
 */
function splitSignature(signature) {
    const result = {
        r: "0x",
        s: "0x",
        _vs: "0x",
        recoveryParam: 0,
        v: 0,
        yParityAndS: "0x",
        compact: "0x",
    };
    if ((0, bytes_1.isBytesLike)(signature)) {
        const bytes = (0, bytes_1.arrayify)(signature);
        // Get the r, s and v
        if (bytes.length === 64) {
            // EIP-2098; pull the v from the top bit of s and clear it
            result.v = 27 + (bytes[32] >> 7);
            bytes[32] &= 0x7f;
            result.r = (0, bytes_1.hexlify)(bytes.slice(0, 32));
            result.s = (0, bytes_1.hexlify)(bytes.slice(32, 64));
        }
        else if (bytes.length === 65) {
            result.r = (0, bytes_1.hexlify)(bytes.slice(0, 32));
            result.s = (0, bytes_1.hexlify)(bytes.slice(32, 64));
            result.v = bytes[64];
        }
        else {
            logger_1.logger.throwArgumentError("invalid signature string", "signature", signature);
        }
        // Allow a recid to be used as the v
        if (result.v < 27) {
            if (result.v === 0 || result.v === 1) {
                result.v += 27;
            }
            else {
                logger_1.logger.throwArgumentError("signature invalid v byte", "signature", signature);
            }
        }
        // Compute recoveryParam from v
        result.recoveryParam = 1 - (result.v % 2);
        // Compute _vs from recoveryParam and s
        if (result.recoveryParam) {
            bytes[32] |= 0x80;
        }
        result._vs = (0, bytes_1.hexlify)(bytes.slice(32, 64));
    }
    else {
        result.r = signature.r;
        result.s = signature.s;
        result.v = signature.v;
        result.recoveryParam = signature.recoveryParam;
        result._vs = signature._vs;
        // If the _vs is available, use it to populate missing s, v and recoveryParam
        // and verify non-missing s, v and recoveryParam
        if (result._vs != null) {
            const vs_1 = (0, bytes_1.zeroPad)((0, bytes_1.arrayify)(result._vs), 32);
            result._vs = (0, bytes_1.hexlify)(vs_1);
            // Set or check the recid
            const recoveryParam = vs_1[0] >= 128 ? 1 : 0;
            if (result.recoveryParam == null) {
                result.recoveryParam = recoveryParam;
            }
            else if (result.recoveryParam !== recoveryParam) {
                logger_1.logger.throwArgumentError("signature recoveryParam mismatch _vs", "signature", signature);
            }
            // Set or check the s
            vs_1[0] &= 0x7f;
            const s = (0, bytes_1.hexlify)(vs_1);
            if (result.s == null) {
                result.s = s;
            }
            else if (result.s !== s) {
                logger_1.logger.throwArgumentError("signature v mismatch _vs", "signature", signature);
            }
        }
        // Use recid and v to populate each other
        if (result.recoveryParam == null) {
            if (result.v == null) {
                logger_1.logger.throwArgumentError("signature missing v and recoveryParam", "signature", signature);
            }
            else if (result.v === 0 || result.v === 1) {
                result.recoveryParam = result.v;
            }
            else {
                result.recoveryParam = 1 - (result.v % 2);
            }
        }
        else {
            if (result.v == null) {
                result.v = 27 + result.recoveryParam;
            }
            else {
                const recId = result.v === 0 || result.v === 1 ? result.v : 1 - (result.v % 2);
                if (result.recoveryParam !== recId) {
                    logger_1.logger.throwArgumentError("signature recoveryParam mismatch v", "signature", signature);
                }
            }
        }
        if (result.r == null || !(0, bytes_1.isHexString)(result.r)) {
            logger_1.logger.throwArgumentError("signature missing or invalid r", "signature", signature);
        }
        else {
            result.r = (0, bytes_1.hexZeroPad)(result.r, 32);
        }
        if (result.s == null || !(0, bytes_1.isHexString)(result.s)) {
            logger_1.logger.throwArgumentError("signature missing or invalid s", "signature", signature);
        }
        else {
            result.s = (0, bytes_1.hexZeroPad)(result.s, 32);
        }
        const vs = (0, bytes_1.arrayify)(result.s);
        if (vs[0] >= 128) {
            logger_1.logger.throwArgumentError("signature s out of range", "signature", signature);
        }
        if (result.recoveryParam) {
            vs[0] |= 0x80;
        }
        const _vs = (0, bytes_1.hexlify)(vs);
        if (result._vs) {
            if (!(0, bytes_1.isHexString)(result._vs)) {
                logger_1.logger.throwArgumentError("signature invalid _vs", "signature", signature);
            }
            result._vs = (0, bytes_1.hexZeroPad)(result._vs, 32);
        }
        // Set or check the _vs
        if (result._vs == null) {
            result._vs = _vs;
        }
        else if (result._vs !== _vs) {
            logger_1.logger.throwArgumentError("signature _vs mismatch v and s", "signature", signature);
        }
    }
    result.yParityAndS = result._vs;
    result.compact = result.r + result.yParityAndS.substring(2);
    return result;
}
exports.splitSignature = splitSignature;