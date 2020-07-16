import Vue from "vue";
import Vuex from "vuex";
import * as types from "./type";
import axios from "../axios/myAxios";
Vue.use(Vuex);
const myState = {
  exception: { message: null }
};
const myMutations = {
  [types.SHOW_EXCEPTION](state, data) {
    state.exception = data;
  }
};
const myActions = {};

export default new Vuex.Store({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {}
});
