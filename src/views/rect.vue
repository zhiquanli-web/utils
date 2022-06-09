<template>
  <section class="demo-container">
    <div class="demo-item floor">1</div>
    <div class="demo-item floor">2</div>
    <div class="demo-item floor">3</div>
    <div class="demo-item floor">4</div>
    <div class="demo-item floor">5</div>
    <div class="demo-item floor">6</div>
  </section>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.demo-container {
  padding: 100px;
  /* width: 500px; */
  border: 1px solid #f60;
  height: 300px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  /* perspective: 600px; */
  .demo-item {
    flex-shrink: 0;
    height: 100px;
    width: 150px;
    background: #ccc;
    /* transform-style: preserve-3d; */
    margin-left: 50px;
  }
  .floor {
    width: 150px;
    position: relative;
    z-index: 1;
    background: #f60;
    /* transform: translate3d(0, 0, 100px); */
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      right: 0;
      left: 0;
      width: 150px;
      height: 100px;
      background-color: #ddd;
    }
    &::before {
      transform-origin: right top;
      top: 0;
      background-color: #0f0;
      transform: rotate3d(0, 1, 0, -140deg) skewY(-27deg);
    }
    &::after {
      transform-origin: left bottom;
      bottom: 0;
      transform: rotate3d(1, 0, 0, 140deg) skewX(-49deg);
    }
  }
}
</style>
