import type Big from "big.js";
import type { TinyBig } from "../shared/tinyBig/tinyBig";
import { tinyBig } from "../shared/tinyBig/tinyBig";
import { validateType } from "../shared/validateTypes";

/**
 * Convert from Ether to Gwei
 */
export function etherToGwei(
  etherQuantity: string | number | TinyBig | Big
): TinyBig {
  validateType(etherQuantity, ["string", "number", "object"]);
  const result = tinyBig(etherQuantity).times("1000000000");
  return tinyBig(result);
}
