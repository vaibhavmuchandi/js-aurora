export declare type Bytes = ArrayLike<number>;
export declare type BytesLike = Bytes | string;
export declare type BytesLikeWithNumber = BytesLike | number;
export interface DataOptions {
    allowMissingPrefix?: boolean;
    hexPad?: "left" | "right" | null;
}
export interface Hexable {
    toHexString(): string;
}
export declare type SignatureLike = {
    r: string;
    s?: string;
    _vs?: string;
    recoveryParam?: number;
    v?: number;
} | BytesLike;
export interface Signature {
    r: string;
    s: string;
    _vs: string;
    recoveryParam: number;
    v: number;
    yParityAndS: string;
    compact: string;
}
export declare function isBytesLike(value: any): value is BytesLike;
export declare function isBytes(value: any): value is Bytes;
export declare function arrayify(value: BytesLike | Hexable | number, options?: DataOptions): Uint8Array;
export declare function concat(arrayOfBytesLike: ReadonlyArray<BytesLikeWithNumber>): Uint8Array;
export declare function stripZeros(value: BytesLike): Uint8Array;
export declare function zeroPad(value: BytesLike, length: number): Uint8Array;
export declare function isHexString(value: any, length?: number): boolean;
export declare function hexlify(value: BytesLike | Hexable | number | bigint, options?: DataOptions): string;
export declare function hexDataLength(data: BytesLike): number | null;
export declare function hexDataSlice(data: BytesLikeWithNumber, offset: number, endOffset?: number): string;
export declare function hexConcat(items: ReadonlyArray<BytesLike>): string;
export declare function hexValue(value: BytesLike | Hexable | number | bigint): string;
export declare function hexStripZeros(value: BytesLike): string;
export declare function hexZeroPad(value: BytesLikeWithNumber, length: number): string;