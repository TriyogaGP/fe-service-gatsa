<template>
  <div>
    <h1 class="subheading grey--text">Data Kelas Siswa {{ kelasText }}</h1>
    <v-card class="mt-2 mb-2" outlined elevation="0">
      <v-layout v-if="DataKelas.length" class="ma-1" row wrap>
        <v-flex
          v-for="data in DataKelas"
          :key="data.kelas"
          sm6 xs12 md4 lg4
          class="pa-1"
        >
          <v-card @click="data.jumlah > 0 ? gotoDetail(data.kelas) : warningNotif()">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
								<v-sheet color="green" width="40" height="40" elevation="6">
									<v-icon dark middle>fa-duotone fa-user-secret</v-icon>
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
import { mapActions, mapGetters } from "vuex";
import PopUpNotifikasiVue from "../../Layout/PopUpNotifikasi.vue";
export default {
  name: 'DataKelasSiswa',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
    kelas: '',

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Data Kelas Siswa - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
    ...mapGetters({
      kelasSiswa: 'kelas/kelasSiswa',
    }),
    kelasText() {
      this.kelas = this.$route.params.kelas
      let roleID = localStorage.getItem('roleID')
      this.getKelasSiswa({kelas: this.kelas, roleID: roleID})
      return this.kelas
    },
    DataKelas(){
      return this.kelasSiswa
    }
  },
  watch: {
  },
  mounted() {
	},
	methods: {
		...mapActions({
      getKelasSiswa: 'kelas/getKelasSiswa',
    }),
    gotoDetail(kelas) {
      this.$router.push({name: "DataDetailKelasSiswa", params: { kondisi: 'view', kelas: kelas }});
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
</style>