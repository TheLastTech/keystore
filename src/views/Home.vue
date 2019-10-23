<template>

    <app-login></app-login>

</template>

<script lang="ts">
    // @ is an alias to /src
    import AppLogin from '@/components/AppLogin.vue'


    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            AppLogin
        },
    })
    export default class App extends Vue {

    }
</script>
