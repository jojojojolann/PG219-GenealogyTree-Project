import axios from 'axios';
import router from '../router/router';

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
            axios.defaults.headers.common['Authorization'] = token;
            commit('auth_request', token, user);
        }
        return res;
    },
    async register({ commit }, { email, password }) {
        try {
            const res = await axios.post('http://localhost:8000/api/users/register', { email, password });
            commit('setUser', res.data);
            router.push('/');
        } catch (err) {
            commit('setError', err.response.data.error);
        }
    },
    async logout({ commit }) {
        commit('setUser', null);
        router.push('/login');
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
    logout(state) {
        state.status = '';
        state.token = '';
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
