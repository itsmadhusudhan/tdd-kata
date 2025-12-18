import { add, extractInput } from "./add";

describe("Test add function", () => {
    it("should return 0 when the input is an empty string", () => {
        expect(add("")).toBe(0);
    });

    it("should return the number when the input is a single number", () => {
        expect(add("1")).toBe(1);
    });

    it("should return the sum of two numbers when the input is two numbers", () => {
        expect(add("1,2")).toBe(3);
    });

    it("should return the sum of five numbers when the input is 5 numbers", () => {
        expect(add("1,2,3,4,5")).toBe(15);
    });

    describe("Test Customer delimiter", () => {
        it("should return sum for \n delimiter", () => {
            expect(add("1\n2\n3\n4\n5")).toBe(15);
        });

        it("should return sum for both \n and , delimiter", () => {
            expect(add("1\n2,3")).toBe(6);
        });

        it("should return three where the default delimiter is `;`", () => {
            expect(add("//;\n1;2")).toBe(3);
        });

        it("should return result with different delimiter and \n", () => {
            expect(add("//;\n1;2\n5")).toBe(8);
        });

        it("should allow delimiters of any length", () => {
            expect(add("//[***]\n1***2***3")).toBe(6);
        });

        it("should allow multiple delimiters", () => {
            expect(add("//[*][&]\n1*2&4")).toBe(7);
        });

        it("should allow multiple delimiters with different lengths", () => {
            expect(add("//[*][%]\n10*20%30")).toBe(60);
        });
    });

    it("should throw error for negative numbers", () => {
        expect(() => add("-1")).toThrow("Negatives not allowed: -1");
        expect(() => add("1,-2")).toThrow("Negatives not allowed: -2");
        expect(() => add("-10,-2,-3")).toThrow(
            "Negatives not allowed: -10,-2,-3",
        );
    });

    it("should ignore number greater than 1000", () => {
        expect(add("1001,2,3")).toBe(5);
    });

    describe("Edge cases", () => {
        it("should handle extra trailing comma", () => {
            expect(add("1,2,")).toBe(3);
        });

        it("should handle extra trailing delimiter with custom delimiter", () => {
            expect(add("//[*]\n1*2*")).toBe(3);
        });

        it("should return 0 for only delimiter without numbers", () => {
            expect(add("//[*]\n")).toBe(0);
        });
    });
});

describe("Test extractInput", () => {
    it("should return the delimiter and the input numbers", () => {
        const [regex, numbers] = extractInput("//;\n1;2");
        expect(regex.toString()).toBe("/[,|\\n|;]/");
        expect(numbers).toBe("1;2");
    });

    it("should return the input numbers when there is no delimiter", () => {
        const [regex, numbers] = extractInput("1,2");
        expect(regex.toString()).toBe("/[,|\\n]/");
        expect(numbers).toBe("1,2");
    });

    it("should return delimiter of any length", () => {
        const [regex, numbers] = extractInput("//[***]\n1***2***3");

        expect(regex.toString()).toBe("/[***]/");
        expect(numbers).toBe("1***2***3");
    });
});
