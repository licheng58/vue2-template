1-computed 和 watch 的区别
a.computed 有缓存 而 watch 没有
b.computed 可以定义一个新的属性，这个属性可以是多个变量的计算结果，而 watch 不行

2.new 一个对象的操作具体干了什么？
在堆空间中创建了一个对象--this 指向这个对象--执行构造函数的语句--返回这个对象

3.如何理解 js 的堆和栈？以及 js 深拷贝和浅拷贝的理解？
a.栈是存放 js 简单数据类型的值 和 引用数据的地址 ，而堆存放 引用数据的值
b.首先 简单数据类型没有深拷贝，因为简单数据类型在栈中存放的是值
引用数据类型
如果是浅拷贝 那么和赋值的数据共用一个地址，此时改变其值会影响赋值的那个数据
如果是深拷贝 那么会在内存里新开辟一个地址，此时改变其值不会影响原先的数据

4.js 深拷贝的方法？
a.使用 lodash 插件
b.如果数据没有函数和 undefined，可以使用 JSON.string+JSON.parse 实现 但是有缺点
NaN -- null
undefined -- 空
时间戳 -- 字符串时间
错误信息 -- 空对象
Infinity -- null

c.使用递归进行深拷贝

5.js 数据比较 typeof instanceof Object.prototype.toString()的区别？
a.typeof 返回一个字符串 例如 typeof 123 === Number？
number, boolean, string, function, object, undefined
缺点：对于 Array, Null 等特殊对象使用 typeof 一律返回 object， 这正是 typeof 的局限性
b.instanceof 返回一个布尔值 例如 123 instanceof Array === true？
缺点：instanceof 可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型
c.Object.prototype.toString()
Object.prototype.toString({}) // "[object Object]"
Object.prototype.toString.call({}) // 同上结果，加上 call 也 ok
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call('1') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call(null) //"[object Null]"
Object.prototype.toString.call(undefined) //"[object Undefined]"
Object.prototype.toString.call(/123/g) //"[object RegExp]"
Object.prototype.toString.call(new Date()) //"[object Date]"
Object.prototype.toString.call([]) //"[object Array]"
Object.prototype.toString.call(document) //"[object HTMLDocument]"
Object.prototype.toString.call(window) //"[object Window]"
d.封装通用判断数据类型方法
function getType(obj){
let type = typeof obj;
if (type !== "object") { // 先进行 typeof 判断，如果是基础数据类型，直接返回
return type;
}
// 对于 typeof 返回结果是 object 的，再进行如下的判断，正则返回结果
return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}
