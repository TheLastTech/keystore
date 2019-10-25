<template>

    <div class="container">

        <h2 class="display-4 text-center">Let's Initialize your data store!</h2>
        <b-form-group label="Enter a Pin to protect your files">

            <input name="bztyy" class="form-control form-control-lg" v-model="PinWord" size="4"
                   placeholder="Pin"
                   type="password">
        </b-form-group>

        <b-button-group>
            <b-button variant="info" @click="Save">Save</b-button>
        </b-button-group>


    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {DataStore} from '@/store';


@Component
export default class AppRegister extends Vue {
    public Step = 1;
    public PinWord = '';

    public Save() {

        const Store = DataStore(this.PinWord);
        this.$store.dispatch('SetStore', Store);

    }

}
</script>

