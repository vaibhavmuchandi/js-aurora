import type { JSONABIArgument } from "../../types/Contract.types";
export declare const hexFalse: string;
export declare function encodeData(jsonABIArgument: JSONABIArgument, args: any[]): string;
export declare function decodeRPCResponse(jsonABIArgument: JSONABIArgument, nodeResponse: string): string | number | boolean | import("../..").TinyBig | (string | number | boolean | import("../..").TinyBig)[];
