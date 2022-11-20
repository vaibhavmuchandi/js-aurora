var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cleanBlock } from "../classes/utils/cleanBlock";
import { cleanLog } from "../classes/utils/cleanLog";
import { cleanTransaction } from "../classes/utils/cleanTransaction";
import { cleanTransactionReceipt } from "../classes/utils/cleanTransactionReceipt";
import { buildRPCPostBody, post } from "../classes/utils/fetchers";
import { hexToDecimal } from "../classes/utils/hexToDecimal";
import { prepareTransaction } from "../classes/utils/prepareTransaction";
import { logger } from "../logger/logger";
import { tinyBig } from "../shared/tinyBig/tinyBig";
import chainsInfo from "./utils/chainsInfo";
function prepBlockTag(blockTag) {
    return typeof blockTag === "number"
        ? tinyBig(blockTag).toHexString()
        : blockTag;
}
export class BaseProvider {
    constructor(rpcUrls) {
        this._rpcUrls = [];
        this._post = (body) => post(this.selectRpcUrl(), body);
        this._rpcUrls = rpcUrls;
    }
    getNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            const hexChainId = (yield this.post(buildRPCPostBody("eth_chainId", [])));
            const chainId = hexToDecimal(hexChainId);
            const info = chainsInfo[chainId];
            return {
                chainId: Number(chainId),
                name: info[0] || "unknown",
                ensAddress: info[1] || null,
            };
        });
    }
    getBlockNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentBlockNumber = (yield this.post(buildRPCPostBody("eth_blockNumber", [])));
            return Number(hexToDecimal(currentBlockNumber));
        });
    }
    getTransaction(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rpcTransaction, blockNumber] = yield Promise.all([
                this.post(buildRPCPostBody("eth_getTransactionByHash", [transactionHash])),
                this.getBlock("latest"),
            ]);
            const cleanedTransaction = cleanTransaction(rpcTransaction);
            cleanedTransaction.confirmations =
                blockNumber.number - cleanedTransaction.blockNumber + 1;
            return cleanedTransaction;
        });
    }
    getTransactionReceipt(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rpcTransaction, blockNumber] = yield Promise.all([
                this.post(buildRPCPostBody("eth_getTransactionReceipt", [transactionHash])),
                this.getBlock("latest"),
            ]);
            const cleanedTransactionReceipt = cleanTransactionReceipt(rpcTransaction);
            cleanedTransactionReceipt.confirmations =
                blockNumber.number - cleanedTransactionReceipt.blockNumber + 1;
            return cleanedTransactionReceipt;
        });
    }
    getTransactionCount(address, blockTag = "latest") {
        return __awaiter(this, void 0, void 0, function* () {
            blockTag = prepBlockTag(blockTag);
            const transactionCount = (yield this.post(buildRPCPostBody("eth_getTransactionCount", [address, blockTag])));
            return Number(hexToDecimal(transactionCount));
        });
    }
    getBlock(timeFrame = "latest", returnTransactionObjects = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let type = "Number";
            if (typeof timeFrame === "string" && timeFrame.length === 66) {
                type = "Hash";
            }
            else {
                timeFrame = prepBlockTag(timeFrame);
            }
            const rpcBlock = (yield this.post(buildRPCPostBody(`eth_getBlockBy${type}`, [
                timeFrame,
                returnTransactionObjects,
            ])));
            return cleanBlock(rpcBlock, returnTransactionObjects);
        });
    }
    getGasPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const hexGasPrice = (yield this.post(buildRPCPostBody("eth_gasPrice", [])));
            return tinyBig(hexToDecimal(hexGasPrice));
        });
    }
    getBalance(address, blockTag = "latest") {
        return __awaiter(this, void 0, void 0, function* () {
            blockTag = prepBlockTag(blockTag);
            const hexBalance = (yield this.post(buildRPCPostBody("eth_getBalance", [address, blockTag])));
            return tinyBig(hexToDecimal(hexBalance));
        });
    }
    getCode(address, blockTag = "latest") {
        return __awaiter(this, void 0, void 0, function* () {
            blockTag = prepBlockTag(blockTag);
            const contractCode = (yield this.post(buildRPCPostBody("eth_getCode", [address, blockTag])));
            return contractCode;
        });
    }
    estimateGas(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcTransaction = prepareTransaction(transaction);
            const gasUsed = (yield this.post(buildRPCPostBody("eth_estimateGas", [rpcTransaction])));
            return tinyBig(hexToDecimal(gasUsed));
        });
    }
    getLogs(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterByRange = filter;
            if (filterByRange.fromBlock)
                filterByRange.fromBlock = prepBlockTag(filterByRange.fromBlock);
            if (filterByRange.toBlock)
                filterByRange.toBlock = prepBlockTag(filterByRange.toBlock);
            const rpcLogs = (yield this.post(buildRPCPostBody("eth_getLogs", [filter])));
            const logs = rpcLogs.map((log) => cleanLog(log, false));
            return logs;
        });
    }
    call(transaction, blockTag = "latest") {
        return __awaiter(this, void 0, void 0, function* () {
            if (transaction.gasPrice &&
                (transaction.maxPriorityFeePerGas || transaction.maxFeePerGas)) {
                logger.throwError('Cannot specify both "gasPrice" and ("maxPriorityFeePerGas" or "maxFeePerGas")', {
                    gasPrice: transaction.gasPrice,
                    maxFeePerGas: transaction.maxFeePerGas,
                    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
                });
            }
            if (transaction.maxFeePerGas && transaction.maxPriorityFeePerGas) {
                logger.throwError('Cannot specify both "maxFeePerGas" and "maxPriorityFeePerGas"', {
                    maxFeePerGas: transaction.maxFeePerGas,
                    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
                });
            }
            blockTag = prepBlockTag(blockTag);
            const rpcTransaction = prepareTransaction(transaction);
            const transactionRes = (yield this.post(buildRPCPostBody("eth_call", [rpcTransaction, blockTag])));
            return transactionRes;
        });
    }
}
