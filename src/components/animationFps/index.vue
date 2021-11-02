<!-- 帧动画 -->
<template>
  <div class="fps-container">
    <canvas id="tree" class="tree"></canvas>
  </div>
</template>

<script>
import CanvasSprite from "canvas-sprite";
export default {
  name: "fps",
  props: {},
  mounted() {
    this.creatCs();
  },
  data() {
    return {
      treeCs: null,
    };
  },
  methods: {
    creatCs() {
      this.treeCs = CanvasSprite({
        canvas: document.getElementById("tree"),
        imageUrl: require("../../assets/images/left-tree.png"),
        frames: 16,
        fps: 12,
        loop: true,
        onLoop: function () {
          // console.log('have looped', count, 'times');
        },
        onEnd: function () {
          // console.log('end');
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.fps-container {
  width: 100px;
  height: 100px;
  .tree {
    height: 100%;
    width: 100%;
  }
}
</style>
