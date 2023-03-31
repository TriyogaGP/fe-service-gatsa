<template>
  <v-app>
    <Navbar :nama-sekolah="namasekolah" />
    <v-main class="ma-4">
      <router-view />
    </v-main>
    <Footer :nama-sekolah="namasekolah" />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';

export default {
  name: "App",
  components: { Navbar, Footer },
  data: () => ({
		namasekolah: '',
	}),
	mounted(){
		this.getGeneralCMS()
	},
	methods: {
		...mapActions(["fetchData"]),
		getGeneralCMS(){
      let payload = {
        method: "get",
				url: `settings/cmssetting`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let resdata = res.data.result
				this.namasekolah = resdata.namasekolah ? resdata.namasekolah : null
				// console.log(resdata);
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
	}
};
</script>
