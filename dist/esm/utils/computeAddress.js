import { computePublicKey, toChecksumAddress } from "..";
import { hexDataSlice } from "./bytes";
import { keccak256 } from "./keccak256";
export function computeAddress(key) {
    if (!key.startsWith("0x04") &&
        !key.startsWith("0x03") &&
        !key.startsWith("0x02")) {
        key = computePublicKey(key);
    }
    return toChecksumAddress(hexDataSlice(keccak256(hexDataSlice(key, 1)), 12));
}
