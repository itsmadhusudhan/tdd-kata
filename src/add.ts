export function add(input: string): number {
    if (input === "") {
        return 0;
    }

    const numbers = input.split(",").map(Number);
    const sum = numbers.reduce((a, b) => a + b, 0);

    return sum;
}
