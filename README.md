<p align="center">
  <b>
    <h1>js-aurora</h1>
  </b>
  <br/>
  <i>Light-weight client side package for development on Aurora EVM for faster execution with near-identical api's to Web3.js and Ethers</i>
  <br/>
</p>

<br/>

## Table of Contents

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>Click to expand</summary>

- [Install](#install)
- [🛠 Utils](#-utils)
  - [`arrayify`](#arrayify)
  - [`computeAddress`](#computeaddress)
  - [`computePublicKey`](#computepublickey)
  - [`concat`](#concat)
  - [`etherToGwei`](#ethertogwei)
  - [`etherToWei`](#ethertowei)
  - [`gweiToEther`](#gweitoether)
  - [`hashMessage`](#hashmessage)
  - [`hexConcat`](#hexconcat)
  - [`hexDataLength`](#hexdatalength)
  - [`hexDataSlice`](#hexdataslice)
  - [`hexStripZeros`](#hexstripzeros)
  - [`hexValue`](#hexvalue)
  - [`hexZeroPad`](#hexzeropad)
  - [`hexlify`](#hexlify)
  - [`isAddress`](#isaddress)
  - [`isBytes`](#isbytes)
  - [`isBytesLike`](#isbyteslike)
  - [`isHexString`](#ishexstring)
  - [`jsonRpcProvider`](#jsonrpcprovider)
  - [`keccak256`](#keccak256)
  - [`pack`](#pack)
  - [`solidityKeccak256`](#soliditykeccak256)
  - [`splitSignature`](#splitsignature)
  - [`stripZeros`](#stripzeros)
  - [`tinyBig`](#tinybig)
  - [`toChecksumAddress`](#tochecksumaddress)
  - [`toUtf8Bytes`](#toutf8bytes)
  - [`weiToEther`](#weitoether)
  - [`zeroPad`](#zeropad)
- [Providers](#providers)
  - [`call`](#call)
  - [`estimateGas`](#estimategas)
  - [`getBalance`](#getbalance)
  - [`getBlock`](#getblock)
  - [`getBlockNumber`](#getblocknumber)
  - [`getCode`](#getcode)
  - [`getGasPrice`](#getgasprice)
  - [`getLogs`](#getlogs)
  - [`getNetwork`](#getnetwork)
  - [`getTransaction`](#gettransaction)
  - [`getTransactionCount`](#gettransactioncount)
  - [`getTransactionReceipt`](#gettransactionreceipt)
- [Contract](#contract)
  - [`contractFunctionName(args)`](#contractfunctionnameargs)

</details>

<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

  <br/>

## Install

```sh
npm install --save js-aurora # TypeScript included

# or yarn
yarn add js-aurora # TypeScript included
```

Browsers:

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (UNPKG_SCRIPT_TAG) -->

```html
<!-- index.html -->
<script src="https://unpkg.com/js-aurora@0.0.1"></script>
```

<!-- ⛔️ AUTO-GENERATED-CONTENT:END (UNPKG_SCRIPT_TAG) -->

<br/>

## 🛠 Utils

```typescript
import { etherToWei } from "js-aurora";

// or in a non-import environment
const { etherToWei } = require("js-aurora");
```

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (FUNCTIONS) -->

#### [`arrayify`]

```typescript
arrayify(value: number | BytesLike | Hexable, options: DataOptions): Uint8Array
```

  <details>
  <summary>View Example</summary>

```js
import { arrayify } from "js-aurora";
```

```javascript
arrayify(1);
// Uint8Array(1) [ 1 ]
```

```javascript
arrayify(0x1234);
// Uint8Array(2) [ 18, 52 ]
```

```javascript
arrayify("0x1", { hexPad: "right" });
// Uint8Array(1) [ 16 ]
```

  </details>

  <br/>

#### [`computeAddress`]

```typescript
computeAddress(key: string): string
```

  <details>
  <summary>View Example</summary>

```js
import { computeAddress } from "js-aurora";
```

```javascript
computeAddress(
  "0x4b26981d9782e69b0986534694f9339e4a9df7dee0e5759b5bf62016cdfb6c24b085006e0978adb4c94a9446e46e545d4e720d69a91d8f32d09ac13f10cc2e70d5"
); // public key
// '0xA2902059a7BF992f1450BACD7357CCAa5cC8336a'
```

```javascript
computeAddress(
  "0xb413a2b68e38f991dcfbca22c3c757baed0c8ab2c22c4fd2face04131ab9f1ff"
); // private key
// '0xf4AB3a39722C57A5cCC268930C5FaA50BD19097a'
```

  </details>

  <br/>

#### [`computePublicKey`]

```typescript
computePublicKey(privKey: BytesLike): string
```

  <details>
  <summary>View Example</summary>

```js
import { computePublicKey } from "js-aurora";
```

```javascript
computePublicKey(
  "0x512f3bad0ddc316f155f000bc776fde1c13ec4842b992382cf0e74863ad29797"
);
// '0x507fdfd34434a68f1075b328faf6221fecbbe716c5e93d5d1d77184e04c08123d0284ebcaa0f4e1c73b9876fef72aa4a0f4946aa4c887f3fc414dce12efeebce80'
```

```javascript
computePublicKey([
  50, 102, 50, 99, 52, 49, 57, 97, 99, 102, 52, 97, 49, 100, 97, 56, 99, 49,
  101, 98, 101, 97, 55, 53, 98, 98, 51, 102, 99, 102, 98, 100,
]);
// '0x82694b94c5442d9756ebc03b2c90acf7c9a263dbd5b038174add448bec89a4ffe4628a997023af61316fd9556ca89e449cdeee921627f8eb0b671c0f02ace49c47'
```

  </details>

  <br/>

#### [`concat`]

```typescript
concat(arrayOfBytesLike: Array<BytesLikeWithNumber>): Uint8Array
```

  <details>
  <summary>View Example</summary>

```js
import { concat } from "js-aurora";
```

```javascript
concat([0, 1]);
// Uint8Array(2) [ 0, 1 ]
```

  </details>

  <br/>

#### [`etherToGwei`]

```typescript
etherToGwei(etherQuantity: string | number | TinyBig | Big): TinyBig
```

  <details>
  <summary>View Example</summary>

```js
import { etherToGwei } from "js-aurora";
```

```javascript
etherToGwei("1000").toString();
// '1000000000000'
etherToGwei(1000).toString();
// '1000000000000'
```

```javascript
etherToGwei("1000").toNumber();
// 1000000000000
etherToGwei(1000).toNumber();
// 1000000000000
```

  </details>

  <br/>

#### [`etherToWei`]

```typescript
etherToWei(etherQuantity: string | number | TinyBig | Big): TinyBig
```

  <details>
  <summary>View Example</summary>

```js
import { etherToWei } from "js-aurora";
```

```javascript
etherToWei("1000").toString();
// '1000000000000000000000'
etherToWei(1000).toString();
// '1000000000000000000000'
```

```javascript
etherToWei("1000").toNumber();
// 1000000000000000000000
etherToWei(1000).toNumber();
// 1000000000000000000000
```

  </details>

  <br/>

#### [`gweiToEther`]

```typescript
gweiToEther(gweiQuantity: string | number | TinyBig | Big): TinyBig
```

  <details>
  <summary>View Example</summary>

```js
import { gweiToEther } from "js-aurora";
```

```javascript
gweiToEther("1000000000000").toString();
// '1000'
gweiToEther(1000000000000).toString();
// '1000'
```

```javascript
gweiToEther("1000000000000").toNumber();
// 1000
gweiToEther(1000000000000).toNumber();
// 1000
```

  </details>

  <br/>

#### [`hashMessage`]

```typescript
hashMessage(message: string | Bytes): string
```

  <details>
  <summary>View Example</summary>

```js
import { hashMessage } from "js-aurora";
```

```javascript
hashMessage("Hello World");
// '0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2'
```

  </details>

  <br/>

#### [`hexConcat`]

```typescript
hexConcat(items: Array<BytesLike>): string
```

  <details>
  <summary>View Example</summary>

```js
import { hexConcat } from "js-aurora";
```

```javascript
hexConcat([[2, 4, 0, 1], 9, "0x2934", "0x3947"]);
```

  </details>

  <br/>

#### [`hexDataLength`]

```typescript
hexDataLength(data: BytesLike): undefined
```

  <details>
  <summary>View Example</summary>

```js
import { hexDataLength } from "js-aurora";
```

```javascript
hexDataLength([2, 4, 0, 1]);
// 4
```

```javascript
hexDataLength("0x3925");
// 2
```

  </details>

  <br/>

#### [`hexDataSlice`]

```typescript
hexDataSlice(data: BytesLikeWithNumber, offset: number, endOffset: number): string
```

  <details>
  <summary>View Example</summary>

```js
import { hexDataSlice } from "js-aurora";
```

```javascript
hexDataSlice([20, 6, 48], 0, 2);
// '0x1406'
```

  </details>

  <br/>

#### [`hexStripZeros`]

```typescript
hexStripZeros(value: BytesLike): string
```

  <details>
  <summary>View Example</summary>

```js
import { hexStripZeros } from "js-aurora";
```

```javascript
hexStripZeros([0, 0, 0, 48]);
// '0x30'
```

  </details>

  <br/>

#### [`hexValue`]

```typescript
hexValue(value: number | bigint | BytesLike | Hexable): string
```

  <details>
  <summary>View Example</summary>

```js
import { hexValue } from "js-aurora";
```

```javascript
hexValue(39);
// '0x27'
```

```javascript
hexValue([9, 4, 19, 4]);
// '0x9041304'
```

  </details>

  <br/>

#### [`hexZeroPad`]

```typescript
hexZeroPad(value: BytesLikeWithNumber, length: number): string
```

  <details>
  <summary>View Example</summary>

```js
import { hexZeroPad } from "js-aurora";
```

```javascript
hexZeroPad("0x60", 2);
// '0x0060'
```

```javascript
hexZeroPad(0x60, 3);
// '0x000060'
```

```javascript
hexZeroPad("12345", 1);
// Throws
```

  </details>

  <br/>

#### [`hexlify`]

```typescript
hexlify(value: number | bigint | BytesLike | Hexable, options: DataOptions): string
```

  <details>
  <summary>View Example</summary>

```js
import { hexlify } from "js-aurora";
```

```javascript
hexlify(4);
// '0x04'
```

```javascript
hexlify(14);
// '0x0e'
```

  </details>

  <br/>

#### [`isAddress`]

```typescript
isAddress(address: string): boolean
```

  <details>
  <summary>View Example</summary>

```js
import { isAddress } from "js-aurora";
```

```javascript
isAddress("0x5046a62c2ec6e60dd03a25ab5f7652eafbfaf21f");
// true
```

```javascript
isAddress("bad");
// false
```

```javascript
// Does NOT support ENS.
isAddress("vitalik.eth");
// false
```

  </details>

  <br/>

#### [`isBytes`]

```typescript
isBytes(value: any): value
```

  <details>
  <summary>View Example</summary>

```js
import { isBytes } from "js-aurora";
```

```javascript
isBytes([1, 2, 3]);
// true
```

```javascript
isBytes(false);
// false
```

```javascript
isBytes(new Uint8Array(1));
// true
```

  </details>

  <br/>

#### [`isBytesLike`]

```typescript
isBytesLike(value: any): value
```

  <details>
  <summary>View Example</summary>

```js
import { isBytesLike } from "js-aurora";
```

```javascript
isBytesLike([1, 2, 3]);
// true
```

```javascript
isBytesLike(false);
// false
```

```javascript
isBytesLike(new Uint8Array(1));
// true
```

  </details>

  <br/>

#### [`isHexString`]

```typescript
isHexString(value: any, length: number): boolean
```

  <details>
  <summary>View Example</summary>

```js
import { isHexString } from "js-aurora";
```

```javascript
isHexString("0x4924");
// true
```

```javascript
isHexString("0x4924", 4);
// false
// length of 4 in bytes would mean a hex string with 8 characters
```

  </details>

  <br/>

#### [`jsonRpcProvider`]

```typescript
jsonRpcProvider(rpcUrl: string): JsonRpcProvider
```

  <details>
  <summary>View Example</summary>

```js
import { jsonRpcProvider } from "js-aurora";
```

```javascript
jsonRpcProvider()
  .getBlock("latest")
  .then((block) => {
    console.log(block.number);
  });
// 14530496
```

  </details>

  <br/>

#### [`keccak256`]

```typescript
keccak256(data: BytesLike): string
```

  <details>
  <summary>View Example</summary>

```js
import { keccak256 } from "js-aurora";
```

```javascript
keccak256("js-aurora");
// '0x194c82aaac4151d3b97d58a541337a40abce9442d295584152323e22448e9d98'

keccak256("0x123");
// '0x4a4613b6024d34a6aac825a96e99f1480be5fc28f4cfe736fbaad0457f5ba1e5'
```

  </details>

  <br/>

#### [`pack`]

```typescript
pack(types: Array<string>, values: Array<any>): string
```

  <details>
  <summary>View Example</summary>

```js
import { pack } from "js-aurora";
```

```javascript
const types = ["bool", "string", "uint64"];
const values = [true, "text", 30];
pack(types, values);
// '0x0174657874000000000000001e'
```

  </details>

  <br/>

#### [`solidityKeccak256`]

```typescript
solidityKeccak256(types: Array<string>, values: Array<any>): string
```

  <details>
  <summary>View Example</summary>

```js
import { solidityKeccak256 } from "js-aurora";
```

```javascript
const types = ["string", "bool", "uint32"];
const values = ["js-aurora is great", true, 14];
solidityKeccak256(types, values);
// '0xe4d4c8e809faac09d58f468f0aeab9474fe8965d554c6c0f868c433c3fd6acab'
```

```javascript
const types = ["bytes4", "uint32[5]"];
const values = [
  [116, 101, 115, 116],
  [5, 3, 4, 9, 18],
];
solidityKeccak256(types, values);
// '0x038707a887f09355dc545412b058e7ba8f3c74047050c7c5e5e52eec608053d9'
```

  </details>

  <br/>

#### [`splitSignature`]

```typescript
splitSignature(signature: SignatureLike): Signature
```

  <details>
  <summary>View Example</summary>

```js
import { splitSignature } from "js-aurora";
```

```javascript
const signature = '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee331b';
splitSignature(signature);
 {
   r: "0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b39716",
   s: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33",
   _vs: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33",
   recoveryParam: 0,
   v: 27,
   yParityAndS: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33",
   compact: "0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33"
 }
```

  </details>

  <br/>

#### [`stripZeros`]

```typescript
stripZeros(value: BytesLike): Uint8Array
```

  <details>
  <summary>View Example</summary>

```js
import { stripZeros } from "js-aurora";
```

```javascript
stripZeros("0x00002834");
// Uint8Array { [Iterator]  0: 40, 1: 52 }
// Equivalent to '0x2834'
```

  </details>

  <br/>

#### [`tinyBig`]

```typescript
tinyBig(value: string | number | TinyBig | Big): TinyBig
```

  <details>
  <summary>View Example</summary>

```js
import { tinyBig } from "js-aurora";
```

```javascript
tinyBig(10).times(3).toNumber();
// 30
```

  </details>

  <br/>

#### [`toChecksumAddress`]

```typescript
toChecksumAddress(address: string): string
```

  <details>
  <summary>View Example</summary>

```js
import { toChecksumAddress } from "js-aurora";
```

```javascript
toChecksumAddress("0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359");
// '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'
```

Similar to ["getAddress" in ethers.js](https://docs.ethers.io/v5/api/utils/address/#utils-getAddress)

Similar to ["toChecksumAddress" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#tochecksumaddress)

  </details>

  <br/>

#### [`toUtf8Bytes`]

```typescript
toUtf8Bytes(data: string): Uint8Array
```

  <details>
  <summary>View Example</summary>

```js
import { toUtf8Bytes } from "js-aurora";
```

```javascript
toUtf8Bytes("js-aurora");
// Uint8Array { [Iterator] 0: 101, 1: 115, 2: 115, 3: 101, 4: 110, 5: 116, 6: 105, 7: 97, 8: 108, 9: 45, 10: 101, 11: 116, 12: 104 }

toUtf8Bytes("ethereum");
// Uint8Array { [Iterator]  0: 101, 1: 116, 2: 104, 3: 101, 4: 114, 5: 101, 6: 117, 7: 109 }
```

  </details>

  <br/>

#### [`weiToEther`]

```typescript
weiToEther(weiQuantity: string | number | TinyBig | Big): TinyBig
```

  <details>
  <summary>View Example</summary>

```js
import { weiToEther } from "js-aurora";
```

```javascript
weiToEther("1000000000000000000000").toString();
// '1000'
weiToEther(1000000000000000000000).toString();
// '1000'
```

```javascript
weiToEther("1000000000000000000000").toNumber();
// 1000
weiToEther(1000000000000000000000).toNumber();
// 1000
```

  </details>

  <br/>

#### [`zeroPad`]

```typescript
zeroPad(value: BytesLike, length: number): Uint8Array
```

  <details>
  <summary>View Example</summary>

```js
import { zeroPad } from "js-aurora";
```

```javascript
zeroPad("0x039284");
// Uint8Array { [Iterator]  0: 0, 1: 0, 2: 0, 3: 3, 4: 146, 5: 132 }
// Equivalent to 0x000000039284
```

```javascript
zeroPad([39, 25, 103, 45], 5);
// Uint8Array { [Iterator]  0: 0, 1: 39, 2: 25, 3: 103, 4: 45 }
```

  </details>

  <br/>

<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

- _The return-type `TinyBig` is just [`Big`](https://github.com/MikeMcl/big.js) but expands scientific notation on `toNumber()` and `toString()`_

<br/>
<br/>

## Providers

```typescript
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try POKT or Infura */);
// OR for very quick testing (limited to 10,000 requests)
const provider = new JsonRpcProvider();
```

<details>
  <summary>Want a redundant provider that handles outages?</summary>

```typescript
import { FallthroughProvider } from "js-aurora";

// The FallthroughProvider handles falling through to the next valid URL.
// It's dynamic to never trust one URL again when it fails * until it has tried all other provided URLs
// The default timeout for a request is 8 seconds after which it moves to the next URL
const provider = new FallthroughProvider(["aurora-node"]);
provider.getGasPrice().toNumber();
/*
39695942769
*/
```

</details>

 <br/>

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (PROVIDER) -->

#### [`call`]

```typescript
provider.call(transaction: TransactionRequest, blockTag?: BlockTag): Promise<string>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
await provider.call({
  to: "0x6b175474e89094c44da98b954eedeac495271d0f",
  data: "0x70a082310000000000000000000000006E0d01A76C3Cf4288372a29124A26D4353EE51BE",
});
// '0x0000000000000000000000000000000000000000000000000858898f93629000'
```

  </details>

  <br/>

#### [`estimateGas`]

```typescript
provider.estimateGas(transaction: TransactionRequest): Promise<TinyBig>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
await provider.estimateGas({
  // Wrapped ETH address
  to: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  data: "0xd0e30db0",
  value: etherToWei("1.0").toHexString(),
});
// { TinyBig: "27938" }
```

  </details>

  <br/>

#### [`getBalance`]

```typescript
provider.getBalance(address: string, blockTag?: BlockTag): Promise<TinyBig>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
await provider.getBalance("0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8");
// 28798127851528138
```

  </details>

  <br/>

#### [`getBlock`]

```typescript
provider.getBlock(timeFrame?: BlockTag, returnTransactionObjects?: boolean): Promise<BlockResponse>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
await provider.getBlock(14879862);
// {
//   baseFeePerGas: { TinyBig: 39095728776 },
//   difficulty: { TinyBig: 14321294455359973 },
//   extraData: "0x486976656f6e2073672d6865617679",
//   gasLimit: { TinyBig: 29970620 },
//   gasUsed: { TinyBig: 20951384 },
//   hash: "0x563b458ec3c4f87393b53f70bdddc0058497109b784d8cacd9247ddf267049ab",
//   logsBloom:
//     "0x9f38794fe80b521794df6efad8b0d2e9582f9ec3959a3f9384bda0fa371cfa5fac5af9d515c6bdf1ec325f5b5f7ebdd6a3a9fae17b38a86d4dc4b0971afc68d8086640550f4c156e6f923f4a1bb94fb0bed6cdcc474c5c64bfeff7a4a906f72b9a7b94004ee58efc53d63ac66961acd3a431b2d896cc9fd75f6072960bced45f770587caf130f57504decfcb63c6ca8fbc5bdbd749edd5a99a7375d2b81872289adb775fb3c928259f4be39c6d3f4d5b6217822979bb88c1f1fb62429b1b6d41cf4e3f77f9e1db3f5723108f1e5b1255dd734ad8cdb11e7ea22487c788e67c83777b6f395e504ca59c64f52245ee6de3804cf809e5caa4f0ea6a9aa9eb6ed801",
//   miner: "0x1aD91ee08f21bE3dE0BA2ba6918E714dA6B45836",
//   mixHash: "0x73cc9419bfb89c9d41c3a8c34ce56b5ebe468bdcf870258d2e77262275d580ec",
//   nonce: "0x976f3f5d596ffb08",
//   number: 14879862,
//   parentHash: "0x95986ae14a71face8d9a6a379edd875b2e8bc73e4de0d9d460e7752bddb0f579",
//   receiptsRoot: "0x8e6ba2fd9bee602b653dae6e3132f16538c2c5df24f1df8c000392053f73defa",
//   sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
//   size: { TinyBig: 134483 },
//   stateRoot: "0xbf2bb67bd1c741f3d00904b8451d7c2cf4e3a2726f5a5884792ede2074747b85",
//   timestamp: { TinyBig: 1654016186 },
//   totalDifficulty: { TinyBig: 50478104614257705213748 },
//   transactions: [
//     "0xb3326a9149809603a2c28545e50e4f7d16e194bf5ee9764e0544603854c4a8d2",
//     "0x8b42095f8d335404a4896b2817b8e5e3d86a5a87cb434a8eec295d5280a7f48e",
//     "0x882f78fcb73f0f7ad0700bb0424a8b4beb366aaa93b88a3562c49a8d0ce4dcff",
//     ...
//   ],
//   transactionsRoot: "0x5934902f3dcc263ec34f24318179bf6301f53f4834685792066026f3a4849d72",
//   uncles: [],
// }
```

  </details>

  <br/>

#### [`getBlockNumber`]

```typescript
provider.getBlockNumber(): Promise<number>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
await provider.getBlockNumber();
// 1053312
```

  </details>

  <br/>

#### [`getCode`]

```typescript
provider.getCode(address: string, blockTag?: BlockTag): Promise<string>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
await jsonRpcProvider().getCode(
  "0xaC6095720221C79C6E7C638d260A2eFBC5D8d880",
  "latest"
);
// '0x608060405234801561001057600080fd5b506004361061...'
```

  </details>

  <br/>

#### [`getGasPrice`]

```typescript
provider.getGasPrice(): Promise<TinyBig>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
await provider.getGasPrice();
// 52493941856
```

  </details>

  <br/>

#### [`getLogs`]

```typescript
provider.getLogs(filter: Filter | FilterByBlockHash): Promise<Array<Log>>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
provider.getLogs({
  address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  topics: [
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    "0x00000000000000000000000021b8065d10f73ee2e260e5b47d3344d3ced7596e",
  ],
  fromBlock: 14825027,
  toBlock: 14825039,
});

[
  {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    blockHash:
      "0x8e0dfac2f704851960f866c8708b3bef2f66c0fee0329cf25ff0261b264ca6bc",
    blockNumber: 14825029,
    data: "0x000000000000000000000000000000000000000000000000005f862ee352a38a",
    logIndex: 384,
    removed: false,
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x00000000000000000000000021b8065d10f73ee2e260e5b47d3344d3ced7596e",
      "0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45",
    ],
    transactionHash:
      "0xbd49031be16f8fd1775f4e0fe79b408ffd8ae9c65b2827ee47e3238e3f51f4c0",
    transactionIndex: 226,
  },
];
```

  </details>

  <br/>

#### [`getNetwork`]

```typescript
provider.getNetwork(): Promise<Network>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
jsonRpcProvider("https://testnet.aurora.dev").getNetwork();
// { chainId: 1313161555, name: 'aurora' }
```

  </details>

  <br/>

#### [`getTransaction`]

```typescript
provider.getTransaction(transactionHash: string): Promise<TransactionResponse>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
await provider.getTransaction(
  "0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789"
);
// {
//   accessList: [],
//   blockHash: "0x876810a013dbcd140f6fd6048c1dc33abbb901f1f96b394c2fa63aef3cb40b5d",
//   blockNumber: 14578286,
//   chainId: 1,
//   from: "0xdfD9dE5f6FA60BD70636c0900752E93a6144AEd4",
//   gas: { TinyBig: 112163 },
//   gasPrice: { TinyBig: 48592426858 },
//   hash: "0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789",
//   input: "0x83259f17000000000000000000000000000000000000000000...",
//   maxFeePerGas: { TinyBig: 67681261618 },
//   maxPriorityFeePerGas: { TinyBig: 1500000000 },
//   nonce: { TinyBig: 129 },
//   r: "0x59a7c15b12c18cd68d6c440963d959bff3e73831ffc938e75ecad07f7ee43fbc",
//   s: "0x1ebaf05f0d9273b16c2a7748b150a79d22533a8cd74552611cbe620fee3dcf1c",
//   to: "0x39B72d136ba3e4ceF35F48CD09587ffaB754DD8B",
//   transactionIndex: 29,
//   type: 2,
//   v: 0,
//   value: { TinyBig: 0 },
//   confirmations: 298140,
// }
```

  </details>

  <br/>

#### [`getTransactionCount`]

```typescript
provider.getTransactionCount(address: string, blockTag?: BlockTag): Promise<number>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
await provider.getTransactionCount(
  "0x71660c4005ba85c37ccec55d0c4493e66fe775d3"
);
// 1060000
```

```javascript
await provider.getTransactionCount(
  "0x71660c4005ba85c37ccec55d0c4493e66fe775d3",
  "latest"
);
// 1060000
```

```javascript
await provider.getTransactionCount(
  "0x71660c4005ba85c37ccec55d0c4493e66fe775d3",
  14649390
);
// 1053312
```

  </details>

  <br/>

#### [`getTransactionReceipt`]

```typescript
provider.getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>
```

  <details>
  <summary>View Example</summary>

```js
import { JsonRpcProvider } from "js-aurora";
const provider = new JsonRpcProvider("RPC URL HERE" /* Try Infura or POKT */);
```

```javascript
await provider.getTransactionReceipt(
  "0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789"
);
// {
//   blockHash: "0x876810a013dbcd140f6fd6048c1dc33abbb901f1f96b394c2fa63aef3cb40b5d",
//   blockNumber: 14578286,
//   contractAddress: null,
//   cumulativeGasUsed: { TinyBig: 3067973 },
//   effectiveGasPrice: { TinyBig: 48592426858 },
//   from: "0xdfD9dE5f6FA60BD70636c0900752E93a6144AEd4",
//   gasUsed: { TinyBig: 112163 },
//   logs: [
//     {
//       address: "0x0eDF9bc41Bbc1354c70e2107F80C42caE7FBBcA8",
//       blockHash: "0x876810a013dbcd140f6fd6048c1dc33abbb901f1f96b394c2fa63aef3cb40b5d",
//       blockNumber: 14578286,
//       data: "0x0000000000000000000000000000000000000000000003a12ec797b5484968c1",
//       logIndex: 42,
//       topics: [
//         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
//         "0x00000000000000000000000039b72d136ba3e4cef35f48cd09587ffab754dd8b",
//         "0x000000000000000000000000dfd9de5f6fa60bd70636c0900752e93a6144aed4",
//       ],
//       transactionHash: "0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789",
//       transactionIndex: 29,
//     },
//     {
//       address: "0x39B72d136ba3e4ceF35F48CD09587ffaB754DD8B",
//       blockHash: "0x876810a013dbcd140f6fd6048c1dc33abbb901f1f96b394c2fa63aef3cb40b5d",
//       blockNumber: 14578286,
//       data: "0x0000000000000000000000000000000000000000000003a12ec797b5484968c1",
//       logIndex: 43,
//       topics: [
//         "0x34fcbac0073d7c3d388e51312faf357774904998eeb8fca628b9e6f65ee1cbf7",
//         "0x000000000000000000000000dfd9de5f6fa60bd70636c0900752e93a6144aed4",
//         "0x0000000000000000000000000000000000000000000000000000000000000003",
//       ],
//       transactionHash: "0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789",
//       transactionIndex: 29,
//     },
//   ],
//   logsBloom: "0x00000000000000000000000000000...",
//   status: 1,
//   to: "0x39B72d136ba3e4ceF35F48CD09587ffaB754DD8B",
//   transactionHash: "0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789",
//   transactionIndex: 29,
//   type: 2,
//   byzantium: true,
//   confirmations: 298171,
// }
```

  </details>

  <br/>

<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

<br/>

## Contract

⚠️ Only read functions are currently supported. ⚠️

Encoding support:

- `bool`
- `bytes`
- `address`

Decoding support:

- `bool`
- `address`
- `uint256`
- `bytes32`
- `uint8`

_Assume all types outside the above types will break for now_

```typescript
import { Contract, jsonRpcProvider, JSONABI } from "js-aurora";
// UNI airdrop contract
const contractAddress = "0x619c06429e27DfD04f73E347d0E206578440163E";
const provider = jsonRpcProvider(/* RPC URL optional */);

const abi: JSONABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "isClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contract = new Contract(contractAddress, abi, provider);

(async () => {
  // prints boolean as to whether index 0 has claimed airdrop or not
  console.log(await contract.isClaimed(0));
})();
```

#### `contractFunctionName(args)`

Any function on a contract. Returns are the same as `ethers.js`, except that instead of BigNumber, `js-aurora` always returns a [`TinyBig`]

<br/>
<br/>

## More Info

This repo is under active development. The API is less-fully featured than `web3` and `ethers`. More functions added often!

### Identical vs Similar vs Dissimliar {#isd}

Throughout the documentation for `js-aurora`, you may notice that some functions are compared to `ethers.js` and `web3.js`. The keywords `identical`, `similar`, and `dissimilar` are used to help you migrate to `js-aurora`. Here's a guide on what these keywords mean:

- Identical -- should behave exactly like the library you're already using, except the types might be different (`TinyBig` vs [`Bn.js`](https://github.com/indutny/bn.js)).
- Similar -- can probably be used as a replacement to the library you're currently using, except there are some differences. Read the notes next to this keyword to see why these aren't considered `identical`.
- Dissimilar -- _should not_ be used in place of the function you're currently using. Read the notes next to this keyword to see why these functions aren't considered `similar`, and potentially learn how to alter your implementation to make `js-aurora` work for you.

Note: In `web3.js`, almost every method or function can be passed a callback. `js-aurora`, like `ethers.js`, does not include this functionality and trusts that users will rely on the much more modern [promise](https://javascript.info/promise-basics) and [async/await](https://javascript.info/async-await) patterns.

### Miscellaneous
