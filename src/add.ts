export const extractInput = (input: string) => {
    const delimiterRegex = /^\/\/(.+)\n([\s\S]*)/;

    const matches = input.match(delimiterRegex);

    if (!matches) {
        return [undefined, input];
    }

    return [matches?.[1], matches?.[2] ?? input];
};

export function add(input: string): number {
    if (input === "") {
        return 0;
    }

    const [delimiter, inputNumbers = input] = extractInput(input);

    const numbers = inputNumbers
        .split(delimiter ? delimiter : ",")
        .flatMap((num) => num.split("\n").map(Number));

    const sum = numbers.reduce((a, b) => a + b, 0);

    return sum;
}
