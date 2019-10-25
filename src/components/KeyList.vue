<template>

    <div class="container">
        <b-button class="float-right" @click="AddNewKey">Add</b-button>
        <b-table-simple striped responsive>
            <thead>
            <tr>
                <th>Actions</th>
                <th>Key Name</th>
                <th>Key Type</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(Key,Index) in KeysList">
                <td>
                    <b-button-group>
                        <b-button variant="danger" @click="DeleteKey(Index)">Delete</b-button>
                        <b-button @click="DownloadKey(Index)">Download</b-button>


                    </b-button-group>
                </td>
                <td>
                    {{Key.Name}}
                </td>
                <td>
                    {{Key.Type}}
                </td>
            </tr>
            </tbody>
        </b-table-simple>

    </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Routes} from '@/router';
declare const Buffer: any;
const {remote} = window.require('electron');
const fs = window.require('fs');

@Component
export default class KeyList extends Vue {
    public Pin = '';
    public KeysList = [];
    public mounted() {
        this.LoadData();
        this.KeysList = this.$store.state.Store.get('Keys');
    }

    public async LoadData() {
        await this.$store.dispatch('CheckInitialized');
    }

    public AddNewKey() {
        this.$router.push('/addkey');
    }

    public async DeleteKey(Index: number) {
        await this.$store.dispatch('DeleteKey', Index);
        this.KeysList = this.$store.state.Store.get('Keys');

    }

    public async DownloadKey(Index: number) {

        const Keys = this.$store.state.Store.get('Keys');
        if (Keys.length <= Index) {
            return;
        }
        const Key = Keys[Index];

        const File = remote.dialog.showSaveDialogSync(remote.getCurrentWindow(), {
            title: 'Save Your Keys (Zip)',
            buttonLabel: 'Save Zip File',
            filters: [
                {name: 'Zip', extensions: ['zip']},
                {name: 'All Files', extensions: ['*']},
            ],
        });
        if (File) {
            fs.writeFileSync(File, new Buffer(Key.Data, 'base64'));
        }
    }

    public async Unlock() {
        await this.$store.dispatch('UnlockApp', this.Pin);
        if (!this.$store.state.IsLocked) {
            this.$router.push('/Welcome');
        }
    }


}
</script>

