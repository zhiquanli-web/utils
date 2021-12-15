<!-- 外部点击事件组件 -->
<template>
  <component :is="tag" ref="container">
    <slot></slot>
  </component>
</template>
<script>
import { isIOS } from "@/utils";

const envIOS = isIOS();
export default {
  name: "ClickOutside",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
  created() {
    this.isTouch = false;
    this.clickTimer = null;
  },
  mounted() {
    if (envIOS) {
      document.addEventListener("touchend", this.docClick, true);
    }
    document.addEventListener("click", this.docClick, true);
  },
  destroyed() {
    clearTimeout(this.clickTimer);
    if (envIOS) {
      document.removeEventListener("touchend", this.docClick, true);
    }
    document.removeEventListener("click", this.docClick, true);
  },
  methods: {
    docClick(e) {
      if (e.type === "touchend") this.isTouch = true;
      if (e.type === "click" && this.isTouch) return;
      if (!this.$refs.container.contains(e.target)) {
        this.clickTimer = setTimeout(() => {
          this.$emit("click-outside");
        }, 360);
      }
    },
  },
};
</script>
