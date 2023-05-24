<template>
  <v-app>
    <Navbar :nama-sekolah="namaSekolah" />
    <v-main class="ma-4">
      <router-view />
    </v-main>
    <Footer :nama-sekolah="namaSekolah" />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';

export default {
  name: "App",
  components: { Navbar, Footer },
  data: () => ({
	}),
	computed: {
    ...mapGetters(['cmssettings']),
    namaSekolah(){
      // console.log(this.cmssettings);
      return this.cmssettings ? this.cmssettings.namasekolah : null
    }
  },
	mounted(){
		this.getCMSSettings()
	},
	methods: {
		...mapActions(["getCMSSettings"]),
	}
};
</script>
