<!-- 单选按钮组 -->
<template>
  <section class="radio-group-container">
    <slot />
  </section>
</template>

<script>
export default {
  name: "radio-group",
  componentName: "radioGroup",
  data() {
    return {};
  },
  props: {
    value: [Number, String],
    disabled: Boolean,
  },
  created() {
    this.$on("handleChange", (value) => {
      this.$emit("change", value);
    });
  },
};
</script>

<style lang="scss" scoped></style>
