import router from '@/router/router';
import axios from 'axios';

const state = {
    token: localStorage.getItem('token') || '',
    status: '',
    user: {},
    error: null
};

const getters = {
    isAuthenticated: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error
};

const actions = {
    async login({ commit }, user) {
        commit('auth_request');
        try {
            let res = await axios.post("http://localhost:3000/api/users/login", user);
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                commit('auth_success', token, user);
            }
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },
    async register({ commit }, userData) {
        commit('register_request');
        try {
            let res = await axios.post("http://localhost:3000/api/users/register", userData);
            if (res.data.success !== undefined) {
                commit('register_success');
                localStorage.setItem('token', res.data.token);
                commit('setToken', res.data.token);
            }
            return res;
        } catch (err) {
            commit('register_error', err);
        }
    },
    async logout({ commit }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login-register');
        return;
    }
};

const mutations = {
    auth_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    auth_success(state, token, user) {
        state.token = token;
        state.user = user;
        state.status = 'success';
        state.error = null;
    },
    auth_error(state, err) {
        state.error = err.response.data.msg;
        state.status = 'error';
    },
    register_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    register_success(state) {
        state.status = 'success';
        state.error = null;
    },
    register_error(state, err) {
        state.error = err.response.data.msg
        state.status = 'error'
    },
    logout(state) {
        state.status = '';
        state.token = '';
        state.user = '';
        state.error = null;
    },
    setToken(state, token) {
        state.token = token;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
