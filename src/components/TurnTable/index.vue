<template>
  <div id="turnBox">
    <!-- 转盘 -->
    <div
      id="turnUl"
      :style="{ backgroundImage: 'url(' + activeObj.turntableBgc + ')' }"
    ></div>
    <!-- 指针 -->
    <div @click="startPlay" class="turnBtn">
      <img width="100%" :src="activeObj.startBgc" alt="" />
    </div>
  </div>
</template>
<script>
import { randomInt } from "@/utils";
export default {
  data() {
    return {
      activeObj: {
        turntableBgc: require("@/assets/images/dial.png"),
        startBgc: require("@/assets/images/start.png"),
        prizeData: [
          { id: 0, prize: "奖品1" },
          { id: 1, prize: "奖品2" },
          { id: 2, prize: "奖品3" },
          { id: 3, prize: "奖品4" },
          { id: 4, prize: "奖品5" },
          { id: 5, prize: "奖品6" },
        ],
      },
      pIndex: 0, // 中奖物品的下标
      rotNum: 0, // 旋转圈数基数
      time: 5000, // 旋转时间
      timer: null, // 定时器
      oTurntable: "", // 旋转圆盘
      isRotate: false, //是否正在转动
    };
  },
  created() {
    this.activeObj.prizeData = this.autoRotate(this.activeObj.prizeData);
  },
  mounted() {
    this.oTurntable = document.querySelector("#turnUl");
    this.oTurntable.style.webkitTransition =
      "transform " + this.time / 1000 + "s ease";
  },
  methods: {
    //计算每一项的角度范围
    autoRotate(arr) {
      if (arr.length) {
        let len = arr.length;
        let base = 360 / len;
        arr.forEach((item, index) => {
          // 某个奖品区域的中间
          item.angle = 360 - (base / 2 + index * base) + 30;
        });
      }
      console.log("arr", arr);
      return arr;
    },
    // 点击开始,模拟中奖奖品ID
    async startPlay() {
      if (this.isRotate) return; //正在转动则return
      this.isRotate = true;
      let id = randomInt(0, this.activeObj.prizeData.length - 1);
      const a = {
        id,
      };
      this.startBtn(a);
    },
    // 开始转动,通过奖项级别进行匹配:id
    async startBtn(val) {
      this.activeObj.prizeData.forEach((i, d) => {
        if (i.id == val.id) {
          this.pIndex = d;
        }
      });
      // 拿到相应的角度
      this.startrotate(this.activeObj.prizeData[this.pIndex].angle, () => {
        this.fulfillHandle(this.activeObj.prizeData[this.pIndex].prize);
      });
    },

    //开始旋转 angle角度  complete回调成功函数
    startrotate(angle, complete) {
      // 相应的角度 + 圈数
      let rotate = 2160 * (this.rotNum + 1) + angle;
      console.log("rotate", rotate);
      this.oTurntable.style.webkitTransform = "rotate(" + rotate + "deg)";
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        complete(); //执行回调
        this.rotNum++;
      }, this.time);
    },
    //得奖后的处理
    fulfillHandle(prizeName) {
      alert(`恭喜获得${prizeName}`);
      this.isRotate = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@function vw($x, $vpw: 750) {
  @return ($x / $vpw * 100) * 1vw;
}
#turnBox {
  width: vw(630);
  height: vw(630);
  position: relative;
  overflow: hidden;
  margin: 0px auto;
  margin-top: vw(30);
  background-position: center center;
  .turnBtn {
    position: absolute;
    width: vw(243);
    height: vw(268);
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-59%);
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: 100% auto;
    z-index: 3;
  }
  #turnUl {
    position: absolute;
    width: vw(630);
    height: vw(630);
    z-index: 1;
    background-repeat: no-repeat;
    background-size: 100% auto;
    padding: 0;
    margin: 0;
  }
}
</style>
