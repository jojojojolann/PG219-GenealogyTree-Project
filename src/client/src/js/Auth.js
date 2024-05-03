import axios from 'axios';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: ''
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
};

const actions = {
    async login({ commit }, { email, password }) {
        commit('auth_request');
        let res = await axios.post('http://localhost:3000/api/users/login', { email, password });
        if (res.data.success) {
            const token = res.data.token;
            const user = res.data.user;
    
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            commit('auth_success', token, user);
        }
        return res;
    },    
    async register({ commit }, { email, password }) {
        commit('register_request');
        let res = await axios.post('http://localhost:3000/api/users/register', { email, password });
        if (res.data.success !== undefined) {
            commit('register_success');
        }
        return res;
    },
    async logout({ commit }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        return;
    }
};

const mutations = {
    auth_request(state) {
        state.status = 'loading';
    },
    auth_success(state, token, user) {
        state.token = token;
        state.user = user;
        state.status = 'success';
    },
    auth_error(state) {
        state.status = 'error';
    },
    register_request(state) {
        state.status = 'loading';
    },
    register_success(state) {
        state.status = 'success';
    },
    logout(state) {
        state.token = '';
        state.user = {};
        state.status = '';
    },    
    setUser(state, user) {
        state.user = user;
    },
    setError(state, error) {
        state.error = error;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
