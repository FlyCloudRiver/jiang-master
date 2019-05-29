import Vue from 'vue';
import Vuex from 'vuex';
import loading from './loading.js'
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        loading
    },
    state:{
        showFrame: true
    }
})