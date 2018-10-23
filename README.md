# up360-layer

> 向上网公共弹窗插件

## 安装步骤

``` bash
# 安装依赖,安装之前必须安装less和less-loader 
npm install up360-layer --save

# 开发中引用,注册
import layer from ' up360-layer'
Vue.use(layer)

```

## 查看demo步骤

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

## 参数和事件说明
## 1.弹窗功能
``` bash
## 传入参数content， 类型：string，说明：弹窗内容
## 传入参数lock， 类型：boolean，说明：是否锁定背景层，默认true
## 传入参数btn， 类型：Array，说明：按钮，使用默认样式可传入字符串，需要取消样式必须传入对象，例：{text:'取消',cancel:true}
## 在js中使用

// 单按钮
this.$layer.dialog({
   content: '我是内容',
   btn: ['确定']
})
// 多按钮
this.$layer
.dialog({
  content:'内容',
  btn: [
    {
      text: '取消',
      cancel: true
    },
    {
      text: '确定'
    }
  ]
})
.then(index => {
// 点击确定按钮的promise事件，index是按钮的index
  if (index === 1) { 
  }
})
// 关闭弹窗
this.$layer.close()

```
## 2.提示功能
``` bash
this.$layer.tips({
   content: '我是提示',
   time: 3000
}) 
this.$layer.tips({
   type: 'loading',
   content: '加载中'
})

```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
