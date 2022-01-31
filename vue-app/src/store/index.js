import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
    favorites: [],
}

export const getters = {}

export const mutations = {
    // Favorite data push to "SET_FAVORITES"
    SET_FAVORITES(state, data) {
        state.favorites.push(data)
    },
    // Favorite data remove to "DELETE_FAVORITES"
    DELETE_FAVORITES(state, data) {
        const index = state.favorites.findIndex((video) => video.id === data.id)
        if (index !== -1) {
            state.favorites.splice(index, 1)
        }
    }
}

export const actions = {
    // addOrRemoveFavoriteAction function, both remove and add operations are performed.
    addOrRemoveFavoriteAction({commit, state}, payload) {
        const {video, isFavorite} = payload
        if (isFavorite) {
            commit('SET_FAVORITES', video)
        } else {
            commit('DELETE_FAVORITES', video)
        }
    }
}

export default new Vuex.Store({
    getters,
    state,
    mutations,
    actions,
    modules: {}
})
