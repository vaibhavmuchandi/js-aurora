import { toChecksumAddress } from "../../utils/toChecksumAddress";
import { hexToDecimal } from "./hexToDecimal";
export function cleanLog(log, receiptLog) {
    const cleanedLog = Object.assign({}, log);
    Object.keys(log).forEach((key) => {
        switch (key) {
            case "address":
                cleanedLog[key] = toChecksumAddress(log[key]);
                break;
            case "blockNumber":
            case "logIndex":
            case "transactionIndex":
                cleanedLog[key] = Number(hexToDecimal(log[key]));
                break;
            case "removed":
                if (receiptLog) {
                    delete cleanedLog[key];
                }
                else if (log[key] == null) {
                    cleanedLog[key] === false;
                }
                break;
        }
    });
    return cleanedLog;
}
