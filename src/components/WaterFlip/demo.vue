<!-- 瀑布流布局 -->
<template>
  <div class="water-container">
    <section
      class="water-content"
      ref="water-content"
      :style="{ width: waterContentWidth + 'px' }"
    >
      <div
        class="item dec"
        v-for="(item, index) in data"
        :key="'item' + index"
        :style="{
          top: item.top + 'px',
          left: item.left + 'px',
          width: itemWidth,
          height: item.height + 'px',
        }"
        ref="item"
      >
        {{ index }}
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "water",
  data() {
    return {
      column: 3, // 列数
      itemWidth: 200, // 每列宽度
      marginRight: 10, // 右边距
      marginBottom: 10, // 下边距
      columnHeight: [], // 各列的高度
      initData: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ], // 初始数据
      data: [], // 需要渲染的数据
      waterContentWidth: 0, // 瀑布流容器宽度
    };
  },
  created() {},
  computed: {},
  mounted() {
    this.initFn();
  },
  methods: {
    async initFn() {
      this.waterContentWidth =
        (this.itemWidth + this.marginRight) * this.column - this.marginRight;
      for (let i = 0; i < this.column; i++) {
        this.columnHeight[i] = 0;
      }
      for (let i = 0; i < this.initData.length; i++) {
        await this.computedOffsetHeight();
      }
    },
    // 计算偏移量
    computedOffsetHeight() {
      return new Promise((resolve) => {
        const obj = {};
        obj.height = Math.floor(Math.random() * 200 + 100); // 生成随机高度
        // 找出当前高度最低列的索引
        const index = this.columnHeight.indexOf(
          Math.min.apply(null, this.columnHeight)
        );
        // 计算上偏移
        obj.top = this.columnHeight[index];
        //计算左偏移
        obj.left = index * (this.marginRight + this.itemWidth);
        this.data.push(obj);
        // 给当前列追加高度
        this.columnHeight[index] += obj.height + this.marginBottom;
        resolve();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.water-container {
  height: 100%;
  display: flex;
  justify-content: center;
  .water-content {
    position: relative;
    box-sizing: border-box;
    .item {
      border: 1px solid #ccc;
      border-radius: 4px;
      color: #f60;
      width: 200px;
      margin: 0 10px 10px 0;
      position: absolute;
    }
  }
}
</style>
