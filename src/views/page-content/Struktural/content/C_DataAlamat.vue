<template>
  <div>
		<v-card class="mb-0 pa-8" outlined elevation="0">
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
					<v-row no-gutters>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-center align-center"
						>
							<v-text-field
								v-model="inputDataAlamat.tempat"
								placeholder="Tempat Lahir"
								outlined
								dense
								label="Tempat Lahir"
								color="light-black darken-3"
								hide-details
								clearable
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-end align-center"
						>
							<DatePicker
								v-model="inputDataAlamat.tanggal_lahir" 
								circle
								lang="id"
								position="bottom left"
								:date-format="{
									day: '2-digit',
									month: '2-digit',
									year: 'numeric'
								}"
								placeholder="Tanggal Lahir"
							/>
						</v-col>
					</v-row>
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
					<v-autocomplete
						v-model="inputDataAlamat.jenis_kelamin"
						:items="jenisKelaminOptions"
						item-text="text"
						item-value="value"
						placeholder="Jenis Kelamin"
						label="Jenis Kelamin"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					/>
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
					<v-autocomplete
						v-model="inputDataAlamat.agama"
						:items="agamaOptions"
						item-text="label"
						item-value="kode"
						placeholder="Agama"
						label="Agama"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					/>
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
					<v-text-field
						v-model="inputDataAlamat.telp"
						placeholder="Telepon"
						outlined
						dense
						label="Telepon"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 15, inputDataAlamat.telp)"
						hide-details
						clearable
					/>
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
					<v-textarea
						v-model="inputDataAlamat.alamat"
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
					<v-autocomplete
						v-model="inputDataAlamat.provinsi"
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
					<v-autocomplete
						v-model="inputDataAlamat.kabkota"
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
						:disabled="inputDataAlamat.provinsi ? false : true"
						@change="wilayah('kabkota', $event)"
					/>
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
					<v-autocomplete
						v-model="inputDataAlamat.kecamatan"
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
						:disabled="inputDataAlamat.kabkota ? false : true"
						@change="wilayah('kecamatan', $event)"
					/>
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
					<v-autocomplete
						v-model="inputDataAlamat.kelurahan"
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
						:disabled="inputDataAlamat.kecamatan ? false : true"
						@change="wilayah('kelurahan', $event)"
					/>
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
					<v-text-field
						v-model="inputDataAlamat.kode_pos"
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
		</v-card>
		<v-row no-gutters>
			<v-col cols="12" class="float-right">
				<v-btn
					color="#00479b"
					class="float-right mt-3 white--text text--darken-2"
					small
					:disabled="kondisiTombol"
					@click="stepTwo()"
				>
					Selanjutnya
				</v-btn>
				<v-btn
					color="#9b1f15"
					class="float-right mr-4 mt-3"
					dark
					small
					@click="backStep()"
				>
					Kembali
				</v-btn>
			</v-col>
		</v-row>
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
import PopUpNotifikasiVue from "../../../Layout/PopUpNotifikasi.vue";
export default {
	components: {
    PopUpNotifikasiVue
  },
	props: {
    stepperVal: {
      type: Number,
      default: null
    },
		dataStruktural: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data: () => ({
		inputDataAlamat: {
      id_user: '',
      tempat: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      agama: '',
      telp: '',
      alamat: '',
      provinsi: '',
      kabkota: '',
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
    },
		kondisiTombol: true,
    jenisKelaminOptions: [
			{ text: 'Laki - Laki', value: 'Laki - Laki' },
			{ text: 'Perempuan', value: 'Perempuan' },
		],

		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
	}),
	computed: {
		...mapState({
			agamaOptions: store => store.setting.agamaOptions,
			ProvinsiOptions: store => store.setting.ProvinsiOptions,
			KabKotaOptions: store => store.setting.KabKotaOptions,
			KecamatanOptions: store => store.setting.KecamatanOptions,
			KelurahanOptions: store => store.setting.KelurahanOptions,
		}),
  },
	watch: {
		inputDataAlamat:{
			deep: true,
			handler(value) {
				if(!value.provinsi){
					this.inputDataAlamat.kabkota = ''
					this.inputDataAlamat.kecamatan = ''
					this.inputDataAlamat.kelurahan = ''
					this.inputDataAlamat.kode_pos = ''
				}

				if(value.tempat != '' && value.tanggal_lahir != '' && value.jenis_kelamin != '' && value.agama != '' && value.telp != '' && value.alamat != '' && value.provinsi != '' &&
					value.kabkota != '' && value.kecamatan != '' && value.kelurahan != ''){
					this.kondisiTombol = false
				}else{
					this.kondisiTombol = true
				}
				this.wadahInput()
			}
		},
		dataStruktural: {
			deep: true,
			handler(value) {
				this.inputDataAlamat = {
					id_user: value.idUser ? value.idUser : null,
					tempat: value.tempat ? value.tempat : null,
					tanggal_lahir: value.tanggalLahir ? value.tanggalLahir : null,
					jenis_kelamin: value.jenisKelamin ? value.jenisKelamin : null,
					agama: value.agama ? value.agama.kode : null,
					telp: value.telp ? value.telp : null,
					alamat: value.alamat ? value.alamat : null,
					provinsi: value.provinsi ? value.provinsi.kode : null,
					kabkota: value.kabKota ? value.kabKota.kode : null,
					kecamatan: value.kecamatan ? value.kecamatan.kode : null,
					kelurahan: value.kelurahan ? value.kelurahan.kode : null,
					kode_pos: value.kodePos ? value.kodePos : null,
				}
				this.getWilayah({ bagian: 'kabkota', KodeWilayah: this.inputDataAlamat.provinsi })
				this.getWilayah({ bagian: 'kecamatan', KodeWilayah: this.inputDataAlamat.kabkota })
				this.getWilayah({ bagian: 'kelurahan', KodeWilayah: this.inputDataAlamat.kecamatan })
			}
		},
	},
	mounted() {
		this.inputDataAlamat.id_user = this.$route.params.uid;
		this.getAgama()
		this.getWilayah({ bagian: 'provinsi', KodeWilayah: null })
	},
	methods: {
		...mapActions({
			getAgama: 'setting/getAgama',
			getWilayah: 'setting/getWilayah',
		}),
		wadahInput(){
			let inputFormTwo = {
				tempat: this.inputDataAlamat.tempat,
				tanggalLahir: this.inputDataAlamat.tanggal_lahir,
				jenisKelamin: this.inputDataAlamat.jenis_kelamin,
				agama: this.inputDataAlamat.agama,
				telp: this.inputDataAlamat.telp,
				alamat: this.inputDataAlamat.alamat,
				provinsi: this.inputDataAlamat.provinsi,
				kabKota: this.inputDataAlamat.kabkota,
				kecamatan: this.inputDataAlamat.kecamatan,
				kelurahan: this.inputDataAlamat.kelurahan,
				kodePos: this.inputDataAlamat.kode_pos,
			}
      this.$emit("DataStepTwo", inputFormTwo)
    },
		wilayah(kondisi, e){
			if(kondisi === 'provinsi'){
				if(e){
					this.getWilayah({ bagian: 'kabkota', KodeWilayah: e })
					this.inputDataAlamat.kabkota = ''
					this.inputDataAlamat.kecamatan = ''
					this.inputDataAlamat.kelurahan = ''
					this.inputDataAlamat.kode_pos = ''
				}
			}else if(kondisi === 'kabkota'){
				if(e){
					this.getWilayah({ bagian: 'kecamatan', KodeWilayah: e })
					if(e !== this.inputDataAlamat.kecamatan) {
						this.inputDataAlamat.kelurahan = ''
						this.inputDataAlamat.kode_pos = ''	
					}
				}else{
					this.inputDataAlamat.kecamatan = ''
					this.inputDataAlamat.kelurahan = ''
					this.inputDataAlamat.kode_pos = ''
				}
			}else if(kondisi === 'kecamatan'){
				if(e){
					this.getWilayah({ bagian: 'kelurahan', KodeWilayah: e })
					if(e !== this.inputDataAlamat.kelurahan) {
						this.inputDataAlamat.kode_pos = ''	
					}
				}else{
					this.inputDataAlamat.kelurahan = ''
					this.inputDataAlamat.kode_pos = ''
				}
			}else if(kondisi === 'kelurahan'){
				if(e){
					let data = this.KelurahanOptions.filter(str => str.value === e)
					if(this.$route.params.kondisi === 'ADD'){
						this.inputDataAlamat.kode_pos = data[0].kodePos
					}else if(this.$route.params.kondisi === 'EDIT'){
						this.inputDataAlamat.kode_pos = this.inputDataAlamat.kode_pos ? data.length ? data[0].kodePos : this.inputDataAlamat.kode_pos : data[0].kodePos
					}
				}else{
					this.inputDataAlamat.kode_pos = ''
				}
			}
		},
		backStep() {
      this.$emit("backStep");
    },
		stepTwo() {
			this.$emit("StepTwo");
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
.v-calendar .input-field input {
	width: 390px !important;
	height: 40px !important;
}
.v-input .v-label {
  font-size: 11pt !important;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
</style>