import { concat, keccak256, toUtf8Bytes } from "../index";
const messagePrefix = "\x19Aurora Signed Message:\n";
export function hashMessage(message) {
    if (typeof message === "string") {
        message = toUtf8Bytes(message);
    }
    return keccak256(concat([
        toUtf8Bytes(messagePrefix),
        toUtf8Bytes(String(message.length)),
        message,
    ]));
}
