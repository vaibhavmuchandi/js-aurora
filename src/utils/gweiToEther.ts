import type Big from "big.js";
import { tinyBig } from "../shared/tinyBig/tinyBig";
import { validateType } from "../shared/validateTypes";
import type { TinyBig } from "./../shared/tinyBig/tinyBig";

/**
 * Convert from Gwei to Ether
 *
 * No direct equivalent in ethers.js; requires multiple functions to achieve.
 *
 * No direct equivalent in web3; requires multiple functions to achieve.
 */
export function gweiToEther(
  gweiQuantity: string | number | TinyBig | Big
): TinyBig {
  validateType(gweiQuantity, ["string", "number", "object"]);
  const result = tinyBig(gweiQuantity).div("1000000000");
  return tinyBig(result);
}
