
const app = {
    state:{
        isLoading:false,
        defaultAderess:'',
        defaultAvatar:''
    },
    mutations: {
        updateAddres(state, payload){
          state.defaultAderess = payload
        },
        updateLoadingStatus (state, payload) {
          state.isLoading = payload.isLoading
        },
        updateAvatar(state,payload){
          state.defaultAvatar = payload
        }
     },
     actions: {
        toggleUpdateAddres({ commit },view){
          commit('updateAddres',view)
        },
        toggleLoadingStatus({ commit },view) {
          commit('updateLoadingStatus',view)
        },
        toggleUpdateAvatar({ commit },view) {
          commit('updateAvatar',view)
        },
      }

}
export default app