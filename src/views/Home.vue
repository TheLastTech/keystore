<template>
    <div v-if="AppSetup">
        <app-login v-if="IsLocked"></app-login>
    </div>
    <div v-else>
        <app-register></app-register>
    </div>

</template>

<script lang="ts">
// @ is an alias to /src
import AppLogin from '@/components/AppLogin.vue';


import {Component, Vue} from 'vue-property-decorator';
import KeyList from '@/components/KeyList.vue';
import {DataStoreExists} from '@/store';
import AppRegister from '@/components/AppRegister.vue';

@Component({
    components: {
        AppRegister,
        KeyList,
        AppLogin,
    },
})
export default class App extends Vue {
    public mounted() {
        this.LoadData();
    }

    public async LoadData() {
        await this.$store.dispatch('CheckInitialized');
    }

    get IsLocked() {
        return this.$store.state.IsLocked;
    }

    get AppSetup() {

        return this.$store.state.IsIntialized;

    }
}
</script>
