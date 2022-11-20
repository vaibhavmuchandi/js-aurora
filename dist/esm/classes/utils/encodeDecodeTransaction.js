import { Keccak } from "sha3";
import { tinyBig, toChecksumAddress } from "../..";
import { hexToDecimal } from "./hexToDecimal";
export const hexFalse = "0".repeat(64);
const hexTrue = "0".repeat(63) + "1";
function expandType(type) {
    if (type === "uint[]") {
        return "uint256[]";
    }
    else if (type === "int[]") {
        return "int256[]";
    }
    return type;
}
export function encodeData(jsonABIArgument, args) {
    const hash = new Keccak(256);
    const functionString = `${jsonABIArgument.name}(${jsonABIArgument.inputs.map((input) => expandType(input.type))})`;
    const functionHash = hash.update(functionString).digest("hex");
    const jsonABIInputsLength = jsonABIArgument.inputs.length;
    let shouldValidateInputLength = true;
    if (jsonABIArgument.inputs.find((input) => input.type.includes("["))) {
        shouldValidateInputLength = false;
    }
    if (shouldValidateInputLength && args.length !== jsonABIInputsLength) {
        throw new Error(`args inputs  of "${args.length}" does not match expected length of "${jsonABIArgument.inputs.length}"`);
    }
    const argsWithTypes = (jsonABIArgument.inputs || []).reduce((acc, input, i) => {
        var _a;
        if (input.type.includes("[")) {
            const basicType = (_a = /([^[]*)\[.*$/g.exec(input.type)) === null || _a === void 0 ? void 0 : _a[1];
            args.forEach((arg) => {
                acc = acc.concat([[arg, basicType]]);
            });
            return acc;
        }
        else {
            return acc.concat([[args[i], input.type]]);
        }
    }, []);
    const encodedArgs = argsWithTypes.map(([arg, inputType]) => {
        let rawArg = arg;
        switch (inputType) {
            case "bool":
                return arg ? hexTrue : hexFalse;
            case "address":
                rawArg = arg.replace(/^0x/g, "").toLowerCase();
                break;
            default:
                if (inputType.startsWith("bytes")) {
                    const argEncoded = rawArg
                        .split("")
                        .map((character) => character.charCodeAt(0).toString(16))
                        .join("");
                    const paddedEncodedArg = argEncoded.padEnd(64, "0");
                    return paddedEncodedArg;
                }
                else if (inputType === "uint256") {
                    const argEncoded = BigInt(arg).toString(16);
                    const paddedEncodedArg = argEncoded.padStart(64, "0");
                    return paddedEncodedArg;
                }
                else if (inputType.startsWith("uint")) {
                    break;
                }
                else {
                    throw new Error(`essential-eth does not yet support "${inputType}" inputs. Make a PR today!"`);
                }
        }
        const argEncoded = rawArg.toString(16);
        const paddedEncodedArg = argEncoded.padStart(64, "0");
        return paddedEncodedArg;
    });
    const functionEncoded = functionHash.slice(0, 8);
    const data = `0x${functionEncoded}${encodedArgs.join("")}`;
    return data;
}
export function decodeRPCResponse(jsonABIArgument, nodeResponse) {
    const rawOutputs = jsonABIArgument.outputs;
    const encodedOutputs = nodeResponse.slice(2).match(/.{1,64}/g);
    const outputs = (encodedOutputs || []).map((output, i) => {
        const outputType = (rawOutputs || [])[i].type;
        switch (outputType) {
            case "bool":
                return output === hexTrue;
            case "address":
                return toChecksumAddress(`0x${output.slice(24)}`);
            case "uint256":
            case "uint120":
                return tinyBig(hexToDecimal(`0x${output}`));
            case "bytes32":
                return `0x${output}`;
            case "uint8":
                return Number(hexToDecimal(`0x${output}`));
            default:
                throw new Error(`essential-eth does not yet support "${outputType}" outputs. Make a PR today!"`);
        }
    });
    return outputs.length === 1 ? outputs[0] : outputs;
}
