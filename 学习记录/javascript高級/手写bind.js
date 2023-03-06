//   bind会创建一个新函数，当新函数被调用时，bind的第一个参数作为被调用的this，后续的参数作为入参
//   返回一个函数，也可以传入参数
//   当bind返回的函数作为构造函数的时候，bind指定的this会失效但是入参还生效
// -------------------------
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw TypeError('bind的调用者必须为函数');
  }
  const that = this;
  const arr = [].slice.call(arguments, 1); // 类数组转变数组 并 取值下标1开始直至最后
  const FNOP = function(){}; // 作为构造函数传递prototype
  const fBound = function () {
    const bArr = [].slice.call(arguments); // 获取返回后的函数的入参
    // 当bind返回的函数作为构造函数的时候，bind指定的this会失效但是入参还生效
    // 修改函数指向，判断新函数是否用作构造函数来使用，是的话指向调用者，不是的话指向需要指向的对象
    that.apply(this instanceof FNOP ? this : context, arr.concat(bArr));
  };
  FNOP.__proto__ = this.prototype; // 中间函数原型指向调用者原型
  fBound.prototype = new FNOP(); // 用构造函数代为传递原型
  // fBound.prototype = this.prototype; // 返回的是函数也可能用来作构造函数, 所以指向调用者的prototype，但是避免fbound污染原来的函数原型，增加一个中间函数传递
  return fBound;
};
