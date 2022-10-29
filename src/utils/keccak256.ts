import { Keccak } from "sha3";
import type { BytesLike } from "./bytes";

/**
 * Hashes data into a Keccak256 hex string
 */
export function keccak256(data: BytesLike): string {
  let bufferableData;
  if (typeof data === "string") {
    bufferableData = Buffer.from(data.replace(/^0x/, ""), "hex");
  } else {
    bufferableData = Buffer.from(data as any);
  }
  const keccak = new Keccak(256);
  const addressHash = "0x" + keccak.update(bufferableData).digest("hex");
  return addressHash;
}
