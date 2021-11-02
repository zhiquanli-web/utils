<!-- 消息提示组件 -->
<template>
  <div class="container">
    <div class="toast-container">
      <div class="content">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      message: "", // 消息文本
      duration: 3000, // 显示时长，毫秒
      closed: false, // 消息框是否关闭
      timer: null, // 计时器
      isShow: false, // 是否显示
    };
  },
  mounted() {
    this.startTimer();
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.isShow = false;
        this.destroyElement();
      }
    },
  },

  methods: {
    startTimer() {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.closed = true;
          clearTimeout(this.timer);
        }
      }, this.duration);
    },
    destroyElement() {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 9;
  .toast-container {
    z-index: 5;
    position: fixed;
    top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 11;
    .content {
      padding: 10px 30px;
      border-radius: 6px;
      color: #fff;
      white-space: pre-wrap;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
