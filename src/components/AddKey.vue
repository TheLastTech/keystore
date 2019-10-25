<template>

    <div class="container">
        <div v-if="Step ===1">
            <h2 class="display-4 text-center">Let's Add A Key!</h2>
            <b-form-group
                    label="Select the Key Type">

                <b-form-select
                        v-model="FileKeyType"
                        :options="KeyTypes">

                </b-form-select>
            </b-form-group>
            <b-form-group
                    label="Name Your Key">

                <input type="text"
                       v-model="KeyName"
                >


            </b-form-group>
            <b-form-group>
                <b-button @click="GoHome">Cancel</b-button>
                <b-button class="btn-info " @click="GotoStep2">Next</b-button>
            </b-form-group>

        </div>
        <div v-if="Step ===2" class="text-center">
            <b-form-group label="Select All files associated with the key">

                <input name="asszz" @input="FileChanged" class="form-control form-control-lg"
                       multiple
                       type="file">
            </b-form-group>

            <b-button-group>
                <b-button @click="GoToStep1">Back</b-button>
            </b-button-group>


        </div>
        <div>
            <div v-if="Step ===3    " class="jumbotron jumbotron-fluid">
                <div class="container text-center">
                    <h1 class="display-4">Key Saved!</h1>
                    <p class="lead">Your Key has been saved.

                    </p>
                    <b-button @click="GoHome">Click Here</b-button>
                    to view your keys!
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {DataStore} from '@/store';
import {Routes} from '@/router';

const JSZip = require('jszip');
@Component
export default class AddKey extends Vue {
    public Step = 1;
    public UsePin = false;
    public PinWord = '';
    public KeyTypes = [{
        text: 'PEM', value: 'PEM',

    },
        {
            text: 'DER', value: 'DER',

        }, {
            text: 'PKCS#7', value: 'PKCS#7',

        }, {
            text: 'PKCS#12', value: 'PKCS#12',

        }, {
            text: 'PFX', value: 'PFX',

        },
        {
            text: ' SSL/TLS Certificates', value: 'SSL',

        },

    ];
    public KeyName = '';
    public FileKeyType = 'PEM';
    public Files: any[] = [];
    public ZipFile: any;


    public GoHome() {
        this.$router.push(Routes.Keys);
    }

    public async FileChanged(e: any) {
        this.ZipFile = new JSZip();
        this.Files = [].slice.call(e.currentTarget.files);
        this.ProcessNextFile();
    }

    public FileReady(evt: any) {
        if (evt.target.readyState === FileReader.DONE) {

            const arrayBuffer = evt.target.result;
            const Name = this.Files[0].name;
            this.Files.shift();
            this.ZipFile.file(Name, arrayBuffer.split(',')[1], {base64: true});
            this.ProcessNextFile();
        }

    }

    public async AddtoStore() {
        const ZipFile = await this.ZipFile.generateAsync({type: 'base64'});
        await this.$store.dispatch('SaveZip', {Name: this.KeyName, Data: ZipFile, Type: this.FileKeyType});

        this.Step = 3;

    }

    public ProcessNextFile() {
        if (this.Files.length === 0) {
            this.AddtoStore();
            return;
        }
        const File: any = this.Files[0];
        const reader = new FileReader();
        reader.readAsDataURL(File);
        reader.onloadend = this.FileReady.bind(this);
    }



    public GotoStep2() {
        this.Step = 2;
    }

    public GoToStep1() {
        this.Step = 1;
    }
}
</script>

