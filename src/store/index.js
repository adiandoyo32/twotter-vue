import { createStore } from "vuex";
import { userModule } from "./user"

export default createStore({
  state: {
    user: null,
  },
  mutations: {},
  actions: {},
  modules: {
    User: userModule
  },
});
