function stripTrailingZeroes(numberString) {
    const isNegative = numberString.startsWith("-");
    numberString = numberString.replace("-", "");
    numberString = numberString.replace(/\.0*$/g, "");
    numberString = numberString.replace(/^0+/, "");
    if (numberString.includes(".")) {
        numberString = numberString.replace(/0+$/, "");
    }
    if (numberString.startsWith(".")) {
        numberString = `0${numberString}`;
    }
    return `${isNegative ? "-" : ""}${numberString}`;
}
export function scientificStrToDecimalStr(scientificString) {
    if (!scientificString.match(/e/i)) {
        return stripTrailingZeroes(scientificString);
    }
    let [base, power] = scientificString.split(/e/i);
    const isNegative = Number(base) < 0;
    base = base.replace("-", "");
    base = stripTrailingZeroes(base);
    const [wholeNumber, fraction = ""] = base.split(".");
    if (Number(power) === 0) {
        return `${isNegative ? "-" : ""}${stripTrailingZeroes(base)}`;
    }
    else {
        const includesDecimal = base.includes(".");
        if (!includesDecimal) {
            base = `${base}.`;
        }
        base = base.replace(".", "");
        const baseLength = base.length;
        let splitPaddedNumber;
        if (Number(power) < 0) {
            if (wholeNumber.length < Math.abs(Number(power))) {
                base = base.padStart(baseLength + Math.abs(Number(power)) - wholeNumber.length, "0");
            }
            splitPaddedNumber = base.split("");
            if (wholeNumber.length < Math.abs(Number(power))) {
                splitPaddedNumber = [".", ...splitPaddedNumber];
            }
            else {
                splitPaddedNumber.splice(splitPaddedNumber.length - Math.abs(Number(power)), 0, ".");
            }
        }
        else {
            if (fraction.length < Math.abs(Number(power))) {
                base = base.padEnd(baseLength + Math.abs(Number(power)) - fraction.length, "0");
            }
            splitPaddedNumber = base.split("");
            if (fraction.length > Math.abs(Number(power))) {
                splitPaddedNumber.splice(splitPaddedNumber.length - Math.abs(Number(power)), 0, ".");
            }
        }
        const toReturn = stripTrailingZeroes(splitPaddedNumber.join(""));
        return `${isNegative ? "-" : ""}${toReturn}`;
    }
}
