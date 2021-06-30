export const state = () => ({
    students: [],
    studentDetail: null
});

export const mutations = {
    setStudents(state, payload) {
        state.students = payload;
    },
    setStudentDetail(state, payload) {
        state.studentDetail = payload
    }
};

export const actions = {
    async fetch({ commit }) {
        const res = await this.$axios.get('http://localhost:8080/api/students');
        commit('setStudents', res.data);
    },
    async getDetail({ commit }, id) {
        const res = await this.$axios.get(`http://localhost:8080/api/students/${id}`);
        commit('setStudentDetail', res.data);
    },
    async create({ commit }, payload) {
        await this.$axios.post(`http://localhost:8080/api/students`, payload);
        commit('setStudentDetail', payload);
    },
    async delete({ commit }, id) {
        const res = await this.$axios.delete(`http://localhost:8080/api/students/${id}`);
        commit('setStudentDetail', res.data);
    },
    async restore({ commit }, id) {
        const res = await this.$axios.post(`http://localhost:8080/api/students/restore/${id}`);
        commit('setStudentDetail', res.data);
    },
    async update({ commit }, payload) {
        await this.$axios.put(`http://localhost:8080/api/students/${payload.id}`, payload.data);
        commit('setStudentDetail', payload);
    },
};