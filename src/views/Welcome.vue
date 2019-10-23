<template>
    <div class="container">
        <h1 class="display-4 text-center">Here Are your Stored Keys</h1>
        <key-list></key-list>
    </div>
</template>

<script lang="ts">
    // @ is an alias to /src


    import {Component, Vue} from "vue-property-decorator";
    import KeyList from "@/components/KeyList.vue";

    @Component({
        KeyList
    })
    export default class Welcome extends Vue {

    }
</script>
