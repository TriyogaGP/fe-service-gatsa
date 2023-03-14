<template>
  <div>
    <h1 class="subheading grey--text">Formulir SiswaSiswi</h1>
    <v-stepper v-model="stepperVal">
    <v-stepper-header>
      <v-stepper-step :complete="stepperVal > 1" step="1">
        Data Log in
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="stepperVal > 2" step="2">
        Data Siswa/i
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="stepperVal > 3" step="3">
        Data Sekolah Sebelumnya
      </v-stepper-step>

      <v-divider />

      <v-stepper-step :complete="stepperVal > 4" step="4">
        Data Detail Orang Tua
      </v-stepper-step>

      <v-divider />

      <v-stepper-step step="5">
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
        <C_DataSiswa 
          :stepper-val="stepperVal"
          @DataStepTwo="DataStepTwo"
          @backStep="backStep(2)"
          @StepTwo="nextStep(2)"
        />
      </v-stepper-content>

      <v-stepper-content step="3">
        <C_DataSekolahSebelum 
          :stepper-val="stepperVal"
          @DataStepThree="DataStepThree"
          @backStep="backStep(3)"
          @StepThree="nextStep(3)"
        />
      </v-stepper-content>

      <v-stepper-content step="4">
        <C_DataDetailOrangtua 
          :stepper-val="stepperVal"
          @DataStepFour="DataStepFour"
          @backStep="backStep(4)"
          @StepFour="nextStep(4)"
        />
      </v-stepper-content>

      <v-stepper-content step="5">
        <v-lazy v-model="lazyStep2">
          <C_PreviewFormulir 
            :stepper-val="stepperVal"
            :data-step-one="tampungStepOne"
            :data-step-two="tampungStepTwo"
            :data-step-three="tampungStepThree"
            :data-step-four="tampungStepFour"
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
import C_DataSiswa from "./content/C_DataSiswa.vue";
import C_DataSekolahSebelum from "./content/C_DataSekolahSebelum.vue";
import C_DataDetailOrangtua from "./content/C_DataDetailOrangtua.vue";
import C_PreviewFormulir from './content/C_PreviewFormulir.vue';
export default {
  name: 'FormulirSiswaSiswi',
  components: {
    C_DataLogin,
    C_DataSiswa,
    C_DataSekolahSebelum,
    C_DataDetailOrangtua,
    C_PreviewFormulir
  },
  data: () => ({
    stepperVal: 1,
    steps: 5,
    lazyStep2: false,
    tampungStepOne: '',
    tampungStepTwo: '',
    tampungStepThree: '',
    tampungStepFour: '',
  }),
  metaInfo: {
		title: "Formulir Siswa Siswi - MTsS SIROJUL ATHFAL",
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

      if (n != o && n == 5) {
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
      this.$router.push({name: "DataSiswaSiswi"});
    },
    DataStepOne(data) {
      this.tampungStepOne = data
    },
    DataStepTwo(data) {
      this.tampungStepTwo = data
    },
    DataStepThree(data) {
      this.tampungStepThree = data
    },
    DataStepFour(data) {
      this.tampungStepFour = data
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