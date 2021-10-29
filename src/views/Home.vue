<template>
  <div class="home-container">
    <Swiper :list="data" :pageSize="pageSize" :space="space" />
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
      pageSize: 3,
      space: 10,
    };
  },
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
}
</style>
