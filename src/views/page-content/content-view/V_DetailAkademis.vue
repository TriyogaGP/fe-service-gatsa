<template>
  <div>
    <h1 class="subheading grey--text">Data Akademis ({{ mapelText }})</h1>
    <div v-if="roleID === '1'" class="text-right wadah">
      <span @click="gotolist()" class="link">Data Akademis</span>
      <v-icon small class="iconstyle">fa-solid fa-chevron-right</v-icon>
      <span>Data Akademis ({{ mapelText }})</span>
    </div>
    <v-card class="mt-2 mb-2" outlined elevation="0">
      <div
        v-for="data in DataKelas"
        :key="data.kategori"
      >
        <h3 v-if="data.dataKelas.length" class="subheading black--text ml-3"><u>Kelas ({{ data.kategori }})</u></h3>
        <v-layout v-if="data.dataKelas.length" class="ma-1" row wrap>  
          <v-flex
            v-for="hasil in data.dataKelas"
            :key="hasil.kelas"
            sm6 xs12 md4 lg4
            class="pa-1"
          >
            <v-card @click="hasil.jumlah > 0 ? gotoDetail(hasil.kelas, mapelText) : warningNotif()">
              <v-list-item>
                <v-list-item-avatar tile class="mt-n7">
                  <v-sheet color="green" width="40" height="40" elevation="6">
                    <v-icon dark middle>fa-duotone fa-user-secret</v-icon>
                  </v-sheet>
                </v-list-item-avatar>
                <v-list-item-content>
                  <div class="judul text-center">Kelas {{ hasil.kelas }}</div>
                  <v-list-item-title class="mb-2 text-center">{{ hasil.jumlah }} Orang</v-list-item-title>
                  <v-divider />
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
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
        let resdata = res.data.result
        let result = [
          { kategori: '7'},
          { kategori: '8'},
          { kategori: '9'},
        ]

        result.map(async val => {
          let hasil = []
          await resdata.map(str => {
            let split = str.kelas.split('-')
            if(split[0] === val.kategori){
              hasil.push({
                kelas: str.kelas,
                jumlah: str.jumlah,
              })
            }
            return hasil
          })
          this.DataKelas.push({
            kategori: val.kategori,
            dataKelas: hasil,
          })
        })
        // console.log(this.DataKelas);
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
    warningNotif(){
      this.notifikasi("warning", "Tidak ada siswa/i dikelas ini", "1")
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