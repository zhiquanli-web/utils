<template>
  <div class="date-picker-container">
    <input
      id="demo2"
      type="text"
      readonly=""
      placeholder="日期和时间选择特效"
      data-lcalendar="2000-05-11,2055-05-11"
    />
  </div>
</template>

<script>
import Lcalendar from "./index";
export default {
  name: "date-picker",
  data() {
    return {};
  },
  created() {
    console.log("Lcalendar", Lcalendar);
  },
  mounted() {
    this.calendar = new Lcalendar();
    this.calendar.init({
      trigger: "#demo2", //标签id
      type: "datetime", //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
      minDate: "2018-5-18", //最小日期
      maxDate: "2020-2-25", //最大日期
    });
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss">

</style>
