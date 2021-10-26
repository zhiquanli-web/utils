<template>
  <div class="home-container">
    <Swiper />
  </div>
</template>

<script>
export default {
  components: {
    Swiper: () => import("@/components/Swiper/index.vue"),
  },
  name: "Home",
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
}
</style>
