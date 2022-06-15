const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class HYPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      queueMicrotask(() => {
        if (this.status !== PROMISE_STATUS_PENDING) return;
        this.status = PROMISE_STATUS_FULFILLED;
        this.value = value;
        this.onFulfilledFns.forEach((fn) => fn(value));
      });
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onRejectedFns.forEach((fn) => fn(reason));
        });
      }
    };
    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    // 1.如果在then调用的时候, 状态已经确定下来了, 则立即执行回调
    if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
      onFulfilled(this.value);
    }
    if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
      onRejected(this.reason);
    }

    // 将成功回调跟失败回调放到数组中
    if (this.status === PROMISE_STATUS_PENDING) {
      this.onFulfilledFns.push(onFulfilled);
      this.onRejectedFns.push(onRejected);
    }
  }
}

const promise = new HYPromise((resolve, reject) => {
  resolve("success");
  reject("error");
});

promise.then(
  (res) => {
    console.log(1, res);
  },
  (err) => {
    console.log("err1", err);
  }
);

promise.then(
  (res) => {
    console.log(2, res);
  },
  (err) => {
    console.log("err2", err);
  }
);

promise.then(
  (res) => {
    console.log(3, res);
  },
  (err) => {
    console.log("err3", err);
  }
);

setTimeout(() => {
  promise.then(
    (res) => {
      console.log(4, res);
    },
    (err) => {
      console.log("err4", err);
    }
  );
}, 1000);
