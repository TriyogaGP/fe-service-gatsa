<template>
  <div>
    <h1 class="subheading grey--text">Data Kelas</h1>
    <v-card class="mt-2 mb-2 pa-1" outlined elevation="0">
      <v-row no-gutters class="pa-2">
        <v-col cols="12" md="6">
          <v-btn
            color="light-blue darken-3"
            small
            dense
            depressed
            class="ma-2 white--text text--darken-2"
            @click="openDialog(null, 0)"
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
                dense
                color="light-black darken-3"
                clearable
                @keyup.enter="getKelas({page: 1, limit: limit, keyword: searchData})"
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
                :disabled="DataKelas.length ? false : true"
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
          :loading="loadingtable"
          :items="DataKelas"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
          item-key="idKelas"
          hide-default-footer
          class="elevation-1"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
        >
          <!-- header -->
          <!-- <template v-slot:header="{ props }">
            <thead class="v-data-table-header">
              <tr>
                <th v-for="header in props.headers" :key="header.text">{{ header.text.toUpperCase() }}</th>
              </tr>
            </thead>
          </template> -->
          <template #[`item.number`]="{ item }">
            {{ page > 1 ? ((page - 1)*limit) + DataKelas.indexOf(item) + 1 : DataKelas.indexOf(item) + 1 }}
          </template>
          <template #[`item.namaRole`]="{ item }">
            <span v-html="item.namaRole" /> 
          </template>
          <template #[`item.status`]="{ item }">
            <v-icon small v-if="item.status == true" color="green">check</v-icon>
            <v-icon small v-else-if="item.status == false" color="red">clear</v-icon>
            <br>
            <span v-html="item.status == true ? 'Active' : 'Non Active'" /> 
          </template>
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="white">
              <v-btn
                :value="item.idKelas"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.status == false"
                @click="openDialog(item, 1)"
              >
                <v-icon small>edit</v-icon>&nbsp;Ubah
              </v-btn> 
              <v-btn
                :value="item.idKelas"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="postRecord('STATUSRECORD', item, !item.status)"
              >
                <v-icon small>{{ item.status === false ? 'visibility' : 'visibility_off' }}</v-icon>&nbsp;{{ item.status === false ? 'Active' : 'Non Active' }}
              </v-btn> 
              <v-btn
                :value="item.idKelas"
                color="#bd3a07"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.status == false"
                @click="postRecord('DELETE', item, null)"
              >
                <v-icon small>delete</v-icon>&nbsp;Hapus
              </v-btn> 
              <v-btn
                :value="item.idKelas"
                color="#04f7f7"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="openDialog(item, 2)"
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
						:disabled="DataKelas.length ? false : true"
					/>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataKelas.length ? pageSummary.page != 1 ? false : true : true"
						@click="() => { page = pageSummary.page - 1 }"
					>
						keyboard_arrow_left
					</v-icon>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataKelas.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
						@click="() => { page = pageSummary.page + 1 }"
					>
						keyboard_arrow_right
					</v-icon>
				</div>
			</v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="DialogKelas"
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
          <v-toolbar-title>{{editedIndex == 0 ? 'Tambah' : editedIndex == 1 ? 'Ubah' : 'View'}} Data Kelas</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { clearData(); DialogKelas = false; }"
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
              Kelas
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-text-field
                v-model="inputDataKelas.kelas"
                placeholder="Kelas"
                outlined
                dense
                label="Kelas"
                color="light-black darken-3"
                hide-details
                :clearable="editedIndex != 2"
                :readonly="editedIndex == 2"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row 
            no-gutters
            class="mr-3"
          >
            <v-col
              class="text-end"
              cols="12"
            >
              <v-btn
                v-if="editedIndex == 0"
                color="light-blue darken-3"
                class="white--text text--darken-2"
                small
                dense
                depressed
                :disabled="kondisiTombol"
                @click="postRecord('ADD', null, null)"
              >
                Simpan Data
              </v-btn> 
              <v-btn
                v-else-if="editedIndex == 1"
                color="light-blue darken-3"
                class="white--text text--darken-2"
                small
                dense
                depressed
                :disabled="kondisiTombol"
                @click="postRecord('EDIT', null, null)"
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
import { mapActions, mapGetters, mapState } from "vuex";
import PopUpNotifikasiVue from "../../Layout/PopUpNotifikasi.vue";
export default {
  name: 'DataKelas',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
		DataKelas: [],
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
      { text: "NO", value: "number", sortable: false, width: "3%" },
      { text: "#", value: "data-table-expand", sortable: false, width: "3%" },
      { text: "KELAS", value: "kelas", sortable: false, width: "25%" },
      { text: "STATUS", value: "status", sortable: false, width: "25%" },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,
    roleID: '',
    idLog: '',
    inputDataKelas: {
      id_kelas: '',
      kelas: '',
    },
    editedIndex: 0,
    kondisiTombol: true,
    DialogKelas: false,

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Data Kelas - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
    ...mapState({
      loadingtable: store => store.kelas.loadingtable
    }),
    ...mapGetters({
      kelasAll: 'kelas/kelasAll',
    }),
  },
  watch: {
    kelasAll: {
      deep: true,
      handler(value){
        this.DataKelas = value.records
				this.pageSummary = {
					page: this.DataKelas.length ? value.pageSummary.page : 0,
					limit: this.DataKelas.length ? value.pageSummary.limit : 0,
					total: this.DataKelas.length ? value.pageSummary.total : 0,
					totalPages: this.DataKelas.length ? value.pageSummary.totalPages : 0
				}
        for (let index = 1; index <= this.pageSummary.totalPages; index++) {
          this.pageOptions.push({ value: index })
        }
      }
    },
    inputDataKelas: {
      deep: true,
      handler(value){
        if(value.kelas != ''){
          this.kondisiTombol = false
        }else{
          this.kondisiTombol = true
        }
      }
    },
    page: {
			deep: true,
			handler(value) {
				this.getKelas({page: value, limit: this.limit, keyword: this.searchData})
			}
		},
    limit: {
			deep: true,
			handler(value) {
        this.page = 1
				this.getKelas({page: 1, limit: value, keyword: this.searchData})
			}
		},
  },
  mounted() {
    this.roleID = localStorage.getItem('roleID')
    this.idLog = localStorage.getItem('idLogin')
		this.getKelas({page: this.page, limit: this.limit, keyword: this.searchData});
	},
	methods: {
		...mapActions({
      getKelas: 'kelas/getKelas',
    }),
    postRecord(jenis, item = null, status) {
      let bodyData = {
        ADDEDIT: {
          jenis: jenis,
          id_kelas: jenis === 'ADD' ? '' : this.inputDataKelas.id_kelas,
          kelas: this.inputDataKelas.kelas,
        },
        DELETESTATUS: {
          jenis: jenis,
          id_kelas: item.idKelas,
          status: status,
        },
      }
      this.$store.dispatch('kelas/postKelas', jenis === 'ADD' || jenis === 'EDIT' ? bodyData.ADDEDIT : bodyData.DELETESTATUS)
      .then((res) => {
        this.DialogKelas = false
        this.getKelas({page: 1, limit: this.limit, keyword: this.searchData})
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
    openDialog(item, index){
      this.editedIndex = index
      if(index == 0){
        this.clearData()
      }else{
        this.inputDataKelas = {
          id_kelas: item.idKelas,
          kelas: item.kelas,
        }
      }
      this.DialogKelas = true
    },
    clearData(){
      this.inputDataKelas = {
        id_kelas: '',
        kelas: '',
      }
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
</style>