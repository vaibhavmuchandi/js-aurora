import { tinyBig, toChecksumAddress } from "../..";
import { cleanLog } from "./cleanLog";
import { cleanTransaction } from "./cleanTransaction";
import { hexToDecimal } from "./hexToDecimal";
export function cleanTransactionReceipt(transactionReceipt) {
    const cleanedTransaction = cleanTransaction(transactionReceipt);
    const cleanedTransactionReceipt = Object.assign({}, cleanedTransaction);
    Object.keys(transactionReceipt).forEach((key) => {
        if (!transactionReceipt[key])
            return;
        switch (key) {
            case "status":
                cleanedTransactionReceipt[key] = Number(hexToDecimal(transactionReceipt[key]));
                break;
            case "contractAddress":
                if (transactionReceipt[key]) {
                    cleanedTransactionReceipt[key] = toChecksumAddress(transactionReceipt[key]);
                }
                break;
            case "cumulativeGasUsed":
            case "effectiveGasPrice":
            case "gasUsed":
                cleanedTransactionReceipt[key] = tinyBig(hexToDecimal(transactionReceipt[key]));
                break;
            case "logs":
                transactionReceipt[key].forEach((log, index) => {
                    cleanedTransactionReceipt[key][index] = cleanLog(log, true);
                });
        }
    });
    cleanedTransactionReceipt.byzantium =
        cleanedTransactionReceipt.blockNumber >= 4370000;
    return cleanedTransactionReceipt;
}
