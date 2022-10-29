import type { Bytes } from "../utils/bytes";
import { concat } from "../utils/bytes";
import { keccak256 } from "./keccak256";
import { toUtf8Bytes } from "./toUtf8Bytes";

const messagePrefix = "\x19Aurora Signed Message:\n";

/**
 * Computes the EIP-191 personal message digest of message.
 */
export function hashMessage(message: Bytes | string): string {
  if (typeof message === "string") {
    message = toUtf8Bytes(message);
  }
  return keccak256(
    concat([
      toUtf8Bytes(messagePrefix),
      toUtf8Bytes(String(message.length)),
      message,
    ])
  );
}
