export const state = () => ({
    classes: [],
    class: null,
});

export const mutations = {
    setClasses(state, payload) {
        state.classes = payload;
    },
    setClass(state, payload) {
        state.class = payload
    }
};

export const actions = {
    async fetch({ commit }) {
        const res = await this.$axios.get('http://localhost:8080/api/class');
        commit('setClasses', res.data);
    },
    async delete({ commit }, id) {
        const res = await this.$axios.delete(`http://localhost:8080/api/class/${id}`);
        commit('setClass', res.data);
    },
    async restore({ commit }, id) {
        const res = await this.$axios.post(`http://localhost:8080/api/class/restore/${id}`);
        commit('setClass', res.data);
    },
};