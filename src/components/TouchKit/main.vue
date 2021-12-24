<template>
  <div class="touch-kit-container">
    <div class="main"></div>
  </div>
</template>

<script>
import { reloadImage, vpx } from "@/utils";
import TouchKit from "@/components/TouchKit/index";
import girl from "@/assets/images/girl.png";
import boy from "@/assets/images/boy.png";
export default {
  name: "touch-kit",
  data() {
    return {
      TK: null,
    };
  },
  created() {},
  mounted() {
    this.TK = new TouchKit({
      el: ".main",
      limit: {
        x: 0,
        y: 0,
      },
      close: true,
      title: true,
    });
    this.draw();
  },
  computed: {},
  methods: {
    async draw() {
      this.TK = new TouchKit({
        el: ".main",
        limit: {
          x: 0,
          y: 0,
        },
        close: true,
        title: true,
      });
      const { width } = await reloadImage(girl);
      this.TK.add({
        image: girl,
        width: vpx(width),
        pos: {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          title: "girl"
        },
        use: {
          drag: true,
          close: false,
        },
      });
      const img = await reloadImage(boy);
      this.TK.add({
        image: boy,
        width: vpx(img.width),
        pos: {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          title: "boy"
        },
        use: {
          drag: true,
          close: false,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.touch-kit-container {
  width: 100%;
  height: 100%;
  .main {
    width: vw(750);
    height: vw(500);
  }
}
</style>
