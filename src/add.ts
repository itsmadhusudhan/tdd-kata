export const extractInput = (input: string) => {
    /**
     * this regex capture both the groups with single and multiple delimiter
     */
    const delimiterRegex = /^\/\/(?:\[(.+?)\]|(.+?))\n([\s\S]*)/;
    const matches = input.match(delimiterRegex);

    if (!matches) {
        return [undefined, input];
    }

    return [matches?.[1] ?? matches?.[2], matches?.[3] ?? input];
};

export function add(input: string): number {
    if (input === "") {
        return 0;
    }

    const [delimiter, inputNumbers = input] = extractInput(input);

    const numbers = inputNumbers
        .split(delimiter ? delimiter : ",")
        .flatMap((num) => num.split("\n").map(Number))
        .filter((num) => num <= 1000);

    const negativeNumbers = numbers.filter((num) => num < 0);

    if (negativeNumbers.length > 0) {
        throw new Error(`Negatives not allowed: ${negativeNumbers.join(",")}`);
    }

    const sum = numbers.reduce((a, b) => a + b, 0);

    return sum;
}
