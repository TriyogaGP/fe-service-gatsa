<template>
  <div>
		<v-card class="mb-0 pa-8" outlined elevation="0">
			<h2 class="subheading black--text"><u>>>Data Sekolah Sebelumnya</u></h2>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Jenjang Sekolah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataSekolahSebelum.jenjang"
						:items="jenjangOptions"
						item-text="label"
						item-value="kode"
						placeholder="Jenjang Sekolah"
						label="Jenjang Sekolah"
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
					Status Sekolah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataSekolahSebelum.status_sekolah"
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
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Nama Sekolah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataSekolahSebelum.nama_sekolah"
						placeholder="Nama Sekolah"
						outlined
						dense
						label="Nama Sekolah"
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
					NPSN
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataSekolahSebelum.npsn"
						placeholder="NPSN"
						outlined
						dense
						label="NPSN"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 25, inputDataSekolahSebelum.npsn)"
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
					Alamat Sekolah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-textarea
						v-model="inputDataSekolahSebelum.alamat_sekolah"
						placeholder="Alamat Sekolah"
						outlined
						dense
						rows="4"
						label="Alamat Sekolah"
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
					Kabupaten / Kota Sekolah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataSekolahSebelum.kabkot_sekolah"
						:items="KabKotaOnlyOptions"
						item-text="text"
						item-value="value"
						placeholder="Kabupaten / Kota Sekolah"
						label="Kabupaten / Kota Sekolah"
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
					No Peserta UN
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataSekolahSebelum.no_peserta_un"
						placeholder="No Peserta UN"
						outlined
						dense
						label="No Peserta UN"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 20, inputDataSekolahSebelum.no_peserta_un)"
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
					No SKHUN
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataSekolahSebelum.no_skhun"
						placeholder="No SKHUN"
						outlined
						dense
						label="No SKHUN"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 20, inputDataSekolahSebelum.no_skhun)"
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
					No Ijazah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataSekolahSebelum.no_ijazah"
						placeholder="No Ijazah"
						outlined
						dense
						label="No Ijazah"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 20, inputDataSekolahSebelum.no_ijazah)"
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
					Nilai UN
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataSekolahSebelum.nilai_un"
						placeholder="Nilai UN"
						outlined
						dense
						label="Nilai UN"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 3, inputDataSekolahSebelum.nilai_un)"
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
		dataSiswaSiswi: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data: () => ({
		inputDataSekolahSebelum: {
      id_user: '',
      jenjang: '',
      status_sekolah: '',
      nama_sekolah: '',
      npsn: '',
      alamat_sekolah: '',
      kabkot_sekolah: '',
      no_peserta_un: '',
      no_skhun: '',
      no_ijazah: '',
      nilai_un: '',
    },
		kondisiTombol: true,
		statusSekolahOptions: [
			{ label: 'Negeri', kode: 1 },
			{ label: 'Swasta', kode: 2 },
		],

		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
	}),
	computed: {
		...mapState({
			jenjangOptions: store => store.setting.jenjangOptions,
			KabKotaOnlyOptions: store => store.setting.KabKotaOnlyOptions,
		}),
  },
	watch: {
		inputDataSekolahSebelum:{
			deep: true,
			handler(value) {
				if(value.nilai_un >= 100){
					value.nilai_un = 100
				}

				if(value.jenjang != '' && value.status_sekolah != '' && value.nama_sekolah != '' && value.alamat_sekolah != '' && value.kabkot_sekolah != ''){
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
				this.inputDataSekolahSebelum = {
					id_user: value.idUser ? value.idUser : null,
					jenjang: value.dataSekolahSebelumnya.jenjang ? value.dataSekolahSebelumnya.jenjang.kode : null,
					status_sekolah: value.dataSekolahSebelumnya.statusSekolah ? value.dataSekolahSebelumnya.statusSekolah.kode : null,
					nama_sekolah: value.dataSekolahSebelumnya.namaSekolah ? value.dataSekolahSebelumnya.namaSekolah : null,
					npsn: value.dataSekolahSebelumnya.npsn ? value.dataSekolahSebelumnya.npsn : null,
					alamat_sekolah: value.dataSekolahSebelumnya.alamatSekolah ? value.dataSekolahSebelumnya.alamatSekolah : null,
					kabkot_sekolah: value.dataSekolahSebelumnya.kabkotSekolah ? value.dataSekolahSebelumnya.kabkotSekolah.kode : null,
					no_peserta_un: value.dataSekolahSebelumnya.noPesertaUN ? value.dataSekolahSebelumnya.noPesertaUN : null,
					no_skhun: value.dataSekolahSebelumnya.noSKHUN ? value.dataSekolahSebelumnya.noSKHUN : null,
					no_ijazah: value.dataSekolahSebelumnya.noIjazah ? value.dataSekolahSebelumnya.noIjazah : null,
					nilai_un: value.dataSekolahSebelumnya.nilaiUN ? value.dataSekolahSebelumnya.nilaiUN : null,
				}
			}
		},
	},
	mounted() {
		this.inputDataSekolahSebelum.id_user = this.$route.params.uid;
		this.getJenjangSekolah()
		this.getWilayah({ bagian: 'kabkotaOnly', KodeWilayah: null })
	},
	methods: {
		...mapActions({
			getJenjangSekolah: 'setting/getJenjangSekolah',
			getWilayah: 'setting/getWilayah',
		}),
		wadahInput(){
			let inputFormThree = {
				jenjang: this.inputDataSekolahSebelum.jenjang,
				statusSekolah: this.inputDataSekolahSebelum.status_sekolah,
				namaSekolah: this.inputDataSekolahSebelum.nama_sekolah,
				npsn: this.inputDataSekolahSebelum.npsn,
				alamatSekolah: this.inputDataSekolahSebelum.alamat_sekolah,
				kabkotSekolah: this.inputDataSekolahSebelum.kabkot_sekolah,
				noPesertaUN: this.inputDataSekolahSebelum.no_peserta_un,
				noSKHUN: this.inputDataSekolahSebelum.no_skhun,
				noIjazah: this.inputDataSekolahSebelum.no_ijazah,
				nilaiUN: this.inputDataSekolahSebelum.nilai_un,
			}
      this.$emit("DataStepThree", inputFormThree)
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