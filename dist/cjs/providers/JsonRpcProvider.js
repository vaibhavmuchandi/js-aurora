"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonRpcProvider = exports.JsonRpcProvider = void 0;
const BaseProvider_1 = require("./BaseProvider");
class JsonRpcProvider extends BaseProvider_1.BaseProvider {
    /**
     * @ignore
     */
    selectRpcUrl() {
        return this._rpcUrls[0];
    }
    /**
     * @ignore
     */
    post(body) {
        return this._post(body);
    }
    constructor(rpcUrl = "https://testnet.aurora.dev") {
        super([rpcUrl]);
    }
}
exports.JsonRpcProvider = JsonRpcProvider;
function jsonRpcProvider(rpcUrl) {
    return new JsonRpcProvider(rpcUrl);
}
exports.jsonRpcProvider = jsonRpcProvider;
