import Vue from 'vue'
import Vuex from 'vuex'
//import { vuexfireMutations, firestoreAction } from 'vuexfire'

Vue.use(Vuex)

import state from "./state"
import * as getters from "./getters"
import * as mutations from "./mutations"
import * as actions from "./actions"

import tool from "./modules/tool"
import cart from "./modules/cart"
import request from "./modules/request"
import team from "./modules/team"
import absent from "./modules/absent"
import customer from "./modules/customer"

export default new Vuex.Store({
  state,
  getters,
  mutations: {
    //...vuexfireMutations,
    ...mutations
  },
  actions,

  modules: {
    tool,
    cart,
    request,
    team,
    absent,
    customer,
  }
})
