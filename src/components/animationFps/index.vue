<template>
  <div class="fps-container">
    <canvas id="tree" class="tree"></canvas>
  </div>
</template>

<script>
import CanvasSprite from "canvas-sprite";
import Tree from "@/assets/images/left-tree.png";
export default {
  name: "fps",
  data() {
    return {
      Tree,
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.creatCs();
  },
  methods: {
    creatCs() {
      const treeCs = CanvasSprite({
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
      console.log(treeCs);
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
