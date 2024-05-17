import router from '@/router/router';
import axios from 'axios';

const state = {
    persons: [],
    children: [],
    parents: [],
    spouse: null,
    person: null
};

const getters = {
    persons: state => state.persons,
    children: state => state.children,
    parents: state => state.parents,
    spouse: state => state.spouse,
    person: state => state.person
};

const actions = {
    async fetchPersons({ commit }) {
        try {
            let res = await axios.get("http://localhost:3000/api/persons/list");
            console.log(res);
            commit('setPersons', res.data.persons);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    async createPerson({ commit }, person) {
        try {
            await axios.post("http://localhost:3000/api/persons/create", person);
            commit('addPerson', person);
            router.push('/home');
        } catch (err) {
            console.log(err);
        }
    },
    async updatePerson({ commit }, person) {
        try {
            await axios.put(`http://localhost:3000/api/persons/update/${person.id}`, person);
            commit('updatePerson', person);
            router.push('/home');
        } catch (err) {
            console.log(err);
        }
    },
    async deletePerson({ commit }, id) {
        try {
            await axios.delete(`http://localhost:3000/api/persons/delete/${id}`);
            commit('deletePerson', id);
            router.push('/home');
        } catch (err) {
            console.log(err);
        }
    },
    async fetchChildren({ commit }, id) {
        try {
            let res = await axios.get(`http://localhost:3000/api/persons/children/${id}`);
            commit('getChildren', res.data.children);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    async fetchParents({ commit }, id) {
        try {
            let res = await axios.get(`http://localhost:3000/api/persons/parents/${id}`);
            commit('getParents', res.data.parents);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    async fetchSpouse({ commit }, id) {
        try {
            let res = await axios.get(`http://localhost:3000/api/persons/spouse/${id}`);
            commit('getSpouse', res.data.spouse);
            return res;
        } catch (err) {
            console.log(err);
        }
    },
    async fetchPerson({ commit }, id) {
        try {
            let res = await axios.get(`http://localhost:3000/api/persons/${id}`);
            commit('getPerson', res.data.person);
            return res;
        } catch (err) {
            console.log(err);
        }
    }
};

const mutations = {
    getPersons(state, persons) {
        state.persons = persons;
    },
    addPerson(state, person) {
        state.persons.push(person);
    },
    updatePerson(state, person) {
        let index = state.persons.findIndex(p => p.id === person.id);
        state.persons.splice(index, 1, person);
    },
    deletePerson(state, id) {
        let index = state.persons.findIndex(p => p.id === id);
        state.persons.splice(index, 1);
    },
    getChildren(state, children) {
        state.children = children;
    },
    getParents(state, parents) {
        state.parents = parents;
    },
    getSpouse(state, spouse) {
        state.spouse = spouse;
    },
    setPersons(state, person) {
        state.person = person;
    }
};

export default {
  state,
  actions,
  mutations,
  getters
};