<template>
  <div class="my-container">
    <div>{{ num3 }}</div>
    <div>{{ num4 }}</div>
    <button @click="handleClick">debounce</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num1: 111,
      num2: 222,
      num4: 0
    }
  },

  created() {
    // const aa = {
    //   name: '123',
    //   age: 1111
    // }
    // this.bi()
    // const aa = ['11', '22', '31']
    // const bb = []
    // for (const k in aa) {
    //   bb[k] = aa[k]
    // }
    // console.log(bb)
    // for (const k of aa) {
    //   console.log(k)
    //   console.log(aa[k])
    // }
    // obj = {
    //   a: { name: 'abc' },
    //   b: 2
    // }
    // function fn(obj) {
    //   let newObj = {}
    //   if (typeof obj !== 'object') return '不是一个对象'
    //   for (const key in obj) {
    //     typeof obj[key] === 'object'
    //       ? (newObj[key] = fn(obj[key]))
    //       : (newObj[key] = obj[key])
    //   }
    //   return newObj
    // }
    // let newObj = fn(obj)
    // const obj = {
    //   a: {
    //     name: '123'
    //   },
    //   b: 222,
    //   c: [1, 2, 3]
    // }
    // const newObj = this.deepCopy(obj)
    // console.log(newObj)
    // console.log(newObj === obj)
    // console.log(typeof [1, 2] === 'object')
    // const a = []
    // console.log(a instanceof Array)
    // const a = 1
    // console.log(this.getType(a))
    // function Aaa(name, age) {
    //   const that = this
    //   ;(that.name = name), (that.age = age)
    // }
    // Aaa.prototype = {
    //   // prototype对象里面又有其他的属性
    //   showName: function () {
    //     console.log("I'm " + this.name) //this是什么要看执行的时候谁调用了这个函数
    //   },
    //   showAge: function () {
    //     console.log("And I'm " + this.age) //this是什么要看执行的时候谁调用了这个函数
    //   }
    // }
    // const ccc = new Aaa('aaa', 11)
    // ccc.showName()

    const obj = {
      name: '111'
    }

    Object.defineProperty(obj, 'name', {
      // eslint-disable-next-line getter-return
      get: function () {
        console.log('调用了get')
      },
      set: function (newV) {
        console.log('调用了set，新值是' + newV)
      }
    })

    obj.name
    obj.name = '222'
  },

  methods: {
    bi() {
      let a = 111
      const b = function () {
        console.log(a)
      }
      b()
    },
    debounce(fn, delay) {
      var timer = null

      return function () {
        console.log(timer)
        if (timer) clearTimeout(timer)
        timer = setTimeout(function () {
          fn.apply(this)
        }, delay)
      }
    },

    handleClick() {
      this.debounce(function () {
        console.log('debounce函数执行了' + Date.now())
      }, 2000)()
    },

    fn() {
      console.log('触发防抖函数')
    },

    // deepClone(obj) {
    //   const newObj = {}
    //   for (let key in obj) {
    //     if (typeof obj[key] == 'object') {
    //       newObj[key] = obj[key].constructor === Array ? [] : {}
    //       this.deepClone(obj[key])
    //     } else {
    //       newObj[key] = obj[key]
    //     }
    //   }
    //   return newObj
    // },

    getType(obj) {
      let type = typeof obj
      if (type !== 'object') {
        // 先进行typeof判断，如果是基础数据类型，直接返回
        return type
      }
      // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果"[object Number]"
      return Object.prototype.toString.call(obj).split(' ')[1].replace(/\]/, '')
    },

    deepCopy(obj) {
      let newObj = obj.constructor === Array ? [] : {}
      if (typeof obj !== 'object') return
      for (const k in obj) {
        if (typeof obj[k] === 'object') {
          newObj[k] = this.deepCopy(obj[k])
        } else {
          newObj[k] = obj[k]
        }
      }
      return newObj
    }
  },

  computed: {
    num3: function () {
      return this.num1 + this.num2
    }
  },

  watch: {
    num1: {
      handler: function (v) {
        this.num4 = v + this.num2
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
