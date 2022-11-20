import { toChecksumAddress } from "../..";
import { tinyBig } from "../../shared/tinyBig/tinyBig";
import { cleanTransaction } from "./cleanTransaction";
import { hexToDecimal } from "./hexToDecimal";
export function cleanBlock(block, returnTransactionObjects) {
    const cleanedBlock = Object.assign({}, block);
    Object.keys(block).forEach((key) => {
        if (!block[key])
            return;
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
    if (returnTransactionObjects) {
        const txns = block.transactions;
        txns.forEach((transaction, index) => {
            cleanedBlock.transactions[index] = cleanTransaction(transaction);
        });
    }
    return cleanedBlock;
}
