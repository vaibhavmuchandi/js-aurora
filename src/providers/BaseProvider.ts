import { cleanBlock } from "../classes/utils/cleanBlock";
import { cleanLog } from "../classes/utils/cleanLog";
import { cleanTransaction } from "../classes/utils/cleanTransaction";
import { cleanTransactionReceipt } from "../classes/utils/cleanTransactionReceipt";
import { buildRPCPostBody, post } from "../classes/utils/fetchers";
import { hexToDecimal } from "../classes/utils/hexToDecimal";
import { prepareTransaction } from "../classes/utils/prepareTransaction";
import { logger } from "../logger/logger";
import type { TinyBig } from "../shared/tinyBig/tinyBig";
import { tinyBig } from "../shared/tinyBig/tinyBig";
import type { BlockResponse, BlockTag, RPCBlock } from "../types/Block.types";
import type { Filter, FilterByBlockHash } from "../types/Filter.types";
import type { Network } from "../types/Network.types";
import type {
  Log,
  RPCLog,
  RPCTransaction,
  RPCTransactionReceipt,
  TransactionReceipt,
  TransactionRequest,
  TransactionResponse,
} from "../types/Transaction.types";
import chainsInfo from "./utils/chainsInfo";

/**
 * Converts a block tag into the right format when needed.
 */
function prepBlockTag(blockTag: BlockTag): string {
  return typeof blockTag === "number"
    ? tinyBig(blockTag).toHexString()
    : blockTag;
}

export abstract class BaseProvider {
  /**
   * ignore
   */
  abstract selectRpcUrl(): string;
  abstract post(body: Record<string, unknown>): Promise<any>;

  /**
   * @ignore
   */
  readonly _rpcUrls: string[] = [];
  /**
   * @ignore
   */
  protected _post = (body: Record<string, unknown>) =>
    post(this.selectRpcUrl(), body);

  /**
   * @param rpcUrls The URL(s) to your Eth node(s). Consider POKT or Infura
   */
  constructor(rpcUrls: string[]) {
    this._rpcUrls = rpcUrls;
  }

  /**
   * Gets information (name, chainId, and ensAddress when applicable) about the network the provider is connected to.
   *
   * * [Identical](/docs/api#isd) to [`ethers.provider.getNetwork`](https://docs.ethers.io/v5/api/providers/provider/#Provider-getNetwork) in ethers.js
   * * [Similar](/docs/api#isd) to [`web3.eth.getChainId`](https://web3js.readthedocs.io/en/v1.7.3/web3-eth.html#getchainid) in web3.js, returns more than just the `chainId`
   */
  public async getNetwork(): Promise<Network> {
    const hexChainId = (await this.post(
      buildRPCPostBody("eth_chainId", [])
    )) as string;

    const chainId = hexToDecimal(hexChainId);
    const info = (chainsInfo as any)[chainId];
    return {
      chainId: Number(chainId),
      name: info[0] || "unknown",
      ensAddress: info[1] || null, // only send ensAddress if it exists
    };
  }

  /**
   * Gets the number of the most recently mined block on the network the provider is connected to.
   */
  public async getBlockNumber(): Promise<number> {
    const currentBlockNumber = (await this.post(
      buildRPCPostBody("eth_blockNumber", [])
    )) as string;
    return Number(hexToDecimal(currentBlockNumber));
  }

  /**
   * Gets information about a specified transaction, even if it hasn't been mined yet.
   */
  public async getTransaction(
    transactionHash: string
  ): Promise<TransactionResponse> {
    const [rpcTransaction, blockNumber] = await Promise.all([
      this.post(
        buildRPCPostBody("eth_getTransactionByHash", [transactionHash])
      ) as Promise<RPCTransaction>,
      this.getBlock("latest"),
    ]);
    const cleanedTransaction = cleanTransaction(rpcTransaction);
    // https://ethereum.stackexchange.com/questions/2881/how-to-get-the-transaction-confirmations-using-the-json-rpc
    cleanedTransaction.confirmations =
      blockNumber.number - cleanedTransaction.blockNumber + 1;
    return cleanedTransaction;
  }

  /**
   * Gives information about a transaction that has already been mined. Includes additional information beyond what's provided by [`getTransaction`](/docs/api/modules#gettransaction).
   */
  public async getTransactionReceipt(
    transactionHash: string
  ): Promise<TransactionReceipt> {
    const [rpcTransaction, blockNumber] = await Promise.all([
      this.post(
        buildRPCPostBody("eth_getTransactionReceipt", [transactionHash])
      ) as Promise<RPCTransactionReceipt>,
      this.getBlock("latest"),
    ]);
    const cleanedTransactionReceipt = cleanTransactionReceipt(rpcTransaction);
    cleanedTransactionReceipt.confirmations =
      blockNumber.number - cleanedTransactionReceipt.blockNumber + 1;
    return cleanedTransactionReceipt;
  }

