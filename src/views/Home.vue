<template>
  <div class="home-container">
    <!-- <div @click="handleCopy" data-clipboard-text="复制文案">复制文案</div> -->
    <!-- <ClickOutside  @click-outside="handleClick"> -->
    <!-- <Swiper
      :list="data"
      :slidesPerView="1"
      pagination
      navigation
      :spaceBetween="10"
      :duration="1000"
    /> -->
    <!-- </ClickOutside> -->
    <!-- <SvgRunLoad/> -->
    <!-- <TurnTable /> -->
    <!-- <AnimationFps /> -->
    <!-- <WaterFlip /> -->
    <!-- <CanvasDrag /> -->
    <!-- <Slide /> -->
  </div>
</template>

<script>
import { handleClipboard } from "@/utils";
export default {
  components: {
    // Swiper: () => import("@/components/Swiper/index.vue"),
    // ClickOutside: () => import("@/components/ClickOutside/index.vue"),
    // SvgRunLoad: () => import("@/components/SvgRunLoad/index.vue"),
    // TurnTable: () => import("@/components/TurnTable/index.vue"),
    // AnimationFps: () => import("@/components/AnimationFps/index.vue"),
    // WaterFlip: () => import("@/components/WaterFlip/index.vue"),
    // CanvasDrag: () => import("@/components/CanvasDrag/index.vue"),
    // Slide: () => import("@/components/Slide/index.vue"),
  },
  name: "Home",
  data() {
    return {
      // data: [1, 2, 3, 4, 5],
    };
  },
  mounted() {
    // this.$toast('这是一个消息')
    // this.$confirm({
    //   title: "确认删除吗",
    // });
  },
  methods: {
    handleCopy($event) {
      handleClipboard($event, this);
    },
  },
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
}
</style>
