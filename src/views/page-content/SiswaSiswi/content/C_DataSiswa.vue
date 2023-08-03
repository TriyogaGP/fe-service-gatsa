<template>
  <div>
		<v-card class="mb-0 pa-8" outlined elevation="0">
			<h2 class="subheading black--text"><u>>>Data Siswa Siswi</u></h2>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					NIK Siswa/i
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataSiswaSiswi.nik_siswa"
						placeholder="NIK Siswa/i"
						outlined
						dense
						label="NIK Siswa/i"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 25, inputDataSiswaSiswi.nik_siswa)"
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
					Nomor Induk
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataSiswaSiswi.nomor_induk"
						placeholder="Nomor Induk"
						outlined
						dense
						label="Nomor Induk"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 25, inputDataSiswaSiswi.nomor_induk)"
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
								v-model="inputDataSiswaSiswi.tempat"
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
								v-model="inputDataSiswaSiswi.tanggal_lahir" 
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
						v-model="inputDataSiswaSiswi.jenis_kelamin"
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
						v-model="inputDataSiswaSiswi.agama"
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
					Anak Ke & Jumlah Saudara
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
								v-model="inputDataSiswaSiswi.anakke"
								placeholder="Anak Ke"
								outlined
								dense
								label="Anak Ke"
								color="light-black darken-3"
								@keypress.native="onlyNumber($event, 2, inputDataSiswaSiswi.anakke)"
								hide-details
								clearable
							/>
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-end align-center pl-2"
						>
							<v-text-field
								v-model="inputDataSiswaSiswi.jumlah_saudara"
								placeholder="Jumlah Saudara"
								outlined
								dense
								label="Jumlah Saudara"
								color="light-black darken-3"
								@keypress.native="onlyNumber($event, 2, inputDataSiswaSiswi.jumlah_saudara)"
								hide-details
								clearable
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
					Hobi
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataSiswaSiswi.hobi"
						:items="hobiOptions"
						item-text="label"
						item-value="kode"
						placeholder="Hobi"
						label="Hobi"
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
					Cita - Cita
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataSiswaSiswi.cita_cita"
						:items="citacitaOptions"
						item-text="label"
						item-value="kode"
						placeholder="Cita - Cita"
						label="Cita - Cita"
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
					Kelas
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataSiswaSiswi.kelas"
						:items="kelasOptions"
						item-text="kelas"
						item-value="kelas"
						placeholder="Kelas"
						label="Kelas"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
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
		dataSiswaSiswi: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data: () => ({
		inputDataSiswaSiswi: {
      id_user: '',
      nik_siswa: '',
      nomor_induk: '',
      tempat: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      agama: '',
      anakke: '',
      jumlah_saudara: '',
      hobi: '',
      cita_cita: '',
      kelas: '',
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
			hobiOptions: store => store.setting.hobiOptions,
			citacitaOptions: store => store.setting.citacitaOptions,
			kelasOptions: store => store.setting.kelasOptions,
		}),
  },
	watch: {
		inputDataSiswaSiswi:{
			deep: true,
			handler(value) {
				if(value.nomor_induk != '' && value.tempat != '' && value.tanggal_lahir != '' && value.jenis_kelamin != '' && value.agama != '' && value.kelas != ''){
					this.kondisiTombol = false
				}else{
					this.kondisiTombol = true
				}
				this.wadahInput()
			}
		},
		dataSiswaSiswi: {
			deep: true,
			handler(value) {
				this.inputDataSiswaSiswi = {
					id_user: value.idUser ? value.idUser : null,
					nik_siswa: value.nikSiswa ? value.nikSiswa : null,
					nomor_induk: value.nomorInduk ? value.nomorInduk : null,
					tempat: value.tempat ? value.tempat : null,
					tanggal_lahir: value.tanggalLahir ? value.tanggalLahir : null,
					jenis_kelamin: value.jenisKelamin ? value.jenisKelamin : null,
					agama: value.agama ? value.agama.kode : null,
					anakke: value.anakKe ? value.anakKe : null,
					jumlah_saudara: value.jumlahSaudara ? value.jumlahSaudara : null,
					hobi: value.hobi ? value.hobi.kode : null,
					cita_cita: value.citaCita ? value.citaCita.kode : null,
					kelas: value.kelas ? value.kelas : null,
				}
			}
		},
	},
	mounted() {
		this.inputDataSiswaSiswi.id_user = this.$route.params.uid;
		this.getAgama()
		this.getHobi()
		this.getCitaCita()
		this.getKelas({kondisi: 'All'})
	},
	methods: {
		...mapActions({
			getAgama: 'setting/getAgama',
			getHobi: 'setting/getHobi',
			getCitaCita: 'setting/getCitaCita',
			getKelas: 'setting/getKelas',
		}),
		wadahInput(){
			let inputFormTwo = {
				nikSiswa: this.inputDataSiswaSiswi.nik_siswa,
				nomorInduk: this.inputDataSiswaSiswi.nomor_induk,
				tempat: this.inputDataSiswaSiswi.tempat,
				tanggalLahir: this.inputDataSiswaSiswi.tanggal_lahir,
				jenisKelamin: this.inputDataSiswaSiswi.jenis_kelamin,
				agama: this.inputDataSiswaSiswi.agama,
				anakKe: this.inputDataSiswaSiswi.anakke,
				jumlahSaudara: this.inputDataSiswaSiswi.jumlah_saudara,
				hobi: this.inputDataSiswaSiswi.hobi,
				citaCita: this.inputDataSiswaSiswi.cita_cita,
				kelas: this.inputDataSiswaSiswi.kelas,
			}
      this.$emit("DataStepTwo", inputFormTwo)
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