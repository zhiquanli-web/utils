import Vue from "vue";
import Toast from "@/components/Toast/main";

let ToastConstructor = Vue.extend(Toast);
let instance;

const ToastDialog = (options = {}) => {
  if (instance) {
    return;
  }
  if (typeof options === "string") {
    options = {
      message: options,
    };
  }
  instance = new ToastConstructor({
    data: options,
    destroyed: function () {
      instance = null;
    },
  });
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.isShow = true;
  instance.dom = instance.vm.$el;
  return instance.vm;
};

export default ToastDialog;
