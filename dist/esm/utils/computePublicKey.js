import { Point } from "@noble/secp256k1";
import { hexlify } from "./bytes";
export function computePublicKey(privKey) {
    privKey = hexlify(privKey).slice(2);
    return "0x" + Point.fromPrivateKey(privKey).toHex();
}
