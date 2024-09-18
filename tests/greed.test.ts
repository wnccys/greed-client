function sum(a,b) {
    return a + b
}

test("adds 1 + 4 expecting 5", () => {
    expect(sum(1, 4)).toBe(5);
});