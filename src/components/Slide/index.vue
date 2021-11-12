<template>
  <div class="slide-container">
    <section class="content">
      <div class="nav-box">
        <transition name="nav">
          <ul class="nav-list" :key="curNav">
            <li
              :class="['item', curNav === nav.id && 'active']"
              v-for="(nav, index) in cmpNavList"
              :key="'nav' + nav.id"
              @click="changeNav(nav.id, index)"
            >
              {{ nav.label }}
            </li>
          </ul>
        </transition>
      </div>
      <div class="main">
        <transition name="turn"> </transition>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "slide",
  data() {
    return {
      navList: [],
      curNav: 3,
      activeName: "turn",
      curIndex: 2,
    };
  },
  created() {
    this.navList = [
      { id: 1, label: "导航1" },
      { id: 2, label: "导航2" },
      { id: 3, label: "导航3" },
      { id: 4, label: "导航4" },
      { id: 5, label: "导航5" },
      { id: 6, label: "导航6" },
      { id: 7, label: "导航7" },
    ];
    // this.initNavList =
  },
  computed: {
    cmpNavList() {
      return this.navList.slice(this.curIndex - 2, this.curIndex + 3);
    },
  },
  methods: {
    changeNav(id, index) {
      this.curIndex = index;
      this.curNav = id;
      // this.navList.slice(index - 2, index + 2);
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-container {
  height: 100%;
  display: flex;
  justify-content: center;
  .content {
    margin-top: 50px;
    width: 500px;
    height: 500px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    .nav-box {
      width: 500px;
      border: 1px solid #f60;
      margin: auto;
      box-sizing: border-box;
      background-color: #fff;
      .nav-list {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        height: 40px;
        border-bottom: 1px solid #ccc;
        .item {
          flex-shrink: 0;
          width: 100px;
          text-align: center;
          line-height: 40px;
          &.active {
            color: #f60;
          }
        }
      }
    }
    .main {
      width: 200px;
      height: 300px;
      margin: 40px auto 0;
      border: 1px solid #ccc;
    }
  }
}
.nav-enter-active,
.nav-leave-active {
  transition: transform 0.5s linear;
}
.nav-leave-to {
  transform: translateX(-100px);
}
.nav-enter {
  transform: translateX(100px);
}
</style>
