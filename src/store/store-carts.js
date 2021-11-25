const state = {
    costumer: {},
    products:[],
}

const mutations = {
    updateCostumer(state,data){
        state.costumer = data
    },

    addProduct(state,data){
        state.products.push(data)
    }
}

const actions = {
    updateCostumer({commit},data){
        commit('updateCostumer',data)
    },

    addProduct({commit},data){
        commit('addProduct',data)
    }
}

const getters = {
    costumer: (state) =>{
        return state.costumer
    },
    products: (state) =>{
        return state.products
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}