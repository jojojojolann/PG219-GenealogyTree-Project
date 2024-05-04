import axios from 'axios';

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    error: null
};

const getters = {
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.role === 'admin',
    authStatus: state => state.status,
    user: state => state.user,
    error: state => state.error
};

const actions = {
    async login({ commit }, { userData }) {
        commit('auth_request');
        try {
            let res = await axios.post('http://localhost:3000/api/users/login', { userData });
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;

                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                commit('auth_success', token, user);
            }
            return res;
        } catch (error) {
            commit('auth_error', error);
        }
    },
    async register({ commit }, { userData }) {
        commit('register_request');
        try {
            let res = await axios.post('http://localhost:3000/api/users/register', { userData });
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (error) {
            commit('register_error', error);
        }
    },
    async getProfile({ commit }) {
        commit('profile_request');
        let res = await axios.get('http://localhost:3000/api/users/profile');
        console.log(res.data);
        commit('profile_success', res.data.user);
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
        state.error = null;
    },
    auth_success(state, token, user) {
        state.token = token;
        state.user = user;
        state.status = 'success';
        state.role = user.role;
        state.error = null;
    },
    auth_error(state, error) {
        state.status = 'error';
        state.error = error.response.data.msg;
    },
    register_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    register_success(state) {
        state.status = 'success';
        state.error = null;
    },
    register_error(state, error) {
        state.status = 'error';
        state.error = error.response.data.msg;
    },
    logout(state) {
        state.token = '';
        state.user = {};
        state.status = '';
        state.error = null;
    },
    setUser(state, user) {
        state.user = user;
        state.error = null;
    },
    setError(state, error) {
        state.error = error;
    },
    profile_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    profile_success(state, user) {
        state.user = user;
        state.status = 'success';
        state.error = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
