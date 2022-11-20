import { toChecksumAddress } from "..";
import { validateType } from "../shared/validateTypes";
export function isAddress(address) {
    validateType(address, ["string"]);
    try {
        toChecksumAddress(address);
        return true;
    }
    catch (error) {
        return false;
    }
}
