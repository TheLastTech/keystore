<template>

    <div class="container">
        <b-table-simple striped responsive>
            <thead>
            <tr>
                <th>Actions</th>
                <th>Key Name</th>
                <th>Key Type</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td><b-button-group>
                    <b-button varient="danger">Delete</b-button>
                    <b-button varient="Success">Update</b-button>

                </b-button-group></td>

            </tr>
            </tbody>
        </b-table-simple>

    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";


    @Component
    export default class KeyList extends Vue {
        Pin = "";

        async Unlock() {
            await this.$store.dispatch("UnlockApp", this.Pin);
            if (!this.$store.state.IsLocked) {
                this.$router.push("/Welcome");
            }
        }
    }
</script>

