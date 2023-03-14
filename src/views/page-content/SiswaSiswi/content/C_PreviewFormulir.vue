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
					Siswa / Siswi
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
					{{ dataStepTwo.nikSiswa ? dataStepTwo.nikSiswa : '-' }}
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
					{{ dataStepTwo.nomorInduk }}
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
					Anak Ke
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepTwo.anakKe }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Jumlah Saudara
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepTwo.jumlahSaudara }}
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
					{{ hobiText }}
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
					{{ citacitaText }}
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
					{{ dataStepTwo.kelas }}
				</v-col>
			</v-row>
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
					{{ jenjangsekolahText }}
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
					{{ statusSekolahOptions.filter(str => str.kode === dataStepThree.statusSekolah )[0].label }}
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
					{{ dataStepThree.namaSekolah }}
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
					{{ dataStepThree.npsn }}
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
					{{ dataStepThree.alamatSekolah }}
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
					{{ uppercaseLetterFirst(kabkotaOnlyText) }}
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
					{{ dataStepThree.noPesertaUN ? dataStepThree.noPesertaUN : '-' }}
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
					{{ dataStepThree.noSKHUN ? dataStepThree.noSKHUN : '-' }}
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
					{{ dataStepThree.noIjazah ? dataStepThree.noIjazah : '-' }}
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
					{{ dataStepThree.nilaiUN ? dataStepThree.nilaiUN : '-' }}
				</v-col>
			</v-row>
			<h2 class="subheading black--text"><u>>>Data Detail Orangtua</u></h2>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					No Kartu Keluarga
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.noKK }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Nama Kepala Keluarga
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.namaKK }}
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
					{{ dataStepFour.telp }}
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
					{{ dataStepFour.alamat }}
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
					{{ uppercaseLetterFirst(provinsiText) }}
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
          {{ uppercaseLetterFirst(kabkotaText) }}
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
          {{ uppercaseLetterFirst(kecamatanText) }}				
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
					{{ uppercaseLetterFirst(kelurahanText) }}
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
          {{ dataStepFour.kodePos }}
				</v-col>
			</v-row>
			<h2 class="subheading black--text"><u>>>Data Ayah</u></h2>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					NIK Ayah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.nikAyah }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Nama Ayah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.namaAyah }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Tahun Ayah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.tahunAyah }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Status Ayah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ statusTextAyah }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Pendidikan Ayah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ pendidikanTextAyah }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Pekerjaan Ayah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ pekerjaanTextAyah }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Telepon Ayah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.telpAyah }}
				</v-col>
			</v-row>
			<h2 class="subheading black--text"><u>>>Data Ibu</u></h2>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					NIK Ibu
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.nikIbu }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Nama Ibu
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.namaIbu }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Tahun Ibu
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.tahunIbu }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Status Ibu
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ statusTextIbu }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Pendidikan Ibu
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ pendidikanTextIbu }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Pekerjaan Ibu
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ pekerjaanTextIbu }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Telepon Ibu
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.telpIbu }}
				</v-col>
			</v-row>
			<h2 class="subheading black--text"><u>>>Data Wali</u></h2>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					NIK Wali
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.nikWali ? dataStepFour.nikWali : '-' }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Nama Wali
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.namaWali ? dataStepFour.namaWali : '-' }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Tahun Wali
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.tahunWali ? dataStepFour.tahunWali : '-' }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Pendidikan Wali
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ pendidikanTextWali }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Pekerjaan Wali
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ pekerjaanTextWali }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Telepon Wali
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ dataStepFour.telpWali ? dataStepFour.telpWali : '-' }}
				</v-col>
			</v-row>
			<h2 class="subheading black--text"><u>>>Data Lainnya</u></h2>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Penghasilan
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ penghasilanText }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Status Tempat Tinggal
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ statustempattinggalText }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Jarak Rumah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ jarakrumahText }}
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					Transportasi
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					{{ transportasiText }}
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
import { mapActions } from "vuex";
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
    dataStepThree: Object,
    dataStepFour: Object,
  },
  data: () => ({
		lazyStep2: false,
		preview: true,
    kondisi: '',
    passText: '',
    agamaText: '',
    hobiText: '',
    citacitaText: '',
    jenjangsekolahText: '',
    kelasText: '',
		pendidikanTextAyah: '',
		pekerjaanTextAyah: '',
		statusTextAyah: '',
		pendidikanTextIbu: '',
		pekerjaanTextIbu: '',
		statusTextIbu: '',
		pendidikanTextWali: '',
		pekerjaanTextWali: '',
		penghasilanText: '',
		statustempattinggalText: '',
		jarakrumahText: '',
		transportasiText: '',
    provinsiText: '',
    kabkotaText: '',
    kecamatanText: '',
    kelurahanText: '',
    kabkotaOnlyText: '',
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
	watch: {
    stepperVal(n, o) {
      if (n != o && n == 4) {
        this.lazyStep2 = true;
      } else {
        this.lazyStep2 = false;
      }
    },
	},
	mounted() {
		// console.log(this.dataStepOne, this.dataStepTwo, this.dataStepThree, this.dataStepFour);
    this.kondisi = this.$route.params.kondisi
    this.optionAgama()
    this.optionHobi()
    this.optionCitaCita()
    this.optionJenjangSekolah()
    this.optionPendidikan()
    this.optionPekerjaan()
    this.optionStatusOrangtua()
    this.optionPenghasilan()
		this.optionStatusTempatTinggal()
    this.optionJarakRumah()
    this.optionTransportasi()
    this.optionWilayah('kabkotaOnly', null)
    this.optionWilayah('provinsi', null)
    this.optionWilayah('kabkota', this.dataStepFour.provinsi)
    this.optionWilayah('kecamatan', this.dataStepFour.kabKota)
    this.optionWilayah('kelurahan', this.dataStepFour.kecamatan)
    this.endecryptData(this.kondisi, this.dataStepOne.password)
	},
	methods: {
		...mapActions(["fetchData"]),
    optionAgama(){
      let payload = {
        method: "get",
				url: `settings/optionsAgama`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let agamaOptions = res.data.result
        this.agamaText = agamaOptions.filter(str => str.kode === this.dataStepTwo.agama)[0].label
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		optionHobi(){
      let payload = {
        method: "get",
				url: `settings/optionsHobi`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let hobiOptions = res.data.result
				this.hobiText = this.dataStepTwo.hobi ? hobiOptions.filter(str => str.kode === this.dataStepTwo.hobi)[0].label : '-'
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		optionCitaCita(){
      let payload = {
        method: "get",
				url: `settings/optionsCitaCita`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let citacitaOptions = res.data.result
				this.citacitaText = this.dataStepTwo.citaCita ? citacitaOptions.filter(str => str.kode === this.dataStepTwo.citaCita)[0].label : '-'
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		optionPendidikan(){
      let payload = {
        method: "get",
				url: `settings/optionsPendidikan`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let pendidikanOptions = res.data.result
				this.pendidikanTextAyah = pendidikanOptions.filter(str => str.kode === this.dataStepFour.pendidikanAyah)[0].label
				this.pendidikanTextIbu = pendidikanOptions.filter(str => str.kode === this.dataStepFour.pendidikanIbu)[0].label
				this.pendidikanTextWali = this.dataStepFour.pendidikanWali ? pendidikanOptions.filter(str => str.kode === this.dataStepFour.pendidikanWali)[0].label : '-'
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		optionPekerjaan(){
      let payload = {
        method: "get",
				url: `settings/optionsPekerjaan`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let pekerjaanOptions = res.data.result
				this.pekerjaanTextAyah = pekerjaanOptions.filter(str => str.kode === this.dataStepFour.pekerjaanAyah)[0].label
				this.pekerjaanTextIbu = pekerjaanOptions.filter(str => str.kode === this.dataStepFour.pekerjaanIbu)[0].label
				this.pekerjaanTextWali = this.dataStepFour.pekerjaanWali ? pekerjaanOptions.filter(str => str.kode === this.dataStepFour.pekerjaanWali)[0].label : '-'
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		optionStatusOrangtua(){
      let payload = {
        method: "get",
				url: `settings/optionsStatusOrangtua`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let statusorangtuaOptions = res.data.result
				this.statusTextAyah = statusorangtuaOptions.filter(str => str.kode === this.dataStepFour.statusAyah)[0].label
				this.statusTextIbu = statusorangtuaOptions.filter(str => str.kode === this.dataStepFour.statusIbu)[0].label
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		optionJenjangSekolah(){
      let payload = {
        method: "get",
				url: `settings/optionsJenjangSekolah`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let jenjangOptions = res.data.result
				this.jenjangsekolahText = jenjangOptions.filter(str => str.kode === this.dataStepThree.jenjang)[0].label
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		optionPenghasilan(){
      let payload = {
        method: "get",
				url: `settings/optionsPenghasilan`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let penghasilanOptions = res.data.result
				this.penghasilanText = penghasilanOptions.filter(str => str.kode === this.dataStepFour.penghasilan)[0].label
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		optionStatusTempatTinggal(){
      let payload = {
        method: "get",
				url: `settings/optionsStatusTempatTinggal`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let statustempattinggalOptions = res.data.result
				this.statustempattinggalText = this.dataStepFour.statusTempatTinggal ? statustempattinggalOptions.filter(str => str.kode === this.dataStepFour.statusTempatTinggal)[0].label : '-'
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
    optionJarakRumah(){
      let payload = {
        method: "get",
				url: `settings/optionsJarakRumah`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let jarakrumahOptions = res.data.result
				this.jarakrumahText = this.dataStepFour.jarakRumah ? jarakrumahOptions.filter(str => str.kode === this.dataStepFour.jarakRumah)[0].label : '-'
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
    optionTransportasi(){
      let payload = {
        method: "get",
				url: `settings/optionsTransportasi`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let transportasiOptions = res.data.result
				this.transportasiText = this.dataStepFour.transportasi ? transportasiOptions.filter(str => str.kode === this.dataStepFour.transportasi)[0].label : '-'
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		optionWilayah(bagian, KodeWilayah){
      let payload = {
        method: "get",
				url: `settings/optionsWilayah?bagian=${bagian}&KodeWilayah=${KodeWilayah}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
				if(bagian === 'provinsi'){
					let ProvinsiOptions = res.data.result
          this.provinsiText = ProvinsiOptions.filter(str => str.value === this.dataStepFour.provinsi )[0].text
				}else if(bagian === 'kabkota'){
          let KabKotaOptions = res.data.result
          this.kabkotaText = KabKotaOptions.filter(str => str.value === this.dataStepFour.kabKota )[0].text
				}else if(bagian === 'kecamatan'){
          let KecamatanOptions = res.data.result
          this.kecamatanText = KecamatanOptions.filter(str => str.value === this.dataStepFour.kecamatan )[0].text
				}else if(bagian === 'kelurahan'){
          let KelurahanOptions = res.data.result
          this.kelurahanText = KelurahanOptions.filter(str => str.value === this.dataStepFour.kelurahan )[0].text
				}else if(bagian === 'kabkotaOnly'){
          let KabKotaOptions = res.data.result
          this.kabkotaOnlyText = KabKotaOptions.filter(str => str.value === this.dataStepThree.kabkotSekolah )[0].text
				}
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		simpanData() {
      let bodyData = {
        user: {
          jenis: this.kondisi,
          idUser: this.dataStepOne.idUser,
          consumerType: 4,
          nama: this.dataStepOne.nama,
          username: this.dataStepOne.username,
          email: this.dataStepOne.email,
          password: this.dataStepOne.password,
        },
        userdetail: {
          nikSiswa: this.dataStepTwo.nikSiswa,
          nomorInduk: this.dataStepTwo.nomorInduk,
          tempat: this.dataStepTwo.tempat,
          tanggalLahir: this.dataStepTwo.tanggalLahir,
          jenisKelamin: this.dataStepTwo.jenisKelamin,
          agama: this.dataStepTwo.agama,
          anakKe: this.dataStepTwo.anakKe,
          jumlahSaudara: this.dataStepTwo.jumlahSaudara,
          hobi: this.dataStepTwo.hobi,
          citaCita: this.dataStepTwo.citaCita,
					dataSekolahSebelumnya: {
						jenjang: this.dataStepThree.jenjang,
						statusSekolah: this.dataStepThree.statusSekolah,
						namaSekolah: this.dataStepThree.namaSekolah,
						npsn: this.dataStepThree.npsn,
						alamatSekolah: this.dataStepThree.alamatSekolah,
						kabkotSekolah: this.dataStepThree.kabkotSekolah,
						noPesertaUN: this.dataStepThree.noPesertaUN,
						noSKHUN: this.dataStepThree.noSKHUN,
						noIjazah: this.dataStepThree.noIjazah,
						nilaiUN: this.dataStepThree.nilaiUN,
					},
          noKK: this.dataStepFour.noKK,
          namaKK: this.dataStepFour.namaKK,
					dataOrangtua: {
						dataAyah: {
							namaAyah: this.dataStepFour.namaAyah,
							tahunAyah: this.dataStepFour.tahunAyah,
							statusAyah: this.dataStepFour.statusAyah,
							nikAyah: this.dataStepFour.nikAyah,
							pendidikanAyah: this.dataStepFour.pendidikanAyah,
							pekerjaanAyah: this.dataStepFour.pekerjaanAyah,
							telpAyah: this.dataStepFour.telpAyah,
						},
						dataIbu: {
							namaIbu: this.dataStepFour.namaIbu,
							tahunIbu: this.dataStepFour.tahunIbu,
							statusIbu: this.dataStepFour.statusIbu,
							nikIbu: this.dataStepFour.nikIbu,
							pendidikanIbu: this.dataStepFour.pendidikanIbu,
							pekerjaanIbu: this.dataStepFour.pekerjaanIbu,
							telpIbu: this.dataStepFour.telpIbu,
						},
						dataWali: {
							namaWali: this.dataStepFour.namaWali,
							tahunWali: this.dataStepFour.tahunWali,
							nikWali: this.dataStepFour.nikWali,
							pendidikanWali: this.dataStepFour.pendidikanWali,
							pekerjaanWali: this.dataStepFour.pekerjaanWali,
							telpWali: this.dataStepFour.telpWali,
						},
					},
					penghasilan: this.dataStepFour.penghasilan,
					dataAlamatOrangtua: {
						telp: this.dataStepFour.telp,
						alamat: this.dataStepFour.alamat,
						provinsi: this.dataStepFour.provinsi,
						kabKota: this.dataStepFour.kabKota,
						kecamatan: this.dataStepFour.kecamatan,
						kelurahan: this.dataStepFour.kelurahan,
						kodePos: this.dataStepFour.kodePos,
					},
					kelas: this.dataStepTwo.kelas,
					dataLainnya: {
						statusTempatTinggal: this.dataStepFour.statusTempatTinggal,
						jarakRumah: this.dataStepFour.jarakRumah,
						transportasi: this.dataStepFour.transportasi,
					}
        }
      }
      let payload = {
				method: "post",
				url: `user/siswasiswi`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.notifikasi("success", res.data.message, "2")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
		},
    goToProses(){
			this.$router.push({name: "DataSiswaSiswi"});
		},
		cancel() {
      this.stepperVal = --this.stepperVal;
    },
    backStep() {
      this.$emit("backStep", 4);
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