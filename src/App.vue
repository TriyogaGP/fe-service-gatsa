<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
// import { computed } from '@vue/composition-api';
// import example from './core/services/composeables/example';
// import notifikasi from './core/services/composeables/notifikasi';
export default {
  name: "App",
  data: () => ({
  }),
  // setup() {
  //   const { data: dataNotifikasi } = notifikasi.countingNotif({kategori: '4', page: 1, limit: 5})
  //   const { data: dataExam1 } = example.example1()
  //   const { data: dataExam2 } = example.example2()

  //   const dataTemp1 = computed(() => dataExam1.value)
  //   const dataTemp2 = computed(() => dataExam2.value)
  //   const dataNotif = computed(() => dataNotifikasi.value)
  //   return { dataTemp1, dataTemp2, dataNotif: dataNotif.records.length }
  // },
};
</script>
<style>
/* .v-application--wrap {
  background-image: url('../public/gatsa.png');
  background-repeat: repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: 50px;
} */
</style>