  /**
   * Returns the number of sent transactions by an address, from genesis (or as far back as a provider looks) up to specified block.
   */
  public async getTransactionCount(
    address: string,
    blockTag: BlockTag = "latest"
  ): Promise<number> {
    blockTag = prepBlockTag(blockTag);
    const transactionCount = (await this.post(
      buildRPCPostBody("eth_getTransactionCount", [address, blockTag])
    )) as string;
    return Number(hexToDecimal(transactionCount));
  }

  /**
   * Gets information about a certain block, optionally with full transaction objects.
   */
  public async getBlock(
    timeFrame: BlockTag = "latest",
    returnTransactionObjects = false
  ): Promise<BlockResponse> {
    let type: "Number" | "Hash" = "Number";
    if (typeof timeFrame === "string" && timeFrame.length === 66) {
      // use endpoint that accepts string
      type = "Hash";
    } else {
      timeFrame = prepBlockTag(timeFrame);
    }

    const rpcBlock = (await this.post(
      buildRPCPostBody(`eth_getBlockBy${type}`, [
        timeFrame,
        returnTransactionObjects,
      ])
    )) as RPCBlock;

    return cleanBlock(rpcBlock, returnTransactionObjects);
  }

  /**
   * Gives an estimate of the current gas price in wei.
   */
  public async getGasPrice(): Promise<TinyBig> {
    const hexGasPrice = (await this.post(
      buildRPCPostBody("eth_gasPrice", [])
    )) as string;
    return tinyBig(hexToDecimal(hexGasPrice));
  }

  /**
   * Returns the balance of the account in wei.
   */
  public async getBalance(
    address: string,
    blockTag: BlockTag = "latest"
  ): Promise<TinyBig> {
    blockTag = prepBlockTag(blockTag);
    const hexBalance = (await this.post(
      buildRPCPostBody("eth_getBalance", [address, blockTag])
    )) as string;
    return tinyBig(hexToDecimal(hexBalance));
  }

  /**
   * Gets the code of a contract on a specified block.
   */
  public async getCode(
    address: string,
    blockTag: BlockTag = "latest"
  ): Promise<string> {
    blockTag = prepBlockTag(blockTag);
    const contractCode = (await this.post(
      buildRPCPostBody("eth_getCode", [address, blockTag])
    )) as string;
    return contractCode;
  }

  /**
   * Returns an estimate of the amount of gas that would be required to submit transaction to the network.
   * An estimate may not be accurate since there could be another transaction on the network that was not accounted for.
   */
  public async estimateGas(transaction: TransactionRequest): Promise<TinyBig> {
    const rpcTransaction = prepareTransaction(transaction);
    const gasUsed = (await this.post(
      buildRPCPostBody("eth_estimateGas", [rpcTransaction])
    )) as string;
    return tinyBig(hexToDecimal(gasUsed));
  }

  /**
   * Returns transaction receipt event logs that match a specified filter.
   * May return `[]` if parameters are too broad, even if logs exist.
   */
  public async getLogs(
    filter: Filter | FilterByBlockHash
  ): Promise<Array<Log>> {
    const filterByRange = filter as Filter;
    if (filterByRange.fromBlock)
      filterByRange.fromBlock = prepBlockTag(filterByRange.fromBlock);
    if (filterByRange.toBlock)
      filterByRange.toBlock = prepBlockTag(filterByRange.toBlock);

    const rpcLogs = (await this.post(
      buildRPCPostBody("eth_getLogs", [filter])
    )) as Array<RPCLog>;
    const logs = rpcLogs.map((log) => cleanLog(log, false));
    return logs;
  }

  /**
   * Returns the result of adding a transaction to the blockchain without actually adding that transaction to the blockchain.
   * Does not require any ether as gas.
   */
  public async call(
    transaction: TransactionRequest,
    blockTag: BlockTag = "latest"
  ): Promise<string> {
    if (
      transaction.gasPrice &&
      (transaction.maxPriorityFeePerGas || transaction.maxFeePerGas)
    ) {
      logger.throwError(
        'Cannot specify both "gasPrice" and ("maxPriorityFeePerGas" or "maxFeePerGas")',
        {
          gasPrice: transaction.gasPrice,
          maxFeePerGas: transaction.maxFeePerGas,
          maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
        }
      );
    }
    if (transaction.maxFeePerGas && transaction.maxPriorityFeePerGas) {
      logger.throwError(
        'Cannot specify both "maxFeePerGas" and "maxPriorityFeePerGas"',
        {
          maxFeePerGas: transaction.maxFeePerGas,
          maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
        }
      );
    }
    blockTag = prepBlockTag(blockTag);
    const rpcTransaction = prepareTransaction(transaction);
    const transactionRes = (await this.post(
      buildRPCPostBody("eth_call", [rpcTransaction, blockTag])
    )) as string;
    return transactionRes;
  }
}
