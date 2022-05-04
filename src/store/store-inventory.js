const state = {
    products: new Set()
}

const mutations = {
    // updateCostumer(state, data) {
    //     state.costumer = data
    // },

    // addProduct(state, data) {
    //     if (state.products.has(data) == false) {
    //         data["units"] = 1;
    //     } else {
    //         data["units"] += 1;
    //     }
    //     state.products.add(data);
    // },
}

const actions = {
    // updateCostumer({ commit }, data) {
    //     commit('updateCostumer', data)
    // },
}

const getters = {
    // costumer: (state) => {
    //     return state.costumer
    // },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}