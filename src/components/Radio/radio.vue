<!-- 单选按钮 -->
<template>
  <label
    role="radio"
    class="radio-container"
    :class="{ 'is-checked': model === label, 'is-disabled': isDisabled }"
  >
    <span class="radio-icon"></span>
    <input
      type="radio"
      ref="radio"
      class="radio"
      :name="name"
      :value="label"
      v-model="model"
      @change="handleChange"
      :disabled="isDisabled"
    />
    <span class="text">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: "radio",
  props: {
    label: {
      type: [Number, String],
      required: true,
    },
    value: [Number, String],
    name: String,
    disabled: Boolean,
  },
  data() {
    return {
      checked: false,
    };
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "radioGroup") {
          parent = parent.$parent;
        } else {
          this.radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.isGroup ? this.radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("radioGroup", "input", [val]);
        } else {
          this.$emit("input", val);
        }
        this.$refs.radio &&
          (this.$refs.radio.checked = this.model === this.label);
      },
    },
    isDisabled() {
      return this.isGroup
        ? this.radioGroup.disabled || this.disabled
        : this.disabled;
    },
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
        this.isGroup && this.dispatch("radioGroup", "handleChange", this.model);
      });
    },
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-container {
  font-size: vw(30);
  cursor: pointer;
  outline: none;
  display: inline-block;
  text-align: left;
  margin-right: vw(14);
  .radio-icon {
    width: vw(30);
    height: vw(30);
    display: inline-block;
    border: 1px solid #b1906b;
    border-radius: 50%;
    margin-right: vw(6);
    vertical-align: middle;
  }
  &.is-checked {
    color: #fb8241;
    .radio-icon {
      border-color: transparent;
      background-color: #fb8241;
      position: relative;
      &::before {
        position: absolute;
        content: "";
        left: vw(10);
        top: vw(4);
        width: vw(8);
        height: vw(14);
        border-color: #f8f8f8;
        border-style: solid;
        border-width: 0 1px 1px 0;
        transform: rotate(45deg);
      }
    }
  }
  &.is-disabled {
    border-color: #ccc;
    opacity: 0.6;
    cursor: no-drop;
  }
  .radio {
    display: none;
    outline: none;
  }
  .text {
    vertical-align: middle;
    color: #b1906b;
  }
}
</style>
