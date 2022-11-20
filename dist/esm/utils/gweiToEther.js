import { tinyBig } from "../shared/tinyBig/tinyBig";
import { validateType } from "../shared/validateTypes";
export function gweiToEther(gweiQuantity) {
    validateType(gweiQuantity, ["string", "number", "object"]);
    const result = tinyBig(gweiQuantity).div("1000000000");
    return tinyBig(result);
}
