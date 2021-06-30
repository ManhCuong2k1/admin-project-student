export const state = () => ({
    teachers: [],
    teacherDetail: null
});

export const mutations = {
    setTeachers(state, payload) {
        state.teachers = payload;
    },
    setTeacherDetail(state, payload) {
        state.teacherDetail = payload;
    }
};

export const actions = {
    async fetch({ commit }) {
        const res = await this.$axios.get('http://localhost:8080/api/teacher');
        commit('setTeachers', res.data);
    },
    async create({ commit }, payload) {
        await this.$axios.post(`http://localhost:8080/api/teacher`, payload);
        commit('setTeacherDetail', payload);
    },
    async delete({ commit }, id) {
        const res = await this.$axios.delete(`http://localhost:8080/api/teacher/${id}`);
        commit('setTeacherDetail', res.data);
    },
    async restore({ commit }, id) {
        const res = await this.$axios.post(`http://localhost:8080/api/teacher/restore/${id}`);
        commit('setTeacherDetail', res.data);
    },
};