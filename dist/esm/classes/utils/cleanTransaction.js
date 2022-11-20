import { tinyBig, toChecksumAddress } from "../..";
import { hexToDecimal } from "./hexToDecimal";
export function cleanTransaction(transaction) {
    const cleanedTransaction = Object.assign({}, transaction);
    Object.keys(transaction).forEach((key) => {
        if (!transaction[key])
            return;
        switch (key) {
            case "blockNumber":
            case "chainId":
            case "transactionIndex":
            case "type":
            case "v":
                cleanedTransaction[key] = Number(hexToDecimal(transaction[key]));
                break;
            case "from":
            case "to":
                if (transaction[key]) {
                    cleanedTransaction[key] = toChecksumAddress(transaction[key]);
                }
                break;
            case "value":
            case "gas":
            case "gasPrice":
            case "maxFeePerGas":
            case "maxPriorityFeePerGas":
            case "nonce":
                cleanedTransaction[key] = tinyBig(hexToDecimal(transaction[key]));
                break;
        }
    });
    return cleanedTransaction;
}
