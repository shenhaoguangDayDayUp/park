
const app = {
    state:{
        isLoading:false,
        defaultAderess:'',
        goodsList:{goods:[],selected:false}

    },
    mutations: {
        updateAddres(state, payload){
          state.defaultAderess = payload
        },
        updateLoadingStatus (state, payload) {
          state.isLoading = payload.isLoading
        },
        updateGoodsList (state, payload) {
          state.goodsList = payload
        }
     },
     actions: {
        toggleUpdateAddres({ commit },view){
          commit('updateAddres',view)
        },
        toggleLoadingStatus({ commit },view) {
          commit('updateLoadingStatus',view)
        },
        toggleGoodsList({ commit },view){
          commit('updateGoodsList',view)
        }
      
      }

}
export default app