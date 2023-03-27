<template>
  <div>
    <h1 class="subheading grey--text">Data Jadwal Mengajar</h1>
    <v-card class="mt-2 mb-2 pa-1" outlined elevation="0">
      <v-row no-gutters class="pa-2">
        <v-col cols="12" md="6" />
        <v-col cols="12" md="6">
          <v-row no-gutters>
            <v-col cols="12" md="9">
              <v-text-field
                v-model="searchData"
                append-icon="mdi-magnify"
                label="Pencarian Nama Guru ..."
                single-line
                hide-details
                solo
                color="light-blue darken-3"
                clearable
                @keyup.enter="getJadwalMengajar(1, limit, searchData)"
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
                :disabled="DataJadwalMengajar.length ? false : true"
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
          :items="DataJadwalMengajar"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
          item-key="idUser"
          hide-default-footer
          class="elevation-1"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
        >
          <template #[`item.number`]="{ item }">
            {{ page > 1 ? ((page - 1)*limit) + DataJadwalMengajar.indexOf(item) + 1 : DataJadwalMengajar.indexOf(item) + 1 }}
          </template>
          <template #[`item.nama`]="{ item }">
            <span v-html="uppercaseLetterFirst(item.nama)" /> 
          </template>
          <template #[`item.datamapel`]="{ item }"> 
						<span v-for="(val, i) in item.dataJadwalMengajar" :key="i" class="box fourcorners" @click="bukadialog(item.dataJadwalMengajar[i])" style="cursor: pointer;">
							<strong><span v-html="val.mapel" /></strong>
						</span>
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
                @click="ubahData(item)"
              >
                <v-icon small>edit</v-icon>&nbsp;Ubah
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
						:disabled="DataJadwalMengajar.length ? false : true"
					/>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataJadwalMengajar.length ? pageSummary.page != 1 ? false : true : true"
						@click="() => { page = pageSummary.page - 1 }"
					>
						keyboard_arrow_left
					</v-icon>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataJadwalMengajar.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
						@click="() => { page = pageSummary.page + 1 }"
					>
						keyboard_arrow_right
					</v-icon>
				</div>
			</v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="DialogJadwalMengajar"
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
          <v-toolbar-title>Ubah Data Jadwal Mengajar</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { DialogJadwalMengajar = false; }"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pt-4">
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
              class="pt-3"
            >
              <v-autocomplete
                v-model="inputData.mapel"
                :items="mengajarOptions"
                placeholder="Pilih Mata Pelajaran"
                label="Pilih Mata Pelajaran"
                item-text="label"
                item-value="label"
                multiple
                outlined
                hide-details
                dense
                color="light-black darken-3"
                clearable
                >
                <template #selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    small
                    outlined
                    class="ma-1"
                    color="light-black darken-3"
                    @click="data.select"
                    @click:close="remove(data.item, 'mapel')"
                  >
                    {{ data.item.label }}
                  </v-chip>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Kelas
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-autocomplete
                v-model="inputData.kelas"
                :items="kelasOptions"
                placeholder="Pilih Kelas"
                label="Pilih Kelas"
                item-text="kelas"
                item-value="kelas"
                multiple
                outlined
                hide-details
                dense
                color="light-black darken-3"
                clearable
              >
                <template #selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    small
                    outlined
                    class="ma-1"
                    color="light-black darken-3"
                    @click="data.select"
                    @click:close="remove(data.item, 'kelas')"
                  >
                    {{ data.item.kelas }}
                  </v-chip>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
					<v-row 
						no-gutters
						class="mt-1 mr-3"
					>
						<v-col
							class="text-end"
							cols="12"
						>
							<v-btn
								color="light-blue darken-3"
								class="white--text text--darken-2"
								small
								dense
								depressed
								@click="SimpanForm()"
							>
								Ubah Data
							</v-btn>
						</v-col>
					</v-row>
				</v-card-actions>
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
  name: 'DataJadwalMengajar',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
    isLoading: false,
		DataJadwalMengajar: [],
		dataKelasMapel: [],
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
      { text: "No", value: "number", sortable: false, width: "3%" },
      { text: "#", value: "data-table-expand", sortable: false, width: "3%" },
      { text: "NOMOR INDUK", value: "nomorInduk", sortable: false, width: "20%" },
      { text: "NAMA", value: "nama", sortable: false, width: "20%" },
      { text: "MATA PELAJARAN", value: "datamapel", sortable: false, width: "35%" },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,
    DialogJadwalMengajar: false,
    mengajarOptions: [],
    kelasOptions: [],
    inputData: {
      idUser: '',
      mapel: '',
      kelas: '',
    },

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Data Jadwal Mengajar - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  watch: {
    page: {
			deep: true,
			handler(value) {
				this.getJadwalMengajar(value, this.limit, this.searchData)
			}
		},
    limit: {
			deep: true,
			handler(value) {
				this.getJadwalMengajar(1, value, this.searchData)
			}
		},
  },
  mounted() {
		this.getJadwalMengajar(this.page, this.limit, this.searchData)
	},
	methods: {
		...mapActions(["fetchData"]),
    getJadwalMengajar(page = 1, limit, keyword) {
      this.itemsPerPage = limit
      this.page = page
			this.isLoading = true
      this.DataJadwalMengajar = []
      this.pageOptions = [{ value: 1 }]
			this.pageSummary = {
				page: '',
				limit: '',
				total: '',
				totalPages: ''
			}
			let payload = {
        method: "get",
				url: `user/jadwal?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ''}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let resdata = res.data.result
				this.DataJadwalMengajar = resdata.records
				this.pageSummary = {
					page: this.DataJadwalMengajar.length ? resdata.pageSummary.page : 0,
					limit: this.DataJadwalMengajar.length ? resdata.pageSummary.limit : 0,
					total: this.DataJadwalMengajar.length ? resdata.pageSummary.total : 0,
					totalPages: this.DataJadwalMengajar.length ? resdata.pageSummary.totalPages : 0
				}
        for (let index = 1; index <= this.pageSummary.totalPages; index++) {
          this.pageOptions.push({ value: index })
        }
        this.isLoading = false
			})
			.catch((err) => {
        this.itemsPerPage = limit
        this.page = page
        this.DataJadwalMengajar = []
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
    SimpanForm() {
      let bodyData = {
        idUser: this.inputData.idUser,
        kelas: this.inputData.kelas,
        mapel: this.inputData.mapel,
      }
      let payload = {
				method: "post",
				url: `user/jadwal`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.DialogJadwalMengajar = false
        this.getJadwalMengajar(this.page, this.limit, this.searchData)
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    optionMengajar(){
      let payload = {
        method: "get",
				url: `settings/optionsMengajar`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.mengajarOptions = res.data.result
			})
    },
    optionKelas(){
      let payload = {
        method: "get",
				url: `settings/optionsKelas`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.kelasOptions = res.data.result
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
    remove(item, kondisi) {
      if(kondisi === 'mapel'){
        this.inputData.mapel.splice(this.inputData.mapel.indexOf(item.label), 1);
      }else if(kondisi === 'kelas'){
        this.inputData.kelas.splice(this.inputData.kelas.indexOf(item.kelas), 1);
      }
      console.log(this.inputData.mapel);
    },
    bukadialog(item){
      this.dataKelasMapel = item.resdata
      console.log('xxx', this.dataKelasMapel);
    },
    ubahData(item){
      this.optionMengajar()
      this.optionKelas()
      this.inputData = {
        idUser: item.idUser,
        mapel: item.dataJadwalMengajar.map(str => str.mapel),
        kelas: item.dataJadwalMengajar.map(str => {
          return str.resdata.map(val => val.kelas)
        })[0],
      }
      // console.log('xxx', this.inputData);
      this.DialogJadwalMengajar = true
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
.box{
	width: 75px;
	height: 40px;
  background-image:-moz-linear-gradient(top, #FAD502, #E89502);
	background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#FAD502), to(#E89502), color-stop(1,#E89502));
	margin: 2px;
}
.fourcorners{
	-moz-border-radius: 10px;
	-webkit-border-radius: 10px;
	-khtml-border-radius: 10px; 
	border-radius: 10px;
	padding: 10px;
	text-align: center;
	font-size: 12px;
}
</style>