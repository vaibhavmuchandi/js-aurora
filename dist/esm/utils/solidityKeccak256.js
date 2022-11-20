import { Buffer } from "buffer";
import { hexFalse } from "../classes/utils/encodeDecodeTransaction";
import { logger } from "../logger/logger";
import { tinyBig } from "../shared/tinyBig/tinyBig";
import { arrayify, concat, hexlify, zeroPad } from "./bytes";
import { keccak256 } from "./keccak256";
const regexBytes = new RegExp("^bytes([0-9]+)$");
const regexNumber = new RegExp("^(u?int)([0-9]*)$");
const regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");
function _pack(type, value, isArray) {
    switch (type) {
        case "address":
            if (isArray) {
                return zeroPad(value, 32);
            }
            return arrayify(value);
        case "string":
            return Buffer.from(value);
        case "bytes":
            return arrayify(value);
        case "bool":
            value = value ? "0x01" : "0x00";
            if (isArray) {
                return zeroPad(value, 32);
            }
            return arrayify(value);
    }
    let match = type.match(regexNumber);
    if (match) {
        let size = parseInt(match[2] || "256");
        if ((match[2] && String(size) !== match[2]) ||
            size % 8 !== 0 ||
            size === 0 ||
            size > 256) {
            logger.throwArgumentError("invalid number type", "type", type);
        }
        if (isArray) {
            size = 256;
        }
        value = tinyBig(value).toTwos(size).toNumber();
        const hexValue = hexlify(value);
        return zeroPad(hexValue, size / 8);
    }
    match = type.match(regexBytes);
    if (match) {
        const size = parseInt(match[1]);
        if (String(size) !== match[1] || size === 0 || size > 32) {
            logger.throwArgumentError("invalid bytes type", "type", type);
        }
        if (arrayify(value).byteLength !== size) {
            logger.throwArgumentError(`invalid value for ${type}`, "value", value);
        }
        if (isArray) {
            return arrayify((value + hexFalse).substring(0, 66));
        }
        return value;
    }
    match = type.match(regexArray);
    if (match && Array.isArray(value)) {
        const baseType = match[1];
        const count = parseInt(match[2] || String(value.length));
        if (count != value.length) {
            logger.throwArgumentError(`invalid array length for ${type}`, "value", value);
        }
        const result = [];
        value.forEach(function (value) {
            result.push(_pack(baseType, value, true));
        });
        return concat(result);
    }
    return logger.throwArgumentError("invalid type", "type", type);
}
export function pack(types, values) {
    if (types.length != values.length) {
        logger.throwArgumentError("wrong number of values; expected ${ types.length }", "values", values);
    }
    const tight = [];
    types.forEach(function (type, index) {
        tight.push(_pack(type, values[index]));
    });
    return hexlify(concat(tight));
}
export function solidityKeccak256(types, values) {
    return keccak256(pack(types, values));
}
