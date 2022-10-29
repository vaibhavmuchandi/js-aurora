// inspired from https://github.com/ethers-io/ethers.js/blob/f599d6f23dad0d0acaa3828d6b7acaab2d5e455b/packages/bytes/src.ts/index.ts
import { logger } from "../logger/logger";

export type Bytes = ArrayLike<number>;

export type BytesLike = Bytes | string;
export type BytesLikeWithNumber = BytesLike | number;

export interface DataOptions {
  allowMissingPrefix?: boolean;
  hexPad?: "left" | "right" | null;
}

export interface Hexable {
  toHexString(): string;
}

export type SignatureLike =
  | {
      r: string;
      s?: string;
      _vs?: string;
      recoveryParam?: number;
      v?: number;
    }
  | BytesLike;

export interface Signature {
  r: string;

  s: string;
  _vs: string;

  recoveryParam: number;
  v: number;

  yParityAndS: string;
  compact: string;
}

/**
 * Check if a value can be converted to a hex string
 */
function isHexable(value: any): value is Hexable {
  return !!value.toHexString;
}

/**
 * Returns true if and only if value is a valid [Bytes](#bytes) or DataHexString
 * Same as [`ethers.utils.isBytesLike`](https://docs.ethers.io/v5/api/utils/bytes/#utils-isBytesLike)
 */
export function isBytesLike(value: any): value is BytesLike {
  return (isHexString(value) && !(value.length % 2)) || isBytes(value);
}

/**
 * Checks if a value is an integer
 */
function isInteger(value: number) {
  return typeof value === "number" && value == value && value % 1 === 0;
}

/**
 * Returns true if and only if value is a valid [Bytes](#bytes)
 * Same as [`ethers.utils.isBytes`](https://docs.ethers.io/v5/api/utils/bytes/#utils-isBytes)
 */
export function isBytes(value: any): value is Bytes {
  if (value == null) {
    return false;
  }

  if (value.constructor === Uint8Array) {
    return true;
  }
  if (typeof value === "string") {
    return false;
  }
  if (!isInteger(value.length) || value.length < 0) {
    return false;
  }

  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (!isInteger(v) || v < 0 || v >= 256) {
      return false;
    }
  }
  return true;
}

/**
 * Converts DataHexStringOrArrayish to a Uint8Array
 * Same as [`ethers.utils.arrayify`](https://docs.ethers.io/v5/api/utils/bytes/#utils-arrayify)
 */
export function arrayify(
  value: BytesLike | Hexable | number,
  options?: DataOptions
): Uint8Array {
  if (!options) {
    options = {};
  }

  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid arrayify value");

    const result = [];
    while (value) {
      result.unshift(value & 0xff);
      value = parseInt(String(value / 256));
    }
    if (result.length === 0) {
      result.push(0);
    }

    return new Uint8Array(result);
  }

  if (
    options.allowMissingPrefix &&
    typeof value === "string" &&
    value.substring(0, 2) !== "0x"
  ) {
    value = "0x" + value;
  }

  if (isHexable(value)) {
    value = value.toHexString();
  }

  if (isHexString(value)) {
    let hex = (<string>value).substring(2);
    if (hex.length % 2) {
      if (options.hexPad === "left") {
        hex = "0" + hex;
      } else if (options.hexPad === "right") {
        hex += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }

    const result = [];
    for (let i = 0; i < hex.length; i += 2) {
      result.push(parseInt(hex.substring(i, i + 2), 16));
    }

    return new Uint8Array(result);
  }

  if (isBytes(value)) {
    return new Uint8Array(value);
  }

  return logger.throwArgumentError("invalid arrayify value", "value", value);
}

/**
 * Concatenates all the BytesLike in arrayOfBytesLike into a single Uint8Array.
 * Same as [`ethers.utils.concat`](https://docs.ethers.io/v5/api/utils/bytes/#utils-concat)
 */
export function concat(
  arrayOfBytesLike: ReadonlyArray<BytesLikeWithNumber>
): Uint8Array {
  const objects = arrayOfBytesLike.map((item) => arrayify(item));
  const length = objects.reduce((accum, item) => accum + item.length, 0);
  const result = new Uint8Array(length);
  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);
  return result;
}

/**
 * Strips leading zeros from a BytesLike object
 */
export function stripZeros(value: BytesLike): Uint8Array {
  let result: Uint8Array = arrayify(value);

  if (result.length === 0) {
    return result;
  }

  // Find the first non-zero entry
  let start = 0;
  while (start < result.length && result[start] === 0) {
    start++;
  }

  // If we started with zeros, strip them
  if (start) {
    result = result.slice(start);
  }

  return result;
}

