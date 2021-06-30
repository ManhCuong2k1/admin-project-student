export const state = () => ({
    classes: [],
    classDetail: null
});

export const mutations = {
    setClasses(state, payload) {
        state.classes = payload;
    },
    setClassDetail(state, payload) {
        state.classDetail = payload;
    }
};

export const actions = {
    async fetch({ commit }) {
        const res = await this.$axios.get('http://localhost:8080/api/class');
        commit('setClasses', res.data);
    },
    async getDetail({ commit }, id) {
        const res = await this.$axios.get(`http://localhost:8080/api/class/${id}`);
        commit('setClassDetail', res.data);
    },
    async create({ commit }, payload) {
        await this.$axios.post(`http://localhost:8080/api/class/`, payload);
        commit('setClassDetail', payload);
    },
    async delete({ commit }, id) {
        const res = await this.$axios.delete(`http://localhost:8080/api/class/${id}`);
        commit('setClassDetail', res.data);
    },
    async restore({ commit }, id) {
        const res = await this.$axios.post(`http://localhost:8080/api/class/restore/${id}`);
        commit('setClassDetail', res.data);
    },
    async update({ commit }, payload) {
        await this.$axios.put(`http://localhost:8080/api/class/${payload.id}`, payload.data);
        commit('setClassDetail', payload);
    },
};
