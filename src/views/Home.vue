<template>
  <div class="home-container">
    <Swiper
      :list="data"
      autoplay
      :slidesPerView="3"
      pagination
      navigation
      :spaceBetween="10"
      :duration="1000"
    />
  </div>
</template>

<script>
export default {
  components: {
    Swiper: () => import("@/components/Swiper/index.vue"),
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
