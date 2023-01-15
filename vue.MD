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
deepClone(obj) {
let newObj = obj.constructor === Array ? [] : {}
if (typeof obj !== 'object') return
for (const k in obj) {
if (typeof obj[k] === 'object') {
newObj[k] = this.deepClone(obj[k])
} else {
newObj[k] = obj[k]
}
}
return newObj
}
},

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

6.函数的防抖和节流？
a- 防抖：防抖其实是延迟函数的执行，只有当等待了一段时间也没有事件触发时，才会真正去执行函数
b- 节流：函数在特定的时间就执行一次

7.使用闭包是否一定会产生内存浪费吗？
答：不一定，闭包是否产生内存浪费取决于 js 的垃圾回收机制是否将变量占用的内存给及时清除掉，常见的垃圾回收算法有标记清除法，能标记到就不回收，反之则回收。一般如果闭包函数没有返回值或者没有使用全局变量对闭包函数的返回值进行存储，那么是不会造成内存浪费的，详见文章的案例 1 和案例 2；而如果闭包函数存在返回值并且使用全局变量对闭包函数的返回值进行存储，那么可能会造成内存浪费的，

8.闭包？
a.函数嵌套了函数，内部函数能访问外部函数，就是闭包函数

9.闭包函数的作用？
a.读取外部函数作用域的变量
b.变量私有化

10.call apply bind
a、相同点
三个都是用于改变 this 指向；
接收的第一个参数都是 this 要指向的对象；
都可以利用后续参数传参。
b、不同点
call 和 bind 传参相同，多个参数依次传入的；
apply 只有两个参数，第二个参数为数组；
call 和 apply 都是对函数进行直接调用，而 bind 方法不会立即调用函数，而是返回一个修改 this 后的函数。

11.js 的作用于链？
变量起作用的范围，变量的访问会层层往上级作用域访问直到 window，称为作用域链

12.js 原型链？
当试图查找一个对象的属性时，如果这个对象的本身不存在，他就会去这个对象的**proto**这个隐式原型上查找，**proto**指向其构造函数的显示原型
prototype，如果没有就会一层一层往上找，直到 null 为止，这就是原型链
获取对象属性时，如果对象本身没有这个属性，那就会去他的原型**proto**上去找，如果还查不到，就去找原型的原型，一直找到最 顶层(Object.prototype)为止。Object.prototype 对象也有 proto 属性值为 null。链式查找机制叫原型链。

13.vue 双向数据绑定的原理？
vue 是通过数据劫持以及发布者，订阅者的模式进行数据的双向绑定

14.vue 实现数据响应式的原理？
vue 通过 Object.definedproprty 对 data 的数据进行劫持（遍历+递归 data 数据），通过对数据绑定 set 和 get 的方法，
当页面使用到数据的时候，会触发 Object 的 definedpropoty 的 get 函数，get 函数会把观察者 watcher 放到属性收集器，
当数据发生变化时，会触发 set 函数，set 函数会遍历属性收集器，通知观察者 watcher 更新视图

15.proxy 和 definedpropoty 的区别？
a.proxy 能够对整个 data 进行监听，而 definedpropoty 只能通过遍历+递归 data 对象，对其属性进行逐个监听，比较消耗性能

16.js 事件循环机制？（eventLoop）
js 是单线程语言，他通过 同步主线程，异步函数放入 eventTable 注册表，等待主线程任务完成后放入 eventQueue（消息队列，事件队列），
同步主线程，取出 eventQueue 的任务放入主线程，不断循环此操作，直到任务完成

17.vue2 和 vue3 的区别
a.从架构上来讲
a-1.实现响应式底层从 Object.definedpropoty 更换成了 proxy，性能变好
b.从开发角度来讲
b-1.语法层面的变化，vue2 的 options Api 变成了 vue3 的 compezation Api，是代码逻辑更加清晰，维护更加方便
b-2.根元素可多个，vue2 的时候必须是一个根元素
b-3.v-for 和 v-if 的优先级发生变化，从 vue2 的 v-for 优先于 v-if 转变成 vue3 的 v-if 优先于 v-for
b-4.vue3 底层由 ts 开发，所以对 ts 开发的力度支持更大

