import { logger } from "../logger/logger";
import { BaseProvider } from "./BaseProvider";
const promiseTimeout = (prom, time) => Promise.race([
    prom,
    new Promise((_r, reject) => setTimeout(() => reject("Promise timed out"), time)),
]);
const DEFAULT_TIMEOUT_DURATION = 8000;
export class FallthroughProvider extends BaseProvider {
    constructor(rpcUrls, options = {}) {
        if (!Array.isArray(rpcUrls)) {
            logger.throwError("Array required", { rpcUrls });
        }
        if (rpcUrls.length <= 1) {
            logger.throwError("More than one rpcUrl is required", { rpcUrls });
        }
        super(rpcUrls);
        this.rpcUrlCounter = 0;
        this.post = (body) => {
            const genesisCount = this.rpcUrlCounter;
            const recursivePostRetry = () => {
                const genesisRpcUrl = this.selectRpcUrl();
                const res = promiseTimeout(this._post(body), this.timeoutDuration).catch((e) => {
                    if (genesisRpcUrl === this.selectRpcUrl()) {
                        this.rpcUrlCounter =
                            (this.rpcUrlCounter + 1) % this._rpcUrls.length;
                    }
                    if (this.rpcUrlCounter === genesisCount) {
                        throw e;
                    }
                    return recursivePostRetry();
                });
                return res;
            };
            return recursivePostRetry();
        };
        this.timeoutDuration = options.timeoutDuration || DEFAULT_TIMEOUT_DURATION;
    }
    selectRpcUrl() {
        return this._rpcUrls[this.rpcUrlCounter];
    }
}
