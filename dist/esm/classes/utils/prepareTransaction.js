import Big from "big.js";
import { TinyBig } from "../../shared/tinyBig/tinyBig";
import { hexlify } from "../../utils/bytes";
export function prepareTransaction(transaction) {
    const preparedTransaction = Object.assign({}, transaction);
    Object.keys(transaction).forEach((key) => {
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
                }
                else if (value instanceof Big) {
                    preparedTransaction[key] = `0x${BigInt(value.toString()).toString(16)}`;
                }
                else if (typeof transaction[key] === "number")
                    preparedTransaction[key] =
                        "0x" + transaction[key].toString(16);
                else
                    preparedTransaction[key] = transaction[key].toString();
                break;
            }
            case "data":
                preparedTransaction[key] = hexlify(transaction[key]);
                break;
        }
    });
    return preparedTransaction;
}