/**
 * Pads the beginning of a {@link BytesLike} with zeros so it's the specified length as a Uint8Array
 */
export function zeroPad(value: BytesLike, length: number): Uint8Array {
  value = arrayify(value);

  if (value.length > length) {
    logger.throwArgumentError("value out of range", "value", value);
  }

  const result = new Uint8Array(length);
  result.set(value, length - value.length);
  return result;
}

/**
 * Returns true if and only if object is a valid hex string.
 * If length is specified and object is not a valid DataHexString of length bytes, an InvalidArgument error is thrown.
 * Same as [`ethers.utils.isHexString`](https://docs.ethers.io/v5/api/utils/bytes/#utils-isHexString)
 */
export function isHexString(value: any, length?: number): boolean {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}

const HexCharacters = "0123456789abcdef";

/**
 * Converts a value into a hex string
 */
export function hexlify(
  value: BytesLike | Hexable | number | bigint,
  options?: DataOptions
): string {
  if (!options) {
    options = {};
  }

  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid hexlify value");

    let hex = "";
    while (value) {
      hex = HexCharacters[value & 0xf] + hex;
      value = Math.floor(value / 16);
    }

    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex;
      }
      return "0x" + hex;
    }

    return "0x00";
  }

  if (typeof value === "bigint") {
    value = value.toString(16);
    if (value.length % 2) {
      return "0x0" + value;
    }
    return "0x" + value;
  }

  if (
    options.allowMissingPrefix &&
    typeof value === "string" &&
    value.substring(0, 2) !== "0x"
  ) {
    value = "0x" + value;
  }

  if (isHexable(value)) {
    return value.toHexString();
  }

  if (isHexString(value)) {
    if ((<string>value).length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + (<string>value).substring(2);
      } else if (options.hexPad === "right") {
        value += "0";
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value);
      }
    }
    return (<string>value).toLowerCase();
  }

  if (isBytes(value)) {
    let result = "0x";
    for (let i = 0; i < value.length; i++) {
      const v = value[i];
      result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
    }
    return result;
  }

  return logger.throwArgumentError("invalid hexlify value", "value", value);
}

/**
 * Gets the length of data represented as a hex string
 */
export function hexDataLength(data: BytesLike) {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    return null;
  }

  return (data.length - 2) / 2;
}

/**
 * Slices a {@link BytesLike} to extract a certain part of the input
 */
export function hexDataSlice(
  data: BytesLikeWithNumber,
  offset: number,
  endOffset?: number
): string {
  if (typeof data !== "string") {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    logger.throwArgumentError("invalid hexData", "value", data);
  }

  offset = 2 + 2 * offset;

  if (endOffset != null) {
    return "0x" + data.substring(offset, 2 + 2 * endOffset);
  }

  return "0x" + data.substring(offset);
}

/**
 * Concatenates values together into one hex string
 */
export function hexConcat(items: ReadonlyArray<BytesLike>): string {
  let result = "0x";
  items.forEach((item) => {
    result += hexlify(item).substring(2);
  });
  return result;
}

/**
 * Converts a number of different types into a hex string
 */
export function hexValue(value: BytesLike | Hexable | number | bigint): string {
  const trimmed = hexStripZeros(hexlify(value, { hexPad: "left" }));
  if (trimmed === "0x") {
    return "0x0";
  }
  return trimmed;
}

/**
 * Strips the leading zeros from a value and returns it as a hex string
 */
export function hexStripZeros(value: BytesLike): string {
  if (typeof value !== "string") {
    value = hexlify(value);
  }

  if (!isHexString(value)) {
    logger.throwArgumentError("invalid hex string", "value", value);
  }
  value = value.substring(2);
  let offset = 0;
  while (offset < value.length && value[offset] === "0") {
    offset++;
  }
  return "0x" + value.substring(offset);
}

/**
 * Returns a hex string padded to a specified length of bytes.
 */
export function hexZeroPad(value: BytesLikeWithNumber, length: number): string {
  if (typeof value !== "string") {
    value = hexlify(value);
  } else if (!isHexString(value)) {
    logger.throwArgumentError("invalid hex string", "value", value);
  }

  if (value.length > 2 * length + 2) {
    logger.throwError("value out of range", { value, length });
  }

  while (value.length < 2 * length + 2) {
    value = "0x0" + value.substring(2);
  }

  return value;
}
