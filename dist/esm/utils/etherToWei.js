import { tinyBig } from "../shared/tinyBig/tinyBig";
import { validateType } from "../shared/validateTypes";
export function etherToWei(etherQuantity) {
    validateType(etherQuantity, ["string", "number", "object"]);
    const result = tinyBig(etherQuantity).times("1000000000000000000");
    return tinyBig(result);
}
