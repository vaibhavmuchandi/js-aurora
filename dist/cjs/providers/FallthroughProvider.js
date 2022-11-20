"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallthroughProvider = void 0;
const logger_1 = require("../logger/logger");
const BaseProvider_1 = require("./BaseProvider");
// https://advancedweb.hu/how-to-add-timeout-to-a-promise-in-javascript/
const promiseTimeout = (prom, time) => Promise.race([
    prom,
    new Promise((_r, reject) => setTimeout(() => reject("Promise timed out"), time)),
]);
const DEFAULT_TIMEOUT_DURATION = 8000;
class FallthroughProvider extends BaseProvider_1.BaseProvider {
    constructor(rpcUrls, options = {}) {
        if (!Array.isArray(rpcUrls)) {
            logger_1.logger.throwError("Array required", { rpcUrls });
        }
        if (rpcUrls.length <= 1) {
            logger_1.logger.throwError("More than one rpcUrl is required", { rpcUrls });
        }
        super(rpcUrls);
        // index of current trusted rpc url
        /**
         * @ignore
         */
        this.rpcUrlCounter = 0;
        /**
         * @ignore
         */
        this.post = (body) => {
            // while failing post, add to rpcUrlCounter and post again
            const genesisCount = this.rpcUrlCounter;
            const recursivePostRetry = () => {
                // Times out request
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
    /**
     * @ignore
     */
    selectRpcUrl() {
        return this._rpcUrls[this.rpcUrlCounter];
    }
}
exports.FallthroughProvider = FallthroughProvider;
