export declare function post(url: string, body: Record<string, unknown>): Promise<any>;
declare type RPCMethodName = "eth_getBlockByNumber" | "eth_getBlockByHash" | "eth_call" | "eth_chainId" | "eth_gasPrice" | "eth_getBalance" | "eth_getTransactionByHash" | "eth_getTransactionReceipt" | "eth_getTransactionCount" | "eth_getCode" | "eth_blockNumber" | "eth_estimateGas" | "eth_getLogs";
export declare function buildRPCPostBody(method: RPCMethodName, params: unknown[]): {
    jsonrpc: string;
    id: number;
    method: RPCMethodName;
    params: unknown[];
};
export {};
