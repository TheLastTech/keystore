<template>
    <div id="app">
        <b-navbar toggleable="sm" type="light" variant="light" v-if="IsUnlocked">
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

            <b-navbar-brand>My Secure Store</b-navbar-brand>

            <b-collapse id="nav-text-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-text>Save it, Store it, Protect it</b-nav-text>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import AppLogin from "./components/HelloWorld.vue";

    @Component({
        components: {

        },
    })
    export default class App extends Vue {
        get IsUnlocked(){
            return !this.$store.state.IsLocked
        }
    }
</script>

<style lang="scss">
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
