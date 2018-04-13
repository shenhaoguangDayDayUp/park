
const app = {
    state:{
        isLoading:false,
    },
    mutations: {
        updateLoadingStatus (state, payload) {
          state.isLoading = payload.isLoading
        }
     },
     actions: {
        toggleLoadingStatus({ commit },view) {
          commit('updateLoadingStatus',view)
        },
      
      }

}
export default app