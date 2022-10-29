import type Big from "big.js";
import type { TinyBig } from "../shared/tinyBig/tinyBig";
import { tinyBig } from "../shared/tinyBig/tinyBig";
import { validateType } from "../shared/validateTypes";

/**
 * Convert Ether to Wei
 *
 * Similar to ["parseEther" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-parseEther)
 *
 * Similar to ["toWei" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#towei)
 */
export function etherToWei(
  etherQuantity: string | number | TinyBig | Big
): TinyBig {
  validateType(etherQuantity, ["string", "number", "object"]);
  const result = tinyBig(etherQuantity).times("1000000000000000000");
  return tinyBig(result);
}
