export const inputMatchRegex = /^\/\/((?:\[[^\]]+\])+|.)\n([\s\S]+)/;
export const delimiterRegex = /\[(.*?)\]/g;

export const extractInput = (input: string): [string | RegExp, string] => {
    /**
     * this regex capture both the groups with single and multiple delimiter
     */
    const matches = input.match(inputMatchRegex);
    const initialRegex = /[,|\n]/;

    if (!matches) {
        return [initialRegex, input];
    }

    const delimitersMatch = matches[1];

    if (!delimitersMatch) {
        return [initialRegex, input];
    }

    const delimiters = [...delimitersMatch.matchAll(delimiterRegex)].map(
        (m) => m[1],
    );

    const delimitersString =
        delimiters.length > 0
            ? new RegExp(`[${delimiters.join("|")}|\n]`)
            : delimitersMatch;

    return [delimitersString, matches?.[2] ?? input];
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
