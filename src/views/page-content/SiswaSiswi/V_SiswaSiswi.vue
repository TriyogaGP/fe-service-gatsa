<template>
  <div>
    <h1 class="subheading grey--text">Data Siswa Siswi</h1>
    <v-card class="mt-2 mb-2 pa-1" outlined elevation="0">
      <v-row no-gutters class="pa-2">
        <v-col cols="12" md="6">
          <v-btn
            color="light-blue darken-3"
            small
            dense
            depressed
            class="ma-2 white--text text--darken-2"
            @click="gotoForm()"
          >
            <v-icon small>add</v-icon>&nbsp;Tambah
          </v-btn>
          <v-btn
            color="#0bd369"
            small
            dense
            depressed
            class="ma-2 white--text text--darken-2"
            @click="() => { dialogImport = true }"
          >
            <v-icon small>fa-solid fa-file-import</v-icon>&nbsp;Import Data
          </v-btn>
          <v-btn
            color="#0bd369"
            small
            dense
            depressed
            class="ma-2 white--text text--darken-2"
            @click="exportExcel()"
          >
            <v-icon small>fa-solid fa-file-export</v-icon>&nbsp;Export Data
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-row no-gutters>
            <v-col cols="12" md="9">
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
                @keyup.enter="getSiswaSiswi(1, limit, searchData)"
              />
            </v-col>
            <v-col cols="12" md="3" class="pl-2 d-flex justify-end align-center">
              <v-autocomplete
                v-model="page"
                :items="pageOptions"
                item-text="value"
                item-value="value"
                label="Page"
                outlined
                dense
                color="light-black darken-3"
                hide-details
                :disabled="DataSiswaSiswi.length ? false : true"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="px-1">
        <v-data-table
          loading-text="Sedang memuat... Harap tunggu"
          no-data-text="Tidak ada data yang tersedia"
          no-results-text="Tidak ada catatan yang cocok ditemukan"
          :headers="headers"
          :loading="isLoading"
          :items="DataSiswaSiswi"
          :item-class= "row_classes"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
          item-key="idUser"
          hide-default-header
          hide-default-footer
          class="elevation-1"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
        >
          <!-- header -->
          <template v-slot:header="{ props }">
            <thead class="v-data-table-header">
              <tr>
                <th v-for="header in props.headers" :key="header.text" style="font-weight: bold;">{{ header.text.toUpperCase() }}</th>
              </tr>
            </thead>
          </template>
          <template #[`item.number`]="{ item }">
            {{ page > 1 ? ((page - 1)*limit) + DataSiswaSiswi.indexOf(item) + 1 : DataSiswaSiswi.indexOf(item) + 1 }}
          </template>
          <template #[`item.nama`]="{ item }">
            <span v-html="uppercaseLetterFirst2(item.nama)" /> 
          </template>
          <template #[`item.statusAktif`]="{ item }">
            <v-icon small v-if="item.statusAktif == true" color="green">check</v-icon>
            <v-icon small v-else-if="item.statusAktif == false" color="red">clear</v-icon>
            <br>
            <span v-html="item.statusAktif == true ? 'Active' : 'Non Active'" /> 
          </template>
          <template #[`item.validasi`]="{ item }">
            <v-icon small v-if="item.validasiAkun == true" color="green">check</v-icon>
            <v-icon small v-else-if="item.validasiAkun == false" color="red">clear</v-icon>
          </template>
          <template #[`item.mutasi`]="{ item }">
            <v-icon small v-if="item.mutasiAkun == true" color="green">check</v-icon>
            <v-icon small v-else-if="item.mutasiAkun == false" color="red">clear</v-icon>
          </template>
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="white">
              <v-btn
                :value="item.idUser"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.mutasiAkun == true || item.statusAktif == false"
                @click="ubahData(item.idUser)"
              >
                <v-icon small>edit</v-icon>&nbsp;Ubah
              </v-btn> 
              <v-btn
                :value="item.idUser"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.mutasiAkun == true"
                @click="ProsesRecord(item, 'STATUSRECORD', !item.statusAktif)"
              >
                <v-icon small>{{ item.statusAktif === false ? 'visibility' : 'visibility_off' }}</v-icon>&nbsp;{{ item.statusAktif === false ? 'Active' : 'Non Active' }}
              </v-btn>
              <v-btn
                :value="item.idUser"
                color="#bd3a07"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.mutasiAkun == true || item.statusAktif == false"
                @click="HapusRecord(item)"
              >
                <v-icon small>delete</v-icon>&nbsp;Hapus
              </v-btn>
              <v-btn
                :value="item.idUser"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.mutasiAkun == true || item.statusAktif == false"
                @click="ProsesRecord(item, 'VALIDASIAKUN', !item.validasiAkun)"
              >
                <v-icon small>{{ item.validasiAkun === false ? 'check' : 'clear' }}</v-icon>&nbsp;{{ item.validasiAkun === false ? 'Validate' : 'Not Validate' }}
              </v-btn>
              <v-btn
                :value="item.idUser"
                color="#bd3a07"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                :disabled="item.statusAktif == false || (roleID !== '1' && item.mutasiAkun === true)"
                @click="ProsesRecord(item, 'MUTASIAKUN', !item.mutasiAkun)"
              >
                <v-icon small>fa-person-circle-exclamation</v-icon>&nbsp;Mutasi Akun
              </v-btn>
              <v-btn
                :value="item.idUser"
                color="#04f7f7"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="openDialog(item)"
              >
                <v-icon small>info</v-icon>&nbsp;Detail
              </v-btn> 
              <v-btn
                :value="item.idUser"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="() => { dialogUploadBerkas = true; previewData.idUser = item.idUser; }"
              >
                <v-icon small>upload</v-icon>&nbsp;Upload Berkas
              </v-btn> 
              <v-btn
                :loading="isLoadingbtnPDF"
                :value="item.idUser"
                color="#04f7f7"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="pdfCreate(item.idUser, null, null, 'create')"
              >
                <v-icon small>fa-solid fa-file-pdf</v-icon>&nbsp;PDF
              </v-btn> 
              <v-divider />
            </td>
          </template>
        </v-data-table>
      </div>
      <v-row>
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
            label="Limit"
						outlined
						dense
            color="light-black darken-3"
						hide-details
						:disabled="DataSiswaSiswi.length ? false : true"
					/>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataSiswaSiswi.length ? pageSummary.page != 1 ? false : true : true"
						@click="() => { page = pageSummary.page - 1 }"
					>
						keyboard_arrow_left
					</v-icon>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataSiswaSiswi.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
						@click="() => { page = pageSummary.page + 1 }"
					>
						keyboard_arrow_right
					</v-icon>
				</div>
			</v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="DialogSiswaSiswi"
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
          <v-toolbar-title>Data Detail Siswa Siswi</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { clearData(); DialogSiswaSiswi = false; }"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pt-4">
          <div class="text-center">
            <v-avatar size="150" style="border: solid 2px #000;">
              <v-img :src="previewData.fotoProfil"></v-img>
            </v-avatar>
          </div>
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
              {{ previewData.namaRole }}
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
              {{ previewData.nama }}
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
              {{ previewData.username }}
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
              {{ previewData.email }}
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
              {{ previewData.password }}&nbsp;
              <v-icon
                color="light-black darken-3"
                tabindex="-1"
                @click="endecryptData('endecryptType')"
                >{{ endecryptType ? 'lock' : 'lock_open' }}</v-icon
              >
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
              {{ previewData.nikSiswa }}
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
              {{ previewData.nomorInduk }}
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
              {{ previewData.tempat }}, {{ convertDateForMonth(previewData.tanggalLahir) }}
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
              {{ previewData.jenisKelamin }}
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
              {{ previewData.agama }}
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
              {{ previewData.anakKe }}
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
              {{ previewData.jumlahSaudara }}
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
              {{ previewData.hobi }}
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
              {{ previewData.citaCita }}
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
              {{ previewData.kelas }}
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
              {{ previewData.jenjang }}
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
              {{ previewData.statusSekolah }}
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
              {{ previewData.namaSekolah }}
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
              {{ previewData.npsn }}
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
              {{ previewData.alamatSekolah }}
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
              {{ previewData.kabkotSekolah }}
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
              {{ previewData.noPesertaUN }}
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
              {{ previewData.noSKHUN }}
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
              {{ previewData.noIjazah }}
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
              {{ previewData.nilaiUN }}
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
              {{ previewData.noKK }}
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
              {{ previewData.namaKK }}
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
              {{ previewData.telp }}
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
              {{ previewData.alamat }}
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
              {{ previewData.provinsi }}
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
              {{ previewData.kabKota }}
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
              {{ previewData.kecamatan }}				
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
              {{ previewData.kelurahan }}
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
              {{ previewData.kodePos }}
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
              {{ previewData.nikAyah }}
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
              {{ previewData.namaAyah }}
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
              {{ previewData.tahunAyah }}
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
              {{ previewData.statusAyah }}
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
              {{ previewData.pendidikanAyah }}
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
              {{ previewData.pekerjaanAyah }}
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
              {{ previewData.telpAyah }}
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
              {{ previewData.nikIbu }}
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
              {{ previewData.namaIbu }}
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
              {{ previewData.tahunIbu }}
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
              {{ previewData.statusIbu }}
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
              {{ previewData.pendidikanIbu }}
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
              {{ previewData.pekerjaanIbu }}
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
              {{ previewData.telpIbu }}
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
              {{ previewData.nikWali }}
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
              {{ previewData.namaWali }}
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
              {{ previewData.tahunWali }}
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
              {{ previewData.pendidikanWali }}
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
              {{ previewData.pekerjaanWali }}
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
              {{ previewData.telpWali }}
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
              {{ previewData.penghasilan }}
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
              {{ previewData.statusTempatTinggal }}
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
              {{ previewData.jarakRumah }}
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
              {{ previewData.transportasi }}
            </v-col>
          </v-row>
          <h2 class="subheading black--text"><u>>>Berkas</u></h2>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC Ijazah
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                :loading="isLoadingbtnPDF1"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="pdfCreate(previewData.idUser, previewData.fcIjazah, 'ijazah', 'berkas')"
              >
                <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC SKHUN
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                :loading="isLoadingbtnPDF2"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="pdfCreate(previewData.idUser, previewData.fcSKHUN, 'skhun', 'berkas')"
              >
                <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC Kartu Keluarga
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                :loading="isLoadingbtnPDF3"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="pdfCreate(previewData.idUser, previewData.fcKK, 'kk', 'berkas')"
              >
                <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC KTP Orangtua
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                :loading="isLoadingbtnPDF4"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="pdfCreate(previewData.idUser, previewData.fcKTPOrtu, 'ktp', 'berkas')"
              >
                <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC Akta Lahir
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                :loading="isLoadingbtnPDF5"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="pdfCreate(previewData.idUser, previewData.fcAktaLahir, 'aktalahir', 'berkas')"
              >
                <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC SKL
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                :loading="isLoadingbtnPDF6"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="pdfCreate(previewData.idUser, previewData.fcSKL, 'skl', 'berkas')"
              >
                <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions />
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogPDF"
      scrollable
			width="1000px"
			persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>Data PDF Siswa Siswi</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="dialogPDF = false;"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pt-4">
          <PdfCetakan
            :dialog-pdf.sync="dialogPDF"
            :url-sk.sync="urlSk"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions />
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogUploadBerkas"
      scrollable
			width="800px"
			persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>Upload Berkas Siswa Siswi</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { dialogUploadBerkas = false; previewData.idUser = ''; }"
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
              FC Ijazah
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                color="#0bd369"
                small
                dense
                depressed
                class="white--text text--darken-2"
                @click="pilihFile('ijazah')"
              >
                <v-icon small>upload</v-icon>&nbsp;Upload Berkas
              </v-btn>
              <input 
                ref="inputIjazah"
                :key="componentKey"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="uploadBerkas($event, 'ijazah')"
              >
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC SKHUN
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                color="#0bd369"
                small
                dense
                depressed
                class="white--text text--darken-2"
                @click="pilihFile('skhun')"
              >
                <v-icon small>upload</v-icon>&nbsp;Upload Berkas
              </v-btn>
              <input 
                ref="inputSKHUN"
                :key="componentKey"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="uploadBerkas($event, 'skhun')"
              >
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC Kartu Keluarga
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                color="#0bd369"
                small
                dense
                depressed
                class="white--text text--darken-2"
                @click="pilihFile('kk')"
              >
                <v-icon small>upload</v-icon>&nbsp;Upload Berkas
              </v-btn>
              <input 
                ref="inputKK"
                :key="componentKey"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="uploadBerkas($event, 'kk')"
              >
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC KTP
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                color="#0bd369"
                small
                dense
                depressed
                class="white--text text--darken-2"
                @click="pilihFile('ktp')"
              >
                <v-icon small>upload</v-icon>&nbsp;Upload Berkas
              </v-btn>
              <input 
                ref="inputKTP"
                :key="componentKey"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="uploadBerkas($event, 'ktp')"
              >
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC Akta Lahir
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                color="#0bd369"
                small
                dense
                depressed
                class="white--text text--darken-2"
                @click="pilihFile('aktalahir')"
              >
                <v-icon small>upload</v-icon>&nbsp;Upload Berkas
              </v-btn>
              <input 
                ref="inputAktaLahir"
                :key="componentKey"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="uploadBerkas($event, 'aktalahir')"
              >
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              FC SKL
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-btn
                color="#0bd369"
                small
                dense
                depressed
                class="white--text text--darken-2"
                @click="pilihFile('skl')"
              >
                <v-icon small>upload</v-icon>&nbsp;Upload Berkas
              </v-btn>
              <input 
                ref="inputSKL"
                :key="componentKey"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="uploadBerkas($event, 'skl')"
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions />
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogImport"
      scrollable
			width="600px"
			persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>
            Import Data Siswa Siswi
            <v-btn
              color="light-blue darken-3"
              small
              dense
              depressed
              class="ma-2 white--text text--darken-2"
              @click="downloadTemplate()"
            >
              <v-icon small>download</v-icon>&nbsp;Download Template
            </v-btn>
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="dialogImport = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pt-4">
          <v-card class="pa-2 d-flex justify-center align-center" elevation="1" outlined>
            <div class="kotak" @click="pilihFile('excel')">
              <v-icon middle color="black">fa-solid fa-file-excel</v-icon>
              <div style="font-weight: bold;">Tambah File</div>
            </div>
            <input 
              ref="inputExcel"
              :key="componentKey"
              type="file"
              accept=".xlsx,.xls"
              style="display: none"
              @change="importExcel($event)"
            >
          </v-card>
        </v-card-text>
        <v-divider />
        <v-card-actions />
      </v-card>
    </v-dialog>
    <v-dialog
			v-model="isLoadingExport"
			transition="dialog-bottom-transition"
			persistent
			width="500px"
		>
			<v-progress-linear
				class="pa-3"
				indeterminate
				color="black darken-3"
			/>
			<h4 style="color: #000; text-align: center; background-color: #FFF;">Sedang proses export data, harap menunggu ...</h4>
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
import { mapActions } from "vuex";
import PopUpNotifikasiVue from "../../Layout/PopUpNotifikasi.vue";
import PdfCetakan from '../../Layout/PdfCetakan.vue';

