import { BaseProvider } from "./BaseProvider";
export declare class JsonRpcProvider extends BaseProvider {
    selectRpcUrl(): string;
    post(body: Record<string, unknown>): Promise<any>;
    constructor(rpcUrl?: string);
}
export declare function jsonRpcProvider(rpcUrl?: string): JsonRpcProvider;
