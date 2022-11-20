import type { JsonRpcProvider } from "../providers/JsonRpcProvider";
import type { ContractInterface } from "../types/Contract.types";
export declare class BaseContract {
    private readonly _address;
    private readonly _provider;
    constructor(addressOrName: string, contractInterface: ContractInterface, signerOrProvider: JsonRpcProvider);
}
export declare function defineReadOnly<T>(object: T, name: string, value: any): void;
export declare class Contract extends BaseContract {
    readonly [key: string]: any;
}
