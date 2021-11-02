<template>
  <div class="home-container">
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
    <TurnTable />
  </div>
</template>

<script>
export default {
  components: {
    // Swiper: () => import("@/components/Swiper/index.vue"),
    // SvgRunLoad: () => import("@/components/SvgRunLoad/index.vue"),
    TurnTable: () => import("@/components/TurnTable/index.vue"),
  },
  name: "Home",
  data() {
    return {
      data: [1, 2, 3, 4, 5],
    };
  },
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
}
</style>
