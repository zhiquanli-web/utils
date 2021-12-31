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
    <!-- <TouchKit /> -->
    <!-- <DatePicker /> -->
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
    // TouchKit: () => import("@/components/TouchKit/main.vue"),
    // DatePicker: () => import("@/components/DatePicker/main.vue"),
  },
  name: "Home",
  data() {
    return {
      checked1: false,
      checked2: true,
      checkList: ["复选框A", "复选框B"],
      value: 1,
      list: [
        {label: '选项1', value: 1},
        {label: '选项2', value: 2},
        {label: '选项3', value: 3},
        {label: '选项4', value: 4},
        {label: '选项5', value: 5},
        {label: '选项6', value: 6},
        {label: '选项7', value: 7},
      ]
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
    change(val) {
      console.log('val', val);
    },
  },
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
}
</style>
