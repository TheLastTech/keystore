<template>

    <app-login v-if="IsLocked"></app-login>

</template>

<script lang="ts">
// @ is an alias to /src
import AppLogin from '@/components/AppLogin.vue';


import {Component, Vue} from 'vue-property-decorator';
import KeyList from '@/components/KeyList.vue';

@Component({
    components: {
        KeyList,
        AppLogin,
    },
})
export default class App extends Vue {
    get IsLocked() {
        return this.$store.state.IsLocked;
    }
}
</script>
