<template>
  <div>
    <h1 class="subheading grey--text">Data Akademis</h1>
    <v-card class="mt-2 mb-2" outlined elevation="0">
      <v-layout v-if="mengajarOptions.length" class="ma-1" row wrap>
        <v-flex
          v-for="data in mengajarOptions"
          :key="data.label"
          sm6 xs12 md4 lg4
          class="pa-1"
        >
          <v-card @click="gotoDetail(data.link)">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
								<v-sheet color="green" width="40" height="40" elevation="6">
									<v-icon dark large>fa-book</v-icon>
								</v-sheet>
							</v-list-item-avatar>
              <v-list-item-content>
                <div class="judul text-center">Mata Pelajaran</div>
                <v-list-item-title class="mb-2 text-center" style="font-size: 11pt; font-weight: bold;">{{ data.label }}</v-list-item-title>
                <v-divider />
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
      <h2 v-else style="font-weight: bold;">Data Akademis Tidak Tersedia</h2>
    </v-card>
    <v-dialog
      v-model="dialogNotifikasi"
      transition="dialog-bottom-transition"
      persistent
      width="500px"
    >
      <PopUpNotifikasiVue
        :notifikasi-kode.sync="notifikasiKode"
        :notifikasi-text.sync="notifikasiText"
        :notifikasi-button.sync="notifikasiButton"
        @cancel="dialogNotifikasi = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PopUpNotifikasiVue from "../../Layout/PopUpNotifikasi.vue";
export default {
  name: 'DataAkademis',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
    mengajarOptions: [],

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Data Akademis - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  watch: {
  },
  mounted() {
    this.optionMengajar()
	},
	methods: {
		...mapActions(["fetchData"]),
    optionMengajar(){
      let payload = {
        method: "get",
				url: `settings/optionsMengajar`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let data = res.data.result
        data.map(str => {
          this.mengajarOptions.push({ label: str.label, link: str.label.replace(' ', '-') })
        })
			})
    },
    gotoDetail(mapel) {
      // console.log(mapel);
      this.$router.push({name: "DataDetailAkademis", params: { mapel: mapel }});
    },
    notifikasi(kode, text, proses){
      this.dialogNotifikasi = true
      this.notifikasiKode = kode
      this.notifikasiText = text
      this.notifikasiButton = proses
    },
	}
}
</script>

<style>
.scrollText{
  max-height: 450px !important;
  overflow-y: auto !important;
}
.v-pagination {
  justify-content: flex-end !important;
}
.v-input .v-label {
  font-size: 11pt !important;
}
.v-text-field.v-input--dense {
  font-size: 13pt !important;
}
.judul {
  font-size: 10pt !important;
  font-weight: bold;
  letter-spacing: 0.1666666667em !important;
  line-height: 2rem;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif !important;
}
</style>