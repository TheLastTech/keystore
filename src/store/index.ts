import Vue from 'vue';
import Vuex from 'vuex';

declare global {
    interface Window {
        require: any;
    }
}

const Store = window.require('electron-store');

const OpenStore = new Store({
    name: 'storage',
    fileExtension: 'daxx',
});

const path = require('path');
const fs = require('fs');
Vue.use(Vuex);

const SecretPin = 1214;
const AppStore = new Vuex.Store({
    state: {
        IsLocked: true,
        Store: null,
        IsIntialized: false,
        ProtectedStore: null,

    },
    mutations: {
        DisableLock(state) {
            state.IsLocked = false;
        },
        Intialize(state, EStore) {
            state.Store = EStore;
            state.IsIntialized = true;
        },
        InitialCheck(state, IsInitialized) {
            state.IsIntialized = IsInitialized;
        },
        AddKeyToStore(state, ZipData) {

            // @ts-ignore
            const Keys = state.Store.get('Keys');

            Keys.push(ZipData);
            // @ts-ignore
            state.Store.set('Keys', Keys);
        },
        DeleteKey(state, Index) {

            // @ts-ignore
            const Keys = state.Store.get('Keys');

            if (Keys.length <= Index) {
                return;
            }
            Keys.splice(Index, 1);
            // @ts-ignore
            state.Store.set('Keys', Keys);
        },

    },
    actions: {
        async UnlockApp({commit}, Pin: string) {
            const PStore = DataStore(Pin);

            if (PStore.get('CorrectKey')) {
                commit('Intialize', PStore);
                commit('DisableLock');


            }
        },
        DeleteKey({commit}, Index) {
            commit('DeleteKey', Index);
        },
        SetStore({commit}, EStore) {

            OpenStore.set('Initialized', true);
            EStore.set('CorrectKey', true);
            EStore.set('Keys', []);
            commit('Intialize', EStore);
        },
        CheckInitialized({commit}) {
            commit('InitialCheck', OpenStore.get('Initialized'));
        },
        SaveZip({commit}, ZipData) {
            commit('AddKeyToStore', ZipData);
        },
    },
    modules: {},
});
export default AppStore;

export const DataStoreExists = () => {

    return OpenStore.has('Initialized');

};


export const DataStore = (Key: string) => new Store({
    name: 'keydata',
    encryptionKey: Key,
    fileExtension: 'kyxx',
});
