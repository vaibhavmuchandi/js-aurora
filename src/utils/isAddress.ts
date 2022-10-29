import { toChecksumAddress } from "..";
import { validateType } from "../shared/validateTypes";

/**
 * Returns a boolean as to whether the input is a valid address.
 * Does NOT support ICAP addresses
 */
export function isAddress(address: string): boolean {
  validateType(address, ["string"]);
  try {
    toChecksumAddress(address);
    return true;
  } catch (error) {
    return false;
  }
}
