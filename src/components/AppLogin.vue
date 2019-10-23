<template>

    <div class="row justify-content-center align-items-center h-100">
        <div class="col col-sm-6 col-md-6 col-lg-4 col-xl-3">

            <b-form-group label="Enter Your Pin">

                <input name="bztyy" class="form-control form-control-lg" v-model="Pin" maxlength="4" size="4"
                       placeholder="PIN"
                       type="password">
            </b-form-group>
            <b-form-group>
                <button class="btn btn-info btn-lg btn-block" @click="Unlock">Unlock</button>
            </b-form-group>

        </div>
    </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';


@Component
export default class AppLogin extends Vue {
    public Pin = '';

    public async Unlock() {
        await this.$store.dispatch('UnlockApp', this.Pin);

        if (!this.$store.state.IsLocked) {
            this.$router.push({path: 'keys'});
        }
    }
}
</script>

