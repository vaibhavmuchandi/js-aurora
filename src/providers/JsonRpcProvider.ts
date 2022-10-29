import { BaseProvider } from "./BaseProvider";
export class JsonRpcProvider extends BaseProvider {
  /**
   * @ignore
   */
  selectRpcUrl(): string {
    return this._rpcUrls[0];
  }

  /**
   * @ignore
   */
  post(body: Record<string, unknown>): Promise<any> {
    return this._post(body);
  }

  constructor(rpcUrl = "https://testnet.aurora.dev") {
    super([rpcUrl]);
  }
}

export function jsonRpcProvider(rpcUrl?: string) {
  return new JsonRpcProvider(rpcUrl);
}
