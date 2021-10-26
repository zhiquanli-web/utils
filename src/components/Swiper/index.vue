<template>
  <div class="swiper">
    <!-- 容器 -->
    <div
      class="swiper-container"
      ref="swiper-container"
      @mouseup="mouseup"
      @mousemove="mousemove"
      @mousedown="mousedown"
    >
      <!-- 滑块 -->
      <div class="swiper-item" v-for="item in data" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "swiper",
  data() {
    return {
      data: [1, 2, 3, 4],
      curIndex: 1,
    };
  },
  mounted() {
    this.swiper = this.$refs["swiper-container"];
  },
  methods: {
    mouseup() {
      // console.log("鼠标抬起", e);
      this.swiper.style.left = this.curIndex * -300 + "px";
      this.curIndex += 1;
    },
    mousemove() {
      // console.log('鼠标移动');
    },
    mousedown(e) {
      console.log("鼠标按下", e);
    },
  },
};
</script>
<style lang="scss" scoped>
.swiper {
  position: relative;
  width: 300px;
  border: 1px solid #f60;
  margin: auto;
  overflow: hidden;
  .swiper-container {
    position: relative;
    display: flex;
    left: 0px;
    transition: all 0.5s linear;
    .swiper-item {
      flex-shrink: 0;
      width: 300px;
      height: 300px;
      background: #eee;
    }
  }
}
</style>
