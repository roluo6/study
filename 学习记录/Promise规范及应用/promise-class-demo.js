const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MPromise {
  constructor(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    try {
      fn(this.resolve.call(this), this.reject.call(this));
    } catch (err) {
      this.reject(err);
    }
  }
  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  }
  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
    }
  }
  then(onFulfilled, onRejected) {
    const realFulfilled = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;
    const realRejected = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };
    const promise2 = new MPromise((resolve, reject) => {
      switch (this.status) {
        case FULFILLED:
          realFulfilled();
          break;
        case REJECTED:
          realRejected();
          break;
      }
    });
  }
  isFunction(param) {
    return typeof param === "function";
  }
}
