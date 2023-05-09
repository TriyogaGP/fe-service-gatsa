<template>
  <div>
		<v-card class="mb-0 pa-8" outlined elevation="0">
			<h2 class="subheading black--text"><u>>>Data Detail Orangtua</u></h2>
			<v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					No & Nama Kepala Keluarga
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
                v-model="inputDataDetailOrangtua.no_kk"
                placeholder="No Kartu Keluarga"
                outlined
                dense
                label="No Kartu Keluarga"
                color="light-black darken-3"
                @keypress.native="onlyNumber($event,25, inputDataDetailOrangtua.no_kk)"
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
								v-model="inputDataDetailOrangtua.nama_kk"
								placeholder="Nama Kepala Keluarga"
								outlined
								dense
								label="Nama Kepala Keluarga"
								color="light-black darken-3"
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
					Telepon
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataDetailOrangtua.telp"
						placeholder="Telepon"
						outlined
						dense
						label="Telepon"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 15, inputDataDetailOrangtua.telp)"
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
						v-model="inputDataDetailOrangtua.alamat"
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
						v-model="inputDataDetailOrangtua.provinsi"
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
						v-model="inputDataDetailOrangtua.kabkota"
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
						:disabled="inputDataDetailOrangtua.provinsi ? false : true"
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
						v-model="inputDataDetailOrangtua.kecamatan"
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
						:disabled="inputDataDetailOrangtua.kabkota ? false : true"
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
						v-model="inputDataDetailOrangtua.kelurahan"
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
						:disabled="inputDataDetailOrangtua.kecamatan ? false : true"
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
						v-model="inputDataDetailOrangtua.kode_pos"
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
					<v-autocomplete
						v-model="inputDataDetailOrangtua.penghasilan"
						:items="penghasilanOptions"
						item-text="label"
						item-value="kode"
						placeholder="Penghasilan"
						label="Penghasilan"
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
					Status Tempat Tinggal
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataDetailOrangtua.status_tempat_tinggal"
						:items="statustempattinggalOptions"
						item-text="label"
						item-value="kode"
						placeholder="Status Tempat Tinggal"
						label="Status Tempat Tinggal"
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
					Jarak Rumah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataDetailOrangtua.jarak_rumah"
						:items="jarakrumahOptions"
						item-text="label"
						item-value="kode"
						placeholder="Jarak Rumah"
						label="Jarak Rumah"
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
					Transportasi
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-autocomplete
						v-model="inputDataDetailOrangtua.transportasi"
						:items="transportasiOptions"
						item-text="label"
						item-value="kode"
						placeholder="Transportasi"
						label="Transportasi"
						outlined
						dense
						color="light-black darken-3"
						hide-details
						clearable
					/>
				</v-col>
			</v-row>
      <h2 class="subheading black--text"><u>>>Data Ayah</u></h2>
      <v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					NIK & Nama Ayah
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
                v-model="inputDataDetailOrangtua.nik_ayah"
                placeholder="NIK Ayah"
                outlined
                dense
                label="NIK Ayah"
                color="light-black darken-3"
                @keypress.native="onlyNumber($event, 18, inputDataDetailOrangtua.nik_ayah)"
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
								v-model="inputDataDetailOrangtua.nama_ayah"
								placeholder="Nama Ayah"
								outlined
								dense
								label="Nama Ayah"
								color="light-black darken-3"
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
					Status & Tahun Ayah
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
              <v-autocomplete
                v-model="inputDataDetailOrangtua.status_ayah"
                :items="statusorangtuaOptions"
                item-text="label"
                item-value="kode"
                placeholder="Status Ayah"
                label="Status Ayah"
                outlined
                dense
								color="light-black darken-3"
                hide-details
                clearable
              />
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-end align-center pl-2"
						>
              <v-autocomplete
                v-model="inputDataDetailOrangtua.tahun_ayah"
                :items="tahunOptions"
                item-text="value"
                item-value="value"
                placeholder="Tahun Ayah"
                label="Tahun Ayah"
                outlined
                dense
								color="light-black darken-3"
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
					Pendidikan & Pekerjaan Ayah
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
              <v-autocomplete
                v-model="inputDataDetailOrangtua.pendidikan_ayah"
                :items="pendidikanOptions"
                item-text="label"
                item-value="kode"
                placeholder="Pendidikan Ayah"
                label="Pendidikan Ayah"
                outlined
                dense
								color="light-black darken-3"
                hide-details
                clearable
              />
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-end align-center pl-2"
						>
              <v-autocomplete
                v-model="inputDataDetailOrangtua.pekerjaan_ayah"
                :items="pekerjaanOptions"
                item-text="label"
                item-value="kode"
                placeholder="Pekerjaan Ayah"
                label="Pekerjaan Ayah"
                outlined
                dense
								color="light-black darken-3"
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
					Telepon Ayah
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataDetailOrangtua.telp_ayah"
						placeholder="Telepon Ayah"
						outlined
						dense
						label="Telepon Ayah"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 15, inputDataDetailOrangtua.telp_ayah)"
						hide-details
						clearable
					/>
				</v-col>
			</v-row>
      <h2 class="subheading black--text"><u>>>Data Ibu</u></h2>
      <v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					NIK & Nama Ibu
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
                v-model="inputDataDetailOrangtua.nik_ibu"
                placeholder="NIK Ibu"
                outlined
                dense
                label="NIK Ibu"
                color="light-black darken-3"
                @keypress.native="onlyNumber($event, 18, inputDataDetailOrangtua.nik_ibu)"
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
								v-model="inputDataDetailOrangtua.nama_ibu"
								placeholder="Nama Ibu"
								outlined
								dense
								label="Nama Ibu"
								color="light-black darken-3"
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
					Status & Tahun Ibu
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
              <v-autocomplete
                v-model="inputDataDetailOrangtua.status_ibu"
                :items="statusorangtuaOptions"
                item-text="label"
                item-value="kode"
                placeholder="Status Ibu"
                label="Status Ibu"
                outlined
                dense
								color="light-black darken-3"
                hide-details
                clearable
              />
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-end align-center pl-2"
						>
              <v-autocomplete
                v-model="inputDataDetailOrangtua.tahun_ibu"
                :items="tahunOptions"
                item-text="value"
                item-value="value"
                placeholder="Tahun Ibu"
                label="Tahun Ibu"
                outlined
                dense
								color="light-black darken-3"
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
					Pendidikan & Pekerjaan Ibu
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
              <v-autocomplete
                v-model="inputDataDetailOrangtua.pendidikan_ibu"
                :items="pendidikanOptions"
                item-text="label"
                item-value="kode"
                placeholder="Pendidikan Ibu"
                label="Pendidikan Ibu"
                outlined
                dense
								color="light-black darken-3"
                hide-details
                clearable
              />
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-end align-center pl-2"
						>
              <v-autocomplete
                v-model="inputDataDetailOrangtua.pekerjaan_ibu"
                :items="pekerjaanOptions"
                item-text="label"
                item-value="kode"
                placeholder="Pekerjaan Ibu"
                label="Pekerjaan Ibu"
                outlined
                dense
								color="light-black darken-3"
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
					Telepon Ibu
				</v-col>
				<v-col
					cols="12"
					md="8"
					class="pt-3"
				>
					<v-text-field
						v-model="inputDataDetailOrangtua.telp_ibu"
						placeholder="Telepon Ibu"
						outlined
						dense
						label="Telepon Ibu"
						color="light-black darken-3"
						@keypress.native="onlyNumber($event, 15, inputDataDetailOrangtua.telp_ibu)"
						hide-details
						clearable
					/>
				</v-col>
			</v-row>
      <h2 class="subheading black--text"><u>>>Data Wali</u></h2>
      <v-row no-gutters>
				<v-col
					cols="12"
					md="4"
					class="pt-2 d-flex align-center font-weight-bold"
				>
					NIK & Nama Wali
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
                v-model="inputDataDetailOrangtua.nik_wali"
                placeholder="NIK Wali"
                outlined
                dense
                label="NIK Wali"
                color="light-black darken-3"
                @keypress.native="onlyNumber($event, 18, inputDataDetailOrangtua.nik_wali)"
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
								v-model="inputDataDetailOrangtua.nama_wali"
								placeholder="Nama Wali"
								outlined
								dense
								label="Nama Wali"
								color="light-black darken-3"
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
					Telepon & Tahun Wali
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
                v-model="inputDataDetailOrangtua.telp_wali"
                placeholder="Telepon Wali"
                outlined
                dense
                label="Telepon Wali"
                color="light-black darken-3"
                @keypress.native="onlyNumber($event, 15, inputDataDetailOrangtua.telp_wali)"
                hide-details
                clearable
              />
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-end align-center pl-2"
						>
              <v-autocomplete
                v-model="inputDataDetailOrangtua.tahun_wali"
                :items="tahunOptions"
                item-text="value"
                item-value="value"
                placeholder="Tahun Wali"
                label="Tahun Wali"
                outlined
                dense
								color="light-black darken-3"
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
					Pendidikan & Pekerjaan Wali
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
              <v-autocomplete
                v-model="inputDataDetailOrangtua.pendidikan_wali"
                :items="pendidikanOptions"
                item-text="label"
                item-value="kode"
                placeholder="Pendidikan Wali"
                label="Pendidikan Wali"
                outlined
                dense
								color="light-black darken-3"
                hide-details
                clearable
              />
						</v-col>
						<v-col
							cols="12"
							md="6"
							class="d-flex justify-end align-center pl-2"
						>
              <v-autocomplete
                v-model="inputDataDetailOrangtua.pekerjaan_wali"
                :items="pekerjaanOptions"
                item-text="label"
                item-value="kode"
                placeholder="Pekerjaan Wali"
                label="Pekerjaan Wali"
                outlined
                dense
				color="light-black darken-3"
                hide-details
                clearable
              />
						</v-col>
					</v-row>
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
					@click="stepFour()"
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
import PopUpNotifikasiVue from '../../../Layout/PopUpNotifikasi.vue';
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
		inputDataDetailOrangtua: {
      id_user: '',
      no_kk: '',
      nama_kk: '',
      nama_ayah: '',
      tahun_ayah: '',
      status_ayah: '',
      nik_ayah: '',
      pendidikan_ayah: '',
      pekerjaan_ayah: '',
      telp_ayah: '',
      nama_ibu: '',
      tahun_ibu: '',
      status_ibu: '',
      nik_ibu: '',
      pendidikan_ibu: '',
      pekerjaan_ibu: '',
      telp_ibu: '',
      nama_wali: '',
      tahun_wali: '',
      nik_wali: '',
      pendidikan_wali: '',
      pekerjaan_wali: '',
      telp_wali: '',
      penghasilan: '',
      status_tempat_tinggal: '',
      jarak_rumah: '',
      transportasi: '',
      telp: '',
      alamat: '',
      provinsi: '',
      kabkota: '',
      kecamatan: '',
      kelurahan: '',
      kode_pos: '',
    },
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
			'pekerjaanOptions',
			'penghasilanOptions',
			'statusorangtuaOptions',
			'statustempattinggalOptions',
			'jarakrumahOptions',
			'transportasiOptions',
			'ProvinsiOptions',
			'KabKotaOptions',
			'KecamatanOptions',
			'KelurahanOptions',
		]),
		tahunOptions(){
			const d = new Date();
			let tahunData = []
			for (let tahun = 1945; tahun <= d.getFullYear(); tahun++) {
				tahunData.push({value: tahun.toString()})
			}
			return tahunData
		},
  },
	watch: {
		inputDataDetailOrangtua:{
			deep: true,
			handler(value) {
				if(!value.provinsi){
					this.inputDataDetailOrangtua.kabkota = ''
					this.inputDataDetailOrangtua.kecamatan = ''
					this.inputDataDetailOrangtua.kelurahan = ''
					this.inputDataDetailOrangtua.kode_pos = ''
				}

				if(value.no_kk != '' && value.nama_kk != '' && value.telp != '' && value.alamat != '' && value.provinsi != '' && value.kabkota != '' && value.kecamatan != '' && value.kelurahan != '' &&
          value.nik_ayah != '' && value.nama_ayah != '' && value.status_ayah != '' && value.tahun_ayah != '' && value.pendidikan_ayah != '' && value.pekerjaan_ayah != '' &&
          value.nik_ibu != '' && value.nama_ibu != '' && value.status_ibu != '' && value.tahun_ibu != '' && value.pendidikan_ibu != '' && value.pekerjaan_ibu != '' &&
					value.penghasilan != ''){
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
				this.inputDataDetailOrangtua = {
					id_user: value.idUser ? value.idUser : null,
          no_kk: value.noKK ? value.noKK : null,
          nama_kk: value.namaKK ? value.namaKK : null,
          nama_ayah: value.dataOrangtua.dataAyah.namaAyah ? value.dataOrangtua.dataAyah.namaAyah : null,
          tahun_ayah: value.dataOrangtua.dataAyah.tahunAyah ? value.dataOrangtua.dataAyah.tahunAyah : null,
          status_ayah: value.dataOrangtua.dataAyah.statusAyah ? value.dataOrangtua.dataAyah.statusAyah.kode : null,
          nik_ayah: value.dataOrangtua.dataAyah.nikAyah ? value.dataOrangtua.dataAyah.nikAyah : null,
          pendidikan_ayah: value.dataOrangtua.dataAyah.pendidikanAyah ? value.dataOrangtua.dataAyah.pendidikanAyah.kode : null,
          pekerjaan_ayah: value.dataOrangtua.dataAyah.pekerjaanAyah ? value.dataOrangtua.dataAyah.pekerjaanAyah.kode : null,
          telp_ayah: value.dataOrangtua.dataAyah.telpAyah ? value.dataOrangtua.dataAyah.telpAyah : null,
          nama_ibu: value.dataOrangtua.dataIbu.namaIbu ? value.dataOrangtua.dataIbu.namaIbu : null,
          tahun_ibu: value.dataOrangtua.dataIbu.tahunIbu ? value.dataOrangtua.dataIbu.tahunIbu : null,
          status_ibu: value.dataOrangtua.dataIbu.statusIbu ? value.dataOrangtua.dataIbu.statusIbu.kode : null,
          nik_ibu: value.dataOrangtua.dataIbu.nikIbu ? value.dataOrangtua.dataIbu.nikIbu : null,
          pendidikan_ibu: value.dataOrangtua.dataIbu.pendidikanIbu ? value.dataOrangtua.dataIbu.pendidikanIbu.kode : null,
          pekerjaan_ibu: value.dataOrangtua.dataIbu.pekerjaanIbu ? value.dataOrangtua.dataIbu.pekerjaanIbu.kode : null,
          telp_ibu: value.dataOrangtua.dataIbu.telpIbu ? value.dataOrangtua.dataIbu.telpIbu : null,
          nama_wali: value.dataOrangtua.dataWali.namaWali ? value.dataOrangtua.dataWali.namaWali : null,
          tahun_wali: value.dataOrangtua.dataWali.tahunWali ? value.dataOrangtua.dataWali.tahunWali : null,
          nik_wali: value.dataOrangtua.dataWali.nikWali ? value.dataOrangtua.dataWali.nikWali : null,
          pendidikan_wali: value.dataOrangtua.dataWali.pendidikanWali ? value.dataOrangtua.dataWali.pendidikanWali.kode : null,
          pekerjaan_wali: value.dataOrangtua.dataWali.pekerjaanWali ? value.dataOrangtua.dataWali.pekerjaanWali.kode : null,
          telp_wali: value.dataOrangtua.dataWali.telpWali ? value.dataOrangtua.dataWali.telpWali : null,
          penghasilan: value.penghasilan ? value.penghasilan.kode : null,
          status_tempat_tinggal: value.dataLainnya.statusTempatTinggal ? value.dataLainnya.statusTempatTinggal.kode : null,
          jarak_rumah: value.dataLainnya.jarakRumah ? value.dataLainnya.jarakRumah.kode : null,
          transportasi: value.dataLainnya.transportasi ? value.dataLainnya.transportasi.kode : null,
					telp: value.dataAlamatOrangtua.telp ? value.dataAlamatOrangtua.telp : null,
					alamat: value.dataAlamatOrangtua.alamat ? value.dataAlamatOrangtua.alamat : null,
					provinsi: value.dataAlamatOrangtua.provinsi ? value.dataAlamatOrangtua.provinsi.kode : null,
					kabkota: value.dataAlamatOrangtua.kabKota ? value.dataAlamatOrangtua.kabKota.kode : null,
					kecamatan: value.dataAlamatOrangtua.kecamatan ? value.dataAlamatOrangtua.kecamatan.kode : null,
					kelurahan: value.dataAlamatOrangtua.kelurahan ? value.dataAlamatOrangtua.kelurahan.kode : null,
					kode_pos: value.dataAlamatOrangtua.kodePos ? value.dataAlamatOrangtua.kodePos : null,
				}
				this.getWilayah({ bagian: 'kabkota', KodeWilayah: this.inputDataDetailOrangtua.provinsi })
				this.getWilayah({ bagian: 'kecamatan', KodeWilayah: this.inputDataDetailOrangtua.kabkota })
				this.getWilayah({ bagian: 'kelurahan', KodeWilayah: this.inputDataDetailOrangtua.kecamatan })
			}
		},
	},
	// created() {
	// 	this.inputDataDetailOrangtua = {
	// 		id_user: this.dataSiswaSiswi ? this.dataSiswaSiswi.idUser : null,
	// 		no_kk: this.dataSiswaSiswi ? this.dataSiswaSiswi.noKK : null,
	// 		nama_kk: this.dataSiswaSiswi ? this.dataSiswaSiswi.namaKK : null,
	// 		nama_ayah: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataAyah.namaAyah : null,
	// 		tahun_ayah: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataAyah.tahunAyah : null,
	// 		status_ayah: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataAyah.statusAyah.kode : null,
	// 		nik_ayah: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataAyah.nikAyah : null,
	// 		pendidikan_ayah: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataAyah.pendidikanAyah.kode : null,
	// 		pekerjaan_ayah: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataAyah.pekerjaanAyah.kode : null,
	// 		telp_ayah: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataAyah.telpAyah : null,
	// 		nama_ibu: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataIbu.namaIbu : null,
	// 		tahun_ibu: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataIbu.tahunIbu : null,
	// 		status_ibu: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataIbu.statusIbu.kode : null,
	// 		nik_ibu: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataIbu.nikIbu : null,
	// 		pendidikan_ibu: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataIbu.pendidikanIbu.kode : null,
	// 		pekerjaan_ibu: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataIbu.pekerjaanIbu.kode : null,
	// 		telp_ibu: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataIbu.telpIbu : null,
	// 		nama_wali: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataWali.namaWali : null,
	// 		tahun_wali: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataWali.tahunWali : null,
	// 		nik_wali: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataWali.nikWali : null,
	// 		pendidikan_wali: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataWali.pendidikanWali.kode : null,
	// 		pekerjaan_wali: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataWali.pekerjaanWali.kode : null,
	// 		telp_wali: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataOrangtua.dataWali.telpWali : null,
	// 		penghasilan: this.dataSiswaSiswi ? this.dataSiswaSiswi.penghasilan.kode : null,
	// 		status_tempat_tinggal: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataLainnya.statusTempatTinggal.kode : null,
	// 		jarak_rumah: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataLainnya.jarakRumah.kode : null,
	// 		transportasi: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataLainnya.transportasi.kode : null,
	// 		telp: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataAlamatOrangtua.telp : null,
	// 		alamat: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataAlamatOrangtua.alamat : null,
	// 		provinsi: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataAlamatOrangtua.provinsi.kode : null,
	// 		kabkota: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataAlamatOrangtua.kabKota.kode : null,
	// 		kecamatan: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataAlamatOrangtua.kecamatan.kode : null,
	// 		kelurahan: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataAlamatOrangtua.kelurahan.kode : null,
	// 		kode_pos: this.dataSiswaSiswi ? this.dataSiswaSiswi.dataAlamatOrangtua.kodePos : null,
	// 	}
	// 	this.getWilayah({ bagian: 'kabkota', KodeWilayah: this.inputDataDetailOrangtua.provinsi })
	// 	this.getWilayah({ bagian: 'kecamatan', KodeWilayah: this.inputDataDetailOrangtua.kabkota })
	// 	this.getWilayah({ bagian: 'kelurahan', KodeWilayah: this.inputDataDetailOrangtua.kecamatan })
	// },
	mounted() {
		this.inputDataDetailOrangtua.id_user = this.$route.params.uid;
		this.getPendidikan()
		this.getPekerjaan()
		this.getPenghasilan()
		this.getStatusOrangTua()
		this.getStatusTempatTinggal()
		this.getJarakRumah()
		this.getTransportasi()
		this.getWilayah({ bagian: 'provinsi', KodeWilayah: null })
	},
	methods: {
		...mapActions(["fetchData", "getPendidikan", "getPekerjaan", "getPenghasilan", "getStatusOrangTua", "getStatusTempatTinggal", "getJarakRumah", "getTransportasi", "getWilayah"]),
		wilayah(kondisi, e){
			if(kondisi === 'provinsi'){
				if(e){
					this.getWilayah({ bagian: 'kabkota', KodeWilayah: e })
					this.inputDataDetailOrangtua.kabkota = ''
					this.inputDataDetailOrangtua.kecamatan = ''
					this.inputDataDetailOrangtua.kelurahan = ''
					this.inputDataDetailOrangtua.kode_pos = ''
				}
			}else if(kondisi === 'kabkota'){
				if(e){
					this.getWilayah({ bagian: 'kecamatan', KodeWilayah: e })
					if(e !== this.inputDataDetailOrangtua.kecamatan) {
						this.inputDataDetailOrangtua.kelurahan = ''
						this.inputDataDetailOrangtua.kode_pos = ''	
					}
				}else{
					this.inputDataDetailOrangtua.kecamatan = ''
					this.inputDataDetailOrangtua.kelurahan = ''
					this.inputDataDetailOrangtua.kode_pos = ''
				}
			}else if(kondisi === 'kecamatan'){
				if(e){
					this.getWilayah({ bagian: 'kelurahan', e })
					if(e !== this.inputDataDetailOrangtua.kelurahan) {
						this.inputDataDetailOrangtua.kode_pos = ''	
					}
				}else{
					this.inputDataDetailOrangtua.kelurahan = ''
					this.inputDataDetailOrangtua.kode_pos = ''
				}
			}else if(kondisi === 'kelurahan'){
				if(e){
					let data = this.KelurahanOptions.filter(str => str.value === e)
					if(this.$route.params.kondisi === 'ADD'){
						this.inputDataDetailOrangtua.kode_pos = data[0].kodePos
					}else if(this.$route.params.kondisi === 'EDIT'){
						this.inputDataDetailOrangtua.kode_pos = this.inputDataDetailOrangtua.kode_pos ? data.length ? data[0].kodePos : this.inputDataDetailOrangtua.kode_pos : data[0].kodePos
					}
				}else{
					this.inputDataDetailOrangtua.kode_pos = ''
				}
			}
		},
		backStep() {
      this.$emit("backStep", 3);
    },
		stepFour() {
			this.$emit("StepFour");
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