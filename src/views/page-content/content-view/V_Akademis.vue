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
          <v-card @click="roleID === '1' || roleID === '2' ? gotoDetail(data.link) : openDetail(data.link)">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
								<v-sheet color="green" width="40" height="40" elevation="6">
									<v-icon dark middle>fa-book</v-icon>
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
      v-model="DialogSiswaSiswi"
      scrollable
      max-width="800px"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>Data Detail Nilai</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { dataSiswaSiswi = ''; DialogSiswaSiswi = false; }"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pt-4">
          <h2 class="subheading black--text"><u>>>Data Siswa Siswi</u></h2>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Nama Guru
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-2 font-weight-bold"
            >
              : {{ dataSiswaSiswi ? uppercaseLetterFirst2(dataSiswaSiswi.dataPenilaian.namaGuru) : '' }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Mata Pelajaran
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-2 font-weight-bold"
            >
              : {{ mapel }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Semester
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-2 font-weight-bold"
            >
              : {{ dataSiswaSiswi ? uppercaseLetterFirst2(dataSiswaSiswi.semester) : '' }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Tahun Pelajaran
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-2 font-weight-bold"
            >
              : {{ tahunPelajaran }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              KKM
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-2 font-weight-bold"
            >
              : {{ dataSiswaSiswi ? dataSiswaSiswi.dataPenilaian.kkm : '' }}
            </v-col>
          </v-row>
          <v-simple-table dark>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    #
                  </th>
                  <th class="text-left">
                    NILAI
                  </th>
                  <th class="text-left">
                    KETERANGAN
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tugas 1</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas1 : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas1 === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.tugas1) : '' }}</td>
                </tr>
                <tr>
                  <td>Tugas 2</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas2 : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas2 === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.tugas2) : '' }}</td>
                </tr>
                <tr>
                  <td>Tugas 3</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas3 : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas3 === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.tugas3) : '' }}</td>
                </tr>
                <tr>
                  <td>Tugas 4</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas4 : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas4 === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.tugas4) : '' }}</td>
                </tr>
                <tr>
                  <td>Tugas 5</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas5 : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas5 === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.tugas5) : '' }}</td>
                </tr>
                <tr>
                  <td>Tugas 6</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas6 : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas6 === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.tugas6) : '' }}</td>
                </tr>
                <tr>
                  <td>Tugas 7</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas7 : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas7 === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.tugas7) : '' }}</td>
                </tr>
                <tr>
                  <td>Tugas 8</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas8 : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas8 === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.tugas8) : '' }}</td>
                </tr>
                <tr>
                  <td>Tugas 9</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas9 : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas9 === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.tugas9) : '' }}</td>
                </tr>
                <tr>
                  <td>Tugas 10</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas10 : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.tugas10 === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.tugas10) : '' }}</td>
                </tr>
                <tr>
                  <td>Ujian Tengah Semester</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.uts : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.uts === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.uts) : '' }}</td>
                </tr>
                <tr>
                  <td>Ujian Akhir Semester</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.uas : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.dataNilai.uas === 0 ? 'Nol' : pembilang(dataSiswaSiswi.dataNilai.uas) : '' }}</td>
                </tr>
                <tr>
                  <td class="text-right">Nilai Akhir</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.rataRataNilai : '' }}</td>
                  <td>{{ dataSiswaSiswi ? dataSiswaSiswi.rataRataNilai === 0 ? 'Nol' : pembilang(dataSiswaSiswi.rataRataNilai) : '' }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-divider />
        <v-card-actions />
      </v-card>
    </v-dialog>
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
import { mapActions, mapState, mapGetters } from "vuex";
import PopUpNotifikasiVue from "../../Layout/PopUpNotifikasi.vue";
export default {
  name: 'DataAkademis',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
    roleID: '',
    idLogin: '',
    kelas: '',
    mapel: '',
    DialogSiswaSiswi: false,
    dataSiswaSiswi: '',
    tahunpelajaran: '',

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
  computed: {
    ...mapState({
      mengajar: store => store.setting.mengajarOptions,
    }),
    ...mapGetters({
      cmssettings: 'setting/cmssettings',
      siswasiswiBy: 'user/siswasiswiBy',
      nilai: 'user/nilai',
    }),
    tahunPelajaran(){
      return this.cmssettings ? this.cmssettings.tahunpelajaran.value : null
    },
    DataNilai(){
      return this.nilai ? this.nilai : null
    },
    mengajarOptions(){
      let result = []
      this.mengajar.map(str => {
        result.push({ label: str.label, link: str.label.replace(' ', '-') })
      })
			return result
		},
  },
  watch: {
    siswasiswiBy: {
      deep: true,
      handler(value) {
        let jumlahTugas = this.DataNilai.jumlahTugas
        let nilai = this.DataNilai.dataSiswaSiswi.filter(val => val.idUser === value.idUser)[0].nilai
        let semester = this.DataNilai.dataSiswaSiswi.filter(val => val.idUser === value.idUser)[0].semester
        let kehadiran = this.DataNilai.dataSiswaSiswi.filter(val => val.idUser === value.idUser)[0].kehadiran
        let totalNilaiTugas = Number(nilai.tugas1) + Number(nilai.tugas2) + Number(nilai.tugas3) + Number(nilai.tugas4) + Number(nilai.tugas5) + Number(nilai.tugas6) + Number(nilai.tugas7) + Number(nilai.tugas8) + Number(nilai.tugas9) + Number(nilai.tugas10)
        let rataRataTugas = totalNilaiTugas === 0 ? 0 : totalNilaiTugas / Number(jumlahTugas)
        let rataRataNilai = (Number(rataRataTugas) + Number(nilai.uts) + Number(nilai.uas)) / 3
        this.dataSiswaSiswi = {
          ...value,
          dataNilai: nilai,
          semester: semester,
          dataKehadiran: kehadiran,
          totalNilaiTugas: rataRataTugas != 0 ? Math.ceil(rataRataTugas) : 0,
          rataRataNilai: rataRataNilai != 0 ? Math.ceil(rataRataNilai) : 0,
          hurufNilai: rataRataNilai <= 50 ? 'E' : rataRataNilai <= 65 ? 'D' : rataRataNilai <= 75 ? 'C' : rataRataNilai <= 85 ? 'B' : 'A',
       }
      }
    }
  },
  mounted() {
    this.roleID = localStorage.getItem('roleID')
    this.idLogin = localStorage.getItem('idLogin')
    this.kelas = localStorage.getItem('kelas')
		this.getMengajar()
	},
	methods: {
		...mapActions({
      getSiswaSiswibyUID: 'user/getSiswaSiswibyUID',
      getNilai: 'user/getNilai',
      getCMSSettings: 'setting/getCMSSettings',
      getMengajar: 'setting/getMengajar',
    }),
    openDetail(mapel) {
      this.mapel = mapel.replace('-', ' ')
      this.getCMSSettings()
      this.getNilai({idUser: this.idLogin, kelas: this.kelas, mapel: this.mapel})
      this.getSiswaSiswibyUID({uid: this.idLogin, mapel: this.mapel})
      this.DialogSiswaSiswi = true
    },
    gotoDetail(mapel) {
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