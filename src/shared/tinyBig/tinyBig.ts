import Big from "big.js";
import { hexToDecimal } from "../../classes/utils/hexToDecimal";
import { scientificStrToDecimalStr } from "./helpers";

/**
 * A wrapper around [big.js](https://github.com/MikeMcl/big.js) which expands scientific notation and creates a "toHexString" function.
 * This is the return type of every operation on ether, wei, etc.
 */
export class TinyBig extends Big {
  constructor(value: string | number | TinyBig | Big) {
    if (typeof value === "string" && value.startsWith("0x")) {
      value = hexToDecimal(value);
    }
    super(value);
  }
  /**
   * Used anytime you're passing in "value" to ethers or web3
   */
  toHexString(): string {
    return `0x${BigInt(this.toString()).toString(16)}`;
  }
  toNumber(): number {
    return Number(scientificStrToDecimalStr(super.toString()));
  }

  toString(): string {
    if (this.toNumber() === 0) {
      return "0";
    }
    return scientificStrToDecimalStr(super.toString());
  }

  /**
   * Eithers pads or shortens a string to a specified length
   */
  private padAndChop = (
    str: string,
    padChar: string,
    length: number
  ): string => {
    return (Array(length).fill(padChar).join("") + str).slice(length * -1);
  };

  public toTwos(bitCount: number): Big {
    let binaryStr;

    if (this.gte(0)) {
      const twosComp = this.toNumber().toString(2);
      binaryStr = this.padAndChop(twosComp, "0", bitCount || twosComp.length);
    } else {
      binaryStr = this.plus(Math.pow(2, bitCount)).toNumber().toString(2);

      if (Number(binaryStr) < 0) {
        throw new Error("Cannot calculate twos complement");
      }
    }

    const binary = `0b${binaryStr}`;
    const decimal = Number(binary);
    return tinyBig(decimal);
  }
}

/**
 * Helper factory function so that you don't have to type "new" when instantiating a new TinyBig
 */
export function tinyBig(value: string | number | TinyBig | Big): TinyBig {
  return new TinyBig(value);
}
