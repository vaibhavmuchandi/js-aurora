import { Point } from "@noble/secp256k1";
import type { BytesLike } from "./bytes";
import { hexlify } from "./bytes";

/**
 * Computes the public key from a given private key
 */
export function computePublicKey(privKey: BytesLike): string {
  privKey = hexlify(privKey).slice(2);
  return "0x" + Point.fromPrivateKey(privKey).toHex();
}
