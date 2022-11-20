declare type JSPrimitiveTypes = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export declare const validateType: (value: unknown, allowedTypes: JSPrimitiveTypes[]) => void;
export {};
