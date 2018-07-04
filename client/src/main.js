import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate);

VeeValidate.Validator.extend('verify_password', {
    getMessage: field => `The password must contain at least 1 number`,
    validate: value => {
      let validate = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/
      return validate.test(value);
    }
});
Vue.config.productionTip = false
Vue.use(VeeValidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
