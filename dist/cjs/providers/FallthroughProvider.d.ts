import { BaseProvider } from "./BaseProvider";
export interface ConstructorOptions {
    timeoutDuration?: number;
}
export declare class FallthroughProvider extends BaseProvider {
    private rpcUrlCounter;
    private readonly timeoutDuration;
    selectRpcUrl(): string;
    constructor(rpcUrls: string[], options?: ConstructorOptions);
    post: (body: Record<string, unknown>) => Promise<any>;
}
