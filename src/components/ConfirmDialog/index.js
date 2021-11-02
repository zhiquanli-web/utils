import Vue from "vue";
import Confirm from "@/components/ConfirmDialog/main";

let ConfirmConstrutor = Vue.extend(Confirm);
let instance = null;

const ConfirmDialog = (options = {}) => {
  if (typeof options !== "object") {
    return new Error("参数必须是对象");
  }
  return new Promise((resolve) => {
    instance = new ConfirmConstrutor({
      data: {
        options: {
          ...options,
        },
      },
      el: document.createElement("div"),
    });
    document.body.appendChild(instance.$el);
    instance.confirm = function () {
      resolve("confirm");
    };
    instance.cancel = function () {
      resolve("cancel");
    };
  });
};

export default ConfirmDialog;
