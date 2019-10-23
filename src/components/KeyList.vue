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
                <td>
                    <b-button-group>
                        <b-button variant="danger">Delete</b-button>
                        <b-button>Update</b-button>

                    </b-button-group>
                </td>
                <td>
                    My SSH Key for Production
                </td>
                <td>
                    Priv/Pub 2056 Key Pair
                </td>
            </tr>
            </tbody>
        </b-table-simple>

    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';


@Component
export default class KeyList extends Vue {
    public Pin = '';

    public async Unlock() {
        await this.$store.dispatch('UnlockApp', this.Pin);
        if (!this.$store.state.IsLocked) {
            this.$router.push('/Welcome');
        }
    }
}
</script>

