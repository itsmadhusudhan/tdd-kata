import { add } from "./add";

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
});
