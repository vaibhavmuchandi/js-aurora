import type { JsonRpcProvider } from "../providers/JsonRpcProvider";
import type { ContractInterface } from "../types/Contract.types";
import { decodeRPCResponse, encodeData } from "./utils/encodeDecodeTransaction";

function estimateGas(txnData: string) {
  txnData.split("").reduce((previousValue, currentValue) => {
    // 0 characters are 4 gwei, all others are 48 gwei
    const characterCost = currentValue === "0" ? 4 : 68;
    return previousValue + characterCost;
  }, 0);
}
interface Options {
  gasLimit?: number;
}
export class BaseContract {
  private readonly _address: string;
  private readonly _provider: JsonRpcProvider;

  constructor(
    addressOrName: string,
    contractInterface: ContractInterface,
    signerOrProvider: JsonRpcProvider
  ) {
    this._address = addressOrName;
    this._provider = signerOrProvider;
    contractInterface
      .filter((jsonABIArgument) => jsonABIArgument.type === "function")
      .forEach((jsonABIArgument) => {
        if (
          "name" in jsonABIArgument &&
          typeof jsonABIArgument.name === "string"
        ) {
          defineReadOnly(
            this,
            jsonABIArgument.name,
            async (..._args: any[]) => {
              let functionArguments = _args;
              let options: Options = {};
              // remove options from encoding
              const lastArg = _args[_args.length - 1];
              if (!Array.isArray(lastArg) && typeof lastArg === "object") {
                options = lastArg;
                functionArguments = _args.slice(0, _args.length - 1);
              }

              const data = encodeData(jsonABIArgument, functionArguments);

              const decimalGas =
                typeof options.gasLimit === "number"
                  ? options.gasLimit /* user passed in "gasLimit" directly */
                  : typeof jsonABIArgument?.gas ===
                    "number" /* ABI specified "gas". */
                  ? estimateGas(data)
                  : null;
              const req = async (): Promise<string> => {
                return await this._provider.call(
                  {
                    to: this._address.toLowerCase(),
                    data,
                    // sometimes gas is defined in the ABI
                    ...(decimalGas
                      ? { gas: `0x${decimalGas.toString(16)}` }
                      : {}),
                  },
                  "latest"
                );
              };
              const nodeResponse = await req();
              return decodeRPCResponse(jsonABIArgument, nodeResponse);
            }
          );
        }
      });
  }
}

export function defineReadOnly<T>(object: T, name: string, value: any): void {
  Object.defineProperty(object, name, {
    enumerable: true,
    value: value,
    writable: false,
  });
}
export class Contract extends BaseContract {
  readonly [key: string]: any;
}
