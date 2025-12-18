// regexp splits the input string into bracket delimiters and numbers
export const inputMatchRegex = /^\/\/((?:\[[^\]]+\])+|.)\n([\s\S]+)/;
// regex extracts the delimiters inside []
export const delimiterRegex = /\[(.*?)\]/g;

export const extractInput = (input: string): [RegExp, string] => {
    /**
     * this regex capture both the groups with single and multiple delimiter
     */
    const matches = input.match(inputMatchRegex);
    let delimiters: string[] = [",", "\n"];
    let numbers = "";

    if (matches) {
        const delimitersMatch = matches[1];

        // get the number match
        if (matches[2]) {
            numbers = matches[2];
        }

        // extract the delimiters
        if (delimitersMatch) {
            const bracketDelimiters = [
                ...delimitersMatch.matchAll(delimiterRegex),
            ]
                .map((m) => m[1])
                .filter((d) => d !== undefined);

            if (bracketDelimiters.length > 0) {
                delimiters = delimiters.concat(bracketDelimiters);
            } else {
                delimiters.push(delimitersMatch);
            }
        }
    } else {
        numbers = input;
    }

    const delimiterPattern = new RegExp(`[${delimiters.join("|")}]`);

    return [delimiterPattern, numbers];
};

export function add(input: string): number {
    if (input === "") {
        return 0;
    }

    const [delimiterPattern, inputNumbers] = extractInput(input);

    if (inputNumbers === "") {
        return 0;
    }

    const numbers = inputNumbers
        .split(delimiterPattern)
        .map(Number)
        .filter((num) => num <= 1000);

    const negativeNumbers = numbers.filter((num) => num < 0);

    if (negativeNumbers.length > 0) {
        throw new Error(`Negatives not allowed: ${negativeNumbers.join(",")}`);
    }

    const sum = numbers.reduce((a, b) => a + b, 0);

    return sum;
}
