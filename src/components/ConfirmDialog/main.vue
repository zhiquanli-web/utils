<!-- 确认框组件 -->
<template>
  <div class="confirm-container" v-if="isShow">
    <div class="content">
      <div class="main">
        {{ options.title }}
      </div>
      <div class="footer">
        <button @click="close" v-if="options.cancel">
          {{ options.cancelText }}
        </button>
        <button class="ok" @click="ok" v-if="options.confirm">
          {{ options.confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "confirm",
  data() {
    return {
      isShow: false,
      options: {
        title: "是否确认",
        cancel: true,
        confirm: true,
        cancelText: "取消",
        confirmText: "确认",
      },
    };
  },
  methods: {
    close() {
      this.cancel();
      this.isShow = false;
      this.destroyElement();
    },
    ok() {
      this.confirm();
      this.isShow = false;
      this.destroyElement();
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm-container {
  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .content {
    width: 300px;
    padding: 30px 20px;
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // background-image: url('~@/assets/image/confirm-toast.png');
    .main {
      margin: 50px 0 50px;
      text-align: center;
      font-size: 20px;
      color: #c76e20;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      width: 100%;
      button {
        width: 100px;
        height: 40px;
        border: 2px solid #eaeaea;
        border-radius: 6px;
        background-image: linear-gradient(to right, #cacaca, #eaeaea);
        font-size: 18px;
        color: #8d8d8d;
        font-weight: bold;
        &.ok {
          background-image: linear-gradient(to right, #ffbd1e, #fea410);
          border-color: #ffe8c6;
          margin-left: 15px;
          color: #c76e20;
        }
      }
    }
  }
}
</style>
