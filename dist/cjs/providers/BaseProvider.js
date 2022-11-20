"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseProvider = void 0;
const cleanBlock_1 = require("../classes/utils/cleanBlock");
const cleanLog_1 = require("../classes/utils/cleanLog");
const cleanTransaction_1 = require("../classes/utils/cleanTransaction");
const cleanTransactionReceipt_1 = require("../classes/utils/cleanTransactionReceipt");
const fetchers_1 = require("../classes/utils/fetchers");
const hexToDecimal_1 = require("../classes/utils/hexToDecimal");
const prepareTransaction_1 = require("../classes/utils/prepareTransaction");
const logger_1 = require("../logger/logger");
const tinyBig_1 = require("../shared/tinyBig/tinyBig");
const chainsInfo_1 = __importDefault(require("./utils/chainsInfo"));
/**
 * Converts a block tag into the right format when needed.
 */
function prepBlockTag(blockTag) {
    return typeof blockTag === "number"
        ? (0, tinyBig_1.tinyBig)(blockTag).toHexString()
        : blockTag;
}
class BaseProvider {
    /**
     * @param rpcUrls The URL(s) to your Eth node(s). Consider POKT or Infura
     */
    constructor(rpcUrls) {
        /**
         * @ignore
         */
        this._rpcUrls = [];
        /**
         * @ignore
         */
        this._post = (body) => (0, fetchers_1.post)(this.selectRpcUrl(), body);
        this._rpcUrls = rpcUrls;
    }
    /**
     * Gets information (name, chainId, and ensAddress when applicable) about the network the provider is connected to.
     *
     * * [Identical](/docs/api#isd) to [`ethers.provider.getNetwork`](https://docs.ethers.io/v5/api/providers/provider/#Provider-getNetwork) in ethers.js
     * * [Similar](/docs/api#isd) to [`web3.eth.getChainId`](https://web3js.readthedocs.io/en/v1.7.3/web3-eth.html#getchainid) in web3.js, returns more than just the `chainId`
     */
    getNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            const hexChainId = (yield this.post((0, fetchers_1.buildRPCPostBody)("eth_chainId", [])));
            const chainId = (0, hexToDecimal_1.hexToDecimal)(hexChainId);
            const info = chainsInfo_1.default[chainId];
            return {
                chainId: Number(chainId),
                name: info[0] || "unknown",
                ensAddress: info[1] || null, // only send ensAddress if it exists
            };
        });
    }
    /**
     * Gets the number of the most recently mined block on the network the provider is connected to.
     */
    getBlockNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentBlockNumber = (yield this.post((0, fetchers_1.buildRPCPostBody)("eth_blockNumber", [])));
            return Number((0, hexToDecimal_1.hexToDecimal)(currentBlockNumber));
        });
    }
    /**
     * Gets information about a specified transaction, even if it hasn't been mined yet.
     */
    getTransaction(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rpcTransaction, blockNumber] = yield Promise.all([
                this.post((0, fetchers_1.buildRPCPostBody)("eth_getTransactionByHash", [transactionHash])),
                this.getBlock("latest"),
            ]);
            const cleanedTransaction = (0, cleanTransaction_1.cleanTransaction)(rpcTransaction);
            // https://ethereum.stackexchange.com/questions/2881/how-to-get-the-transaction-confirmations-using-the-json-rpc
            cleanedTransaction.confirmations =
                blockNumber.number - cleanedTransaction.blockNumber + 1;
            return cleanedTransaction;
        });
    }
    /**
     * Gives information about a transaction that has already been mined. Includes additional information beyond what's provided by [`getTransaction`](/docs/api/modules#gettransaction).
     */
    getTransactionReceipt(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rpcTransaction, blockNumber] = yield Promise.all([
                this.post((0, fetchers_1.buildRPCPostBody)("eth_getTransactionReceipt", [transactionHash])),
                this.getBlock("latest"),
            ]);
            const cleanedTransactionReceipt = (0, cleanTransactionReceipt_1.cleanTransactionReceipt)(rpcTransaction);
            cleanedTransactionReceipt.confirmations =
                blockNumber.number - cleanedTransactionReceipt.blockNumber + 1;
            return cleanedTransactionReceipt;
        });
    }
    /**
     * Returns the number of sent transactions by an address, from genesis (or as far back as a provider looks) up to specified block.
     */
    getTransactionCount(address, blockTag = "latest") {
        return __awaiter(this, void 0, void 0, function* () {
            blockTag = prepBlockTag(blockTag);
            const transactionCount = (yield this.post((0, fetchers_1.buildRPCPostBody)("eth_getTransactionCount", [address, blockTag])));
            return Number((0, hexToDecimal_1.hexToDecimal)(transactionCount));
        });
    }
    /**
     * Gets information about a certain block, optionally with full transaction objects.
     */
    getBlock(timeFrame = "latest", returnTransactionObjects = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let type = "Number";
            if (typeof timeFrame === "string" && timeFrame.length === 66) {
                // use endpoint that accepts string
                type = "Hash";
            }
            else {
                timeFrame = prepBlockTag(timeFrame);
            }
            const rpcBlock = (yield this.post((0, fetchers_1.buildRPCPostBody)(`eth_getBlockBy${type}`, [
                timeFrame,
                returnTransactionObjects,
            ])));
            return (0, cleanBlock_1.cleanBlock)(rpcBlock, returnTransactionObjects);
        });
    }
    /**
     * Gives an estimate of the current gas price in wei.
     */
    getGasPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const hexGasPrice = (yield this.post((0, fetchers_1.buildRPCPostBody)("eth_gasPrice", [])));
            return (0, tinyBig_1.tinyBig)((0, hexToDecimal_1.hexToDecimal)(hexGasPrice));
        });
    }
    /**
     * Returns the balance of the account in wei.
     */
    getBalance(address, blockTag = "latest") {
        return __awaiter(this, void 0, void 0, function* () {
            blockTag = prepBlockTag(blockTag);
            const hexBalance = (yield this.post((0, fetchers_1.buildRPCPostBody)("eth_getBalance", [address, blockTag])));
            return (0, tinyBig_1.tinyBig)((0, hexToDecimal_1.hexToDecimal)(hexBalance));
        });
    }
    /**
     * Gets the code of a contract on a specified block.
     */
    getCode(address, blockTag = "latest") {
        return __awaiter(this, void 0, void 0, function* () {
            blockTag = prepBlockTag(blockTag);
            const contractCode = (yield this.post((0, fetchers_1.buildRPCPostBody)("eth_getCode", [address, blockTag])));
            return contractCode;
        });
    }
    /**
     * Returns an estimate of the amount of gas that would be required to submit transaction to the network.
     * An estimate may not be accurate since there could be another transaction on the network that was not accounted for.
     */
    estimateGas(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const rpcTransaction = (0, prepareTransaction_1.prepareTransaction)(transaction);
            const gasUsed = (yield this.post((0, fetchers_1.buildRPCPostBody)("eth_estimateGas", [rpcTransaction])));
            return (0, tinyBig_1.tinyBig)((0, hexToDecimal_1.hexToDecimal)(gasUsed));
        });
    }
    /**
     * Returns transaction receipt event logs that match a specified filter.
     * May return `[]` if parameters are too broad, even if logs exist.
     */
    getLogs(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterByRange = filter;
            if (filterByRange.fromBlock)
                filterByRange.fromBlock = prepBlockTag(filterByRange.fromBlock);
            if (filterByRange.toBlock)
                filterByRange.toBlock = prepBlockTag(filterByRange.toBlock);
            const rpcLogs = (yield this.post((0, fetchers_1.buildRPCPostBody)("eth_getLogs", [filter])));
            const logs = rpcLogs.map((log) => (0, cleanLog_1.cleanLog)(log, false));
            return logs;
        });
    }
    /**
     * Returns the result of adding a transaction to the blockchain without actually adding that transaction to the blockchain.
     * Does not require any ether as gas.
     */
    call(transaction, blockTag = "latest") {
        return __awaiter(this, void 0, void 0, function* () {
            if (transaction.gasPrice &&
                (transaction.maxPriorityFeePerGas || transaction.maxFeePerGas)) {
                logger_1.logger.throwError('Cannot specify both "gasPrice" and ("maxPriorityFeePerGas" or "maxFeePerGas")', {
                    gasPrice: transaction.gasPrice,
                    maxFeePerGas: transaction.maxFeePerGas,
                    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
                });
            }
            if (transaction.maxFeePerGas && transaction.maxPriorityFeePerGas) {
                logger_1.logger.throwError('Cannot specify both "maxFeePerGas" and "maxPriorityFeePerGas"', {
                    maxFeePerGas: transaction.maxFeePerGas,
                    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
                });
            }
            blockTag = prepBlockTag(blockTag);
            const rpcTransaction = (0, prepareTransaction_1.prepareTransaction)(transaction);
            const transactionRes = (yield this.post((0, fetchers_1.buildRPCPostBody)("eth_call", [rpcTransaction, blockTag])));
            return transactionRes;
        });
    }
}
exports.BaseProvider = BaseProvider;
