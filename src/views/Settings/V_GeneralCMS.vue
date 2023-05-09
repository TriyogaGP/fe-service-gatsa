<template>
  <div>
		<h1 class="subheading grey--text">Panel General CMS</h1>
    <v-row>
      <v-col cols="12" md="12" class="text-right">
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
import { mapActions, mapState } from "vuex";
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
		...mapState([
			'ProvinsiOptions',
			'KabKotaOptions',
			'KecamatanOptions',
			'KelurahanOptions',
		]),
		ProvinsiOptions(){
			return this.$store.state.ProvinsiOptions
		},
		KabKotaOptions(){
			return this.$store.state.KabKotaOptions
		},
		KecamatanOptions(){
			return this.$store.state.KecamatanOptions
		},
		KelurahanOptions(){
			return this.$store.state.KelurahanOptions
		},
  },
	watch: {
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
  },
	mounted() {
    this.getGeneralCMS()
		this.getWilayah({ bagian: 'provinsi', KodeWilayah: null })
	},
	methods: {
		...mapActions(["fetchData", "getWilayah"]),
    getGeneralCMS(){
      let payload = {
        method: "get",
				url: `settings/cmssetting`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let resdata = res.data.result
        const d = new Date();
        for (let tahun = 2020; tahun <= d.getFullYear(); tahun++) {
          let tulisan = `${tahun}/${tahun+1}`
          this.tahunOptions.push({value: tulisan.toString(), label: tulisan.toString()})
        }
				this.inputData = {
					namasekolah: resdata.namasekolah ? resdata.namasekolah : null,
					statussekolah: resdata.statussekolah ? resdata.statussekolah.value : null,
					telepon: resdata.telepon ? resdata.telepon : null,
					alamat: resdata.alamat ? resdata.alamat : null,
					provinsi: resdata.provinsi ? resdata.provinsi.value : null,
					kabupatenkota: resdata.kabupatenkota ? resdata.kabupatenkota.value : null,
					kecamatan: resdata.kecamatan ? resdata.kecamatan.value : null,
					kelurahan: resdata.kelurahan ? resdata.kelurahan.value : null,
					kodepos: resdata.kodepos ? resdata.kodepos : null,
					latitude: resdata.latitude ? resdata.latitude : null,
					longitude: resdata.longitude ? resdata.longitude : null,
					tahunpelajaran: resdata.tahunpelajaran ? resdata.tahunpelajaran.value : null,
					pdfraport: resdata.pdfraport ? resdata.pdfraport.value : null,
					jenisraport: resdata.jenisraport ? resdata.jenisraport.value : null,
					semester: resdata.semester ? resdata.semester.value : null,
				}
				this.getWilayah({ bagian: 'kabkota', KodeWilayah: this.inputData.provinsi })
				this.getWilayah({ bagian: 'kecamatan', KodeWilayah: this.inputData.kabupatenkota })
				this.getWilayah({ bagian: 'kelurahan', KodeWilayah: this.inputData.kecamatan })
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
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
      let payload = {
				method: "put",
				url: `settings/cmssetting`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.getGeneralCMS()
        this.getWilayah({ bagian: 'provinsi', KodeWilayah: null })
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
</style>