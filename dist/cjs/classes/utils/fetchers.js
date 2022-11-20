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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRPCPostBody = exports.post = void 0;
const isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
/**
 * Makes a post request with the specified JSON data, normally to the a AURORA JSON RPC API endpoint
 */
function post(url, body) {
    return (0, isomorphic_unfetch_1.default)(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((r) => __awaiter(this, void 0, void 0, function* () {
        const t = yield r.text();
        try {
            return JSON.parse(t);
        }
        catch (_a) {
            throw new Error(`Invalid JSON RPC response: "${t}"`);
        }
    }))
        .then((response) => {
        const result = response === null || response === void 0 ? void 0 : response.result;
        if (!result) {
            throw new Error(`Invalid JSON RPC response: ${JSON.stringify(response)}`);
        }
        return response.result;
    });
}
exports.post = post;
/**
 * Prepares data to be sent using the {@link post} function. Data is prepared per the {@link https://en.wikipedia.org/wiki/JSON-RPC#Examples JSON RPC v2 spec}
 */
function buildRPCPostBody(method, params) {
    return {
        jsonrpc: "2.0",
        // TODO: Increment ID will be needed when websocket support is added
        id: 1,
        method,
        params,
    };
}
exports.buildRPCPostBody = buildRPCPostBody;
