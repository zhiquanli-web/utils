import Vue from 'vue';
import Confirm from '@/components/ConfirmDialog/main.vue';

let instance = null;
const ConfirmDialog = (options = { isShow: false }) => {
  if (typeof options !== 'object') {
    return new Error('参数必须是对象');
  }
  return new Promise(resolve => {
    if (!instance) {
      const ConfirmConstructor = Vue.extend(Confirm);
      instance = new ConfirmConstructor();
      instance.$mount();
      document.body.appendChild(instance.$el);
    }
    instance.options = {
      ...instance.options,
      ...options
    };
    Object.keys(options).forEach(k => {
      instance[k] = options[k];
    });
    instance.confirm = function () {
      resolve('confirm');
    };
    instance.cancel = function () {
      resolve('cancel');
    };
  });
};

export default ConfirmDialog;
