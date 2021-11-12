<template>
  <div class="canvas-drag-container">
    <canvas
      ref="maycanvas"
      width="500"
      height="500"
      @mousedown="mousedown"
      @mousemove="mousemove"
      @mouseup="mouseup"
    ></canvas>
  </div>
</template>

<script>
import man_1 from "@/assets/images/man_1.jpeg";
export default {
  name: "canvas-drag",
  data() {
    return {
      startX: 0,
      endX: 0,
    };
  },
  created() {},
  mounted() {
    /** @type {HTMLCanvasElement} */
    const canvas = this.$refs.maycanvas;
    if (!canvas.getContext) return;
    const cxt = canvas.getContext("2d");
    cxt.fillStyle = "#ccc";
    cxt.fillRect(0, 0, 500, 500);
    const img = new Image();
    img.src = man_1;
    img.onload = () => {
      cxt.drawImage(img, 0, 0, 100, 100);
    };
  },
  computed: {},
  methods: {
    mousemove(e) {
      console.log("e", "鼠标移动", e);
    },
    mouseup(e) {
      console.log("e", "鼠标抬起", e);
    },
    mousedown(e) {
      console.log(e);
      const { clientX, clientY } = e;
      this.startX = clientX;
      this.startY = clientY;
      console.log("e", "鼠标按下", e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
