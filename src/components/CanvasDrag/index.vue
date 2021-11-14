<template>
  <div class="zrender">
    <div id="zrender-canvas"></div>
  </div>
</template>

<script>
import man_1 from "@/assets/images/man_1.jpeg";
export default {
  name: "zrender",
  data() {
    return {
      zr: null,
      group: null,
    };
  },
  created() {},
  mounted() {
    const zr = zrender.init(document.getElementById("zrender-canvas"));
    const group = new zrender.Group({
      slient: true, //组内子元素是否响应鼠标事件
    });
    const img = new zrender.Image({
      style: {
        image: man_1,
        x: 10,
        y: 10,
        width: 100,
        height: 100,
      },
      draggable: true,
      onclick: function () {
        console.log("点击事件");
      },
      //鼠标在松开移动的事件
      onmouseup: function (e) {
        console.log("鼠标在松开移动的事件", e);
      },
      //鼠标在移动中的事件
      onmouseover: function (params) {
        console.log("鼠标在移动中的事件", params);
      },
    });
    group.add(img);
    zr.add(group);
  },
  methods: {},
};
</script>

<style>
#zrender-canvas {
  height: 700px;
}
</style>
