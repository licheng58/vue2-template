<template>
  <div class="my-container">
    <div>{{ num3 }}</div>
    <div>{{ num4 }}</div>
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
    const obj = {
      a: {
        name: '123'
      },
      b: 222,
      c: [1, 2, 3]
    }

    const newObj = this.deepCopy(obj)
    console.log(newObj)
    // console.log(newObj === obj)
    // console.log(typeof [1, 2] === 'object')
    // const a = []
    // console.log(a instanceof Array)

    // const a = 1
    // console.log(this.getType(a))
  },

  methods: {
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
      let newObj = {}
      // if (typeof obj !== 'object') return
      for (const k in obj) {
        if (typeof obj[k] === 'object') {
          newObj[k] = obj[k].constructor === Array ? [] : {}
          this.deepCopy(obj[k])
        } else {
          newObj[k] = obj[k]
        }
      }
      // console.log(newObj)
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
