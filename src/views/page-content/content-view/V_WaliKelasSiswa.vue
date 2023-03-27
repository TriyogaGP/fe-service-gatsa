<template>
  <div>
    <h1 class="subheading grey--text">{{ roleID === '1' || roleID === '2' ? 'Data Kelas Siswa' : `Kelas ${kelas}` }}</h1>
    <v-card v-if="roleID === '1' || roleID === '2'" class="mt-2 mb-2" outlined elevation="0">
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
                    <v-icon dark large>fa-duotone fa-user-secret</v-icon>
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
    <v-card v-if="roleID === '3'" class="mt-2 mb-2 pa-4" outlined elevation="0">
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
          : {{ dataSiswaSiswi.length ? uppercaseLetterFirst(dataSiswaSiswi[0].nama) : '-' }}
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
          : {{ dataSiswaSiswi.length ? uppercaseLetterFirst(dataSiswaSiswi[0].waliKelas) : '-' }}
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          md="12"
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
        <span>{{ dataSiswaSiswi.length ? uppercaseLetterFirst(dataSiswaSiswi[0].nama) : '-' }}</span>
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
      <v-simple-table dark>
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
            </tr>
          </thead>
          <tbody>
            <tr v-for="v, i in dataNilai" :key="i">
              <td>{{ v.mapel }}</td>
              <td>{{ v.kkm }}</td>
              <td>{{ v.nilai }}</td>
              <td>{{ v.hurufNilai }}</td>
              <td>{{ v.nilai === 0 ? 'Nol' : pembilang(v.nilai) }}</td>
            </tr>
            <tr>
              <td colspan="2" class="text-right">RATA - RATA NILAI</td>
              <td>{{ penilaian.rataRataNilai }}</td>
              <td>{{ penilaian.nilaiHuruf }}</td>
              <td>{{ penilaian.rataRataNilai === 0 ? 'Nol' : pembilang(penilaian.rataRataNilai) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-dialog
      v-model="DialogDetail"
      scrollable
      max-width="1000px"
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
              : {{ dataSiswaSiswi.length ? uppercaseLetterFirst(dataSiswaSiswi[0].nama) : '-' }}
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
              : {{ dataSiswaSiswi.length ? uppercaseLetterFirst(dataSiswaSiswi[0].waliKelas) : '-' }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="12"
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
            <span>{{ dataSiswaSiswi.length ? uppercaseLetterFirst(dataSiswaSiswi[0].nama) : '-' }}</span>
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
          <v-simple-table dark>
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
                </tr>
              </thead>
              <tbody>
                <tr v-for="v, i in dataNilai" :key="i">
                  <td>{{ v.mapel }}</td>
                  <td>{{ v.kkm }}</td>
                  <td>{{ v.nilai }}</td>
                  <td>{{ v.hurufNilai }}</td>
                  <td>{{ v.nilai === 0 ? 'Nol' : pembilang(v.nilai) }}</td>
                </tr>
                <tr>
                  <td colspan="2" class="text-right">RATA - RATA NILAI</td>
                  <td>{{ penilaian.rataRataNilai }}</td>
                  <td>{{ penilaian.nilaiHuruf }}</td>
                  <td>{{ penilaian.rataRataNilai === 0 ? 'Nol' : pembilang(penilaian.rataRataNilai) }}</td>
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
import { mapActions } from "vuex";
import PopUpNotifikasiVue from "../../Layout/PopUpNotifikasi.vue";
export default {
  name: 'DataKelasSiswa',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
    roleID: '',
    kelas: '',
    mapel: '',
    DataKelas: [],
    DialogDetail: false,
    dataSiswaSiswi: [],
    dataNilai: [],
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
  },
  watch: {
    page: {
			deep: true,
			handler(value) {
        this.getWaliKelas(value, this.kelas)
			}
		},
  },
  mounted() {
    this.roleID = localStorage.getItem('roleID')
    if(this.roleID === '1' || this.roleID === '2') {
      this.getKelasSiswa()
    }else if(this.roleID === '3'){
      this.kelas = localStorage.getItem('wali_kelas')
      this.getWaliKelas(1, this.kelas)
    }
  },
	methods: {
		...mapActions(["fetchData"]),
    getKelasSiswa() {
      this.DataKelas = []
			let payload = {
        method: "get",
				url: `kelas/kelassiswa`,
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
    getWaliKelas(page, kelas) {
      this.dataSiswaSiswi = []
      this.pageSummary = {
        page: '',
        limit: '',
        total: '',
        totalPages: ''
      }
			let payload = {
        method: "get",
				url: `user/walikelas?page=${page}&kelas=${kelas}&roleID=${this.roleID}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let resdata = res.data.result
        this.dataSiswaSiswi = resdata.records
        this.dataNilai = this.dataSiswaSiswi.length ? this.dataSiswaSiswi[0].dataNilai : []
        let ratarata = 0
        this.dataNilai.map(str => {
          ratarata += str.nilai
        })
        this.penilaian.rataRataNilai = Math.ceil(ratarata / 15)
        this.penilaian.nilaiHuruf = this.penilaian.rataRataNilai <= 50 ? 'E' : this.penilaian.rataRataNilai <= 65 ? 'D' : this.penilaian.rataRataNilai <= 75 ? 'C' : this.penilaian.rataRataNilai <= 85 ? 'B' : 'A'
        this.pageSummary = {
					page: this.dataSiswaSiswi.length ? resdata.pageSummary.page : 0,
					limit: this.dataSiswaSiswi.length ? resdata.pageSummary.limit : 0,
					total: this.dataSiswaSiswi.length ? resdata.pageSummary.total : 0,
					totalPages: this.dataSiswaSiswi.length ? resdata.pageSummary.totalPages : 0
				}
			})
			.catch((err) => {
        this.dataSiswaSiswi = []
        this.pageSummary = {
          page: '',
          limit: '',
          total: '',
          totalPages: ''
        }
        this.notifikasi("error", err.response.data.message, "1")
			});
		},
    openDialog(kelas){
      this.kelas = kelas
      this.getWaliKelas(1, this.kelas)
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