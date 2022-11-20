import { BaseProvider } from "./BaseProvider";
export class JsonRpcProvider extends BaseProvider {
    selectRpcUrl() {
        return this._rpcUrls[0];
    }
    post(body) {
        return this._post(body);
    }
    constructor(rpcUrl = "https://testnet.aurora.dev") {
        super([rpcUrl]);
    }
}
export function jsonRpcProvider(rpcUrl) {
    return new JsonRpcProvider(rpcUrl);
}
