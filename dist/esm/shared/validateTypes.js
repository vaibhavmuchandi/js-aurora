export const validateType = (value, allowedTypes) => {
    if (!allowedTypes.includes(typeof value)) {
        throw new Error(`${allowedTypes.join(" or ")} required. Received ${typeof value}`);
    }
};
