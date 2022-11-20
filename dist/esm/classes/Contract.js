var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { decodeRPCResponse, encodeData } from "./utils/encodeDecodeTransaction";
function estimateGas(txnData) {
    txnData.split("").reduce((previousValue, currentValue) => {
        const characterCost = currentValue === "0" ? 4 : 68;
        return previousValue + characterCost;
    }, 0);
}
export class BaseContract {
    constructor(addressOrName, contractInterface, signerOrProvider) {
        this._address = addressOrName;
        this._provider = signerOrProvider;
        contractInterface
            .filter((jsonABIArgument) => jsonABIArgument.type === "function")
            .forEach((jsonABIArgument) => {
            if ("name" in jsonABIArgument &&
                typeof jsonABIArgument.name === "string") {
                defineReadOnly(this, jsonABIArgument.name, (..._args) => __awaiter(this, void 0, void 0, function* () {
                    let functionArguments = _args;
                    let options = {};
                    const lastArg = _args[_args.length - 1];
                    if (!Array.isArray(lastArg) && typeof lastArg === "object") {
                        options = lastArg;
                        functionArguments = _args.slice(0, _args.length - 1);
                    }
                    const data = encodeData(jsonABIArgument, functionArguments);
                    const decimalGas = typeof options.gasLimit === "number"
                        ? options.gasLimit
                        : typeof (jsonABIArgument === null || jsonABIArgument === void 0 ? void 0 : jsonABIArgument.gas) ===
                            "number"
                            ? estimateGas(data)
                            : null;
                    const req = () => __awaiter(this, void 0, void 0, function* () {
                        return yield this._provider.call(Object.assign({ to: this._address.toLowerCase(), data }, (decimalGas
                            ? { gas: `0x${decimalGas.toString(16)}` }
                            : {})), "latest");
                    });
                    const nodeResponse = yield req();
                    return decodeRPCResponse(jsonABIArgument, nodeResponse);
                }));
            }
        });
    }
}
export function defineReadOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value: value,
        writable: false,
    });
}
export class Contract extends BaseContract {
}
