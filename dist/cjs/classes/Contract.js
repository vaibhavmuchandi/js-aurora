"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = exports.defineReadOnly = exports.BaseContract = void 0;
const encodeDecodeTransaction_1 = require("./utils/encodeDecodeTransaction");
function estimateGas(txnData) {
    txnData.split("").reduce((previousValue, currentValue) => {
        // 0 characters are 4 gwei, all others are 48 gwei
        const characterCost = currentValue === "0" ? 4 : 68;
        return previousValue + characterCost;
    }, 0);
}
class BaseContract {
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
                    // remove options from encoding
                    const lastArg = _args[_args.length - 1];
                    if (!Array.isArray(lastArg) && typeof lastArg === "object") {
                        options = lastArg;
                        functionArguments = _args.slice(0, _args.length - 1);
                    }
                    const data = (0, encodeDecodeTransaction_1.encodeData)(jsonABIArgument, functionArguments);
                    const decimalGas = typeof options.gasLimit === "number"
                        ? options.gasLimit /* user passed in "gasLimit" directly */
                        : typeof (jsonABIArgument === null || jsonABIArgument === void 0 ? void 0 : jsonABIArgument.gas) ===
                            "number" /* ABI specified "gas". */
                            ? estimateGas(data)
                            : null;
                    const req = () => __awaiter(this, void 0, void 0, function* () {
                        return yield this._provider.call(Object.assign({ to: this._address.toLowerCase(), data }, (decimalGas
                            ? { gas: `0x${decimalGas.toString(16)}` }
                            : {})), "latest");
                    });
                    const nodeResponse = yield req();
                    return (0, encodeDecodeTransaction_1.decodeRPCResponse)(jsonABIArgument, nodeResponse);
                }));
            }
        });
    }
}
exports.BaseContract = BaseContract;
function defineReadOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value: value,
        writable: false,
    });
}
exports.defineReadOnly = defineReadOnly;
class Contract extends BaseContract {
}
exports.Contract = Contract;
