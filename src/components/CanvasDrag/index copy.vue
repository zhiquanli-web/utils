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
      startY: 0,
      endX: 0,
      endY: 0,
      move: false,
    };
  },
  created() {},
  mounted() {
    /** @type {HTMLCanvasElement} */
    this.canvas = this.$refs.maycanvas;
    if (!this.canvas.getContext) return;
    this.cxt = this.canvas.getContext("2d");
    this.cxt.fillStyle = "#ccc";
    this.cxt.fillRect(0, 0, 500, 500);
    this.img = new Image();
    this.img.src = man_1;
    this.img.onload = () => {
      this.cxt.drawImage(this.img, 0, 0, 100, 100);
    };
  },
  computed: {},
  methods: {
    mousemove(e) {
      if (!this.move) return;
      const { clientX, clientY } = e;
      let x, y;
      x = clientX > 400 ? 400 : clientX;
      y = clientY > 400 ? 400 : clientY;
      // this.cxt.clearRect(0, 0, 500, 500);
      this.cxt.drawImage(this.img, x, y, 100, 100);

      console.log("e", "鼠标移动", e);
    },
    mouseup(e) {
      this.move = false;
      console.log("e", "鼠标抬起", e);
    },
    mousedown(e) {
      console.log(e);
      const { clientX, clientY } = e;
      this.startX = clientX;
      this.startY = clientY;
      this.move = true;
      console.log("e", "鼠标按下", e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