export default {
  name: 'DataSiswaSiswi',
  components: {
    PdfCetakan,
    PopUpNotifikasiVue
  },
  data: () => ({
    isLoading: false,
    isLoadingbtnPDF: false,
    isLoadingbtnPDF1: false,
    isLoadingbtnPDF2: false,
    isLoadingbtnPDF3: false,
    isLoadingbtnPDF4: false,
    isLoadingbtnPDF5: false,
    isLoadingbtnPDF6: false,
    isLoadingExport: false,
		DataSiswaSiswi: [],
		kelasOptions: [],
    expanded: [],
    singleExpand: true,
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
    pageOptions: [
      { value: 1 }
    ],
		pageSummary: {
			page: '',
			limit: '',
			total: '',
			totalPages: ''
		},
		headers: [
      { text: "No", value: "number", sortable: false, width: "5%" },
      { text: "#", value: "data-table-expand", sortable: false, width: "5%" },
      { text: "Nomor Induk", value: "nomorInduk", sortable: false },
      { text: "Nama", value: "nama", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Kelas", value: "kelas", sortable: false },
      { text: "Validasi Akun", value: "validasi", sortable: false },
      { text: "Mutasi Akun", value: "mutasi", sortable: false },
      { text: "Status", value: "statusAktif", sortable: false },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,
    roleID: '',
    previewData: {
      idUser: '',
      namaRole: '',
      nama: '',
      username: '',
      email: '',
      password: '',
      nikSiswa: '',
      nomorInduk: '',
      tempat: '',
      tanggalLahir: '',
      jenisKelamin: '',
      agama: '',
      anakKe: '',
      jumlahSaudara: '',
      hobi: '',
      citaCita: '',
      kelas: '',
      jenjang: '',
      statusSekolah: '',
      namaSekolah: '',
      npsn: '',
      alamatSekolah: '',
      kabkotSekolah: '',
      noPesertaUN: '',
      noSKHUN: '',
      noIjazah: '',
      nilaiUN: '',
      noKK: '',
      namaKK: '',
      telp: '',
      alamat: '',
      provinsi: '',
      kabKota: '',
      kecamatan: '',
      kelurahan: '',
      kodePos: '',
      nikAyah: '',
      namaAyah: '',
      tahunAyah: '',
      statusAyah: '',
      pendidikanAyah: '',
      pekerjaanAyah: '',
      telpAyah: '',
      nikIbu: '',
      namaIbu: '',
      tahunIbu: '',
      statusIbu: '',
      pendidikanIbu: '',
      pekerjaanIbu: '',
      telpIbu: '',
      nikWali: '',
      namaWali: '',
      tahunWali: '',
      pendidikanWali: '',
      pekerjaanWali: '',
      telpWali: '',
      penghasilan: '',
      statusTempatTinggal: '',
      jarakRumah: '',
      transportasi: '',
      fotoProfil: '',
      fcIjazah: '',
      fcSKHUN: '',
      fcKK: '',
      fcKTPOrtu: '',
      fcAktaLahir: '',
      fcSKL: '',
    },
    dialogPDF: false,
    DialogSiswaSiswi: false,
    dialogUploadBerkas: false,
    dialogImport: false,
    urlSk: window.location.href,
    endecryptType: '',
    BASE_URL: '',
    componentKey: 0,
    fcIjazah: '',
    fcSKHUN: '',
    fcKK: '',
    fcKTP: '',
    fcAktaLahir: '',
    fcSKL: '',

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Data Siswa Siswi - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  watch: {
    page: {
			deep: true,
			handler(value) {
				this.getSiswaSiswi(value, this.limit, this.searchData)
			}
		},
    limit: {
			deep: true,
			handler(value) {
				this.getSiswaSiswi(1, value, this.searchData)
			}
		},
  },
  mounted() {
    this.BASEURL = process.env.VUE_APP_NODE_ENV === "production" ? process.env.VUE_APP_PROD_API_URL : process.env.VUE_APP_DEV_API_URL
    this.roleID = localStorage.getItem('roleID')
		this.getSiswaSiswi(this.page, this.limit, this.searchData);
    this.optionKelas()
	},
	methods: {
		...mapActions({
      fetchData: "fetchData",
      uploadFiles: "upload/uploadFiles",
    }),
		getSiswaSiswi(page = 1, limit, keyword) {
      this.itemsPerPage = limit
      this.page = page
			this.isLoading = true
      this.DataSiswaSiswi = []
      this.pageOptions = [{ value: 1 }]
			this.pageSummary = {
				page: '',
				limit: '',
				total: '',
				totalPages: ''
			}
			let payload = {
        method: "get",
				url: `user/siswasiswi?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ''}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let resdata = res.data.result
				this.DataSiswaSiswi = resdata.records
				this.pageSummary = {
					page: this.DataSiswaSiswi.length ? resdata.pageSummary.page : 0,
					limit: this.DataSiswaSiswi.length ? resdata.pageSummary.limit : 0,
					total: this.DataSiswaSiswi.length ? resdata.pageSummary.total : 0,
					totalPages: this.DataSiswaSiswi.length ? resdata.pageSummary.totalPages : 0
				}
        for (let index = 1; index <= this.pageSummary.totalPages; index++) {
          this.pageOptions.push({ value: index })
        }
        this.isLoading = false
			})
			.catch((err) => {
        this.itemsPerPage = limit
        this.page = page
        this.DataSiswaSiswi = []
        this.pageOptions = [{ value: 1 }]
        this.pageSummary = {
          page: '',
          limit: '',
          total: '',
          totalPages: ''
        }
        this.isLoading = false
        this.notifikasi("error", err.response.data.message, "1")
			});
		},
    optionKelas(){
      let payload = {
        method: "get",
				url: `settings/optionsKelas`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let data = res.data.result
        this.kelasOptions = data.map(str => str.kelas).join(', ')
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
    HapusRecord(item) {
      let bodyData = {
        user: {
          jenis: 'DELETE',
          idUser: item.idUser,
        },
        userdetail: {}
      }
      let payload = {
				method: "post",
				url: `user/siswasiswi`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.getSiswaSiswi(1, this.limit, this.searchData)
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    ProsesRecord(item, jenis, kondisi) {
      let bodyData = {
        user: {
          jenis: jenis,
          idUser: item.idUser,
          kondisi: kondisi,
        },
        userdetail: {}
      }
      let payload = {
				method: "post",
				url: `user/siswasiswi`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.getSiswaSiswi(1, this.limit, this.searchData)
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    gotoForm(){
      let payload = {
        method: "get",
				url: `settings/getUID`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let resdata = res.data.result
        this.$router.push({name: "FormulirSiswaSiswi", params: { kondisi: 'ADD', uid: resdata }});
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
    ubahData(uid){
      this.$router.push({name: "FormulirSiswaSiswi", params: { kondisi: 'EDIT', uid: uid }});
    },
    openDialog(item){
      this.previewData = {
        idUser: item.idUser,
        namaRole: item.namaRole,
        nama: item.nama,
        username: item.username,
        email: item.email,
        password: item.kataSandi,
        nikSiswa: item.nikSiswa ? item.nikSiswa : '-',
        nomorInduk: item.nomorInduk,
        tempat: item.tempat,
        tanggalLahir: item.tanggalLahir,
        jenisKelamin: item.jenisKelamin,
        agama: item.agama.label,
        anakKe: item.anakKe ? item.anakKe : '-',
        jumlahSaudara: item.jumlahSaudara ? item.jumlahSaudara : '-',
        hobi: item.hobi ? item.hobi.label : '-',
        citaCita: item.citaCita ? item.citaCita.label : '-',
        kelas: item.kelas ? item.kelas : '-',
        jenjang: item.dataSekolahSebelumnya.jenjang.label,
        statusSekolah: item.dataSekolahSebelumnya.statusSekolah.label,
        namaSekolah: item.dataSekolahSebelumnya.namaSekolah,
        npsn: item.dataSekolahSebelumnya.npsn ? item.dataSekolahSebelumnya.npsn : '-',
        alamatSekolah: item.dataSekolahSebelumnya.alamatSekolah,
        kabkotSekolah: this.uppercaseLetterFirst2(item.dataSekolahSebelumnya.kabkotSekolah.nama),
        noPesertaUN: item.dataSekolahSebelumnya.noPesertaUN ? item.dataSekolahSebelumnya.noPesertaUN : '-',
        noSKHUN: item.dataSekolahSebelumnya.noSKHUN ? item.dataSekolahSebelumnya.noSKHUN : '-',
        noIjazah: item.dataSekolahSebelumnya.noIjazah ? item.dataSekolahSebelumnya.noSKHUN : '-',
        nilaiUN: item.dataSekolahSebelumnya.nilaiUN ? item.dataSekolahSebelumnya.noSKHUN : '-',
        noKK: item.noKK,
        namaKK: item.namaKK,
        telp: item.dataAlamatOrangtua.telp,
        alamat: item.dataAlamatOrangtua.alamat,
        provinsi: this.uppercaseLetterFirst2(item.dataAlamatOrangtua.provinsi.nama),
        kabKota: this.uppercaseLetterFirst2(item.dataAlamatOrangtua.kabKota.nama),
        kecamatan: this.uppercaseLetterFirst2(item.dataAlamatOrangtua.kecamatan.nama),
        kelurahan: this.uppercaseLetterFirst2(item.dataAlamatOrangtua.kelurahan.nama),
        kodePos: item.dataAlamatOrangtua.kodePos,
        nikAyah: item.dataOrangtua.dataAyah.nikAyah,
        namaAyah: item.dataOrangtua.dataAyah.namaAyah,
        tahunAyah: item.dataOrangtua.dataAyah.tahunAyah,
        statusAyah: item.dataOrangtua.dataAyah.statusAyah.label,
        pendidikanAyah: item.dataOrangtua.dataAyah.pendidikanAyah.label,
        pekerjaanAyah: item.dataOrangtua.dataAyah.pekerjaanAyah.label,
        telpAyah: item.dataOrangtua.dataAyah.telpAyah,
        nikIbu: item.dataOrangtua.dataIbu.nikIbu,
        namaIbu: item.dataOrangtua.dataIbu.namaIbu,
        tahunIbu: item.dataOrangtua.dataIbu.tahunIbu,
        statusIbu: item.dataOrangtua.dataIbu.statusIbu.label,
        pendidikanIbu: item.dataOrangtua.dataIbu.pendidikanIbu.label,
        pekerjaanIbu: item.dataOrangtua.dataIbu.pekerjaanIbu.label,
        telpIbu: item.dataOrangtua.dataIbu.telpIbu,
        nikWali: item.dataOrangtua.dataWali.nikWali ? item.dataOrangtua.dataWali.nikWali : '-',
        namaWali: item.dataOrangtua.dataWali.namaWali ? item.dataOrangtua.dataWali.namaWali : '-',
        tahunWali: item.dataOrangtua.dataWali.tahunWali ? item.dataOrangtua.dataWali.tahunWali : '-',
        pendidikanWali: item.dataOrangtua.dataWali.pendidikanWali ? item.dataOrangtua.dataWali.pendidikanWali.label : '-',
        pekerjaanWali: item.dataOrangtua.dataWali.pekerjaanWali ? item.dataOrangtua.dataWali.pekerjaanWali.label : '-',
        telpWali: item.dataOrangtua.dataWali.telpWali ? item.dataOrangtua.dataWali.telpWali : '-',
        penghasilan: item.penghasilan ? item.penghasilan.label : '-',
        statusTempatTinggal: item.dataLainnya.statusTempatTinggal ? item.dataLainnya.statusTempatTinggal.label : '-',
        jarakRumah: item.dataLainnya.jarakRumah ? item.dataLainnya.jarakRumah.label : '-',
        transportasi: item.dataLainnya.transportasi ? item.dataLainnya.transportasi.label : '-',
        fotoProfil: item.fotoProfil,
        fcIjazah: item.berkas.fcIjazah,
        fcSKHUN: item.berkas.fcSKHUN,
        fcKK: item.berkas.fcKK,
        fcKTPOrtu: item.berkas.fcKTPOrtu,
        fcAktaLahir: item.berkas.fcAktaLahir,
        fcSKL: item.berkas.fcSKl,
      }
      console.log(item);
      this.DialogSiswaSiswi = true
    },
    downloadTemplate() {
			this.isLoadingExport = true
			fetch(`${this.BASEURL}user/template/4`, {
				method: 'GET',
				dataType: "xml",
			})
			.then(response => response.arrayBuffer())
			.then(async response => {
				// console.log(response)
				this.isLoadingExport = false
				let blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
				this.downloadBlob(blob,`Template Data Siswa.xlsx`)
				this.notifikasi("success", 'Sukses Export Excel', "1")
			})
		},
    exportExcel() {
			this.isLoadingExport = true
			fetch(`${this.BASEURL}user/exportexcel?kelas=${this.kelasOptions}`, {
				method: 'GET',
				dataType: "xml",
			})
			.then(response => response.arrayBuffer())
			.then(async response => {
				// console.log(response)
				this.isLoadingExport = false
				let blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
				this.downloadBlob(blob,`Data Siswa Siswi.xlsx`)
				this.notifikasi("success", 'Sukses Export Excel', "1")
			})
		},
    pdfCreate(idUser, berkas = null, jenis = null, view) {
      if(view === 'berkas'){
        jenis === 'ijazah' ? this.isLoadingbtnPDF1 = true
        : jenis === 'skhun' ? this.isLoadingbtnPDF2 = true
        : jenis === 'kk' ? this.isLoadingbtnPDF3 = true
        : jenis === 'ktp' ? this.isLoadingbtnPDF4 = true
        : jenis === 'aktalahir' ? this.isLoadingbtnPDF5 = true
        : this.isLoadingbtnPDF6 = true
        this.dialogPDF = false
        this.urlSk = ''
        if(!berkas) {
          jenis === 'ijazah' ? this.isLoadingbtnPDF1 = false
          : jenis === 'skhun' ? this.isLoadingbtnPDF2 = false
          : jenis === 'kk' ? this.isLoadingbtnPDF3 = false
          : jenis === 'ktp' ? this.isLoadingbtnPDF4 = false
          : jenis === 'aktalahir' ? this.isLoadingbtnPDF5 = false
          : this.isLoadingbtnPDF6 = false
          return this.notifikasi("warning", 'Gagal view berkas !', "1")
        }
        this.urlSk = berkas
        setTimeout(() => {
          jenis === 'ijazah' ? this.isLoadingbtnPDF1 = false
          : jenis === 'skhun' ? this.isLoadingbtnPDF2 = false
          : jenis === 'kk' ? this.isLoadingbtnPDF3 = false
          : jenis === 'ktp' ? this.isLoadingbtnPDF4 = false
          : jenis === 'aktalahir' ? this.isLoadingbtnPDF5 = false
          : this.isLoadingbtnPDF6 = false
          this.dialogPDF = true;
        }, 3000);
      }else if(view === 'create'){
        this.dialogPDF = false
        this.isLoadingbtnPDF = true
        this.urlSk = ''
        fetch(`${this.BASEURL}user/pdfcreate/${idUser}`, {
          method: 'GET',
          // headers: {
          //   'user_key': process.env.NODE_ENV == 'development' ? process.env.USER_KEY : process.env.USER_KEY_PROD
          // }
        })
        .then(response => response.arrayBuffer())
        .then(async response => {
          let blob = new Blob([response], { type: 'application/pdf' })
          this.urlSk = window.URL.createObjectURL(blob)
        })
        setTimeout(() => {
          this.isLoadingbtnPDF = false
          this.dialogPDF = true;
        }, 3000);
      }
    },
		downloadBlob(blob, name = '') {
			const blobUrl = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = name;
			document.body.appendChild(link);
			link.dispatchEvent(
				new MouseEvent('click', { 
					bubbles: true, 
					cancelable: true, 
					view: window 
				})
			);
			document.body.removeChild(link);
		},
    clearData(){
      this.previewData = {
        idUser: '',
        namaRole: '',
        nama: '',
        username: '',
        email: '',
        password: '',
        nikSiswa: '',
        nomorInduk: '',
        tempat: '',
        tanggalLahir: '',
        jenisKelamin: '',
        agama: '',
        anakKe: '',
        jumlahSaudara: '',
        hobi: '',
        citaCita: '',
        kelas: '',
        jenjang: '',
        statusSekolah: '',
        namaSekolah: '',
        npsn: '',
        alamatSekolah: '',
        kabkotSekolah: '',
        noPesertaUN: '',
        noSKHUN: '',
        noIjazah: '',
        nilaiUN: '',
        noKK: '',
        namaKK: '',
        telp: '',
        alamat: '',
        provinsi: '',
        kabKota: '',
        kecamatan: '',
        kelurahan: '',
        kodePos: '',
        nikAyah: '',
        namaAyah: '',
        tahunAyah: '',
        statusAyah: '',
        pendidikanAyah: '',
        pekerjaanAyah: '',
        telpAyah: '',
        nikIbu: '',
        namaIbu: '',
        tahunIbu: '',
        statusIbu: '',
        pendidikanIbu: '',
        pekerjaanIbu: '',
        telpIbu: '',
        nikWali: '',
        namaWali: '',
        tahunWali: '',
        pendidikanWali: '',
        pekerjaanWali: '',
        telpWali: '',
        penghasilan: '',
        statusTempatTinggal: '',
        jarakRumah: '',
        transportasi: '',
        fotoProfil: '',
        fcIjazah: '',
        fcSKHUN: '',
        fcKK: '',
        fcKTPOrtu: '',
        fcAktaLahir: '',
        fcSKL: '',
      }
    },
    pilihFile(jenis) {
      if(jenis === 'ijazah') return this.$refs.inputIjazah.click();
      else if(jenis === 'skhun') return this.$refs.inputSKHUN.click();
      else if(jenis === 'kk') return this.$refs.inputKK.click();
      else if(jenis === 'ktp') return this.$refs.inputKTP.click();
      else if(jenis === 'aktalahir') return this.$refs.inputAktaLahir.click();
      else if(jenis === 'skl') return this.$refs.inputSKL.click();
      else if(jenis === 'excel') return this.$refs.inputExcel.click();
    },
    async uploadBerkas(e, jenis) {
      let files = e.target.files[0];
      if(!files) return this.notifikasi("warning", 'Ulangi unggah Foto Profile', "1")
      let ukuran = (files.size / (1024*1024)).toFixed(2);
      if(ukuran > 5.00) { 
        this.componentKey++; 
        return this.notifikasi("warning", 'Unggah Foto Profile anda terlalu besar !', "1")
      }
      if(jenis === 'ijazah') { this.fcIjazah = files.name; this.prosesUpload(jenis, files); files = ''; }
      else if(jenis === 'skhun') { this.fcSKHUN = files.name; this.prosesUpload(jenis, files); files = ''; }
      else if(jenis === 'kk') { this.fcKK = files.name; this.prosesUpload(jenis, files); files = ''; }
      else if(jenis === 'ktp') { this.fcKTP = files.name; this.prosesUpload(jenis, files); files = ''; }
      else if(jenis === 'aktalahir') { this.fcAktaLahir = files.name; this.prosesUpload(jenis, files); files = ''; }
      else if(jenis === 'skl') { this.fcSKL = files.name; this.prosesUpload(jenis, files); files = ''; }
    },
    async prosesUpload(jenis, dataUpload) {
      let uploadDataBerkas = await this.uploadLampiran(this.previewData.idUser, jenis, dataUpload)
      if(uploadDataBerkas != undefined){ 
        this.clearFile(jenis)
        this.getSiswaSiswi(this.page, this.limit, this.searchData)
        this.notifikasi("success", `Berhasil upload berkas ${jenis === 'ijazah' ? 'Ijazah' : jenis === 'skhun' ? 'SKHUN' : jenis === 'kk' ? 'Kartu Keluarga' : jenis === 'ktp' ? 'KTP Orangtua' : jenis === 'aktalahir' ? 'Akta Lahir' : 'SKL'}`, "1")
      }else{ 
        this.componentKey++;
        this.clearFile(jenis)
        this.notifikasi("error", `Gagal upload berkas ${jenis === 'ijazah' ? 'Ijazah' : jenis === 'skhun' ? 'SKHUN' : jenis === 'kk' ? 'Kartu Keluarga' : jenis === 'ktp' ? 'KTP Orangtua' : jenis === 'aktalahir' ? 'Akta Lahir' : 'SKL'}`, "1")
      }
    },
    async uploadLampiran(idUser, jenis, dataUpload) {
			if(dataUpload){
				const bodyData = {
					idUser: idUser,
					field: jenis,
					nama_folder: idUser,
					nama_file: `${idUser}-${jenis}`,
					jenis: "pdf",
					bagian: "berkas",
					table: "UserDetail",
					files: dataUpload,
				};
				try {
					let response = await this.uploadFiles(bodyData);
					return response
				} catch (err) {
					this.notifikasi("error", err.response.data.message, "1")
				}
			}else{
        return undefined
      }
		},
    clearFile(jenis) {
      if(jenis === 'ijazah') {
        this.fcIjazah = ''
        this.$refs.inputIjazah.value = null;
      }else if(jenis === 'skhun') {
        this.fcSKHUN = ''
        this.$refs.inputSKHUN.value = null;
      }else if(jenis === 'kk') {
        this.fcKK = ''
        this.$refs.inputKK.value = null;
      }else if(jenis === 'ktp') {
        this.fcKTP = ''
        this.$refs.inputKTP.value = null;
      }else if(jenis === 'aktalahir') {
        this.fcAktaLahir = ''
        this.$refs.inputAktaLahir.value = null;
      }else if(jenis === 'skl') {
        this.fcSKL = ''
        this.$refs.inputSKL.value = null;
      }
    },
    async importExcel(e) {
      this.isLoadingExport = true
      let files = e.target.files[0];
      if(files){
				const bodyData = {
					jenis: "excel",
					files: files,
				};
				try {
					await this.uploadFiles(bodyData);
          files = ''
          this.isLoadingExport = false
          this.$refs.inputExcel.value = null
          this.getSiswaSiswi(this.page, this.limit, this.searchData)
					this.notifikasi("success", "Berhasil Import Data Siswa Siswi", "1")
				} catch (err) {
          this.isLoadingExport = false
          this.componentKey++;
          files = ''
          this.$refs.inputExcel.value = null
          this.notifikasi("error", "Gagal Import Data Siswa Siswi", "1")
				}
			}else{
        this.isLoadingExport = false
        this.componentKey++;
        files = ''
        this.$refs.inputExcel.value = null
        this.notifikasi("warning", "Ulangi lagi Import Data Siswa Siswi", "1")
      }  
    },
    row_classes(item) {
      if (item.condition) {
        return "style-1";
      } 
    },
    endecryptData(d) {
      this[d] = !this[d]
      let url = this[d] ? 'decryptPass' : 'encryptPass' 
      let payload = {
				method: "get",
				url: `settings/${url}?kata=${this.previewData.password}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
				this.previewData.password = res.data.result.hasil;
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
  font-size: 11pt !important;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
.kotak {
	border: 2px solid #000;
  display: inline-flex;
  justify-content: center;
  border-radius: 10px !important;
  background: #FFF;
  color: #000;
  padding: 2px;
  font-size: 10pt;
  width: 90px;
  height: 100px;
  text-align: -webkit-center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  cursor: pointer;
}
</style>