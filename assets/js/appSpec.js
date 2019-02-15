describe("formatTime function", function() {
  it("Should return 6:50 + GMT offset from that timezone when '1550213654' is passed in", () => {
    expect(expect(formatTime(1550209817).substring(0, 8)).toBe("6:50 GMT"));
  });
});