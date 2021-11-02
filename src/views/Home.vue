<template>
  <div class="home-container">
    <div @click="handleCopy" data-clipboard-text="复制文案">复制文案</div>
    <!-- <Swiper
      :list="data"
      autoplay
      :slidesPerView="3"
      pagination
      navigation
      :spaceBetween="10"
      :duration="1000"
    /> -->
    <!-- <SvgRunLoad/> -->
    <!-- <TurnTable /> -->
    <!-- <AnimationFps /> -->
  </div>
</template>

<script>
import { handleClipboard } from "@/utils";
export default {
  components: {
    // Swiper: () => import("@/components/Swiper/index.vue"),
    // SvgRunLoad: () => import("@/components/SvgRunLoad/index.vue"),
    // TurnTable: () => import("@/components/TurnTable/index.vue"),
    // AnimationFps: () => import("@/components/AnimationFps/index.vue"),
  },
  name: "Home",
  data() {
    return {
      data: [1, 2, 3, 4, 5],
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
      console.log(11, $event);
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
