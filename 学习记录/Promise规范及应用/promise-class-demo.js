const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status = PENDING;

  constructor(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch(newStatus) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach(cb => {
          cb(this.value);
        })
        break;
      }
      case REJECTED: {
        this.FULFILLED_CALLBACK_LIST.forEach(cb => {
          cb(this.reason);
        })
        break;
      }
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
      this.status = FULFILLED;
      this.reason = reason;
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;
    const realOnRejected = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };
    const promise2 = new MPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch(e) {
            reject(e);
          }
        })
      }
  
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch(e) {
            reject(e);
          }
        })
      }
      switch(this.status) {
        case FULFILLED: {
          realOnFulfilled();
          break;
        }
        case REJECTED: {
          realOnRejected();
          break;
        }
        case PENDING: {
          this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
        }
      }
    });
    return promise2;
  }

  resolvePromise(promise2, x, resolve, reject) {

  }

  isFunction(param) {
    return typeof param === "function";
  }
}
