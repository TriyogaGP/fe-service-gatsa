<template>
  <div>
		<v-card class="mb-0 pa-8" outlined elevation="0">
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
					<v-text-field
						v-model="inputDataKelengkapan.nomor_induk"
						placeholder="Nomor Induk"
						outlined
						dense
						label="Nomor Induk"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 25, inputDataKelengkapan.nomor_induk)"
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
					Pendidikan Struktural
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataKelengkapan.pendidikan_guru"
						:items="pendidikanOptions"
						item-text="label"
						item-value="kode"
						placeholder="Pendidikan Struktural"
						label="Pendidikan Struktural"
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
					Jabatan Struktural
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataKelengkapan.jabatan_guru"
						:items="jabatanOptions"
						item-text="label"
						item-value="kode"
						placeholder="Jabatan Struktural"
						label="Jabatan Struktural"
						multiple
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					>
						<template #selection="data">
							<v-chip
								v-bind="data.attrs"
								:input-value="data.selected"
								close
								small
								outlined
								color="light-black darken-3"
								@click="data.select"
								@click:close="remove(data.item, 'jabatan')"
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
					Mengajar Bidang
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataKelengkapan.mengajar_bidang"
						:items="mengajarOptions"
						item-text="label"
						item-value="kode"
						placeholder="Mengajar Bidang"
						label="Mengajar Bidang"
						multiple
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					>
						<template #selection="data">
							<v-chip
								v-bind="data.attrs"
								:input-value="data.selected"
								close
								small
								outlined
								color="light-black darken-3"
								@click="data.select"
								@click:close="remove(data.item, 'bidang')"
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
					Mengajar Kelas
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataKelengkapan.mengajar_kelas"
						:items="kelasOptions"
						item-text="kelas"
						item-value="kelas"
						placeholder="Mengajar Kelas"
						label="Mengajar Kelas"
						multiple
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					>
						<template #selection="data">
							<v-chip
								v-bind="data.attrs"
								:input-value="data.selected"
								close
								small
								outlined
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
					<v-autocomplete
						v-model="inputDataKelengkapan.wali_kelas"
						:items="kelasUseOptions"
						item-disabled="disabled"
						item-text="kelas"
						item-value="kelas"
						placeholder="Wali Kelas"
						label="Wali Kelas"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
						:disabled="kondisiJabatan"
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
					@click="stepThree()"
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
		inputDataKelengkapan: {
      id_user: '',
      nomor_induk: '',
      pendidikan_guru: '',
      jabatan_guru: '',
      mengajar_bidang: '',
      mengajar_kelas: '',
      wali_kelas: '',
    },
		kondisiJabatan: true,
		kondisiTombol: true,

		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
	}),
	computed: {
		...mapState([
			'pendidikanOptions',
			'jabatanOptions',
			'mengajarOptions',
			'kelasOptions',
			'kelasUseOptions',
		]),
  },
	watch: {
		inputDataKelengkapan:{
			deep: true,
			handler(value) {
				if(value.jabatan_guru.length === 0){
					value.wali_kelas = ''
					this.kondisiJabatan = true
				}

				if(value.jabatan_guru != ''){
					let jabatan = value.jabatan_guru.includes(7)
					if(jabatan){
						this.kondisiJabatan = false
					}else{
						this.kondisiJabatan = true
					}
				}

				if(value.nomor_induk != '' && value.pendidikan_guru != '' && value.jabatan_guru != '' && value.mengajar_bidang != '' && value.mengajar_kelas != ''){
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
				this.inputDataKelengkapan = {
					id_user: value.idUser ? value.idUser : null,
					nomor_induk: value.nomorInduk ? value.nomorInduk : null,
					pendidikan_guru: value.pendidikanGuru ? value.pendidikanGuru.kode : null,
					jabatan_guru: value.jabatanGuru ? value.jabatanGuru : null,
					mengajar_bidang: value.mengajarBidang ? value.mengajarBidang : null,
					mengajar_kelas: value.mengajarKelas ? value.mengajarKelas.split(', ') : null,
					wali_kelas: value.waliKelas ? value.waliKelas : null,
				}
				if(this.inputDataKelengkapan.wali_kelas){
					this.getKelas({ kondisi: 'Use', walikelas: this.inputDataKelengkapan.wali_kelas })
				}
			}
		},
	},
	// created() {
	// 	this.inputDataKelengkapan = {
	// 		id_user: this.dataStruktural ? this.dataStruktural.idUser : null,
	// 		nomor_induk: this.dataStruktural ? this.dataStruktural.nomorInduk : null,
	// 		pendidikan_guru: this.dataStruktural ? this.dataStruktural.pendidikanGuru.kode : null,
	// 		jabatan_guru: this.dataStruktural ? this.dataStruktural.jabatanGuru : null,
	// 		mengajar_bidang: this.dataStruktural ? this.dataStruktural.mengajarBidang : null,
	// 		mengajar_kelas: this.dataStruktural ? this.dataStruktural.mengajarKelas.split(', ') : null,
	// 		wali_kelas: this.dataStruktural ? this.dataStruktural.waliKelas : null,
	// 	}
	// 	if(this.inputDataKelengkapan.wali_kelas){
	// 		this.getKelas({ kondisi: 'Use', walikelas: this.inputDataKelengkapan.wali_kelas })
	// 	}
	// },
	mounted() {
		this.inputDataKelengkapan.id_user = this.$route.params.uid;
		this.getPendidikan()
		this.getJabatan()
		this.getMengajar()
		this.getKelas({ kondisi: 'All' })
		this.getKelas({ kondisi: 'Use', walikelas: null })
	},
	methods: {
		...mapActions(["fetchData", "getPendidikan", "getJabatan", "getMengajar", "getKelas"]),
		wadahInput(){
			let inputFormThree = {
				nomorInduk: this.inputDataKelengkapan.nomor_induk,
				pendidikanGuru: this.inputDataKelengkapan.pendidikan_guru,
				jabatanGuru: this.inputDataKelengkapan.jabatan_guru,
				mengajarBidang: this.inputDataKelengkapan.mengajar_bidang,
				mengajarKelas: this.inputDataKelengkapan.mengajar_kelas,
				waliKelas: this.inputDataKelengkapan.wali_kelas,
			}
      this.$emit("DataStepThree", inputFormThree)
    },
		remove(item, kondisi) {
			if(kondisi === 'jabatan'){
				if(item.kode === 7){
					this.inputDataKelengkapan.wali_kelas = ''
					this.kondisiJabatan = true
				}
				this.inputDataKelengkapan.jabatan_guru.splice(this.inputDataKelengkapan.jabatan_guru.indexOf(item.kode), 1);
			}else if(kondisi === 'bidang'){
				this.inputDataKelengkapan.mengajar_bidang.splice(this.inputDataKelengkapan.mengajar_bidang.indexOf(item.kode), 1);
			}else if(kondisi === 'kelas'){
				this.inputDataKelengkapan.mengajar_kelas.splice(this.inputDataKelengkapan.mengajar_kelas.indexOf(item.kelas), 1);
			}
    },
		backStep() {
      this.$emit("backStep", 2);
    },
		stepThree() {
			this.$emit("StepThree");
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