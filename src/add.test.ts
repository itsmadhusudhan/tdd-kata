import { add } from "./add";

describe("Test add function", () => {
	it("should return 0 when the input is an empty string", () => {
		expect(add("")).toBe(0);
	});

	it("should return the number when the input is a single number", () => {
		expect(add("1")).toBe(1);
	});
});
