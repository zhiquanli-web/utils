<template>
  <div class="swiper">
    <!-- 容器 -->
    <div
      class="swiper-container"
      ref="swiper-container"
      @touchend="touchend"
      @touchmove="touchmove"
      @touchstart="touchstart"
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
      curIndex: 0,
      startX: 0,
      distance: 0,
      sumWidth: 0,
    };
  },
  mounted() {
    this.swiper = this.$refs["swiper-container"];
  },
  methods: {
    touchend() {
      if (this.distance > 50) {
        console.log("rtl");
        this.movePage("rtl");
      } else if (this.distance < -50) {
        console.log("ltr");
        this.movePage("ltr");
      }
    },
    touchmove(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      this.distance = this.startX - e.changedTouches[0].pageX;
    },
    touchstart(e) {
      this.startX = e.touches[0].pageX;
    },
    movePage(type, width = 300) {
      if (type === "rtl" && this.curIndex < this.data.length - 1) {
        this.curIndex += 1;
      }
      if (type === "ltr" && this.curIndex > 0) {
        this.curIndex -= 1;
      }
      this.sumWidth = -this.curIndex * width;
      this.swiper.style.left = this.sumWidth + "px";
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
