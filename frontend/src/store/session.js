
export default {
  state: () => ({
    isUserLogged: false,
    sessionToken: String,
    name: String,
    surname: String,
    email: String,
    phoneNumber: String, 
    type: String,
    address: {
      street: String,
      civicNumber: String,
      city: String,
      coordinates: {
          x: Number,
          y: Number
      }
    }
  }),
  getters: {
    isUserLogged(state){
      return state.isUserLogged
    },
  },
  mutations: {
    login(state, payload) {
      state.isUserLogged = true;
      state.sessionToken = payload.token;
      state.name = payload.user.name;
      state.surname = payload.user.surname;
      state.email = payload.user.email;
      state.phoneNumber = payload.user.phoneNumber;
      state.type = payload.user.type;
      state.city = payload.user.city;
      state.street = payload.user.street;
      state.cityNumber = payload.user.cityNumber;
    },
    logout(state) {
      state.isUserLogged = false;
      state.sessionToken = null;      
      state.name = null;
      state.surname = null;
      state.email = null;
      state.phoneNumber = null;
      state.type = null;
      state.city = null;
      state.street = null;
      state.cityNumber = null;
    },
  },
  actions: {
    login({ commit }, payload) {      
      commit("login", payload);
    },
    logout({ commit }) {
      commit("logout");
    },
  }
}