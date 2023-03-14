<template>
  <div>
    <h1 class="subheading grey--text">Data Siswa Siswi Kelas {{ kelasText }}</h1>
    <v-card class="mt-2 mb-2 pa-1" outlined elevation="0">
      <v-row no-gutters class="pa-2">
        <v-col cols="12" md="6" />
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
                color="light-black darken-3"
                clearable
                @keyup.enter="getSiswaSiswi(1, limit, searchData, kelas)"
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
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
          item-key="idUser"
          hide-default-footer
          class="elevation-1"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
        >
          <template #[`item.number`]="{ item }">
            {{ page > 1 ? ((page - 1)*limit) + DataSiswaSiswi.indexOf(item) + 1 : DataSiswaSiswi.indexOf(item) + 1 }}
          </template>
          <template #[`item.namaRole`]="{ item }">
            <span v-html="item.namaRole" /> 
          </template>
          <template #[`item.statusAktif`]="{ item }">
            <v-icon small v-if="item.statusAktif == true" color="green">check</v-icon>
            <v-icon small v-else-if="item.statusAktif == false" color="red">clear</v-icon>
            <br>
            <span v-html="item.statusAktif == true ? 'Active' : 'Non Active'" /> 
          </template>
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="white">
              <v-btn
                :value="item.idUser"
                color="#04f7f7"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="openDialog(item)"
              >
                <v-icon small>info</v-icon>	Detail
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
        <v-card>
          <div class="scrollText">
            <div class="px-5">
              <v-divider />
            </div>
            <v-card-text>
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
            </v-card-text>
          </div>
        </v-card>
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
import { mapActions } from "vuex";
import PopUpNotifikasiVue from "../../Layout/PopUpNotifikasi.vue";
export default {
  name: 'DataKelasSiswa',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
    kelas: '',
    DataKelas: [],
    isLoading: false,
		DataSiswaSiswi: [],
		searchData: '',
    expanded: [],
    singleExpand: true,
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
      { text: "No", value: "number", sortable: false, width: "7%" },
      { text: "#", value: "data-table-expand", sortable: false, width: "5%" },
      { text: "Nomor Induk", value: "nomorInduk", sortable: false },
      { text: "Nama", value: "nama", sortable: false },
      { text: "Email", value: "email", sortable: false },
      { text: "Role", value: "namaRole", sortable: false },
      { text: "Status", value: "statusAktif", sortable: false },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,
    roleID: '',
    idLog: '',
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
    },
    DialogSiswaSiswi: false,
    endecryptType: '',

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Data Kelas Siswa - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
    kelasText() {
      this.kelas = this.$route.params.kelas
      this.getSiswaSiswi(1, 20, '', this.kelas)
      return this.kelas
    }
  },
  watch: {
    page: {
			deep: true,
			handler(value) {
				this.getSiswaSiswi(value, this.limit, this.searchData, this.kelas)
			}
		},
    limit: {
			deep: true,
			handler(value) {
				this.getSiswaSiswi(1, value, this.searchData, this.kelas)
			}
		},
  },
  mounted() {
	},
	methods: {
		...mapActions(["fetchData"]),
    getSiswaSiswi(page = 1, limit, keyword, kelas) {
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
				url: `user/siswasiswi?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ''}${kelas ? `&kelas=${kelas}` : ''}`,
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
        kabkotSekolah: this.uppercaseLetterFirst(item.dataSekolahSebelumnya.kabkotSekolah.nama),
        noPesertaUN: item.dataSekolahSebelumnya.noPesertaUN ? item.dataSekolahSebelumnya.noPesertaUN : '-',
        noSKHUN: item.dataSekolahSebelumnya.noSKHUN ? item.dataSekolahSebelumnya.noSKHUN : '-',
        noIjazah: item.dataSekolahSebelumnya.noIjazah ? item.dataSekolahSebelumnya.noSKHUN : '-',
        nilaiUN: item.dataSekolahSebelumnya.nilaiUN ? item.dataSekolahSebelumnya.noSKHUN : '-',
        noKK: item.noKK,
        namaKK: item.namaKK,
        telp: item.dataAlamatOrangtua.telp,
        alamat: item.dataAlamatOrangtua.alamat,
        provinsi: this.uppercaseLetterFirst(item.dataAlamatOrangtua.provinsi.nama),
        kabKota: this.uppercaseLetterFirst(item.dataAlamatOrangtua.kabKota.nama),
        kecamatan: this.uppercaseLetterFirst(item.dataAlamatOrangtua.kecamatan.nama),
        kelurahan: this.uppercaseLetterFirst(item.dataAlamatOrangtua.kelurahan.nama),
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
      }
      console.log(item);
      this.DialogSiswaSiswi = true
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

<style>
.scrollText{
  max-height: 450px !important;
  overflow-y: auto !important;
}
.v-pagination {
  justify-content: flex-end !important;
}
.v-input .v-label {
  font-size: 11pt !important;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
.judul {
  font-size: 15pt !important;
  font-weight: 500;
  letter-spacing: 0.1666666667em !important;
  line-height: 2rem;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif !important;
}
</style>