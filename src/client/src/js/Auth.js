import router from '@/router/router';
import axios from 'axios';

const state = {
    token: localStorage.getItem('token') || '',
    status: '',
    user: {},
    role: localStorage.getItem('role') || '',
    error: null,
    users: []
};

const getters = {
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.role === 'admin',
    authState: state => state.status,
    user: state => state.user,
    role: state => state.role,
    error: state => state.error,
    users: state => state.users
};

const actions = {
    async login({ commit }, user) {
        commit('auth_request');
        try {
            let res = await axios.post("http://localhost:3000/api/users/login", user);
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                const role = user.role;

                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('role', role);

                commit('setToken', token);
                commit('setUser', user);
                commit('setRole', role);

                commit('auth_success', token, user, role);
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
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                localStorage.setItem('user', JSON.stringify(res.data.user));
                localStorage.setItem('role', res.data.user.role);

                commit('setToken', res.data.token);
                commit('setUser', res.data.user);
                commit('setRole', res.data.user.role);
            }
            return res;
        } catch (err) {
            commit('register_error', err);
        }
    },
    async logout({ commit }) {
        await localStorage.removeItem('token');
        await localStorage.removeItem('user');
        await localStorage.removeItem('role');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login-register');
        return;
    },
    async promoteUser({ commit }, email) {
        try {
            await axios.put(`http://localhost:3000/api/users/promote/${email}`);
            commit('promoteUser', email);
        } catch (err) {
            console.log(err);
        }
    },
    async deleteUser({ commit }, email) {
        try {
            await axios.delete(`http://localhost:3000/api/users/${email}`);
            commit('deleteUser', email);
        } catch (err) {
            console.log(err);
        }
    },
    async fetchUsers({ commit }) {
        try {
          const res = await axios.get('http://localhost:3000/api/users/list');
          commit('setUsers', res.data);
        } catch (err) {
          console.log('Error fetching users:', err);
        }
        return;
    },      
};

const mutations = {
    auth_request(state) {
        state.status = 'loading';
        state.error = null;
    },
    auth_success(state, token, user, role) {
        state.token = token;
        state.user = user;
        state.role = role;
        state.status = 'success';
        state.error = null;
    },
    auth_error(state, err) {
        state.error = err.response ? err.response.data.msg : err.message;
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
    },
    setUser(state, user) {
        state.user = user;
    },
    setRole(state, role) {
        state.role = role;
    },
    promoteUser(state, email) {
        const user = state.user.find(user => user.email === email);
        user.role = 'admin';
    },
    deleteUser(state, email) {
        state.user = state.user.filter(user => user.email !== email);
    },
    setUsers(state, users) {
        state.users = users;
    },  
};

export default {
    state,
    actions,
    mutations,
    getters
};
