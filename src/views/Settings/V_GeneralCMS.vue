<template>
  <div>
		<h1 class="subheading grey--text">Panel General CMS</h1>
    <v-row>
      <v-col cols="12" md="12" class="text-right">
				<v-menu
					open-on-hover
					rounded="t-xs b-lg"
					offset-y
					transition="slide-y-transition"
					bottom
				>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							v-bind="attrs"
							v-on="on"
							color="light-green darken-3"
							small
							dense
							depressed
							class="ma-1 white--text text--darken-2"
						>
							Upload Berkas
						</v-btn>
					</template>

					<v-list>
						<v-list-item
							@click="() => {
								this.DialogUploadBerkas = true
								this.jenisUpload = 'Gambar'
							}"
							class="SelectedMenu"
							active-class="SelectedMenu-active"
						>
							<v-icon small>fas fa-upload</v-icon>
							<v-list-item-title>
								<span>&nbsp;Gambar</span>
							</v-list-item-title>
						</v-list-item>
						<v-list-item
							@click="() => {
								this.DialogUploadBerkas = true
								this.jenisUpload = 'File'
							}"
							class="SelectedMenu"
							active-class="SelectedMenu-active"
						>
							<v-icon small>fas fa-upload</v-icon>
							<v-list-item-title>
								<span>&nbsp;File</span>
							</v-list-item-title>
						</v-list-item>
						<v-list-item
							@click="openDialogDataBerkas()"
							class="SelectedMenu"
							active-class="SelectedMenu-active"
						>
							<v-icon small>list</v-icon>
							<v-list-item-title>
								<span>&nbsp;Data Berkas</span>
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
        <v-btn
					color="light-blue darken-3"
					small
					dense
					depressed
					class="ma-1 white--text text--darken-2"
					@click="SimpanGeneranCMS()"
				>
					Simpan Data
				</v-btn>
      </v-col>
    </v-row>
    <v-card class="mt-2 mb-2 pa-2 ma-1">
      <h2><u>Default Settings</u></h2>
      <v-row no-gutters>
        <v-col cols="12" md="6" class="pa-4">
          <v-text-field
						v-model="inputData.namasekolah"
						placeholder="Nama Sekolah"
						outlined
						dense
						label="Nama Sekolah"
						color="light-black darken-3"
						hide-details
						clearable
					/>
        </v-col>
        <v-col cols="12" md="6" class="pa-4">
          <v-autocomplete
						v-model="inputData.statussekolah"
						:items="statusSekolahOptions"
						item-text="label"
						item-value="kode"
						placeholder="Status Sekolah"
						label="Status Sekolah"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					/>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="6" class="pa-4">
          <v-autocomplete
						v-model="inputData.tahunpelajaran"
						:items="tahunOptions"
						item-text="label"
						item-value="value"
						placeholder="Tahun Pelajaran"
						label="Tahun Pelajaran"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					/>
        </v-col>
        <v-col cols="12" md="6" class="pa-4">
					<v-autocomplete
						v-model="inputData.pdfraport"
						:items="raportOptions"
						item-text="label"
						item-value="value"
						placeholder="Raport PDF"
						label="Raport PDF"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					/>
				</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="6" class="pa-4">
          <v-autocomplete
						v-model="inputData.jenisraport"
						:items="jenisRaportOptions"
						item-text="label"
						item-value="value"
						placeholder="Jenis Raport"
						label="Jenis Raport"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					/>
        </v-col>
        <v-col cols="12" md="6" class="pa-4">
					<v-autocomplete
						v-model="inputData.semester"
						:items="semesterOptions"
						item-text="label"
						item-value="value"
						placeholder="Semester"
						label="Semester"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					/>
				</v-col>
      </v-row>
    </v-card>
    <v-card class="mt-2 mb-2 pa-2 ma-1">
      <h2><u>Address Settings</u></h2>
      <v-row no-gutters>
        <v-col cols="12" md="6" class="pa-4">
          <v-text-field
						value="Indonesia"
						placeholder="Negara"
						outlined
						dense
						label="Negara"
						color="light-black darken-3"
						hide-details
						disabled
					/>
        </v-col>
        <v-col cols="12" md="6" class="pa-4">
          <v-autocomplete
						v-model="inputData.provinsi"
						:items="ProvinsiOptions"
						item-text="text"
						item-value="value"
						placeholder="Provinsi"
						label="Provinsi"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
						@change="wilayah('provinsi', $event)"
					/>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="6" class="pa-4">
          <v-autocomplete
						v-model="inputData.kabupatenkota"
						:items="KabKotaOptions"
						item-text="text"
						item-value="value"
						placeholder="Kabupaten / Kota"
						label="Kabupaten / Kota"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
						:disabled="inputData.provinsi ? false : true"
						@change="wilayah('kabkota', $event)"
					/>
        </v-col>
        <v-col cols="12" md="6" class="pa-4">
          <v-autocomplete
						v-model="inputData.kecamatan"
						:items="KecamatanOptions"
						item-text="text"
						item-value="value"
						placeholder="Kecamatan"
						label="Kecamatan"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
						:disabled="inputData.kabupatenkota ? false : true"
						@change="wilayah('kecamatan', $event)"
					/>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="6" class="pa-4">
          <v-autocomplete
						v-model="inputData.kelurahan"
						:items="KelurahanOptions"
						item-text="text"
						item-value="value"
						placeholder="Kelurahan"
						label="Kelurahan"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
						:disabled="inputData.kecamatan ? false : true"
						@change="wilayah('kelurahan', $event)"
					/>
        </v-col>
        <v-col cols="12" md="6" class="pa-4">
          <v-text-field
            v-model="inputData.kodepos"
						placeholder="Kode Pos"
						outlined
						dense
						label="Kode Pos"
						color="light-black darken-3"
						hide-details
						disabled
					/>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="12" class="pa-4">
          <v-textarea
						v-model="inputData.alamat"
						placeholder="Alamat"
						outlined
						dense
						rows="4"
						label="Alamat"
						color="light-black darken-3"
						hide-details
						clearable
						no-resize
					/>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="4" class="pa-4">
          <v-text-field
            v-model="inputData.telepon"
						placeholder="Telepon"
						outlined
						dense
						label="Telepon"
						color="light-black darken-3"
						hide-details
						clearable
					/>
        </v-col>
        <v-col cols="12" md="4" class="pa-4">
          <v-text-field
            v-model="inputData.latitude"
						placeholder="Latitude"
						outlined
						dense
						label="Latitude"
						color="light-black darken-3"
						hide-details
						clearable
					/>
        </v-col>
        <v-col cols="12" md="4" class="pa-4">
          <v-text-field
            v-model="inputData.longitude"
						placeholder="Longitude"
						outlined
						dense
						label="Longitude"
						color="light-black darken-3"
						hide-details
						clearable
					/>
        </v-col>
      </v-row>
    </v-card>
		<v-dialog
      v-model="DialogUploadBerkas"
      fullscreen
      scrollable
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>Upload Berkas - {{ jenisUpload }}</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => {
								this.DialogUploadBerkas = false
								this.MultipleBerkas = []
								this.imageMultiple = []
								this.fileMultiple = []
								this.jenisUpload = ''
							}"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="height: 100%;">
          <div class="px-5">
            <v-divider />
          </div>
          <div>
						<v-row no-gutters>
							<v-col
								cols="12"
								class="pt-2 d-flex align-center"
							>
								<v-text-field
									v-model="MultipleBerkas"
									placeholder="Upload"
									outlined
									dense
									style="display: none"
								/>
								<input 
									ref="inputMultipleFile"
									:key="componentKey"
									type="file"
									multiple
									style="display: none"
									:accept="`${jenisUpload === 'Gambar' ? 'image/x-png,image/jpg,image/jpeg' : '.xlsx,.xls,.doc,.docx,.txt,.pdf'}`"
									@change="addFiles($event)"
								>
								<v-btn depressed small color="light-blue darken-3" dark @click="$refs.inputMultipleFile.click()">
									<v-icon small left>upload</v-icon> Upload Berkas
								</v-btn>
							</v-col>  
						</v-row>
						<v-row v-if="jenisUpload === 'Gambar'">
							<v-col
								class="ma-1 d-flex flex-column justify-space-between align-center"
								v-for="(file,f) in MultipleBerkas" :key="f"
							>
								<div class="kotakGambar">
									<img :ref="'file'" :src="imageMultiple[f].url" :title="file.name" class="responsiveImage"/>
									<v-icon small color="red" @click="HapusMultiple(f)">delete</v-icon>
									<v-text-field
										v-model="imageMultiple[f].title"
										placeholder="Title"
										outlined
										dense
										label="Title"
										color="light-blue darken-3"
										class="mt-1"
										hide-details
										clearable
									/>
								</div>
							</v-col>
						</v-row>
						<div v-if="jenisUpload === 'File'">
							<div v-for="(file,f) in fileMultiple" :key="f" class="wadahFile">
								<div class="kotakFile">
									<v-icon v-if="file.ext === 'docx'" class="iconFile" x-large>far fa-file-word</v-icon>
									<v-icon v-if="file.ext === 'xlsx'" class="iconFile" x-large>far fa-file-excel</v-icon>
									<v-icon v-if="file.ext === 'pdf'" class="iconFile" x-large>far fa-file-pdf</v-icon>
									<v-icon v-if="file.ext === 'txt'" class="iconFile" x-large>far fa-file-alt</v-icon>
									<span class="textFile">{{ file.name }}</span>
									<span class="textFile" style="float: right; margin-right: 2px;">&nbsp;<v-icon large color="red" @click="HapusMultiple(f)">delete</v-icon></span>
								</div>
								<v-divider />
								<v-text-field
									v-model="fileMultiple[f].title"
									placeholder="Title"
									outlined
									dense
									label="Title"
									color="light-blue darken-3"
									class="ma-1"
									hide-details
									clearable
								/>
							</div>
						</div>
          </div>
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
								class="mr-3 white--text text--darken-2"
								small
								dense
								depressed
								:disabled="this.MultipleBerkas.length ? false : true"
								@click="() => { this.imageMultiple = []; this.fileMultiple = []; this.MultipleBerkas = []; }"
							>
								Batal
							</v-btn>
							<v-btn
								color="light-blue darken-3"
								class="white--text text--darken-2"
								small
								dense
								depressed
								:disabled="this.MultipleBerkas.length ? false : true"
								@click="SimpanMultiple()"
							>
								Upload Berkas
							</v-btn> 
						</v-col>
					</v-row>
				</v-card-actions>
      </v-card>
    </v-dialog>
		<v-dialog
      v-model="DialogBerkas"
      transition="dialog-bottom-transition"
      persistent
			scrollable
			width="1000px"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>Data - Data Berkas</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="DialogBerkas = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pt-4">
          <v-row no-gutters class="pa-2">
						<v-col cols="12" md="6" />
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
								@keyup.enter="getDataBerkas({page: 1, limit: limit, keyword: searchData})"
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
							:items="dataBerkas"
							item-key="idBerkas"
							hide-default-footer
							class="elevation-1"
							:items-per-page="itemsPerPage"
							@page-count="pageCount = $event"
						>
							<template #[`item.number`]="{ item }">
								{{ page > 1 ? ((page - 1)*limit) + dataBerkas.indexOf(item) + 1 : dataBerkas.indexOf(item) + 1 }}
							</template>
							<template #[`item.title`]="{ item }">
								<div class="kotakFile">
									<img v-if="item.type === 'Gambar'" :ref="'file'" :src="item.file" :title="item.title" class="iconFile"/>
									<v-icon v-if="item.type === 'File' && item.ext === 'docx'" class="iconFile" large>far fa-file-word</v-icon>
									<v-icon v-if="item.type === 'File' && item.ext === 'xlsx'" class="iconFile" large>far fa-file-excel</v-icon>
									<v-icon v-if="item.type === 'File' && item.ext === 'pdf'" class="iconFile" large>far fa-file-pdf</v-icon>
									<v-icon v-if="item.type === 'File' && item.ext === 'txt'" class="iconFile" large>far fa-file-alt</v-icon>
									<span class="textFile">{{ `${item.title}.${item.ext}` }}</span>
								</div>
							</template>
							<template #[`item.opsi`]="{ item }">
								<v-switch color="black" v-model="item.statusAktif" @click="postRecord(item)" />
							</template>
							<template #[`item.statusAktif`]="{ item }">
								<v-icon small v-if="item.statusAktif === true" color="green">check</v-icon>
								<v-icon small v-else-if="item.statusAktif == false" color="red">clear</v-icon>
								<br>
								<span v-html="item.statusAktif == true ? 'Active' : 'Non Active'" />
							</template>
						</v-data-table>
					</div>
					<v-row>
						<v-col cols="9" class="mt-2 d-flex justify-start align-center">
							<span>Halaman <strong>{{ pageSummary.page ? pageSummary.page : 0 }}</strong> dari Total Halaman <strong>{{ pageSummary.totalPages ? pageSummary.totalPages : 0 }}</strong> (Records {{ pageSummary.total ? pageSummary.total : 0 }})</span>
						</v-col>
						<v-col cols="3" class="mt-2 text-right">
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
									:disabled="dataBerkas.length ? false : true"
								/>
								<v-icon
									style="cursor: pointer;"
									large
									:disabled="dataBerkas.length ? pageSummary.page != 1 ? false : true : true"
									@click="() => { page = pageSummary.page - 1 }"
								>
									keyboard_arrow_left
								</v-icon>
								<v-icon
									style="cursor: pointer;"
									large
									:disabled="dataBerkas.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
									@click="() => { page = pageSummary.page + 1 }"
								>
									keyboard_arrow_right
								</v-icon>
							</div>
						</v-col>
					</v-row>
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
import PopUpNotifikasiVue from "../Layout/PopUpNotifikasi.vue";
export default {
  name: 'GeneralCMS',
	components: { PopUpNotifikasiVue },
  data: () => ({
    statusSekolahOptions: [
			{ label: 'Negeri', kode: 1 },
			{ label: 'Swasta', kode: 2 },
		],
    raportOptions: [
			{ label: 'False', value: 0 },
			{ label: 'True', value: 1 },
		],
    semesterOptions: [
			{ label: 'Genap', value: 0 },
			{ label: 'Ganjil', value: 1 },
		],
    jenisRaportOptions: [
			{ label: 'PENILAIAN AKHIR TAHUN (PAT)', value: 'PAT' },
			{ label: 'PENILAIAN AKHIR SEMESTER (PAS)', value: 'PAS' },
			{ label: 'PENILAIAN TENGAH SEMESTER (PTS)', value: 'PTS' },
		],
    inputData: {
      namasekolah: '',
      statussekolah: '',
      telepon: '',
      alamat: '',
      provinsi: '',
      kabupatenkota: '',
      kecamatan: '',
      kelurahan: '',
      kodepos: '',
      latitude: '',
      longitude: '',
      longitude: '',
      tahunpelajaran: '',
      pdfraport: '',
      jenisraport: '',
      semester: '',
    },
    tahunOptions: [],
    DialogUploadBerkas: false,
    DialogBerkas: false,
		dataBerkas: [],
		imageMultiple: [],
		fileMultiple: [],
		MultipleBerkas: [],
		componentKey: 0,
		jenisUpload: '',
		dataNotifikasi: [],
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
		pageSummary: {
			page: '',
			limit: '',
			total: '',
			totalPages: ''
		},
		headers: [
      { text: "No", value: "number", sortable: false, width: "7%" },
      { text: "FILE NAME", value: "title", sortable: false },
      { text: "STATUS", value: "statusAktif", sortable: false },
      { text: "OPSI", value: "opsi", sortable: false },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,

		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Settings (General CMS) - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
		...mapGetters({
      cmssettings: 'setting/cmssettings',
			berkasAll: 'setting/berkasAll',
    }),
		...mapState({
			loadingtable: store => store.setting.loadingtable,
			ProvinsiOptions: store => store.setting.ProvinsiOptions,
			KabKotaOptions: store => store.setting.KabKotaOptions,
			KecamatanOptions: store => store.setting.KecamatanOptions,
			KelurahanOptions: store => store.setting.KelurahanOptions,
		}),
  },
	watch: {
		berkasAll: {
      deep: true,
      handler(value){
        this.dataBerkas = value.records
        this.pageSummary = {
					page: value.pageSummary.page,
					limit: value.pageSummary.limit,
					total: value.pageSummary.total,
					totalPages: value.pageSummary.totalPages
				}
      }
    },
    cmssettings:{
			deep: true,
			handler(value) {
				const d = new Date();
        for (let tahun = 2020; tahun <= d.getFullYear(); tahun++) {
          let tulisan = `${tahun}/${tahun+1}`
          this.tahunOptions.push({value: tulisan.toString(), label: tulisan.toString()})
        }
				this.inputData = {
					namasekolah: value.namasekolah ? value.namasekolah : null,
					statussekolah: value.statussekolah ? value.statussekolah.value : null,
					telepon: value.telepon ? value.telepon : null,
					alamat: value.alamat ? value.alamat : null,
					provinsi: value.provinsi ? value.provinsi.value : null,
					kabupatenkota: value.kabupatenkota ? value.kabupatenkota.value : null,
					kecamatan: value.kecamatan ? value.kecamatan.value : null,
					kelurahan: value.kelurahan ? value.kelurahan.value : null,
					kodepos: value.kodepos ? value.kodepos : null,
					latitude: value.latitude ? value.latitude : null,
					longitude: value.longitude ? value.longitude : null,
					tahunpelajaran: value.tahunpelajaran ? value.tahunpelajaran.value : null,
					pdfraport: value.pdfraport ? value.pdfraport.value : null,
					jenisraport: value.jenisraport ? value.jenisraport.value : null,
					semester: value.semester ? value.semester.value : null,
				}
				this.getWilayah({ bagian: 'kabkota', KodeWilayah: this.inputData.provinsi })
				this.getWilayah({ bagian: 'kecamatan', KodeWilayah: this.inputData.kabupatenkota })
				this.getWilayah({ bagian: 'kelurahan', KodeWilayah: this.inputData.kecamatan })
			}
		},
    inputData:{
			deep: true,
			handler(value) {
				if(!value.provinsi){
					this.inputData.kabupatenkota = ''
					this.inputData.kecamatan = ''
					this.inputData.kelurahan = ''
					this.inputData.kodepos = ''
				}
      }
    },
		page: {
			deep: true,
			handler(value) {
				this.getDataBerkas({page: value, limit: this.limit, keyword: this.searchData})
			}
		},
		limit: {
			deep: true,
			handler(value) {
				this.page = 1
				this.getDataBerkas({page: 1, limit: value, keyword: this.searchData})
			}
		},
  },
	mounted() {
    this.getCMSSettings()
		this.getWilayah({ bagian: 'provinsi', KodeWilayah: null })
	},
	methods: {
		...mapActions({
			uploadBerkas: 'upload/uploadBerkas',
      getCMSSettings: 'setting/getCMSSettings',
      getWilayah: 'setting/getWilayah',
			getDataBerkas: 'setting/getDataBerkas',
		}),
    wilayah(kondisi, e){
			if(kondisi === 'provinsi'){
				if(e){
					this.getWilayah({ bagian: 'kabkota', KodeWilayah: e })
					this.inputData.kabupatenkota = ''
					this.inputData.kecamatan = ''
					this.inputData.kelurahan = ''
					this.inputData.kodepos = ''
				}
			}else if(kondisi === 'kabkota'){
				if(e){
					this.getWilayah({ bagian: 'kecamatan', KodeWilayah: e })
					if(e !== this.inputData.kecamatan) {
						this.inputData.kelurahan = ''
						this.inputData.kodepos = ''	
					}
				}else{
					this.inputData.kecamatan = ''
					this.inputData.kelurahan = ''
					this.inputData.kodepos = ''
				}
			}else if(kondisi === 'kecamatan'){
				if(e){
					this.getWilayah({ bagian: 'kelurahan', KodeWilayah: e })
					if(e !== this.inputData.kelurahan) {
						this.inputData.kodepos = ''	
					}
				}else{
					this.inputData.kelurahan = ''
					this.inputData.kodepos = ''
				}
			}else if(kondisi === 'kelurahan'){
				if(e){
					let data = this.KelurahanOptions.filter(str => str.value === e)
          this.inputData.kodepos = data[0].kodePos
				}else{
					this.inputData.kodepos = ''
				}
			}
		},
    SimpanGeneranCMS(){
      const d = new Date();
      for (let tahun = 2020; tahun <= d.getFullYear(); tahun++) {
        let tulisan = `${tahun}/${tahun+1}`
        this.tahunOptions.push({value: tulisan.toString(), label: tulisan.toString()})
      }
			this.getWilayah({ bagian: 'provinsi', KodeWilayah: null })
			this.getWilayah({ bagian: 'kabkota', KodeWilayah: this.inputData.provinsi })
			this.getWilayah({ bagian: 'kecamatan', KodeWilayah: this.inputData.kabupatenkota })
			this.getWilayah({ bagian: 'kelurahan', KodeWilayah: this.inputData.kecamatan })
      let tp = this.tahunOptions.filter(str => str.value === this.inputData.tahunpelajaran)[0]
      let semester = this.semesterOptions.filter(str => str.value === this.inputData.semester)[0]
      let jenisraport = this.jenisRaportOptions.filter(str => str.value === this.inputData.jenisraport)[0]
      let raport = this.raportOptions.filter(str => str.value === this.inputData.pdfraport)[0]
      let status = this.statusSekolahOptions.filter(str => str.kode === this.inputData.statussekolah)[0]
      let provinsi = this.ProvinsiOptions.filter(str => str.value === this.inputData.provinsi)[0]
      let kabkota = this.KabKotaOptions.filter(str => str.value === this.inputData.kabupatenkota)[0]
      let kec = this.KecamatanOptions.filter(str => str.value === this.inputData.kecamatan)[0]
      let kel = this.KelurahanOptions.filter(str => str.value === this.inputData.kelurahan)[0]
      let bodyData = {
        alamat: this.inputData.alamat,
        kabupatenkota: {
          label: this.uppercaseLetterFirst2(kabkota.text),
          value: kabkota.value,
        },
        kecamatan: {
          label: kec.text,
          value: kec.value,
        },
        kelurahan: {
          label: kel.text,
          value: kel.value,
        },
        kodepos: this.inputData.kodepos,
        latitude: this.inputData.latitude,
        longitude: this.inputData.longitude,
        namasekolah: this.inputData.namasekolah,
        provinsi: {
          label: this.uppercaseLetterFirst2(provinsi.text),
          value: provinsi.value,
        },
        statussekolah: {
            label: status.label,
            value: status.kode
        },
        tahunpelajaran: {
          label: tp.label,
          value: tp.value,
        },
        pdfraport: {
          label: raport.label,
          value: raport.value,
        },
        jenisraport: {
          label: jenisraport.label,
          value: jenisraport.value,
        },
        semester: {
          label: semester.label,
          value: semester.value,
        },
        telepon: this.inputData.telepon
      }
			this.$store.dispatch('setting/postCMSSettings', bodyData)
      .then((res) => {
        this.getCMSSettings()
        this.getWilayah({ bagian: 'provinsi', KodeWilayah: null })
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		addFiles(e) {
      let jml_files = e.target.files.length
			if(this.jenisUpload === 'Gambar'){
				for(let i=0;i<jml_files;i++) {
					this.MultipleBerkas.push(e.target.files[i])
				} 
				this.imageMultiple = []     
				this.MultipleBerkas.forEach((file, f) => {
					this.imageMultiple.push({ 
						title: '',
						ext: file.type === 'image/jpeg' || file.type === 'image/jpg' ? 'jpg' : 'png',
						kategori: this.jenisUpload,
						url: URL.createObjectURL(file),
						files: file
					})
				})
			}
			if(this.jenisUpload === 'File'){
				for(let i=0;i<jml_files;i++) {
					this.MultipleBerkas.push(e.target.files[i])
				} 
				this.fileMultiple = []     
				this.MultipleBerkas.forEach((file, f) => {
					this.fileMultiple.push({ 
						title: '',
						ext: file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword'
							? 'docx' : file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel'
							? 'xlsx' : file.type === 'application/pdf'
							? 'pdf' : 'txt',
						name: file.name,
						kategori: this.jenisUpload,
						url: URL.createObjectURL(file),
						files: file
					})
				})
			}
    },
    HapusMultiple(index) {
			if(this.jenisUpload === 'Gambar'){
				this.MultipleBerkas.splice(index, 1)
				this.imageMultiple.splice(index, 1)
			}
			if(this.jenisUpload === 'File'){
				this.MultipleBerkas.splice(index, 1)
				this.fileMultiple.splice(index, 1)
			}
    },
		async SimpanMultiple(){
			let dataFile = this.jenisUpload === 'Gambar' ? this.imageMultiple : this.fileMultiple
			let kirim = await Promise.all(dataFile.map(async (value) => {
        let status = []
        const bodyData = {
					title: value.title,
					type: value.kategori,
					ext: value.ext,
					nama_file: `${this.convertDate(new Date().toISOString().slice(0,10))}${this.makeRandom(8)}`,
					table: "Berkas",
					files: value.files,
				};
				try {
					let response = await this.uploadBerkas(bodyData);
          status.push(response.data.status)
				} catch (err) {
          status.push(err.response.data.status)
				}
        return status[0]
      }))
			if(kirim.filter(el => el == 200).length){
        this.notifikasi("success", 'Berhasil Upload Berkas', "1")
      }else{
        this.notifikasi("error", 'Gagal proses data', "1")
      }
			this.jenisUpload = ''
			this.MultipleBerkas = []
			this.imageMultiple = []
			this.fileMultiple = []
			this.DialogUploadBerkas = false
		},
		openDialogDataBerkas(){
			// this.getNotifikasi({kategori: '1', untuk: 'pengirim', page: this.page, limit: this.limit})
			this.getDataBerkas({page: this.page, limit: this.limit, keyword: this.searchData})
			this.DialogBerkas = true
		},
		postRecord(item){
			let bodyData = {
				jenis: 'STATUSRECORD',
				idBerkas: item.idBerkas,
				statusAktif: item.statusAktif,
      }
      this.$store.dispatch('setting/postDataBerkas', bodyData)
      .then((res) => {
        this.getDataBerkas({page: 1, limit: this.limit, keyword: this.searchData})
        this.notifikasi("success", res.data.message, "1")
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

<style scoped>
.v-input .v-label {
  font-size: 11px !important;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
.SelectedMenu{
  min-height: 35px !important;
}
.SelectedMenu:hover {
	border-radius: 2px;
	background: #939494;
	cursor: pointer;
}
.SelectedMenu-active {
	border-radius: 2px;
	background: rgba(132, 131, 195, 0.19);
	cursor: pointer;
}
.v-list-item__title {
  align-self: center;
  font-size: 10pt !important;
  font-weight: bold;
}
.wadahFile {
	width: 100%;
	height: auto;
	margin: 10px;
	border-radius: 5px !important;
	border: 2px solid #000;
}
.kotakFile {
	width: 100%;
	height: 60px;
}
.iconFile{
	align-items: center;
  display: flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  vertical-align: middle;
  float:left;
	padding: 0px 10px;
	height: 60px;
	width: auto;
}
.textFile{
	align-items: center;
	display: flex;
	justify-content: center;
	line-height: normal;
	position: relative;
	text-align: center;
	vertical-align: middle;
	float:left;
	height: 60px;
	width: auto;
	font-size: 10pt !important;
  font-weight: bold;
}
.kotakGambar {
	width: 250px;
	border-radius: 5px !important;
	padding: 2px !important;
	border: 2px solid #000;
	display: grid;
	grid-template-columns: repeat(auto-fit,minmax(125px,1fr));
	margin: 0px;
	justify-items: center;
	grid-gap: 2px;
}
.responsiveImage{
	width: 200px;
	height: 200px;
	object-fit: contain;
}
</style>