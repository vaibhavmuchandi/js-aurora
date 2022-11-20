"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solidityKeccak256 = exports.pack = void 0;
const buffer_1 = require("buffer");
const encodeDecodeTransaction_1 = require("../classes/utils/encodeDecodeTransaction");
const logger_1 = require("../logger/logger");
const tinyBig_1 = require("../shared/tinyBig/tinyBig");
const bytes_1 = require("./bytes");
const keccak256_1 = require("./keccak256");
const regexBytes = new RegExp("^bytes([0-9]+)$");
const regexNumber = new RegExp("^(u?int)([0-9]*)$");
const regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");
/**
 * Packs a type and value together into a UTF-8 Byte Array
 */
function _pack(type, value, isArray) {
    switch (type) {
        case "address":
            if (isArray) {
                return (0, bytes_1.zeroPad)(value, 32);
            }
            return (0, bytes_1.arrayify)(value);
        case "string":
            return buffer_1.Buffer.from(value);
        case "bytes":
            return (0, bytes_1.arrayify)(value);
        case "bool":
            value = value ? "0x01" : "0x00";
            if (isArray) {
                return (0, bytes_1.zeroPad)(value, 32);
            }
            return (0, bytes_1.arrayify)(value);
    }
    let match = type.match(regexNumber);
    if (match) {
        //let signed = (match[1] === "int")
        let size = parseInt(match[2] || "256");
        if ((match[2] && String(size) !== match[2]) ||
            size % 8 !== 0 ||
            size === 0 ||
            size > 256) {
            logger_1.logger.throwArgumentError("invalid number type", "type", type);
        }
        if (isArray) {
            size = 256;
        }
        value = (0, tinyBig_1.tinyBig)(value).toTwos(size).toNumber();
        const hexValue = (0, bytes_1.hexlify)(value);
        return (0, bytes_1.zeroPad)(hexValue, size / 8);
    }
    match = type.match(regexBytes);
    if (match) {
        const size = parseInt(match[1]);
        if (String(size) !== match[1] || size === 0 || size > 32) {
            logger_1.logger.throwArgumentError("invalid bytes type", "type", type);
        }
        if ((0, bytes_1.arrayify)(value).byteLength !== size) {
            logger_1.logger.throwArgumentError(`invalid value for ${type}`, "value", value);
        }
        if (isArray) {
            return (0, bytes_1.arrayify)((value + encodeDecodeTransaction_1.hexFalse).substring(0, 66));
        }
        return value;
    }
    match = type.match(regexArray);
    if (match && Array.isArray(value)) {
        const baseType = match[1];
        const count = parseInt(match[2] || String(value.length));
        if (count != value.length) {
            logger_1.logger.throwArgumentError(`invalid array length for ${type}`, "value", value);
        }
        const result = [];
        value.forEach(function (value) {
            result.push(_pack(baseType, value, true));
        });
        return (0, bytes_1.concat)(result);
    }
    return logger_1.logger.throwArgumentError("invalid type", "type", type);
}
/**
 * Converts arrays with types and values into a hex string that can be hashed
 */
function pack(types, values) {
    if (types.length != values.length) {
        logger_1.logger.throwArgumentError("wrong number of values; expected ${ types.length }", "values", values);
    }
    const tight = [];
    types.forEach(function (type, index) {
        tight.push(_pack(type, values[index]));
    });
    return (0, bytes_1.hexlify)((0, bytes_1.concat)(tight));
}
exports.pack = pack;
/**
 * Hashes data from Solidity using the Keccak256 algorithm.
 */
function solidityKeccak256(types, values) {
    return (0, keccak256_1.keccak256)(pack(types, values));
}
exports.solidityKeccak256 = solidityKeccak256;