18.用户从输入 url 到页面渲染，中间发生了什么？
a.首先是 URL 地址解析---判断输入的是一个合法 URL 还是一个待搜索的关键词，并且根据你输入的内容进行自动完成，字符编码等操作---接着发起真正的 URL 请求，如果本地缓存了这个资源，则会直接将数据转发给浏览器进程，如果没有缓存，则会查询 DNS 解析域名---首先先找浏览器有没有 DNS 缓存（之前有访问记录），如果有则返回 ip，如果没有，则寻找本地的 host 文件，看看有没有域名记录，如果有则返回 ip，如果本地 host 文件没有则直接向本地 DNS 服务器请求，如果还是没有，继续向上 DNS 服务器请求，直至返回---浏览器拿到 ip 后，先和服务器建立 TCP 连接，（第一次握手---客户端发送‘SYN’数据包给服务端，第二次握手---服务端收到客户端的数据包，返回‘SYN/ACK’数据包给客户端，第三次握手---客户端收到服务端的返回后，发送‘ACK’数据包给服务端）---连接建立成功之后，就可以发送 HTTP 请求到服务器请求数据了，客户端发起 http 请求的时候，会有一些请求信息（1-请求发放，URI 协议，版本，2-请求头，3-请求正文），请求头和请求正文之间是一个空行，这个行非常重要，他表示请求头已经结束，接下来是请求正文，然后后端从固定的端口接受到 TCP 报文开始，他会对 TCP 连接进行处理，对 HTTP 协议进行解析，并按照报文格式进一步封装成 HTTP Request 对象，一般大型的网站会将你的请求反向代理服务器，因为当网站的访问量非常大的时候，网站越来越慢，一台服务器已经不够用了，于是将同一个应用部署在多台服务器上，将大量用户的请求分配给多台服务器，先请求到 Nginx，Nginx 再请求到应用服务器，然后将结果返回给客户端，同时也带来一个好处，其中一台服务器万一挂了，只要还有其他服务器正常运行，就不会影响用户使用，通过 Nginx 到反向代理，我们到达了 web 服务器，服务端处理请求，访问数据库，然后将处理结果返回，也就是返回一个 HTTP 响应，HTTP 响应与 HTTP 请求相似，HTTP 响应也有 3 部分组成，分别是-状态行，响应头，响应正文，浏览器接受到来自服务器的响应资源后，如果响应资源进行了压缩，需要进行解压，然后对响应资源进行缓存，接下来对响应资源进行解析，HTML 通过 HTML 解析器解析输出 DOM 树，css 样式通过 css 解析器解析输出 css 规则，结合 DOM 树和 css 规则，计算出 DOM 树每个节点的具体样式，生成渲染树，浏览器根据渲染树开始布局和绘制，会触发回流和重会，构建图层树，显示页面

19.前端性能优化
a.4 个层面，8 个点
优化性能的 4 个层面
1-网络层面--减少网络请求（因为 DNS 解析时间比较长），缓存机制
2-构建层面--提交代码的复用率
3-浏览器渲染层面
4-服务端层面
性能优化的 8 个点
1-资源的合并和压缩
2-图片的编码原理和类型选择
3-浏览器的渲染机制
4-懒加载和预加载
5-浏览器缓存
6-缓存机制
7-PWA
8-Vue-SSR

20.一次完整的页面请求所发生的事情？
a.浏览器解析 URL - DNS 解析 - 建立 TCP 链接（TCP 三次握手）- 发送 HTTP 请求 - 服务器处理请求，返回响应结果 - 关闭 TCP 链接（TCP 四次挥手）- 浏览器渲染 - 代码执行
