const STATE = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

class NPromise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new Error("Executor must be a function");
    }

    this.state = STATE.PENDING;
    this.value = undefined;
    this.onFulfillChain = [];
    this.onRejectCallChain = [];

    executor(this.resolve.bind(this));
  }

  then(onFulFill) {
    return new NPromise((resolve) => {
      const onFulFilled = (res) => {
        resolve(onFulFill(res));
      };

      if (this.state == STATE.FULFILLED) {
        onFulFilled(this.value);
      } else {
        this.onFulfillChain.push(onFulFilled);
      }
    });
  }

  resolve(res) {
    if (this.state !== STATE.PENDING) {
      return;
    }

    this.state = STATE.FULFILLED;
    this.value = res;

    for (const onFulFilled of this.onFulfillChain) {
      onFulFilled(res);
    }
  }
}

module.exports = NPromise;
