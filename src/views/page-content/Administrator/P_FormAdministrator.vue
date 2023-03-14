<template>
  <div>
    <h1 class="subheading grey--text">Formulir Administrator</h1>
    <v-stepper v-model="stepperVal">
    <v-stepper-header>
      <v-stepper-step :complete="stepperVal > 1" step="1">
        Data Log in
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="stepperVal > 2" step="2">
        Data Alamat
      </v-stepper-step>

      <v-divider />

      <v-stepper-step step="3">
        Preview Formulir
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <C_DataLogin 
          :stepper-val="stepperVal"
          @DataStepOne="DataStepOne"
          @StepOne="nextStep(1)"
          @BackToList="gotolist()"
        />
      </v-stepper-content>

      <v-stepper-content step="2">
        <C_DataAlamat 
          :stepper-val="stepperVal"
          @DataStepTwo="DataStepTwo"
          @backStep="backStep(2)"
          @StepTwo="nextStep(2)"
        />
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-lazy v-model="lazyStep2">
          <C_PreviewFormulir 
            :stepper-val="stepperVal"
            :data-step-one="tampungStepOne"
            :data-step-two="tampungStepTwo"
            @backStep="stepperVal = $event"
          />
        </v-lazy>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import C_DataLogin from './content/C_DataLogin.vue';
import C_DataAlamat from "./content/C_DataAlamat.vue";
import C_PreviewFormulir from './content/C_PreviewFormulir.vue';
export default {
  name: 'FormulirAdministrator',
  components: {
    C_DataLogin,
    C_DataAlamat,
    C_PreviewFormulir
  },
  data: () => ({
    stepperVal: 1,
    steps: 3,
    lazyStep2: false,
    tampungStepOne: '',
    tampungStepTwo: '',
  }),
  metaInfo: {
		title: "Formulir Administrator - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  watch: {
    stepperVal(n, o) {
      if (n !== o) {
        window.scrollTo(0, 0);
      }

      if (n != o && n == 3) {
        this.lazyStep2 = true;
      } else {
        this.lazyStep2 = false;
      }
    },
  },
  mounted() {
    // let uid = this.$route.params.uid;
  },
	methods: {
		...mapActions(["fetchData"]),
    gotolist() {
      this.$router.push({name: "DataAdministrator"});
    },
    DataStepOne(data) {
      this.tampungStepOne = data
    },
    DataStepTwo(data) {
      this.tampungStepTwo = data
    },
    nextStep(step) {
      this.stepperVal = step + 1;
    },
    backStep(step) {
      this.stepperVal = step - 1;
    },
	}
}
</script>

<style>
</style>