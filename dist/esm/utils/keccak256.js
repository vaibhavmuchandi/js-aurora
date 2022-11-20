import { Keccak } from "sha3";
export function keccak256(data) {
    let bufferableData;
    if (typeof data === "string") {
        bufferableData = Buffer.from(data.replace(/^0x/, ""), "hex");
    }
    else {
        bufferableData = Buffer.from(data);
    }
    const keccak = new Keccak(256);
    const addressHash = "0x" + keccak.update(bufferableData).digest("hex");
    return addressHash;
}
