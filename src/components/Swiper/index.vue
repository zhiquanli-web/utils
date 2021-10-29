<template>
  <div class="swiper-main">
    <!-- 轮播盒子 -->
    <div class="swiper">
      <!-- 移动容器 -->
      <div
        class="swiper-container"
        ref="swiper-container"
        @touchend="touchend"
        @touchmove="touchmove"
        @touchstart="touchstart"
        @mousedown="touchstart"
        @mousemove="touchmove"
        @mouseup="touchend"
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
    <!-- 左右按钮 -->
    <template>
      <div class="swiper-btn-prev" @click="turn('prev')"></div>
      <div class="swiper-btn-next" @click="turn('next')"></div>
    </template>
    <!-- 导航按钮 -->
    <template>
      <ul class="nav-list">
        <li
          v-for="(item, navIndex) in data"
          :key="'nav-' + item"
          :class="[index === navIndex && 'active']"
          @click="turnTopage(navIndex)"
        ></li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: "swiper",
  props: {
    duration: {
      //自动轮播切换时延
      type: Number,
      default: 3000,
    },
    autoplay: {
      // 是否开启自动播放
      type: Boolean,
      default: false,
    },
    list: {
      // 轮播数组
      type: Array,
      default: () => [],
    },
    pageSize: {
      // 一屏展示个数
      type: Number,
      default: 1,
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
    this.isMobile = "ontouchstart" in window; // 判断移动端还是pc端
    this.autoPlay();
  },
  methods: {
    // 开始触摸/鼠标按下
    touchstart(e) {
      this.status = 1;
      this.oldX = this.startX = this.isMobile
        ? e.targetTouches[0].pageX
        : e.pageX; // 开始坐标
      this.swiperAutoTimer && clearInterval(this.swiperAutoTimer);
    },
    // 手指触摸/鼠标 滑动
    touchmove(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (this.status !== 1) return;
      this.newX = this.isMobile ? e.changedTouches[0].pageX : e.pageX;
      if (this.newX < this.oldX) {
        this.left -= this.oldX - this.newX;
      } else {
        this.left += this.newX - this.oldX;
      }
      this.oldX = this.newX;
      this.swiper.style.left = this.left + "px";
    },
    // 手指触摸结束/鼠标抬起
    touchend(e) {
      this.status = 0;
      const pageX = this.isMobile ? e.changedTouches[0].pageX : e.pageX;
      if (pageX < this.startX) {
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
      this.autoPlay();
    },
    // 滑动
    move() {
      this.swiper.className += " move";
      this.swiper.addEventListener("transitionend", () => {
        this.swiper.className = this.swiper.className.replace(/\s+move/, "");
      });
      this.left = 0 - this.itemWidth * this.index;
      this.swiper.style.left = this.left + "px";
    },
    // 自动切换
    autoPlay() {
      this.swiperAutoTimer && clearInterval(this.swiperAutoTimer);
      this.swiperAutoTimer = setInterval(() => {
        this.index++;
        if (this.index > this.itemContainer.length - 1) {
          this.index = 0;
        }
        this.move();
      }, 3000);
    },
    // 左右按钮切换
    turn(type) {
      this.swiperAutoTimer && clearInterval(this.swiperAutoTimer);
      if (type === "next") {
        if (this.index >= this.itemContainer.length - 1) return;
        this.index++;
      } else if (type === "prev") {
        if (this.index <= 0) return;
        this.index--;
      }
      this.move();
      this.autoPlay();
    },
    // 跳转到指定位置
    turnTopage(index) {
      this.swiperAutoTimer && clearInterval(this.swiperAutoTimer);
      this.index = index;
      this.move();
      this.autoPlay();
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
    cursor: pointer;
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
    cursor: pointer;
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
  .nav-list {
    position: absolute;
    left: 50%;
    bottom: 10px;
    display: flex;
    transform: translateX(-50%);
    li {
      cursor: pointer;
      width: 10px;
      height: 10px;
      background-color: rgb(210, 210, 210);
      margin: 0 5px;
      border-radius: 5px;
      &.active {
        background-color: #f60;
      }
    }
  }
}
</style>
