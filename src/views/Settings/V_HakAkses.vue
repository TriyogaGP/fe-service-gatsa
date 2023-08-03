<template>
  <div>
		<h1 class="subheading grey--text">Panel Hak Akses</h1>
		<v-row no-gutters class="pa-2">
			<v-col cols="12" md="6">
				<v-btn
					color="light-blue darken-3"
					small
					dense
					depressed
					class="ma-2 white--text text--darken-2"
					@click.stop="bukaDialog(null, 0)"
				>
					<v-icon small>add</v-icon>&nbsp;Tambah
				</v-btn>
			</v-col>
			<v-col cols="12" md="6">
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
					@keyup.enter="getRole({page: 1, limit: limit, keyword: searchData})"
				/>
			</v-col>
    </v-row>
    <div class="px-1">
			<v-data-table
				loading-text="Sedang memuat... Harap tunggu"
				no-data-text="Tidak ada data yang tersedia"
				no-results-text="Tidak ada catatan yang cocok ditemukan"
				:headers="headers"
				:loading="loadingtable"
				:items="DataHakAkses"
				:single-expand="singleExpand"
				:expanded.sync="expanded"
				show-expand
				item-key="idRole"
				hide-default-footer
				class="elevation-1"
				:items-per-page="itemsPerPage"
				@page-count="pageCount = $event"
			>
				<!-- <template v-slot:header="{ props }">
					<thead class="v-data-table-header">
						<tr>
							<th v-for="header in props.headers" :key="header.text" style="font-weight: bold;">{{ header.text.toUpperCase() }}</th>
						</tr>
					</thead>
				</template> -->
				<template #[`item.number`]="{ item }">
					{{ page > 1 ? ((page - 1)*limit) + DataHakAkses.indexOf(item) + 1 : DataHakAkses.indexOf(item) + 1 }}
				</template>
				<template #[`item.status`]="{ item }">
					<v-icon small v-if="item.status === true" color="green">check</v-icon>
					<v-icon small v-else-if="item.status == false" color="red">clear</v-icon>
					<br>
					<span v-html="item.status == true ? 'Active' : 'Non Active'" /> 
				</template>
				<template #expanded-item="{ headers, item }">
					<td :colspan="headers.length" class="white">
						<v-btn
							:value="item.idRole"
							color="#0bd369"
							small
							dense
							depressed
							class="ma-2 white--text text--darken-2"
							@click="bukaDialog(item, 1)"
						>
						<v-icon small>edit</v-icon>&nbsp;Ubah
						</v-btn> 
						<v-btn
							:value="item.idRole"
							color="#0bd369"
							small
							dense
							depressed
							class="ma-2 white--text text--darken-2"
							@click="postRecord(item, 'STATUSRECORD', !item.status)"
						>
							<v-icon small>{{ item.status === false ? 'visibility' : 'visibility_off' }}</v-icon>&nbsp;{{ item.status === false ? 'Active' : 'Non Active' }}
						</v-btn> 
						<v-btn
							:value="item.idRole"
							color="#bd3a07"
							small
							dense
							depressed
							class="ma-2 white--text text--darken-2"
							@click="postRecord(item, 'DELETE', null)"
						>
							<v-icon small>delete</v-icon>&nbsp;Hapus
						</v-btn>
						<v-divider />
					</td>
				</template>
			</v-data-table>
		</div>
		<v-row>
			<!-- <v-col cols="12" class="mt-2 pa-2 px-5">
				<v-pagination
					v-if="DataHakAkses.length > 0"
					v-model="page"
					:length="pageCount"
					:total-visible="5"
				/>
			</v-col> -->
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
						outlined
						dense
						color="light-black darken-3"
						hide-details
						:disabled="DataHakAkses.length ? false : true"
					/>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataHakAkses.length ? pageSummary.page != 1 ? false : true : true"
						@click="() => { page = pageSummary.page - 1 }"
					>
						keyboard_arrow_left
					</v-icon>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataHakAkses.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
						@click="() => { page = pageSummary.page + 1 }"
					>
						keyboard_arrow_right
					</v-icon>
				</div>
			</v-col>
		</v-row>
		<v-dialog
      v-model="DialogRole"
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
          <v-toolbar-title>{{editedIndex == 0 ? 'Tambah' : editedIndex == 1 ? 'Ubah' : 'View'}} Data Hak Akses</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="tutupDialog"
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
							Role Name
						</v-col>
						<v-col
							cols="12"
							md="8"
							class="pt-3"
						>
							<v-text-field
								v-model="inputRole.nama_role"
								placeholder="Role Name"
								outlined
								dense
								label="Role Name"
								color="light-black darken-3"
								hide-details
								clearable
							/>
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
								v-if="editedIndex == 0"
								color="light-blue darken-3"
								class="white--text text--darken-2"
								small
								dense
								depressed
								:disabled="kondisiTombol"
								@click="postRecord(null, 'ADD', null)"
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
								@click="postRecord(null, 'EDIT', null)"
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
import PopUpNotifikasiVue from "../Layout/PopUpNotifikasi.vue";
export default {
  name: 'HakAkses',
	components: { PopUpNotifikasiVue },
  data: () => ({
		DataHakAkses: [],
		expanded: [],
    singleExpand: true,
		searchData: "",
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
		pageSummary: {
			page: '',
			limit: '',
			total: '',
			totalPages: ''
		},
		headers: [
      { text: "No", value: "number", sortable: false, width: "7%" },
      { text: "#", value: "data-table-expand", sortable: false, width: "5%" },
      { text: "NAMA ROLE", value: "namaRole", sortable: false },
      { text: "STATUS ROLE", value: "status", sortable: false },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,
		DialogRole: false,
		kondisiTombol: true,
		editedIndex: 0,
		inputRole: {
			id_role: '',
			nama_role: '',
		},

		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Settings (Hak Akses) - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
	computed: {
		...mapState({
			loadingtable: store => store.setting.loadingtable,
		}),
		...mapGetters({
			roleAll: 'setting/roleAll',
		}),
	},
	watch: {
		roleAll: {
			deep: true,
			handler(value) {
				this.DataHakAkses = value.records
				this.pageSummary = {
					page: value.pageSummary.page,
					limit: value.pageSummary.limit,
					total: value.pageSummary.total,
					totalPages: value.pageSummary.totalPages
				}
			}
		},
    inputRole: {
      deep: true,
      handler(value){
				if(value.nama_role == null){ this.inputRole.nama_role = '' }
        if(value.nama_role != ''){
          this.kondisiTombol = false
        }else{
          this.kondisiTombol = true
        }
      }
    },
		page: {
			deep: true,
			handler(value) {
				this.getRole({page: value, limit: this.limit, keyword: this.searchData})
			}
		},
		limit: {
			deep: true,
			handler(value) {
				this.page = 1
				this.getRole({page: 1, limit: value, keyword: this.searchData})
			}
		},
  },
	mounted() {
		this.getRole({page: 1, limit: this.limit, keyword: this.searchData});
	},
	methods: {
		...mapActions({
			getRole: 'setting/getRole',	
		}),
		postRecord(item, jenis, status) {
      let bodyData = {
				ADDEDIT: {
					jenis: jenis,
					id_role: jenis === 'ADD' ? '' : this.inputRole.id_role,
					nama_role: this.inputRole.nama_role,
				},
				STATUSDELETE: {
					jenis: jenis,
					id_role: item.idRole,
					status: status,
				}
      }
      this.$store.dispatch('setting/postRole', jenis === 'ADD' || jenis === 'EDIT' ? bodyData.ADDEDIT : bodyData.STATUSDELETE)
      .then((res) => {
        this.DialogRole = false
        this.getRole({page: 1, limit: this.limit, keyword: this.searchData});
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		bukaDialog(item, index){
      this.editedIndex = index
      if(index == 0){
        this.inputRole.id_role = ''
        this.inputRole.nama_role = ''
      }else{
				this.inputRole.id_role = item.idRole
        this.inputRole.nama_role = item.namaRole
      }
      this.DialogRole = true
    },
		tutupDialog(){
			this.inputRole.id_role = ''
			this.inputRole.nama_role = ''
			this.DialogRole = false
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