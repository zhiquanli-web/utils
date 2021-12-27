<template>
  <label
    role="checkbox"
    class="checkbox-container"
    :class="{ 'is-checked': isChecked, 'is-disabled': isDisabled }"
  >
    <span class="checkbox-icon"></span>
    <input
      type="checkbox"
      ref="checkbox"
      class="checkbox"
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
  name: "checkbox",
  props: {
    label: {},
    value: {},
    name: String,
    disabled: Boolean,
  },
  data() {
    return {
      selfModel: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.isGroup ? this.store : this.value || this.selfModel;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("checkBoxGroup", "input", [val]);
        } else {
          this.$emit("input", val);
          this.selfModel = val;
        }
      },
    },
    store() {
      return this.checkboxGroup ? this.checkboxGroup.value : this.value;
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "checkBoxGroup") {
          parent = parent.$parent;
        } else {
          this.checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    isChecked() {
      if ({}.toString.call(this.model) === "[object Boolean]") {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return false;
      }
    },
    isDisabled() {
      return this.isGroup
        ? this.checkboxGroup.disabled || this.disabled
        : this.disabled;
    },
  },
  methods: {
    handleChange(event) {
      this.$nextTick(() => {
        this.$emit("change", event.target.checked, event);
        this.isGroup &&
          this.dispatch("checkBoxGroup", "change", [this.checkboxGroup.value]);
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
.checkbox-container {
  font-size: vw(30);
  cursor: pointer;
  outline: none;
  display: inline-block;
  text-align: left;
  margin-right: vw(14);
  .checkbox-icon {
    width: vw(30);
    height: vw(30);
    display: inline-block;
    border: 1px solid #b1906b;
    border-radius: vw(8);
    margin-right: vw(6);
    vertical-align: middle;
  }
  &.is-checked {
    color: #fb8241;
    .checkbox-icon {
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
  .checkbox {
    display: none;
    outline: none;
  }
  .text {
    vertical-align: middle;
    color: #b1906b;
  }
}
</style>
