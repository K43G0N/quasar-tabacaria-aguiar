const state = {
    costumer: {},
    products: new Set(),
    total: 0.0
}

const mutations = {
    updateCostumer(state, data) {
        state.costumer = data
    },

    addProduct(state, data) {
        if (state.products.has(data) == false) {
            data["units"] = 1;
        } else {
            data["units"] += 1;
        }
        state.products.add(data);
    },

    updateTotal(state) {
        var total = 0
        let products = Array.from(state.products) 
        products.forEach(function (item) {
            let a = item.units;
            let b = item.price;
            let c = a * b
            total += c 
        });
        state.total = total;
    }

}

const actions = {
    updateCostumer({ commit }, data) {
        commit('updateCostumer', data)
    },

    addProduct({ commit }, data) {
        commit('addProduct', data)
        commit('updateTotal')
    },

    updateTotal({ commit }) {
        commit('updateTotal')
    }
}

const getters = {
    costumer: (state) => {
        return state.costumer
    },
    products: (state) => {
        return state.products
    },
    total: (state) => {
        return state.total
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}