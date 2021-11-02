<template>
  <div>
    <h1>SVG路径行走</h1>
    <div class="road-wrap">
      <svg
        viewBox="0 0 640 640"
        xmlns="http://www.w3.org/2000/svg"
        class="road"
      >
        <path
          ref="road"
          d="m510.5,1.45313c0,0 -437,121 -442,158c-5,37 28,162 191,176c163,14 284,27 285,88c1,61 -284,197 -350,195c-66,-2 -195,21 -194.5,20.54687"
        />
      </svg>
      <div class="sb-group" ref="sb">
        <canvas class="sb-left" ref="sbLeft" v-show="showLeft"></canvas>
        <canvas class="sb-right" ref="sbRight" v-show="!showLeft"></canvas>
      </div>
    </div>
    <h3>{{ percent.toFixed(3) }}</h3>
    <button @click="run(1)">Go</button>
    <button @click="stop">Stop</button>
    <button @click="restart">Restart</button>
  </div>
</template>
<script>
import { setFPS, vpx } from "@/utils";
import CanvasSprite from "canvas-sprite";
import clamp from "ramda/src/clamp";
const pathWidth = 640;
const ranges = [
  {
    start: 0,
    end: 0.28,
    dir: "left",
  },
  {
    start: 0.28,
    end: 0.64,
    dir: "right",
  },
  {
    start: 0.64,
    end: 1,
    dir: "left",
  },
];
export default {
  data() {
    return {
      percent: 0,
      curr: 0,
    };
  },
  computed: {
    showLeft() {
      const currRange = ranges.find((item) => {
        return item.start <= this.percent && item.end >= this.percent;
      });
      return currRange.dir === "left";
    },
  },
  mounted() {
    // 初始化动画
    this.sbLeftAnim = CanvasSprite({
      canvas: this.$refs.sbLeft,
      imageUrl: require("@/assets/images/shubao-left.png"),
      frames: 13,
    });
    this.sbLeftAnim.stop();
    this.sbRightAnim = CanvasSprite({
      canvas: this.$refs.sbRight,
      imageUrl: require("@/assets/images/shubao-right.png"),
      frames: 13,
    });
    this.sbRightAnim.stop();
  },
  beforeDestroy() {
    this.sbLeftAnim && this.sbLeftAnim.destroy();
    this.sbRightAnim && this.sbRightAnim.destroy();
    this.fpsIns && this.fpsIns.cancel();
  },
  methods: {
    run(p) {
      const $road = this.$refs.road;
      // 渲染像素缩放比
      const renderRatio = vpx(pathWidth) / pathWidth;
      // 路径总长度
      const totalLength = $road.getTotalLength();
      // 开始动画
      this.sbLeftAnim.play();
      this.sbRightAnim.play();
      // 设置动画帧率(默认为60)
      this.fpsIns && this.fpsIns.cancel();
      this.fpsIns = setFPS(() => {
        // 保存人物当前行走路程(0~1之间)
        this.curr = clamp(0, 1, this.curr + 0.002);
        this.percent = this.curr;
        // 人物当前坐标
        const pos = $road.getPointAtLength(this.curr * totalLength);
        // 设置偏移量
        this.$refs.sb.style.transform = `translate3d(${parseInt(
          (pos.x - pathWidth / 2 - 90) * renderRatio
        )}px,${parseInt(pos.y * renderRatio)}px,0)`;
        if (this.curr >= p) {
          this.showLeft ? this.sbLeftAnim.pause() : this.sbRightAnim.pause();
          this.fpsIns.cancel();
        }
      });
    },
    stop() {
      this.showLeft ? this.sbLeftAnim.pause() : this.sbRightAnim.pause();
      this.fpsIns.cancel();
    },
    restart() {
      this.curr = 0;
      this.run(1);
    },
  },
};
</script>
<style lang="scss" scoped>
.road-wrap {
  margin-top: vw(100);
  position: relative;
  width: vw(640);
  height: vw(640);
  margin: auto;
}
.road {
  width: 100%;
  height: 100%;
  border: 1px solid green;
  path {
    stroke: red;
    fill: none;
    stroke-width: 3px;
  }
}
.sb-group {
  width: vw(180);
  height: vw(180);
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  margin-top: vw(-180);
  border: 1px solid blue;
  > canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
