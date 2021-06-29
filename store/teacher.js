export const state = () => ({
    teachers: [],
});

export const mutations = {
    setTeachers(state, payload) {
        state.teachers = payload;
    },
};

export const actions = {
    async fetch({ commit }) {
        const res = await this.$axios.get('http://localhost:8080/api/teacher');
        commit('setTeachers', res.data);
    },
};