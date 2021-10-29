<template>
  <div class="swiper-main">
    <div class="swiper">
      <!-- 容器 -->
      <div
        class="swiper-container"
        ref="swiper-container"
        @touchend="touchend"
        @touchmove="touchmove"
        @touchstart="touchstart"
        @mouseover="mouseover"
      >
        <!-- 滑块 -->
        <div
          class="swiper-item"
          ref="swiper-item"
          v-for="item in data"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="swiper-btn-prev" @click="turn('prev')"></div>
    <div class="swiper-btn-next" @click="turn('next')"></div>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
    duration: {
      type: Number,
      default: 2000,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      data: [1, 2, 3, 4, 5],
      index: 0, // 当前滑块的索引值
      status: 0, // 状态值，是否跟随鼠标移动
      oldX: 0, // 起点坐标
      newX: 0, // 新坐标
    };
  },
  mounted() {
    this.swiper = this.$refs["swiper-container"]; // 滑动容器
    this.itemContainer = this.$refs["swiper-item"]; // 滑块集合
    this.itemWidth = this.itemContainer[0].offsetWidth; // 单个滑块的宽度
    this.left = 0 - this.itemWidth * this.index; // 容器的初始left值
    this.swiper.style.left = this.left + "px"; // 设置容器的初始位置
    this.autoPlay();
  },
  methods: {
    touchstart(e) {
      this.status = 1;
      this.oldX = this.startX = e.targetTouches[0].pageX; // 开始坐标
      this.swiperAutoTimer && clearInterval(this.swiperAutoTimer);
    },
    touchmove(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (this.status !== 1) return;
      this.newX = e.changedTouches[0].pageX;
      if (this.newX < this.oldX) {
        this.left -= this.oldX - this.newX;
      } else {
        this.left += this.newX - this.oldX;
      }
      this.oldX = this.newX;
      this.swiper.style.left = this.left + "px";
    },
    touchend(e) {
      this.status = 0;
      if (e.changedTouches[0].pageX < this.startX) {
        this.index++;
      } else {
        this.index--;
      }
      if (this.index < 0) {
        this.index = 0;
      } else if (this.index > this.itemContainer.length - 1) {
        this.index = this.itemContainer.length - 1;
      }
      this.move();
      this.continue && clearTimeout(this.continue);
      this.autoPlay();
    },
    move() {
      this.swiper.className += " move";
      this.swiper.addEventListener("transitionend", () => {
        this.swiper.className = this.swiper.className.replace(/\s+move/, "");
      });
      this.left = 0 - this.itemWidth * this.index;
      this.swiper.style.left = this.left + "px";
    },
    autoPlay() {
      this.swiperAutoTimer && clearInterval(this.swiperAutoTimer);
      this.swiperAutoTimer = setInterval(() => {
        this.index++;
        if (this.index > this.itemContainer.length - 1) {
          this.index = 0;
        }
        this.move();
      }, 2000);
    },
    turn(type) {
      if (type === "next") {
        if (this.index >= this.itemContainer.length - 1) return;
        this.index++;
      } else if (type === "prev") {
        if (this.index <= 0) return;
        this.index--;
      }
      this.move();
    },
  },
};
</script>
<style lang="scss" scoped>
.swiper-main {
  position: relative;
  width: 300px;
  margin: auto;
  display: flex;
  justify-content: center;
  .swiper {
    position: relative;
    width: 100%;
    border: 1px solid #f60;
    margin: auto;
    overflow: hidden;
    .swiper-container {
      position: relative;
      display: flex;
      left: 0px;
      .swiper-item {
        flex-shrink: 0;
        width: 300px;
        height: 100px;
        background: #eee;
      }
      &.move {
        transition: all 0.2s ease-in-out;
      }
    }
  }
  .swiper-btn-prev {
    position: absolute;
    left: -12px;
    top: calc(50% - 8px);
    transform: translateY(-50%);
    width: 0px;
    height: 0px;
    border: 6px solid #000;
    border-left-color: transparent;
    border-top-color: transparent;
    transform: rotate(135deg);
  }
  .swiper-btn-next {
    position: absolute;
    right: -12px;
    top: calc(50% - 8px);
    transform: translateY(-50%);
    width: 0px;
    height: 0px;
    border: 6px solid #000;
    border-right-color: transparent;
    border-top-color: transparent;
    transform: rotate(-135deg);
  }
}
</style>
