import Big from "big.js";
import { etherToGwei } from "./../etherToGwei";
import { tinyBig } from "./../../shared/tinyBig/tinyBig";
describe("gweiToEther", () => {
  it("happy path", () => {
    expect(etherToGwei("100.0").toString()).toBe("100000000000");
    expect(etherToGwei(100.0).toString()).toBe("100000000000");
    expect(etherToGwei("0.000000001").toNumber()).toBe(1);
    expect(etherToGwei(0.000000001).toNumber()).toBe(1);

    expect(etherToGwei(tinyBig(1000)).toNumber()).toBe(1000000000000);
    expect(etherToGwei(Big(0.000000001)).toNumber()).toBe(1);
  });

  it("wrong types", () => {
    expect(() => {
      etherToGwei(JSON.stringify(false));
    }).toThrow();
    expect(() => {
      etherToGwei(JSON.stringify([1, 2, 3]));
    }).toThrow();
  });
});
