const NPromise = require("../new_promise.js");

describe("Promise", () => {
  it("Should create a new Promise with pending state", () => {
    const promise = new NPromise(() => {});
    expect(promise.state).toBe("pending");
    expect(promise.value).toBe(undefined);
  });

  describe("When fulfilled", () => {
    it("should then a Promise", (done) => {
      const myFn = (resolve) => resolve({ data: "fake" });
      new NPromise(myFn).then((response) => {
        expect(response.data).toBe("fake");
        done();
      });
    });

    it("should call then just when the async code is resolved", () => {
      return new NPromise((resolve) => {
        setTimeout(() => resolve({ data: "fake" }));
      }).then((response) => {
        expect(response.data).toBe("fake");
      });
    });

    it("should allow the same promise to be thenable multiple times", () => {
      const p1 = new NPromise((resolve) => resolve({ data: "fake" }));

      p1.then((res) => {
        expect(res.data).toBe("fake");
      });

      p1.then((res) => {
        expect(res.data).toBe("fake");
      });
    });
  });
});
