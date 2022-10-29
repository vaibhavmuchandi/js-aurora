import { utils } from "ethers";
import type { BytesLike } from "./../bytes";
import { keccak256 } from "./../keccak256";
import { toUtf8Bytes } from "./../toUtf8Bytes";

function testKeccak256(inputs: Array<BytesLike>) {
  inputs.forEach((input) => {
    expect(keccak256(input)).toBe(utils.keccak256(input));
  });
}

describe("keccak256", () => {
  it("should match ethers.js hex strings", () => {
    const inputs = [
      "0x4d7F1790644Af787933c9fF0e2cff9a9B4299Abb",
      "0xB5503a7db1A9105cd459D99153e69a76a8EF1530",
      "0xaa0fc255b079e775f9307e5cfec472a555cebc3a",
    ];
    testKeccak256(inputs);
  });
  it("should match ethers.js bytes", () => {
    const inputs = [[2, 182, 145], [0, 16, 255], [0x12, 0x34], [0x12]];
    testKeccak256(inputs);
  });

  it("should match ethers.js numbers", () => {
    const inputs = [23874234, 123346, 12395712].map((n) =>
      toUtf8Bytes(n.toString())
    );
    testKeccak256(inputs);
  });

  it("should match ethers.js strings", () => {
    const inputs = [
      "aurora-js",
      "firstText",
      "secondString",
      "example1",
      "2934823",
      "true",
    ].map(toUtf8Bytes);
    testKeccak256(inputs);
  });
});
