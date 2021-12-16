<!-- 瀑布流组件 -->
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
        }"
        ref="item"
      >
        <img :src="item.src" :width="itemWidth" :height="item.height" />
      </div>
    </section>
  </div>
</template>

<script>
import { reloadImage } from "@/utils";
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
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F19%2F03%2F15%2F75076c485081d15ed9c224ad3e4ce4a1.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=7c7c3300a5638efa424e5da0e37db181",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F09%2F15%2F67351408baad11ce25c9b14166a049a6.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=8f8a18bc4aeb934a3c5e0f5ffeb06972",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F003bba6c74ce151d3ce31aaa6cb7c6ecb72683e917605-ekncjt_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=3149b6a68003a9ee7c868ae21cafeb5a",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926081306_GM2tv.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=c39863311680faccd319c3dbd98c74b0",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdmimg.5054399.com%2Fallimg%2FNARUTOpicture%2Fguijiao%2F001.jpg&refer=http%3A%2F%2Fdmimg.5054399.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=444bb755478d8cf5295cf9ec9279d35c",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201411%2F29%2F20141129232324_mz34B.thumb.700_0.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=e50cf1b4f01d456a85eb05def009b879",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftupian.qqjay.com%2Fu%2F2017%2F0920%2F3_152937_8.jpg&refer=http%3A%2F%2Ftupian.qqjay.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=06eb919b8cd9ce5a8496f1991748c5f3",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic7.nipic.com%2F20100507%2F2852605_170929059947_2.jpg&refer=http%3A%2F%2Fpic7.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=019b8e7471aa1e049cbf268752cd501a",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F201403%2F29%2F20140329145413_hw4HA.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=60da45816eadbfe18631008df08da43a",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic9.nipic.com%2F20100914%2F2531170_171928949919_2.jpg&refer=http%3A%2F%2Fpic9.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=dca2b3b88a23ea27b4097b3f3c46ee41",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp01%2F1ZZQ20QJS6-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=eb79ea8e9a0289932518bfd8bb97a289",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdpic.tiankong.com%2Ftc%2Feb%2FQJ9124407543.jpg&refer=http%3A%2F%2Fdpic.tiankong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273233&t=a63462bca96d7f5cdf8d2891f50ba2db",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp01%2F1ZZQ20QJS6-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273321&t=38a65bdbe452c600b78cdba798064e48",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdpic.tiankong.com%2Ftc%2Feb%2FQJ9124407543.jpg&refer=http%3A%2F%2Fdpic.tiankong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273321&t=343c9edae61401197e85bd9e4a921bd9",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.redocn.com%2Fsheying%2F20161103%2Friluowanxia_7381641.jpg&refer=http%3A%2F%2Fimg.redocn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639273321&t=18966947778bf701feedf096cd8d1cd4",
      ], // 初始数据
      data: [], // 需要渲染的数据
      waterContentWidth: 0, // 瀑布流容器宽度
    };
  },
  created() {},
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
        const obj = {};
        const { height, width } = await reloadImage(this.initData[i]);
        obj.height = (this.itemWidth / width) * height;
        obj.src = this.initData[i];
        const index = this.columnHeight.indexOf(
          Math.min.apply(null, this.columnHeight)
        );
        // 计算上偏移
        obj.top = this.columnHeight[index];
        //计算左偏移
        obj.left = index * (this.marginRight + this.itemWidth);
        obj.cTop = 0; // 初始化内容高度
        this.data.push(obj);
        // 给当前列追加高度
        this.columnHeight[index] += obj.height + this.marginBottom;
      }
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
      color: #f60;
      width: 200px;
      margin: 0 10px 10px 0;
      position: absolute;
    }
  }
}
</style>
