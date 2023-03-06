// const Person = function() {};
// const person = new Person(xxx);
// const person = objectFactory(Person, xxx);
// 返回的结果是一个对象
// 实例的__proto__指向构造函数的prototype

// 1. ⽤new Object() 的⽅式新建了⼀个对象 obj；
// 2. 取出第⼀个参数，就是我们要传⼊的构造函数。此外因为 shift 会修改原数组，所以 arguments 会
// 被去除第⼀个参数；
// 3. 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性；
// 4. 使⽤ apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性；
// 5. 判断构造函数返回值是不是object，有的话返回 返回值，没有的话返回对象；
function objectFactory() {
    const obj = new Object();
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    let ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}