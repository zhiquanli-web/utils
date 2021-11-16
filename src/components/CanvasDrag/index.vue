<template>
  <div class="container">
    <div class="content"></div>
  </div>
</template>

<script>
import TouchKit from "@/utils/touchkit.js";
import man_1 from "@/assets/images/man_1.jpg";
import man_2 from "@/assets/images/man_2.jpg";
export default {
  data() {
    return {};
  },
  mounted() {
    const dom = new TouchKit({
      el: ".content",
      event: {},
      limit: {
        x: 0,
        y: 0,
      },
      close: true,
    });
    dom
      .add({
        image: man_1,
        width: "100px",
        use: {
          drag: true,
          pinch: false,
          rotate: false,
          singlePinch: false,
          singleRotate: false,
          pos: {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
          },
        },
      })
      .add({
        image: man_2,
        width: "100px",
        use: {
          drag: true,
          pinch: false,
          rotate: false,
          singlePinch: false,
          singleRotate: false,
          pos: {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
          },
        },
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .content {
    width: 400px;
    height: 400px;
    margin: 50px auto;
    border: 1px solid #f60;
  }
}
</style>
