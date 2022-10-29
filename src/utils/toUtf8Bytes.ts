/**
 * Converts a string into a UTF-8 Byte Array
 */
export function toUtf8Bytes(data: string): Uint8Array {
  return new Uint8Array(Buffer.from(data));
}
