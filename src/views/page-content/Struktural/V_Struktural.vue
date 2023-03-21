<template>
  <div>
    <h1 class="subheading grey--text">Data Struktural</h1>
    <v-card class="mt-2 mb-2 pa-1" outlined elevation="0">
      <v-row no-gutters class="pa-2">
        <v-col cols="12" md="6">
          <v-btn
            color="light-blue darken-3"
            small
            dense
            depressed
            class="ma-2 white--text text--darken-2"
            @click="gotoForm()"
          >
            <v-icon small>add</v-icon>&nbsp;Tambah
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-row no-gutters>
            <v-col cols="12" md="9">
              <v-text-field
                v-model="searchData"
                append-icon="mdi-magnify"
                label="Pencarian..."
                single-line
                hide-details
                solo
                color="light-blue darken-3"
                clearable
                @keyup.enter="getStruktural(1, limit, searchData)"
              />
            </v-col>
            <v-col cols="12" md="3" class="pl-2 d-flex justify-end align-center">
              <v-autocomplete
                v-model="page"
                :items="pageOptions"
                item-text="value"
                item-value="value"
                label="Page"
                outlined
                dense
                color="light-black darken-3"
                hide-details
                :disabled="DataStruktural.length ? false : true"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="px-1">
        <v-data-table
          loading-text="Sedang memuat... Harap tunggu"
          no-data-text="Tidak ada data yang tersedia"
          no-results-text="Tidak ada catatan yang cocok ditemukan"
          :headers="headers"
          :loading="isLoading"
          :items="DataStruktural"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
          item-key="idUser"
          hide-default-header
          hide-default-footer
          class="elevation-1"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
        >
          <!-- header -->
          <template v-slot:header="{ props }">
            <thead class="v-data-table-header">
              <tr>
                <th v-for="header in props.headers" :key="header.text" style="font-weight: bold;">{{ header.text.toUpperCase() }}</th>
              </tr>
            </thead>
          </template>
          <template #[`item.number`]="{ item }">
            {{ page > 1 ? ((page - 1)*limit) + DataStruktural.indexOf(item) + 1 : DataStruktural.indexOf(item) + 1 }}
          </template>
          <template #[`item.jabatan`]="{ item }">
            <ul><li v-for="v in item.jabatanGuru" :key="v.kode">{{ v.label }}</li></ul>
          </template>
          <template #[`item.statusAktif`]="{ item }">
            <v-icon small v-if="item.statusAktif == true" color="green">check</v-icon>
            <v-icon small v-else-if="item.statusAktif == false" color="red">clear</v-icon>
            <br>
            <span v-html="item.statusAktif == true ? 'Active' : 'Non Active'" /> 
          </template>
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="white">
              <v-btn
                :value="item.idUser"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.statusAktif == false"
                @click="ubahData(item.idUser)"
              >
                <v-icon small>edit</v-icon>&nbsp;Ubah
              </v-btn> 
              <v-btn
                :value="item.idUser"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.mutasiAkun == true"
                @click="ProsesRecord(item, 'STATUSRECORD', !item.statusAktif)"
              >
                <v-icon small>{{ item.statusAktif === false ? 'visibility' : 'visibility_off' }}</v-icon>&nbsp;{{ item.statusAktif === false ? 'Active' : 'Non Active' }}
              </v-btn> 
              <v-btn
                :value="item.idUser"
                color="#bd3a07"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.statusAktif == false"
                @click="HapusRecord(item)"
              >
                <v-icon small>delete</v-icon>&nbsp;Hapus
              </v-btn> 
              <v-btn
                :value="item.idUser"
                color="#04f7f7"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="openDialog(item)"
              >
                <v-icon small>info</v-icon>&nbsp;Detail
              </v-btn> 
              <v-divider />
            </td>
          </template>
        </v-data-table>
      </div>
      <v-row>
        <v-col cols="10" class="mt-2 d-flex justify-start align-center">
				<span>Halaman <strong>{{ pageSummary.page ? pageSummary.page : 0 }}</strong> dari Total Halaman <strong>{{ pageSummary.totalPages ? pageSummary.totalPages : 0 }}</strong> (Records {{ pageSummary.total ? pageSummary.total : 0 }})</span>
			</v-col>
			<v-col cols="2" class="mt-2 text-right">
				<div class="d-flex justify-end">
					<v-autocomplete
						v-model="limit"
						:items="limitPage"
						item-text="value"
						item-value="value"
            label="Limit"
						outlined
						dense
            color="light-black darken-3"
						hide-details
						:disabled="DataStruktural.length ? false : true"
					/>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataStruktural.length ? pageSummary.page != 1 ? false : true : true"
						@click="() => { page = pageSummary.page - 1 }"
					>
						keyboard_arrow_left
					</v-icon>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataStruktural.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
						@click="() => { page = pageSummary.page + 1 }"
					>
						keyboard_arrow_right
					</v-icon>
				</div>
			</v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="DialogStruktural"
      max-width="800px"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>Data Detail Struktural</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { clearData(); DialogStruktural = false; }"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card>
          <div class="scrollText">
            <div class="px-5">
              <v-divider />
            </div>
            <v-card-text>
              <div class="text-center">
                <v-avatar size="150" style="border: solid 2px #000;">
                  <v-img :src="previewData.fotoProfil"></v-img>
                </v-avatar>
              </div>
              <h2 class="subheading black--text"><u>>>Data Log In</u></h2>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Consumer Type
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.namaRole }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Nama Lengkap
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.nama }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Username
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.username }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Email
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.email }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Kata Sandi
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.password }}&nbsp;
                  <v-icon
                    color="light-blue darken-3"
                    tabindex="-1"
                    @click="endecryptData('endecryptType')"
                    >{{ endecryptType ? 'lock' : 'lock_open' }}</v-icon
                  >
                </v-col>
              </v-row>
              <h2 class="subheading black--text"><u>>>Data Alamat</u></h2>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Tempat, Tanggal Lahir
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.tempat }}, {{ convertDateForMonth(previewData.tanggalLahir) }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Jenis Kelamin
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.jenisKelamin }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Agama
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.agama }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Telepon
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.telp }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Alamat
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.alamat }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Provinsi
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.provinsi }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Kabupaten / Kota
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.kabKota }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                cols="12"
                md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                Kecamatan
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.kecamatan }}				
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Kelurahan
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.kelurahan }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Kode Pos
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.kodePos }}
                </v-col>
              </v-row>
              <h2 class="subheading black--text"><u>>>Data Kelengkapan</u></h2>
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
                  class="pt-3"
                >
                  {{ previewData.nomorInduk }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Pendidikan Struktural
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.pendidikanGuru }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Jabatan Struktural
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.jabatanGuru }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Mangajar Bidang
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.mengajarBidang }}
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Mangajar Kelas
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  {{ previewData.mengajarKelas }}
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
                  class="pt-3"
                >
                  {{ previewData.waliKelas ? previewData.waliKelas : '-' }}
                </v-col>
              </v-row>
            </v-card-text>
          </div>
        </v-card>
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
  name: 'DataStruktural',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
    isLoading: false,
		DataStruktural: [],
    expanded: [],
    singleExpand: true,
		searchData: '',
    page: 1,
    pageCount: 0,
    itemsPerPage: 100,
    limit: 20,
		limitPage: [
			{ value: 5 },
			{ value: 10 },
			{ value: 20 },
			{ value: 50 },
			{ value: 100 },
		],
    pageOptions: [
      { value: 1 }
    ],
		pageSummary: {
			page: '',
			limit: '',
			total: '',
			totalPages: ''
		},
		headers: [
      { text: "No", value: "number", sortable: false, width: "5%" },
      { text: "#", value: "data-table-expand", sortable: false, width: "5%" },
      { text: "Nomor Induk", value: "nomorInduk", sortable: false },
      { text: "Nama", value: "nama", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Jabatan", value: "jabatan", sortable: false },
      { text: "Status", value: "statusAktif", sortable: false },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,
    roleID: '',
    previewData: {
      idUser: '',
      namaRole: '',
      nama: '',
      username: '',
      email: '',
      password: '',
      tempat: '',
      tanggalLahir: '',
      jenisKelamin: '',
      agama: '',
      telp: '',
      alamat: '',
      provinsi: '',
      kabKota: '',
      kecamatan: '',
      kelurahan: '',
      kodePos: '',
      nomorInduk: '',
      pendidikanGuru: '',
      jabatanGuru: '',
      mengajarBidang: '',
      mengajarKelas: '',
      waliKelas: '',
      fotoProfil: '',
    },
    DialogStruktural: false,
    endecryptType: '',

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Data Struktural - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  watch: {
    page: {
			deep: true,
			handler(value) {
				this.getStruktural(value, this.limit, this.searchData)
			}
		},
    limit: {
			deep: true,
			handler(value) {
				this.getStruktural(1, value, this.searchData)
			}
		},
  },
  mounted() {
    this.roleID = localStorage.getItem('roleID')
		this.getStruktural(this.page, this.limit, this.searchData);
	},
	methods: {
		...mapActions(["fetchData"]),
		getStruktural(page = 1, limit, keyword) {
      this.itemsPerPage = limit
      this.page = page
			this.isLoading = true
      this.DataStruktural = []
      this.pageOptions = [{ value: 1 }]
			this.pageSummary = {
				page: '',
				limit: '',
				total: '',
				totalPages: ''
			}
			let payload = {
        method: "get",
				url: `user/struktural?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ''}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let resdata = res.data.result
				this.DataStruktural = resdata.records
				this.pageSummary = {
					page: this.DataStruktural.length ? resdata.pageSummary.page : 0,
					limit: this.DataStruktural.length ? resdata.pageSummary.limit : 0,
					total: this.DataStruktural.length ? resdata.pageSummary.total : 0,
					totalPages: this.DataStruktural.length ? resdata.pageSummary.totalPages : 0
				}
        for (let index = 1; index <= this.pageSummary.totalPages; index++) {
          this.pageOptions.push({ value: index })
        }
        this.isLoading = false
			})
			.catch((err) => {
        this.itemsPerPage = limit
        this.page = page
        this.DataStruktural = []
        this.pageOptions = [{ value: 1 }]
        this.pageSummary = {
          page: '',
          limit: '',
          total: '',
          totalPages: ''
        }
        this.isLoading = false
        this.notifikasi("error", err.response.data.message, "1")
			});
		},
    HapusRecord(item) {
      let bodyData = {
        user: {
          jenis: 'DELETE',
          idUser: item.idUser,
        },
        userdetail: {}
      }
      let payload = {
				method: "post",
				url: `user/struktural`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.getStruktural(1, this.limit, this.searchData)
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    ProsesRecord(item, jenis, kondisi) {
      let bodyData = {
        user: {
          jenis: jenis,
          idUser: item.idUser,
          kondisi: kondisi,
        },
        userdetail: {}
      }
      let payload = {
				method: "post",
				url: `user/struktural`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.getStruktural(1, this.limit, this.searchData)
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    gotoForm(){
      let payload = {
        method: "get",
				url: `settings/getUID`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let resdata = res.data.result
        this.$router.push({name: "FormulirStruktural", params: { kondisi: 'ADD', uid: resdata }});
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
    ubahData(uid){
      this.$router.push({name: "FormulirStruktural", params: { kondisi: 'EDIT', uid: uid }});
    },
    openDialog(item){
      // this.getAdminbyUID(uid)
      this.previewData = {
        idUser: item.idUser,
        namaRole: item.namaRole,
        nama: item.nama,
        username: item.username,
        email: item.email,
        password: item.kataSandi,
        tempat: item.tempat,
        tanggalLahir: item.tanggalLahir,
        jenisKelamin: item.jenisKelamin,
        agama: item.agama.label,
        telp: item.telp,
        alamat: item.alamat,
        provinsi: this.uppercaseLetterFirst(item.provinsi.nama),
        kabKota: this.uppercaseLetterFirst(item.kabKota.nama),
        kecamatan: this.uppercaseLetterFirst(item.kecamatan.nama),
        kelurahan: this.uppercaseLetterFirst(item.kelurahan.nama),
        kodePos: item.kodePos,
        nomorInduk: item.nomorInduk,
        pendidikanGuru: item.pendidikanGuru.label,
        jabatanGuru: item.jabatanGuru.map(str => { return str.label; }).sort().join(', '),
        mengajarBidang: item.mengajarBidang.map(str => { return str.label; }).sort().join(', '),
        mengajarKelas: item.mengajarKelas,
        waliKelas: item.waliKelas,
        fotoProfil: item.fotoProfil,
      }
      this.DialogStruktural = true
    },
    clearData(){
      this.previewData = {
        idUser: '',
        namaRole: '',
        nama: '',
        username: '',
        email: '',
        password: '',
        tempat: '',
        tanggalLahir: '',
        jenisKelamin: '',
        agama: '',
        telp: '',
        alamat: '',
        provinsi: '',
        kabKota: '',
        kecamatan: '',
        kelurahan: '',
        kodePos: '',
        nomorInduk: '',
        pendidikanGuru: '',
        jabatanGuru: '',
        mengajarBidang: '',
        mengajarKelas: '',
        waliKelas: '',
        fotoProfil: '',
      }
    },
    endecryptData(d) {
      this[d] = !this[d]
      let url = this[d] ? 'decryptPass' : 'encryptPass' 
      let payload = {
				method: "get",
				url: `settings/${url}?kata=${this.previewData.password}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
				this.previewData.password = res.data.result.hasil;
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
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
  font-size: 13px !important;
}
</style>