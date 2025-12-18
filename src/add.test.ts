import { add } from "./add";

describe("Test add function", () => {
  it("should return 0 when the input is an empty string", () => {
    expect(add("")).toBe(0);
  });
});
