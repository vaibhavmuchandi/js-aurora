import type { BlockResponse } from "../..";
import { toChecksumAddress } from "../..";
import { tinyBig } from "../../shared/tinyBig/tinyBig";
import type { RPCBlock } from "../../types/Block.types";
import type { RPCTransaction } from "../../types/Transaction.types";
import { cleanTransaction } from "./cleanTransaction";
import { hexToDecimal } from "./hexToDecimal";

/**
 * Converts RPC block response to more JS-friendly format
 */
export function cleanBlock(
  block: RPCBlock,
  returnTransactionObjects: boolean
): BlockResponse {
  const cleanedBlock = { ...block } as unknown as BlockResponse;
  (Object.keys(block) as Array<keyof RPCBlock>).forEach((key) => {
    // pending blocks have null instead of a difficulty
    // pending blocks have null instead of a miner address
    if (!block[key]) return;
    switch (key) {
      case "difficulty":
      case "totalDifficulty":
      case "gasLimit":
      case "gasUsed":
      case "size":
      case "timestamp":
      case "baseFeePerGas":
        cleanedBlock[key] = tinyBig(hexToDecimal(block[key]));
        break;
      case "number":
        cleanedBlock[key] = Number(hexToDecimal(block[key]));
        break;
      case "miner":
        cleanedBlock[key] = toChecksumAddress(block[key]);
        break;
    }
  });
  // for all full transactions
  if (returnTransactionObjects) {
    const txns = block.transactions as RPCTransaction[];
    txns.forEach((transaction, index) => {
      cleanedBlock.transactions[index] = cleanTransaction(transaction);
    });
  }
  return cleanedBlock;
}
