import Big from "big.js";
import { TinyBig } from "../../shared/tinyBig/tinyBig";
import { hexlify } from "../../utils/bytes";
import type {
  RPCTransactionRequest,
  TransactionRequest,
} from "./../../types/Transaction.types";
import type { BytesLike } from "./../../utils/bytes";

/**
 * @param transaction
 * @example
 */
export function prepareTransaction(
  transaction: TransactionRequest
): RPCTransactionRequest {
  const preparedTransaction = {
    ...transaction,
  } as unknown as RPCTransactionRequest;
  (Object.keys(transaction) as Array<keyof TransactionRequest>).forEach(
    (key) => {
      switch (key) {
        case "gas":
        case "gasPrice":
        case "nonce":
        case "maxFeePerGas":
        case "maxPriorityFeePerGas":
        case "value": {
          const value = transaction[key];
          if (value instanceof TinyBig) {
            preparedTransaction[key] = value.toHexString();
          } else if (value instanceof Big) {
            preparedTransaction[key] = `0x${BigInt(value.toString()).toString(
              16
            )}`;
          } else if (typeof transaction[key] === "number")
            preparedTransaction[key] =
              "0x" + (transaction[key] as any).toString(16);
          else preparedTransaction[key] = (transaction[key] as any).toString();
          break;
        }
        case "data":
          preparedTransaction[key] = hexlify(transaction[key] as BytesLike);
          break;
      }
    }
  );
  return preparedTransaction;
}
