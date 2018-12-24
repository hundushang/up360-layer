/* author: QLB @ 2017-9-12 */
var component = {
  template:
    '<transition name="confirm-fade">' +
    '<div class="confirm" v-if="visible&&type===\'dialog\'" @click.stop="lockFn">' +
    '<div class="confirm-wrapper">' +
    '<div class="confirm-content">' +
    ' <div class="text" v-html="content"></div>' +
    '<div class="operate" v-if="btn">' +
    '<div v-for="(item, index) in btn" v-if="typeof item === \'string\'" @click="callback(index)" class="operate-btn">{{item}}</div>' +
    '<div v-for="(item, index) in btn" v-if="typeof item === \'object\'" @click="callback(index)" class="operate-btn" :class="{cancel: item.cancel}">{{item.text}}</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="layer-tips" v-if="visible&&type===\'tips\'">{{content}}</div>'+
    '<div class="loading-wrapper" v-if="visible&&type===\'loading\'">'+
      '<div class="loading"></div>'+
      '<div class="text">{{content}}</div>'+
    '</div>'+
    '</transition>',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    // dialog 弹窗  tips 提示 loading 加载提示
    type: {
      type: String,
      default: 'dialog'
    },
    content: {
      type: String,
      default: ''
    },
    btn: {
      type: [String, Array]
    },
    lock: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function
    },
    time: {
      type: Number,
      default: 2000
    }
  },
  data: function() {
    return {
      confirmFade: true
    }
  },
  created: function() {},
  methods: {
    show: function() {
      this.visible = true
    },
    hide: function() {
      this.visible = false
    },
    lockFn: function() {
      if (!this.lock) {
        this.hide()
      }
    }
  }
}
var layer = {
  v: '1.0.1',
  instanceList: [],
  instance: null,
  open: function(props) {
    this.close()
    var LayerIndex = this.vue.extend(component)
    var instance = new LayerIndex({
      el: document.createElement('div'),
      propsData: props
    })
    // this.instanceList.push(instance)
    document.body.appendChild(instance.$el)
    return instance
  },
  close: function() {
    if (this.instance) {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
      }
      this.instance.hide()
    }
  },
  dialog: function(_dialog) {
    var self = this
    var props = {
      content: _dialog.content ? _dialog.content : '',
      btn: _dialog.btn ? _dialog.btn : '',
      lock: _dialog.lock
    }

    return new Promise(function(resolve, reject) {
      props.callback = function(action) {
        resolve(action)
        self.close()
      }
      self.instance = self.open(props)
      self.instance.visible = true
    })
  },
  // type --- tips 小提示 loading 加载
  tips: function(params) {
    var self = this
    var props = {
      content: params.content || '',
      type: params.type || 'tips',
      time: params.time || 2000
    }
    self.instance = self.open(props)
    self.instance.visible = true
    // 如果是提示就一定时间内自动关闭
    if (props.type === 'tips') {
       return new Promise(function(resolve, reject) {
        self.closeTimer = setTimeout(function(){
          resolve(props.time)
          self.close()
        }, props.time)
      })
    }
  }
}
layer.install = function(Vue, options) {
  require('./layer-mobile.less')
  layer.vue = Vue
  Vue.prototype.$layer = layer
}
export default layer
