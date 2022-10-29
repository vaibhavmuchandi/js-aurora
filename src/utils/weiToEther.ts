import type Big from "big.js";
import type { TinyBig } from "../shared/tinyBig/tinyBig";
import { tinyBig } from "../shared/tinyBig/tinyBig";
import { validateType } from "../shared/validateTypes";

/**
 * Convert from Wei to Ether
 *
 * inspired from ["formatEther" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatEther)
 *
 * inspired from ["fromWei" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#fromwei)
 */
export function weiToEther(
  weiQuantity: string | number | TinyBig | Big
): TinyBig {
  validateType(weiQuantity, ["string", "number", "object"]);
  // eslint-disable-next-line no-useless-catch
  try {
    let _weiQuantity = weiQuantity;
    if (typeof weiQuantity === "string" && weiQuantity.slice(0, 2) === "0x") {
      _weiQuantity = BigInt(weiQuantity).toString();
    }
    const result = tinyBig(_weiQuantity).div("1000000000000000000");
    return tinyBig(result);
  } catch (error) {
    throw error;
  }
}
