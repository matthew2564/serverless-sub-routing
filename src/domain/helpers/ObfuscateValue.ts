export function obfuscate(input: string | undefined): string | undefined {
    if (!input) {
        return input;
    }

    const length = input.length;

    // Calculate the number of characters to mask, rounding to the nearest whole number
    const charsToMask = Math.round(length / 3);

    // Calculate start position for replacement
    const startPos = Math.floor((length - charsToMask) / 2);
    const endPos = startPos + charsToMask;

    // Replace the calculated portion in the middle with asterisks
    return (
        input.substring(0, startPos) +
        '*'.repeat(charsToMask) +
        input.substring(endPos)
    );
}
