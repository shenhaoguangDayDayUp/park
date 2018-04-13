
const app = {
    state:{
        isLoading:false,
        defaultAderess:'',

    },
    mutations: {
        updateAddres(state, payload){
          state.defaultAderess = payload
        },
        updateLoadingStatus (state, payload) {
          state.isLoading = payload.isLoading
        }
     },
     actions: {
        toggleUpdateAddres({ commit },view){
          commit('updateAddres',view)
        },
        toggleLoadingStatus({ commit },view) {
          commit('updateLoadingStatus',view)
        },
      
      }

}
export default app