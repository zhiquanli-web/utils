<template>
  <div class="swiper">
    <!-- 容器 -->
    <div
      class="swiper-container"
      ref="swiper-container"
      @mouseup="mouseup"
      @mousemove="mousemove"
      @mousedown="mousedown"
      @mouseout="mouseout"
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
</template>

<script>
export default {
  name: "swiper",
  data() {
    return {
      data: [1, 2, 3, 4],
      index: 0, // 当前滑块的索引值
      status: 0, // 状态值，是否跟随鼠标移动
      oldX: 0, // 起点坐标
      newX: 0, // 新坐标
    };
  },
  mounted() {
    // 滑动容器
    this.swiper = this.$refs["swiper-container"];
    this.itemContainer = this.$refs["swiper-item"]; // 滑动块
    this.itemWidth = this.itemContainer[0].offsetWidth; // 单个滑块的宽度
    this.left = 0 - this.itemWidth * this.index; // 容器的出事left值
    // 设置容器的初始位置
    this.swiper.style.left = this.left + "px";
    this.autoMove();
  },
  methods: {
    mousedown(e) {
      this.status = 1;
      this.oldX = this.startX = e.pageX; // 开始坐标
    },
    mousemove(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (this.status !== 1) return;
      this.newX = e.pageX;
      if (this.newX < this.oldX) {
        this.left -= this.oldX - this.newX;
      } else {
        this.left += this.newX - this.oldX;
      }
      this.oldX = this.newX;
      this.swiper.style.left = this.left + "px";
    },
    mouseup(e) {
      this.status = 0;
      this.movePage(e.pageX);
    },
    mouseout() {
      this.autoMove();
    },
    movePage(width) {
      if (width < this.startX) {
        this.index++;
      } else {
        this.index--;
      }
      if (this.index < 0) {
        this.index = 0;
      } else if (this.index > this.itemContainer.length - 1) {
        this.index = this.itemContainer.length - 1;
      }
      this.swiper.className += " move";
      this.swiper.addEventListener("transitionend", () => {
        this.swiper.className = this.swiper.className.replace(/\s+move/, "");
      });
      this.left = 0 - this.itemWidth * this.index;
      this.swiper.style.left = this.left + "px";
    },
    autoMove() {
      this.timer = setInterval(() => {
        this.index++;
        if (this.index > this.itemContainer.length - 1) {
          this.index = 0;
        }
        this.swiper.className += " move";
        this.swiper.addEventListener("transitionend", () => {
          this.swiper.className = this.swiper.className.replace(/\s+move/, "");
        });

        this.left = 0 - this.itemWidth * this.index;
        this.swiper.style.left = this.left + "px";
      }, 2000);
    },
    mouseover() {
      clearInterval(this.timer);
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
    .swiper-item {
      flex-shrink: 0;
      width: 300px;
      height: 300px;
      background: #eee;
    }
    &.move {
      transition: all 0.2s ease-in-out;
    }
  }
}
</style>
