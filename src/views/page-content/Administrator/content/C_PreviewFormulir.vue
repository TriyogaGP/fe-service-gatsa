<template>
  <div>
		<v-card class="mb-0 pa-8" outlined elevation="0">
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
          {{ levelOptions.filter(str => str.value === dataStepOne.consumerType )[0].text }}
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
          {{ dataStepOne.nama }}
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
					{{ dataStepOne.username }}
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
          {{ dataStepOne.email }}
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
					{{ passText }} ({{ dataStepOne.password }})
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
					{{ dataStepTwo.tempat }}, {{ convertDateForMonth(dataStepTwo.tanggalLahir) }}
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
					{{ dataStepTwo.jenisKelamin }}
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
          {{ agamaText }}
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
					{{ dataStepTwo.telp }}
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
					{{ dataStepTwo.alamat }}
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
					{{ uppercaseLetterFirst2(provinsiText) }}
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
          {{ uppercaseLetterFirst2(kabkotaText) }}
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
          {{ uppercaseLetterFirst2(kecamatanText) }}				
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
					{{ uppercaseLetterFirst2(kelurahanText) }}
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
          {{ dataStepTwo.kodePos }}
				</v-col>
			</v-row>
		</v-card>
    <v-row no-gutters>
			<v-col cols="12" class="float-right">
				<v-btn
					color="#00479b"
					class="float-right mt-3 white--text text--darken-2"
					small
					@click="simpanData()"
				>
					{{ kondisi === 'ADD' ? 'Simpan' : 'Ubah' }} Data
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
        @proses="goToProses"
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
    dataStepOne: Object,
    dataStepTwo: Object,
  },
  data: () => ({
		lazyStep2: false,
		preview: true,
    kondisi: '',
    passText: '',
    levelOptions: [
			{ text: 'Super Administrator', value: 1 },
			{ text: 'Administrator', value: 2 },
		],

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
	}),
	computed: {
		...mapState({
      agamaOptions: state => state.setting.agamaOptions,
      ProvinsiOptions: state => state.setting.ProvinsiOptions,
      KabKotaOptions: state => state.setting.KabKotaOptions,
      KecamatanOptions: state => state.setting.KecamatanOptions,
      KelurahanOptions: state => state.setting.KelurahanOptions,
    }),
		agamaText(){
			return this.agamaOptions.filter(str => str.kode === this.dataStepTwo.agama)[0].label
		},
		provinsiText(){
			return this.ProvinsiOptions.filter(str => str.value === this.dataStepTwo.provinsi)[0].text
		},
		kabkotaText(){
			return this.KabKotaOptions.filter(str => str.value === this.dataStepTwo.kabKota)[0].text
		},
		kecamatanText(){
			return this.KecamatanOptions.filter(str => str.value === this.dataStepTwo.kecamatan)[0].text
		},
		kelurahanText(){
			return this.KelurahanOptions.filter(str => str.value === this.dataStepTwo.kelurahan)[0].text
		},
  },
	watch: {
    stepperVal(n, o) {
      if (n != o && n == 3) {
        this.lazyStep2 = true;
      } else {
        this.lazyStep2 = false;
      }
    },
	},
	mounted() {
    this.kondisi = this.$route.params.kondisi
		this.getAgama()
		this.getWilayah({ bagian: 'provinsi', KodeWilayah: null })
		this.getWilayah({ bagian: 'kabkota', KodeWilayah: this.dataStepTwo.provinsi })
		this.getWilayah({ bagian: 'kecamatan', KodeWilayah: this.dataStepTwo.kabKota })
		this.getWilayah({ bagian: 'kelurahan', KodeWilayah: this.dataStepTwo.kecamatan })
    this.endecryptData(this.kondisi, this.dataStepOne.password)
	},
	methods: {
		...mapActions({
			fetchData: 'fetchData',
			getAgama: 'setting/getAgama',
			getWilayah: 'setting/getWilayah',
		}),
		simpanData() {
      let bodyData = {
        user: {
          jenis: this.kondisi,
          idUser: this.dataStepOne.idUser,
          consumerType: this.dataStepOne.consumerType,
          nama: this.dataStepOne.nama,
          username: this.dataStepOne.username,
          email: this.dataStepOne.email,
          password: this.dataStepOne.password,
        },
        userdetail: {
          tempat: this.dataStepTwo.tempat,
          tanggalLahir: this.dataStepTwo.tanggalLahir,
          jenisKelamin: this.dataStepTwo.jenisKelamin,
          agama: this.dataStepTwo.agama,
          telp: this.dataStepTwo.telp,
          alamat: this.dataStepTwo.alamat,
          provinsi: this.dataStepTwo.provinsi,
          kabKota: this.dataStepTwo.kabKota,
          kecamatan: this.dataStepTwo.kecamatan,
          kelurahan: this.dataStepTwo.kelurahan,
          kodePos: this.dataStepTwo.kodePos,
        }
      }
      this.$store.dispatch('user/postAdministrator', bodyData)
      .then((res) => {
        this.notifikasi("success", res.data.message, "2")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
		},
    goToProses(){
			this.$router.push({name: "DataAdministrator"});
		},
		cancel() {
      this.stepperVal = --this.stepperVal;
    },
    backStep() {
      this.$emit("backStep", 2);
    },
    endecryptData(kondisi, pass) {
      let url = kondisi === 'EDIT' ? 'decryptPass' : 'encryptPass' 
      let payload = {
				method: "get",
				url: `settings/${url}?kata=${pass}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
				this.passText = res.data.result.hasil;
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
.v-input .v-label {
  font-size: 11pt !important;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
</style>