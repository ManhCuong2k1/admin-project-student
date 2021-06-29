export const state = () => ({
    students: [],
});

export const mutations = {
    setStudents(state, payload) {
        state.students = payload;
    },
};

export const actions = {
    async fetch({ commit }) {
        const res = await this.$axios.get('http://localhost:8080/api/students');
        commit('setStudents', res.data);
    },
};