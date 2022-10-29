import type { Bytes } from "../index";
import { concat, keccak256, toUtf8Bytes } from "../index";

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
