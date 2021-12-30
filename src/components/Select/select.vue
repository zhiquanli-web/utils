<template>
  <section class="select-container">
    <input
      type="text"
      ref="select"
      :disabled="disabled"
      v-model="query"
      @focus="handleFocus"
      @blur="handleBlur"
      @click="handleClick"
      readonly
      class="select-input"
    />
    <transition name="fade">
      <nav class="option-container" v-show="visible">
        <ul class="select-list">
          <slot></slot>
        </ul>
      </nav>
    </transition>
  </section>
</template>

<script>
export default {
  name: "l-select",
  props: {
    disabled: Boolean,
    value: [Number, String],
  },
  components: {
    Option: () => import("./options.vue"),
  },
  data() {
    return {
      query: "",
      visible: false,
      isFocus: false,
    };
  },
  provide() {
    return {
      select: this,
    };
  },
  created() {
    this.query = this.value;
    this.$on("handleOptionClick", this.handleOptionSelect);
  },
  methods: {
    handleFocus() {
      if (!this.isFocus) {
        this.visible = true;
      }
    },
    handleBlur() {
      this.visible = false;
      this.isFocus = false;
    },
    handleClick() {
      if (this.isFocus) this.visible = !this.visible;
      else this.isFocus = true;
    },
    handleOptionSelect(option, val) {
      this.query = val;
      this.$emit("input", val);
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  max-height: vw(320);
  transition: max-height 0.3s ease-in;
}

.fade-enter,
.fade-leave-to {
  max-height: 0;
}
.select-container {
  position: relative;
  width: vw(350);
  height: vw(60);
  .select-input {
    box-sizing: border-box;
    outline: none;
    border: 1px #000 solid;
    border-radius: vw(8);
    width: 100%;
    height: 100%;
    text-indent: vw(10);
    &:focus {
      caret-color: #b1906b;
      border: #b1906b 1px solid;
    }
  }
  nav {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    border-radius: vw(8);
    border: 1px solid #b1906b;
    overflow: hidden;
    margin-top: vw(10);
  }
  ::v-deep .select-list {
    max-height: vw(320);
    overflow: auto;
    li {
      border-radius: vw(6);
      padding: vw(10);
      &.active {
        background-color: #b1906b;
        color: #fff;
      }
    }
  }
}
</style>
