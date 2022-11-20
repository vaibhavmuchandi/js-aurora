var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import unfetch from "isomorphic-unfetch";
export function post(url, body) {
    return unfetch(url, {
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
export function buildRPCPostBody(method, params) {
    return {
        jsonrpc: "2.0",
        id: 1,
        method,
        params,
    };
}
