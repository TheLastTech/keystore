import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const SecretPin = 1214;

export default new Vuex.Store({
    state: {
        'IsLocked': true
    },
    mutations: {
        DisableLock(state) {
            state.IsLocked = false;
        }

    },
    actions: {
        async UnlockApp({state, commit}, Pin: number) {

            if (+Pin === SecretPin) {

                commit('DisableLock');
            }
        }
    },
    modules: {},
});
