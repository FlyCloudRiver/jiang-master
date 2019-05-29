export default{
    namespaced: true,
    state:{
        user:JSON.parse(sessionStorage.getItem('user')) || {}
    },
    getters:{},
    mutations:{
        setUser(state,user){
            state.user=user
        }
    },
    actions:{
        getUser({commit},user){
            commit('setUser',user)
        }
    }
}