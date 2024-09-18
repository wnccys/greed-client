function sum(a,b) {
    return a + b
}

test("sqlite3 db connection", () => {
    expect(sum(1, 4)).toBe(5);
});