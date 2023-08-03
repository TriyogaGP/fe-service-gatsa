<template>
  <div>
    <h1 class="subheading grey--text">{{ roleID === '1' || roleID === '2' ? 'Data Kelas Siswa' : `Kelas ${kelas}` }}</h1>
    <v-card v-if="roleID === '1' || roleID === '2'" class="mt-2 mb-2" outlined elevation="0">
      <v-btn
        v-if="DataKelas.length"
        color="light-blue darken-3"
        small
        dense
        depressed
        class="ma-2 white--text text--darken-2"
        @click="updatePeringkat(kelasJoin)"
      >
        <v-icon small>edit</v-icon>&nbsp;Update Peringkat
      </v-btn>
      <div
        v-for="data in DataKelas"
        :key="data.kategori"
      >
        <h3 class="subheading black--text ml-3"><u>Kelas ({{ data.kategori }})</u></h3>
        <v-layout v-if="DataKelas.length" class="ma-1" row wrap>  
          <v-flex
            v-for="hasil in data.dataKelas"
            :key="hasil.kelas"
            sm6 xs12 md4 lg4
            class="pa-1"
          >
            <v-card @click="hasil.jumlah > 0 ? openDialog(hasil.kelas) : warningNotif()">
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
    <v-btn
      v-if="roleID === '3'"
      color="light-blue darken-3"
      small
      dense
      depressed
      class="ma-2 white--text text--darken-2"
      @click="updatePeringkat(kelas)"
    >
      <v-icon small>edit</v-icon>&nbsp;Update Peringkat
    </v-btn>
    <v-card v-if="roleID === '3'" class="mt-2 mb-2 pa-4" outlined elevation="0">
      <h1 class="subheading black--text text-center"><u>----- Rapot Siswa Siswi -----</u></h1>
      <v-row no-gutters>
        <v-col
          cols="12"
          md="4"
          class="pt-2 d-flex align-center font-weight-bold"
        >
          Nomor Induk
        </v-col>
        <v-col
          cols="12"
          md="8"
          class="pt-2 font-weight-bold"
        >
          : {{ dataSiswaSiswi.length ? dataSiswaSiswi[0].nomorInduk : '-' }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          md="4"
          class="pt-2 d-flex align-center font-weight-bold"
        >
          Nama Siswa/i
        </v-col>
        <v-col
          cols="12"
          md="8"
          class="pt-2 font-weight-bold"
        >
          : {{ dataSiswaSiswi.length ? uppercaseLetterFirst2(dataSiswaSiswi[0].nama) : '-' }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          md="4"
          class="pt-2 d-flex align-center font-weight-bold"
        >
          Wali Kelas
        </v-col>
        <v-col
          cols="12"
          md="8"
          class="pt-2 font-weight-bold"
        >
          : {{ dataSiswaSiswi.length ? uppercaseLetterFirst2(dataSiswaSiswi[0].waliKelas) : '-' }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          md="6"
          class="pt-2 text-left font-weight-bold"
        >
        <v-btn
          color="light-blue darken-3"
          small
          dense
          depressed
          class="ma-2 white--text text--darken-2"
          :loading="isLoadingbtnPDF"
          @click="PDFOpen(dataSiswaSiswi.length ? dataSiswaSiswi[0].idUser : '-')"
        >
          <v-icon small>fa-solid fa-file-export</v-icon>&nbsp;Konversi -> PDF File
        </v-btn>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="pt-2 text-right font-weight-bold"
        >
        <v-icon
          style="cursor: pointer;"
          large
          :disabled="dataSiswaSiswi.length ? pageSummary.page != 1 ? false : true : true"
          @click="() => { page = pageSummary.page - 1 }"
        >
          keyboard_arrow_left
        </v-icon>
        <span>{{ dataSiswaSiswi.length ? uppercaseLetterFirst2(dataSiswaSiswi[0].nama) : '-' }}</span>
        <v-icon
          style="cursor: pointer;"
          large
          :disabled="dataSiswaSiswi.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
          @click="() => { page = pageSummary.page + 1 }"
        >
          keyboard_arrow_right
        </v-icon>
        </v-col>
      </v-row>
      <v-simple-table dark class="mb-2">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                MATA PELAJARAN
              </th>
              <th class="text-left">
                KKM
              </th>
              <th class="text-left">
                NILAI
              </th>
              <th class="text-left">
                HURUF
              </th>
              <th class="text-left">
                KETERANGAN
              </th>
              <th class="text-left">
                KOMPETEN / TIDAK KOMPETEN
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="v, i in dataNilai" :key="i">
              <td>{{ v.mapel }}</td>
              <td>{{ v.kkm }}</td>
              <td>{{ v.nilai }}</td>
              <td>{{ v.hurufNilai }}</td>
              <td>{{ v.nilai === 0 ? 'Nol' : pembilang(v.nilai) }}</td>
              <td :style="v.nilai > v.kkm ? 'color: green' : 'color: red'">{{ v.nilai > v.kkm ? 'KOMPETEN' : 'TIDAK KOMPETEN' }}</td>
            </tr>
            <tr>
              <td colspan="2" class="text-right">RATA - RATA NILAI</td>
              <td>{{ NilaiAkhir }}</td>
              <td>{{ penilaian.nilaiHuruf }}</td>
              <td colspan="2">{{ NilaiAkhir === 0 ? 'Nol' : pembilang(NilaiAkhir) }}</td>
            </tr>
            <tr>
              <td colspan="2" class="text-right">PERINGKAT</td>
              <td colspan="4">{{ `${dataSiswaSiswi.length ? dataSiswaSiswi[0].peringkat : '-'} dari total ${dataSiswaSiswi.length ? dataSiswaSiswi[0].jumlahSiswa : '-'} Siswa/i` }} </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-simple-table dark class="mt-2">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                KEHADIRAN
              </th>
              <th class="text-left">
                TOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sakit</td>
              <td>{{ dataSiswaSiswi.length ? dataSiswaSiswi[0].kehadiran.sakit : 0 }}</td>
            </tr>
            <tr>
              <td>Ijin</td>
              <td>{{ dataSiswaSiswi.length ? dataSiswaSiswi[0].kehadiran.ijin : 0 }}</td>
            </tr>
            <tr>
              <td>Tanpa Keterangan</td>
              <td>{{ dataSiswaSiswi.length ? dataSiswaSiswi[0].kehadiran.alfa : 0 }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-dialog
      v-model="dialogPDF"
      scrollable
			width="1000px"
			persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>Data Raport PDF Siswa Siswi</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="dialogPDF = false;"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pt-4">
          <PdfCetakan
            :dialog-pdf.sync="dialogPDF"
            :url-sk.sync="urlSk"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions />
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="DialogDetail"
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
          <v-toolbar-title>Detail Nilai (Kelas {{ kelas }})</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { DialogDetail = false; }"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row no-gutters class="pa-2">
            <v-col cols="12" md="3" />
            <v-col cols="12" md="9" />
          </v-row>
          <h1 class="subheading black--text text-center"><u>----- Rapot Siswa Siswi -----</u></h1>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Nomor Induk
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-2 font-weight-bold"
            >
              : {{ dataSiswaSiswi.length ? dataSiswaSiswi[0].nomorInduk : '-' }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Nama Siswa/i
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-2 font-weight-bold"
            >
              : {{ dataSiswaSiswi.length ? uppercaseLetterFirst2(dataSiswaSiswi[0].nama) : '-' }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Wali Kelas
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-2 font-weight-bold"
            >
              : {{ dataSiswaSiswi.length ? uppercaseLetterFirst2(dataSiswaSiswi[0].waliKelas) : '-' }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="6"
              class="pt-2 text-left font-weight-bold"
            >
              <v-btn
                color="light-blue darken-3"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :loading="isLoadingbtnPDF"
                @click="PDFOpen(dataSiswaSiswi.length ? dataSiswaSiswi[0].idUser : '-')"
              >
                <v-icon small>fa-solid fa-file-export</v-icon>&nbsp;Konversi -> PDF File
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="pt-2 text-right font-weight-bold"
            >
              <v-icon
                style="cursor: pointer;"
                large
                :disabled="dataSiswaSiswi.length ? pageSummary.page != 1 ? false : true : true"
                @click="() => { page = pageSummary.page - 1 }"
              >
                keyboard_arrow_left
              </v-icon>
              <span>{{ dataSiswaSiswi.length ? uppercaseLetterFirst2(dataSiswaSiswi[0].nama) : '-' }}</span>
              <v-icon
                style="cursor: pointer;"
                large
                :disabled="dataSiswaSiswi.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
                @click="() => { page = pageSummary.page + 1 }"
              >
                keyboard_arrow_right
              </v-icon>
            </v-col>
          </v-row>
          <v-simple-table dark class="mb-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    MATA PELAJARAN
                  </th>
                  <th class="text-left">
                    KKM
                  </th>
                  <th class="text-left">
                    NILAI
                  </th>
                  <th class="text-left">
                    HURUF
                  </th>
                  <th class="text-left">
                    KETERANGAN
                  </th>
                  <th class="text-left">
                    KOMPETEN / TIDAK KOMPETEN
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="v, i in dataNilai" :key="i">
                  <td>{{ v.mapel }}</td>
                  <td>{{ v.kkm }}</td>
                  <td>{{ v.nilai }}</td>
                  <td>{{ v.hurufNilai }}</td>
                  <td>{{ v.nilai === 0 ? 'Nol' : pembilang(v.nilai) }}</td>
                  <td :style="v.nilai > v.kkm ? 'color: green' : 'color: red'">{{ v.nilai > v.kkm ? 'KOMPETEN' : 'TIDAK KOMPETEN' }}</td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right">RATA - RATA NILAI</td>
                  <td>{{ NilaiAkhir }}</td>
                  <td>{{ penilaian.nilaiHuruf }}</td>
                  <td colspan="2">{{ NilaiAkhir === 0 ? 'Nol' : pembilang(NilaiAkhir) }}</td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right">PERINGKAT</td>
                  <td colspan="4">{{ `${dataSiswaSiswi.length ? dataSiswaSiswi[0].peringkat : '-'} dari total ${dataSiswaSiswi.length ? dataSiswaSiswi[0].jumlahSiswa : '-'} Siswa/i` }} </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table dark class="mt-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    KEHADIRAN
                  </th>
                  <th class="text-left">
                    TOTAL
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sakit</td>
                  <td>{{ dataSiswaSiswi.length ? dataSiswaSiswi[0].kehadiran.sakit : 0 }}</td>
                </tr>
                <tr>
                  <td>Ijin</td>
                  <td>{{ dataSiswaSiswi.length ? dataSiswaSiswi[0].kehadiran.ijin : 0 }}</td>
                </tr>
                <tr>
                  <td>Tanpa Keterangan</td>
                  <td>{{ dataSiswaSiswi.length ? dataSiswaSiswi[0].kehadiran.alfa : 0 }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-divider />
        <v-card-actions />
      </v-card>
    </v-dialog>
    <v-overlay :value="isLoadingProses" z-index="500">
      <div style="width: 550px;">
        <v-progress-linear
          class="pa-3"
          indeterminate
          color="black darken-3"
        />
        <h4 style="color: #000; text-align: center; background-color: #FFF;">Sedang proses update data, harap menunggu ...</h4>
      </div>
    </v-overlay>
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
import PdfCetakan from '../../Layout/PdfCetakan.vue';

export default {
  name: 'DataKelasSiswa',
  components: {
    PopUpNotifikasiVue,
    PdfCetakan,
  },
  data: () => ({
    roleID: '',
    kelas: '',
    mapel: '',
    kelasJoin: '',
    DataKelas: [],
    DialogDetail: false,
    isLoadingProses: false,
    dataSiswaSiswi: [],
    dataNilai: [],
    NilaiAkhir: '',
    page: 1,
    pageSummary: {
			page: '',
			limit: '',
			total: '',
			totalPages: ''
		},
    penilaian: {
      rataRataNilai: 0,
      nilaiHuruf: '',
    },
    dialogPDF: false,
    isLoadingbtnPDF: false,
    urlSk: window.location.href,
    BASE_URL: '',

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
      waliKelas: 'user/waliKelas',
    }),
  },
  watch: {
    waliKelas: {
      deep: true,
			handler(value) {
        this.dataSiswaSiswi = value.records
        this.dataNilai = this.dataSiswaSiswi.length ? this.dataSiswaSiswi[0].dataNilai : []
        this.NilaiAkhir = this.dataSiswaSiswi.length ? this.dataSiswaSiswi[0].hasilAkhir : 0
        let ratarata = 0
        this.dataNilai.map(str => {
          ratarata += str.nilai
        })
        this.penilaian.rataRataNilai = Math.ceil(ratarata / 16)
        this.penilaian.nilaiHuruf = this.penilaian.rataRataNilai <= 50 ? 'E' : this.penilaian.rataRataNilai <= 65 ? 'D' : this.penilaian.rataRataNilai <= 75 ? 'C' : this.penilaian.rataRataNilai <= 85 ? 'B' : 'A'
        this.pageSummary = {
					page: this.dataSiswaSiswi.length ? value.pageSummary.page : 0,
					limit: this.dataSiswaSiswi.length ? value.pageSummary.limit : 0,
					total: this.dataSiswaSiswi.length ? value.pageSummary.total : 0,
					totalPages: this.dataSiswaSiswi.length ? value.pageSummary.totalPages : 0
				}
      }
    },
    kelasSiswa: {
      deep: true,
			handler(value) {
        let result = [
          { kategori: '7'},
          { kategori: '8'},
          { kategori: '9'},
        ]

        this.kelasJoin = value.filter(str => str.jumlah > 0).map(str => str.kelas).join(', ')

        result.map(async val => {
          let hasil = []
          await value.map(str => {
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
      }
    },
    page: {
			deep: true,
			handler(value) {
        this.getWaliKelas({page: value, kelas: this.kelas, roleID: this.roleID})
			}
		},
  },
  mounted() {
    this.BASEURL = process.env.VUE_APP_NODE_ENV === "production" ? process.env.VUE_APP_PROD_API_URL : process.env.VUE_APP_DEV_API_URL
    this.roleID = localStorage.getItem('roleID')
    if(this.roleID === '1' || this.roleID === '2') {
      this.getKelasSiswa({kelas: null, roleID: this.roleID})
    }else if(this.roleID === '3'){
      this.kelas = localStorage.getItem('wali_kelas')
      this.getWaliKelas({page: 1, kelas: this.kelas, roleID: this.roleID})
    }
  },
	methods: {
		...mapActions({
      getKelasSiswa: 'kelas/getKelasSiswa', 
      getWaliKelas: 'user/getWaliKelas',
    }),
    updatePeringkat(kelas) {
      this.isLoadingProses = true
      this.$store.dispatch('user/updatePeringkat', kelas)
      .then((res) => {
        this.isLoadingProses = false
        if(this.roleID === '1' || this.roleID === '2') {
          this.getKelasSiswa({kelas: null, roleID: this.roleID})
        }else if(this.roleID === '3'){
          this.getWaliKelas({page: 1, kelas: this.kelas, roleID: this.roleID})
        }
        this.notifikasi("success", "Sukses update peringkat", "1")
			})
			.catch((err) => {
        this.isLoadingProses = false
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
    PDFOpen(idUser) {
      this.dialogPDF = false
      this.isLoadingbtnPDF = true
      this.urlSk = ''
      fetch(`${this.BASEURL}user/pdfcreate-raport/${idUser}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user_token')}`
        }
      })
      .then(response => response.arrayBuffer())
      .then(async response => {
        let blob = new Blob([response], { type: 'application/pdf' })
        this.urlSk = window.URL.createObjectURL(blob)
      })
      setTimeout(() => {
        this.isLoadingbtnPDF = false
        this.dialogPDF = true;
      }, 3000);
    },
    openDialog(kelas){
      this.kelas = kelas
      this.getWaliKelas({page: 1, kelas: this.kelas, roleID: this.roleID})
      this.DialogDetail = true
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
.judul {
  font-size: 10pt !important;
  font-weight: bold;
  letter-spacing: 0.1666666667em !important;
  line-height: 2rem;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif !important;
}
</style>