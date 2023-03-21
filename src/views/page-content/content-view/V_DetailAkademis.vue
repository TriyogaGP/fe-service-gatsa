<template>
  <div>
    <h1 class="subheading grey--text">Data Akademis ({{ mapelText }})</h1>
    <div v-if="roleID === '1'" class="text-right wadah">
      <span @click="gotolist()" class="link">Data Akademis</span>
      <v-icon small class="iconstyle">fa-solid fa-chevron-right</v-icon>
      <span>Data Akademis ({{ mapelText }})</span>
    </div>
    <v-card class="mt-2 mb-2" outlined elevation="0">
      <v-layout v-if="DataKelas.length" class="ma-1" row wrap>
        <v-flex
          v-for="data in DataKelas"
          :key="data.kelas"
          sm6 xs12 md4 lg4
          class="pa-1"
        >
          <v-card @click="gotoDetail(data.kelas, mapelText)">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
								<v-sheet color="green" width="40" height="40" elevation="6">
									<v-icon dark large>fa-duotone fa-user-secret</v-icon>
								</v-sheet>
							</v-list-item-avatar>
              <v-list-item-content>
                <div class="judul text-center">Kelas {{ data.kelas }}</div>
                <v-list-item-title class="mb-2 text-center">{{ data.jumlah }} Orang</v-list-item-title>
                <v-divider />
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
      <h2 v-else style="font-weight: bold;">Data Kelas Siswa Tidak Tersedia</h2>
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
  name: 'DataDetailAkademis',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
    roleID: '',
    mapel: '',
    DataKelas: [],

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Data Detail Akademis - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
    mapelText() {
      let pelajaran = this.$route.params.mapel
      this.mapel = pelajaran.replace('-', ' ')
      return this.mapel
    }
  },
  watch: {
  },
  mounted() {
    this.roleID = localStorage.getItem('roleID')
    this.getKelasSiswa(this.roleID)
	},
	methods: {
		...mapActions(["fetchData"]),
    getKelasSiswa(roleID) {
      this.DataKelas = []
			let payload = {
        method: "get",
				url: `kelas/kelassiswa?${roleID === '3' ? `mengajar=${localStorage.getItem('mengajar_kelas')}` : ''}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.DataKelas = res.data.result
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
		},
    gotoDetail(kelas, mapel) {
      this.$router.push({name: "DataDetailKelasSiswa", params: { kondisi: 'penilaian', kelas: kelas }, query: { mapel: mapel }});
    },
    gotolist() {
      this.$router.push({name: "DataAkademis"});
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

<style scoped>
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
  font-size: 13px !important;
}
.judul {
  font-size: 10pt !important;
  font-weight: bold;
  letter-spacing: 0.1666666667em !important;
  line-height: 2rem;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif !important;
}
.wadah {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
}
.iconstyle {
  margin-left: 5px;
  margin-right: 5px;
}
.link {
  color: #000;
  cursor: pointer;
  text-decoration: none;
}
.link:hover {
  color: #6fe484;
  cursor: pointer;
  text-decoration: underline;
}
</style>