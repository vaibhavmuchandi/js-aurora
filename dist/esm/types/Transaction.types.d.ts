import type Big from "big.js";
import type { TinyBig } from "../shared/tinyBig/tinyBig";
import type { BytesLike } from "./../utils/bytes";
declare type Modify<T, R> = Omit<T, keyof R> & R;
export interface RPCTransaction extends RPCBlockTransaction {
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
}
export declare type TransactionResponse = Modify<RPCTransaction, {
    blockNumber: number;
    chainId: number;
    gas: TinyBig;
    gasLimit: TinyBig;
    gasPrice: TinyBig;
    nonce: TinyBig;
    transactionIndex: number;
    type: number;
    v: number;
    value: TinyBig;
} & {
    maxFeePerGas: TinyBig;
    maxPriorityFeePerGas: TinyBig;
    confirmations: number;
}>;
export declare type TransactionReceipt = Modify<RPCTransactionReceipt, {
    blockNumber: number;
    cumulativeGasUsed: TinyBig;
    effectiveGasPrice: TinyBig;
    gasUsed: TinyBig;
    logs: Array<Log>;
    status: number;
    transactionIndex: number;
    type: number;
} & {
    byzantium: boolean;
    confirmations: number;
}>;
export interface RPCTransactionRequest {
    from?: string;
    to: string;
    gas?: string;
    gasPrice?: string;
    value?: string;
    data?: BytesLike;
    nonce?: string;
    maxPriorityFeePerGas?: string;
    maxFeePerGas?: string;
}
export interface TransactionRequest {
    to?: string;
    from?: string;
    nonce?: TinyBig | string | Big | number;
    gas?: TinyBig | number | Big | string;
    gasPrice?: TinyBig | Big | string | number;
    data?: BytesLike;
    value?: TinyBig | string | Big | number;
    chainId?: number;
    type?: number;
    maxPriorityFeePerGas?: TinyBig | string | Big | number;
    maxFeePerGas?: TinyBig | string | Big | number;
}
export declare type Log = Modify<RPCLog, {
    blockNumber: number;
    logIndex: number;
    transactionIndex: number;
}>;
export declare type BlockTransactionResponse = Omit<TransactionResponse, "maxFeePerGas" | "maxPriorityFeePerGas">;
export interface RPCBlockTransaction {
    blockHash: string;
    blockNumber: string;
    chainId: string;
    from: string;
    gas: string;
    gasPrice: string;
    hash: string;
    input: string;
    nonce: string;
    r: string;
    s: string;
    to: string;
    transactionIndex: string;
    type: string;
    v: string;
    value: string;
}
export interface RPCTransactionReceipt {
    blockHash: string;
    blockNumber: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    effectiveGasPrice: string;
    from: string;
    gasUsed: string;
    logs: Array<RPCLog>;
    logsBloom: string;
    status: string;
    to: string;
    transactionHash: string;
    transactionIndex: string;
    type: string;
}
export interface RPCLog {
    address: string;
    blockHash: string;
    blockNumber: string;
    data: string;
    logIndex: string;
    removed?: boolean;
    topics: Array<string>;
    transactionHash: string;
    transactionIndex: string;
}
export {};
