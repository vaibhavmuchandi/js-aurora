import { tinyBig } from "../shared/tinyBig/tinyBig";
import { validateType } from "../shared/validateTypes";
export function weiToEther(weiQuantity) {
    validateType(weiQuantity, ["string", "number", "object"]);
    try {
        let _weiQuantity = weiQuantity;
        if (typeof weiQuantity === "string" && weiQuantity.slice(0, 2) === "0x") {
            _weiQuantity = BigInt(weiQuantity).toString();
        }
        const result = tinyBig(_weiQuantity).div("1000000000000000000");
        return tinyBig(result);
    }
    catch (error) {
        throw error;
    }
}
