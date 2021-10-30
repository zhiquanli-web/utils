<template>
  <div class="home-container">
    <Swiper :list="data" />
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
      data: [1, 2, 3],
    };
  },
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
}
</style>
