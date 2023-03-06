// call&apply，改变执行指向，然后执行函数，this指向null时 指向window
// 将函数设置为对象的属性
// 执行所谓该函数 获取返回值
// 删除该函数
// return 返回值

Function.prototype.call2 = function(context, ...rest) {
    const context1 = context || window; // context为undefined或null时 指向window；绑定对象
    const fnSymbol = Symbol(); // 防止命中别的属性
    context1[fnSymbol] = this; // 修改指向
    let result = context1[fnSymbol](...rest) // 获取函数返回值
    delete context1[fnSymbol]; // 删除在传入对象上的函数
    return result;
}

Function.prototype.apply2 = function(context, arr) {
    const context1 = context || window; // context为undefined或null时 指向window；绑定对象
    const fnSymbol = Symbol(); // 防止命中别的属性
    context1[fnSymbol] = this; // 修改指向
    let result = context1[fnSymbol](...arr) // 获取函数返回值
    delete context1[fnSymbol]; // 删除在传入对象上的函数
    return result;
}