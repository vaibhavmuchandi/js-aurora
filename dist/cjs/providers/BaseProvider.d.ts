import type { TinyBig } from "../shared/tinyBig/tinyBig";
import type { BlockResponse, BlockTag } from "../types/Block.types";
import type { Filter, FilterByBlockHash } from "../types/Filter.types";
import type { Network } from "../types/Network.types";
import type { Log, TransactionReceipt, TransactionRequest, TransactionResponse } from "../types/Transaction.types";
export declare abstract class BaseProvider {
    abstract selectRpcUrl(): string;
    abstract post(body: Record<string, unknown>): Promise<any>;
    readonly _rpcUrls: string[];
    protected _post: (body: Record<string, unknown>) => Promise<any>;
    constructor(rpcUrls: string[]);
    getNetwork(): Promise<Network>;
    getBlockNumber(): Promise<number>;
    getTransaction(transactionHash: string): Promise<TransactionResponse>;
    getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
    getTransactionCount(address: string, blockTag?: BlockTag): Promise<number>;
    getBlock(timeFrame?: BlockTag, returnTransactionObjects?: boolean): Promise<BlockResponse>;
    getGasPrice(): Promise<TinyBig>;
    getBalance(address: string, blockTag?: BlockTag): Promise<TinyBig>;
    getCode(address: string, blockTag?: BlockTag): Promise<string>;
    estimateGas(transaction: TransactionRequest): Promise<TinyBig>;
    getLogs(filter: Filter | FilterByBlockHash): Promise<Array<Log>>;
    call(transaction: TransactionRequest, blockTag?: BlockTag): Promise<string>;
}
