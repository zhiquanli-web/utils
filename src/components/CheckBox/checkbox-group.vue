<template>
  <section class="checkbox-group-container" role="group">
    <slot />
  </section>
</template>

<script>
export default {
  name: "checkbox-group",
  componentName: "checkBoxGroup",
  data() {
    return {};
  },
  props: {
    value: {},
    disabled: Boolean,
  },
};
</script>

<style lang="scss" scoped></style>
