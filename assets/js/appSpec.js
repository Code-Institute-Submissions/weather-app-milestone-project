describe("formatTime function", function() {
  it("Should return '7:54 GMT -1' when '1550213654' is passed in", () => {
    expect(formatTime(1550213654)).toBe("7:54 GMT -1");
  });
});