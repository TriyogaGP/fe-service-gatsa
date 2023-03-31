<template>
  <div>
    <h1 class="subheading grey--text">Data Siswa Siswi Kelas {{ kelasText }}</h1>
    <div v-if="kondisi === 'view'" class="text-right wadah">
      <span @click="gotolist('view', kelasText.split('-')[0])" class="link">Data Kelas Siswa {{ kelasText.split('-')[0] }}</span>
      <v-icon small class="iconstyle">fa-solid fa-chevron-right</v-icon>
      <span>Data Siswa Siswi Kelas {{ kelasText }}</span>
    </div>
    <div v-if="kondisi === 'penilaian'" class="text-right wadah">
      <span v-if="roleID === '1'" @click="gotolist('penilaian')" class="link">Data Akademis</span>
      <v-icon v-if="roleID === '1'" small class="iconstyle">fa-solid fa-chevron-right</v-icon>
      <span @click="gotolist2(mapelText)" class="link">Data Akademis ({{ mapelText }})</span>
      <v-icon small class="iconstyle">fa-solid fa-chevron-right</v-icon>
      <span>Data Siswa Siswi Kelas {{ kelasText }}</span>
    </div>
    <v-card class="mt-2 mb-2 pa-1" outlined elevation="0">
      <h4 v-if="kondisi === 'penilaian'">Mata Pelajaran: {{ mapelText }}</h4>
      <v-row no-gutters class="pa-2">
        <v-col cols="12" md="6">
          <v-btn
            v-if="kondisi === 'penilaian'"
            color="light-blue darken-3"
            small
            dense
            depressed
            class="ma-2 white--text text--darken-2"
            @click="DialogJumlahTugas = true"
          >
            <v-icon small>edit</v-icon>&nbsp;Ubah Tugas & KKM
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
          hide-default-header
          hide-default-footer
          class="elevation-1"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
        >
          <!-- header -->
          <template v-slot:header="{  }">
            <thead v-if="kondisi === 'penilaian'" class="v-data-table-header">
              <tr>
                <th class="tulisan-td" style="font-weight: bold;">No</th>
                <th class="tulisan-td" style="font-weight: bold;">#</th>
                <th class="tulisan-td" style="font-weight: bold;">NOMOR INDUK</th>
                <th class="tulisan-td" style="font-weight: bold;">NAMA</th>
                <th class="tulisan-td" style="font-weight: bold;">
                  NILAI AKHIR TUGAS&nbsp;<v-icon v-if="DataSiswaSiswi.length" @click="taskDialog(DataSiswaSiswi)" style="cursor: pointer;" small>edit</v-icon>
                </th>
                <th class="tulisan-td" style="font-weight: bold;">
                  NILAI UTS&nbsp;
                  <v-icon v-if="task.condition_UTS && DataSiswaSiswi.length" @click="formNilai(DataSiswaSiswi, false, 'uts')" style="cursor: pointer;" small>check</v-icon>
                  <v-icon v-if="!task.condition_UTS && DataSiswaSiswi.length" @click="formNilai(DataSiswaSiswi, true, 'uts')" style="cursor: pointer;" small>edit</v-icon>
                </th>
                <th class="tulisan-td" style="font-weight: bold;">
                  NILAI UAS&nbsp;
                  <v-icon v-if="task.condition_UAS && DataSiswaSiswi.length" @click="formNilai(DataSiswaSiswi, false, 'uas')" style="cursor: pointer;" small>check</v-icon>
                  <v-icon v-if="!task.condition_UAS && DataSiswaSiswi.length" @click="formNilai(DataSiswaSiswi, true, 'uas')" style="cursor: pointer;" small>edit</v-icon>
                </th>
                <th class="tulisan-td" style="font-weight: bold;">KEHADIRAN</th>
                <th class="tulisan-td" style="font-weight: bold;">RATA RATA NILAI</th>
                <th class="tulisan-td" style="font-weight: bold;">NILAI HURUF</th>
              </tr>
            </thead>
            <thead v-if="kondisi === 'view'" class="v-data-table-header">
              <tr>
                <th class="tulisan-td" style="font-weight: bold;">No</th>
                <th class="tulisan-td" style="font-weight: bold;">#</th>
                <th class="tulisan-td" style="font-weight: bold;">NOMOR INDUK</th>
                <th class="tulisan-td" style="font-weight: bold;">NAMA</th>
                <th class="tulisan-td" style="font-weight: bold;">EMAIL</th>
                <th class="tulisan-td" style="font-weight: bold;">STATUS</th>
              </tr>
            </thead>
          </template>
          <template #[`item.number`]="{ item }">
            {{ page > 1 ? ((page - 1)*limit) + DataSiswaSiswi.indexOf(item) + 1 : DataSiswaSiswi.indexOf(item) + 1 }}
          </template>
          <template #[`item.nama`]="{ item }">
            <span v-html="uppercaseLetterFirst(item.nama)" /> 
          </template>
          <template #[`item.tugas`]="{ item }">
            <span>{{ item.totalNilaiTugas }}</span>
          </template>
          <template #[`item.hurufNilai`]="{ item }">
            <span :class="item.hurufNilai === 'C' || item.hurufNilai === 'D' || item.hurufNilai === 'E' ? 'red--text' : 'green--text'">{{ item.hurufNilai }}</span>
          </template>
          <template #[`item.uts`]="{ item }">
            <v-edit-dialog
              v-if="task.UTS[item.idUser]"
              :return-value.sync="item.dataNilai.uts"
              persistent
              @open="() => { inputTemp[item.idUser] = item.dataNilai.uts; }"
              @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'uts', 'luar')"
              @cancel="() => { inputTemp[item.idUser] = ''; }"
            >
              <span class="tulisan-td" v-html="item.dataNilai.uts ? item.dataNilai.uts : 0" /> <v-icon small>edit</v-icon>
              <template v-slot:input>
                <v-text-field
                  class="ma-3"
                  v-model="inputTemp[item.idUser]"
                  placeholder="Ubah Nilai UTS"
                  label="Ubah Nilai UTS"
                  outlined
                  dense
                  hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                  persistent-hint
                  color="light-blue darken-3"
                  @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                >
                  <template v-slot:message="{ message }">
                    <span v-html="message"></span>
                  </template>
                </v-text-field>
              </template>
            </v-edit-dialog>
            <span v-else class="tulisan-td" v-html="item.dataNilai.uts ? item.dataNilai.uts : 0" />
          </template>
          <template #[`item.uas`]="{ item }">
            <v-edit-dialog
              v-if="task.UAS[item.idUser]"
              :return-value.sync="item.dataNilai.uas"
              persistent
              @open="() => { inputTemp[item.idUser] = item.dataNilai.uas; }"
              @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'uas', 'luar')"
              @cancel="() => { inputTemp[item.idUser] = ''; }"
            >
              <span class="tulisan-td" v-html="item.dataNilai.uas ? item.dataNilai.uas : 0" /> <v-icon small>edit</v-icon>
              <template v-slot:input>
                <v-text-field
                  class="ma-3"
                  v-model="inputTemp[item.idUser]"
                  placeholder="Ubah Nilai UAS"
                  label="Ubah Nilai UAS"
                  outlined
                  dense
                  hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                  persistent-hint
                  color="light-blue darken-3"
                  @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                >
                  <template v-slot:message="{ message }">
                    <span v-html="message"></span>
                  </template>
                </v-text-field>
              </template>
            </v-edit-dialog>
            <span v-else class="tulisan-td" v-html="item.dataNilai.uas ? item.dataNilai.uas : 0" />
          </template>
          <template #[`item.kehadiran`]="{ item }">
            <strong>S</strong>:&nbsp;{{ item.dataKehadiran.sakit }}, <strong>A</strong>:&nbsp;{{ item.dataKehadiran.alfa }}, <strong>I</strong>:&nbsp;{{ item.dataKehadiran.ijin }}
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
                <v-icon small>info</v-icon>&nbsp;Detail
              </v-btn>
              <v-btn
                v-if="kondisi === 'penilaian'"
                :value="item.idUser"
                color="#0bd369"
                small
                dense
                depressed
                class="ma-2 white--text text--darken-2"
                @click="bukaDialog(item)"
              >
                <v-icon small>fa-solid fa-person-chalkboard</v-icon>&nbsp;Kehadiran
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
      v-model="DialogKehadiran"
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
          <v-toolbar-title>Data Ubah Kehadiran</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { DialogKehadiran = false; }"
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
              Sakit
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-text-field
                v-model="inputKehadiran.sakit"
                placeholder="Sakit"
                outlined
                dense
                label="Sakit"
                color="light-black darken-3"
                hide-details
                @keypress.native="onlyNumber($event, 3, inputKehadiran.sakit)"                          
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Tanpa Keterangan (Alfa)
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-text-field
                v-model="inputKehadiran.alfa"
                placeholder="Tanpa Keterangan (Alfa)"
                outlined
                dense
                label="Tanpa Keterangan (Alfa)"
                color="light-black darken-3"
                hide-details
                @keypress.native="onlyNumber($event, 3, inputKehadiran.alfa)"                          
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Ijin
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-text-field
                v-model="inputKehadiran.ijin"
                placeholder="Ijin"
                outlined
                dense
                label="Ijin"
                color="light-black darken-3"
                hide-details
                @keypress.native="onlyNumber($event, 3, inputKehadiran.ijin)"                          
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row 
            no-gutters
            class="mr-3"
          >
            <v-col
              class="text-end"
              cols="12"
            >
              <v-btn
                color="light-blue darken-3"
                class="white--text text--darken-2"
                small
                dense
                depressed
                @click="simpanKehadiran()"
              >
                Ubah Kehadiran
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          <v-row v-if="roleID === '1'" no-gutters>
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
        <v-divider />
        <v-card-actions />
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="DialogTask"
      fullscreen
      scrollable
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>Ubah Nilai</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { DialogTask = false; }"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="height: 100%;">
          <div class="px-5">
            <v-divider />
          </div>
          <div class="mt-4">
            <v-data-table
              loading-text="Sedang memuat... Harap tunggu"
              no-data-text="Tidak ada data yang tersedia"
              no-results-text="Tidak ada catatan yang cocok ditemukan"
              :headers="headersTask"
              :loading="isLoading"
              :items="DataSiswaSiswi"
              item-key="idUser"
              hide-default-header
              hide-default-footer
              class="elevation-1"
            >
              <!-- header -->
              <template v-slot:header="{  }">
                <thead class="v-data-table-header">
                  <tr>
                    <th class="tulisan-td" style="font-weight: bold;">NOMOR INDUK</th>
                    <th class="tulisan-td" style="font-weight: bold;">NAMA</th>
                    <th class="tulisan-td" style="font-weight: bold;">
                      TUGAS 1&nbsp;
                      <v-icon v-if="task.condition_tugas1" @click="formNilai(DataSiswaSiswi, false, 'tugas1')" style="cursor: pointer;" small>check</v-icon>
                      <v-icon v-if="!task.condition_tugas1" @click="formNilai(DataSiswaSiswi, true, 'tugas1')" style="cursor: pointer;" small>edit</v-icon>
                    </th>
                    <th class="tulisan-td" style="font-weight: bold;">
                      TUGAS 2&nbsp;
                      <v-icon v-if="task.condition_tugas2" @click="formNilai(DataSiswaSiswi, false, 'tugas2')" style="cursor: pointer;" small>check</v-icon>
                      <v-icon v-if="!task.condition_tugas2" @click="formNilai(DataSiswaSiswi, true, 'tugas2')" style="cursor: pointer;" small>edit</v-icon>
                    </th>
                    <th class="tulisan-td" style="font-weight: bold;">
                      TUGAS 3&nbsp;
                      <v-icon v-if="task.condition_tugas3" @click="formNilai(DataSiswaSiswi, false, 'tugas3')" style="cursor: pointer;" small>check</v-icon>
                      <v-icon v-if="!task.condition_tugas3" @click="formNilai(DataSiswaSiswi, true, 'tugas3')" style="cursor: pointer;" small>edit</v-icon>
                    </th>
                    <th class="tulisan-td" style="font-weight: bold;">
                      TUGAS 4&nbsp;
                      <v-icon v-if="task.condition_tugas4" @click="formNilai(DataSiswaSiswi, false, 'tugas4')" style="cursor: pointer;" small>check</v-icon>
                      <v-icon v-if="!task.condition_tugas4" @click="formNilai(DataSiswaSiswi, true, 'tugas4')" style="cursor: pointer;" small>edit</v-icon>
                    </th>
                    <th class="tulisan-td" style="font-weight: bold;">
                      TUGAS 5&nbsp;
                      <v-icon v-if="task.condition_tugas5" @click="formNilai(DataSiswaSiswi, false, 'tugas5')" style="cursor: pointer;" small>check</v-icon>
                      <v-icon v-if="!task.condition_tugas5" @click="formNilai(DataSiswaSiswi, true, 'tugas5')" style="cursor: pointer;" small>edit</v-icon>
                    </th>
                    <th class="tulisan-td" style="font-weight: bold;">
                      TUGAS 6&nbsp;
                      <v-icon v-if="task.condition_tugas6" @click="formNilai(DataSiswaSiswi, false, 'tugas6')" style="cursor: pointer;" small>check</v-icon>
                      <v-icon v-if="!task.condition_tugas6" @click="formNilai(DataSiswaSiswi, true, 'tugas6')" style="cursor: pointer;" small>edit</v-icon>
                    </th>
                    <th class="tulisan-td" style="font-weight: bold;">
                      TUGAS 7&nbsp;
                      <v-icon v-if="task.condition_tugas7" @click="formNilai(DataSiswaSiswi, false, 'tugas7')" style="cursor: pointer;" small>check</v-icon>
                      <v-icon v-if="!task.condition_tugas7" @click="formNilai(DataSiswaSiswi, true, 'tugas7')" style="cursor: pointer;" small>edit</v-icon>
                    </th>
                    <th class="tulisan-td" style="font-weight: bold;">
                      TUGAS 8&nbsp;
                      <v-icon v-if="task.condition_tugas8" @click="formNilai(DataSiswaSiswi, false, 'tugas8')" style="cursor: pointer;" small>check</v-icon>
                      <v-icon v-if="!task.condition_tugas8" @click="formNilai(DataSiswaSiswi, true, 'tugas8')" style="cursor: pointer;" small>edit</v-icon>
                    </th>
                    <th class="tulisan-td" style="font-weight: bold;">
                      TUGAS 9&nbsp;
                      <v-icon v-if="task.condition_tugas9" @click="formNilai(DataSiswaSiswi, false, 'tugas9')" style="cursor: pointer;" small>check</v-icon>
                      <v-icon v-if="!task.condition_tugas9" @click="formNilai(DataSiswaSiswi, true, 'tugas9')" style="cursor: pointer;" small>edit</v-icon>
                    </th>
                    <th class="tulisan-td" style="font-weight: bold;">
                      TUGAS 10&nbsp;
                      <v-icon v-if="task.condition_tugas10" @click="formNilai(DataSiswaSiswi, false, 'tugas10')" style="cursor: pointer;" small>check</v-icon>
                      <v-icon v-if="!task.condition_tugas10" @click="formNilai(DataSiswaSiswi, true, 'tugas10')" style="cursor: pointer;" small>edit</v-icon>
                    </th>
                  </tr>
                </thead>
              </template>
              <template #[`item.nomorInduk`]="{ item }">
                <span class="tulisan-td" v-html="item.nomorInduk" /> 
              </template>
              <template #[`item.nama`]="{ item }">
                <span class="tulisan-td" v-html="uppercaseLetterFirst(item.nama)" /> 
              </template>
              <template #[`item.tugas1`]="{ item }">
                <v-edit-dialog
                  v-if="task.tugas1[item.idUser]"
                  :return-value.sync="item.dataNilai.tugas1"
                  persistent
                  @open="() => { inputTemp[item.idUser] = item.dataNilai.tugas1; }"
                  @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'tugas1', 'dalam')"
                  @cancel="() => { inputTemp[item.idUser] = ''; }"
                >
                  <span class="tulisan-td" v-html="item.dataNilai.tugas1 ? item.dataNilai.tugas1 : 0" /> <v-icon small>edit</v-icon>
                  <template v-slot:input>
                    <v-text-field
                      class="ma-3"
                      v-model="inputTemp[item.idUser]"
                      placeholder="Ubah Nilai Tugas 1"
                      label="Ubah Nilai Tugas 1"
                      outlined
                      dense
                      hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                      persistent-hint
                      color="light-blue darken-3"
                      @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                    >
                      <template v-slot:message="{ message }">
                        <span v-html="message"></span>
                      </template>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
                <span v-else class="tulisan-td" v-html="item.dataNilai.tugas1 ? item.dataNilai.tugas1 : 0" />
              </template>
              <template #[`item.tugas2`]="{ item }">
                <v-edit-dialog
                  v-if="task.tugas2[item.idUser]"
                  :return-value.sync="item.dataNilai.tugas2"
                  persistent
                  @open="() => { inputTemp[item.idUser] = item.dataNilai.tugas2; }"
                  @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'tugas2', 'dalam')"
                  @cancel="() => { inputTemp[item.idUser] = ''; }"
                >
                  <span class="tulisan-td" v-html="item.dataNilai.tugas2 ? item.dataNilai.tugas2 : 0" /> <v-icon small>edit</v-icon>
                  <template v-slot:input>
                    <v-text-field
                      class="ma-3"
                      v-model="inputTemp[item.idUser]"
                      placeholder="Ubah Nilai Tugas 1"
                      label="Ubah Nilai Tugas 1"
                      outlined
                      dense
                      hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                      persistent-hint
                      color="light-blue darken-3"
                      @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                    >
                      <template v-slot:message="{ message }">
                        <span v-html="message"></span>
                      </template>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
                <span v-else class="tulisan-td" v-html="item.dataNilai.tugas2 ? item.dataNilai.tugas2 : 0" />
              </template>
              <template #[`item.tugas3`]="{ item }">
                <v-edit-dialog
                  v-if="task.tugas3[item.idUser]"
                  :return-value.sync="item.dataNilai.tugas3"
                  persistent
                  @open="() => { inputTemp[item.idUser] = item.dataNilai.tugas3; }"
                  @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'tugas3', 'dalam')"
                  @cancel="() => { inputTemp[item.idUser] = ''; }"
                >
                  <span class="tulisan-td" v-html="item.dataNilai.tugas3 ? item.dataNilai.tugas3 : 0" /> <v-icon small>edit</v-icon>
                  <template v-slot:input>
                    <v-text-field
                      class="ma-3"
                      v-model="inputTemp[item.idUser]"
                      placeholder="Ubah Nilai Tugas 1"
                      label="Ubah Nilai Tugas 1"
                      outlined
                      dense
                      hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                      persistent-hint
                      color="light-blue darken-3"
                      @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                    >
                      <template v-slot:message="{ message }">
                        <span v-html="message"></span>
                      </template>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
                <span v-else class="tulisan-td" v-html="item.dataNilai.tugas3 ? item.dataNilai.tugas3 : 0" />
              </template>
              <template #[`item.tugas4`]="{ item }">
                <v-edit-dialog
                  v-if="task.tugas4[item.idUser]"
                  :return-value.sync="item.dataNilai.tugas4"
                  persistent
                  @open="() => { inputTemp[item.idUser] = item.dataNilai.tugas4; }"
                  @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'tugas4', 'dalam')"
                  @cancel="() => { inputTemp[item.idUser] = ''; }"
                >
                  <span class="tulisan-td" v-html="item.dataNilai.tugas4 ? item.dataNilai.tugas4 : 0" /> <v-icon small>edit</v-icon>
                  <template v-slot:input>
                    <v-text-field
                      class="ma-3"
                      v-model="inputTemp[item.idUser]"
                      placeholder="Ubah Nilai Tugas 1"
                      label="Ubah Nilai Tugas 1"
                      outlined
                      dense
                      hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                      persistent-hint
                      color="light-blue darken-3"
                      @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                    >
                      <template v-slot:message="{ message }">
                        <span v-html="message"></span>
                      </template>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
                <span v-else class="tulisan-td" v-html="item.dataNilai.tugas4 ? item.dataNilai.tugas4 : 0" />
              </template>
              <template #[`item.tugas5`]="{ item }">
                <v-edit-dialog
                  v-if="task.tugas5[item.idUser]"
                  :return-value.sync="item.dataNilai.tugas5"
                  persistent
                  @open="() => { inputTemp[item.idUser] = item.dataNilai.tugas5; }"
                  @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'tugas5', 'dalam')"
                  @cancel="() => { inputTemp[item.idUser] = ''; }"
                >
                  <span class="tulisan-td" v-html="item.dataNilai.tugas5 ? item.dataNilai.tugas5 : 0" /> <v-icon small>edit</v-icon>
                  <template v-slot:input>
                    <v-text-field
                      class="ma-3"
                      v-model="inputTemp[item.idUser]"
                      placeholder="Ubah Nilai Tugas 1"
                      label="Ubah Nilai Tugas 1"
                      outlined
                      dense
                      hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                      persistent-hint
                      color="light-blue darken-3"
                      @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                    >
                      <template v-slot:message="{ message }">
                        <span v-html="message"></span>
                      </template>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
                <span v-else class="tulisan-td" v-html="item.dataNilai.tugas5 ? item.dataNilai.tugas5 : 0" />
              </template>
              <template #[`item.tugas6`]="{ item }">
                <v-edit-dialog
                  v-if="task.tugas6[item.idUser]"
                  :return-value.sync="item.dataNilai.tugas6"
                  persistent
                  @open="() => { inputTemp[item.idUser] = item.dataNilai.tugas6; }"
                  @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'tugas6', 'dalam')"
                  @cancel="() => { inputTemp[item.idUser] = ''; }"
                >
                  <span class="tulisan-td" v-html="item.dataNilai.tugas6 ? item.dataNilai.tugas6 : 0" /> <v-icon small>edit</v-icon>
                  <template v-slot:input>
                    <v-text-field
                      class="ma-3"
                      v-model="inputTemp[item.idUser]"
                      placeholder="Ubah Nilai Tugas 1"
                      label="Ubah Nilai Tugas 1"
                      outlined
                      dense
                      hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                      persistent-hint
                      color="light-blue darken-3"
                      @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                    >
                      <template v-slot:message="{ message }">
                        <span v-html="message"></span>
                      </template>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
                <span v-else class="tulisan-td" v-html="item.dataNilai.tugas6 ? item.dataNilai.tugas6 : 0" />
              </template>
              <template #[`item.tugas7`]="{ item }">
                <v-edit-dialog
                  v-if="task.tugas7[item.idUser]"
                  :return-value.sync="item.dataNilai.tugas7"
                  persistent
                  @open="() => { inputTemp[item.idUser] = item.dataNilai.tugas7; }"
                  @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'tugas7', 'dalam')"
                  @cancel="() => { inputTemp[item.idUser] = ''; }"
                >
                  <span class="tulisan-td" v-html="item.dataNilai.tugas7 ? item.dataNilai.tugas7 : 0" /> <v-icon small>edit</v-icon>
                  <template v-slot:input>
                    <v-text-field
                      class="ma-3"
                      v-model="inputTemp[item.idUser]"
                      placeholder="Ubah Nilai Tugas 1"
                      label="Ubah Nilai Tugas 1"
                      outlined
                      dense
                      hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                      persistent-hint
                      color="light-blue darken-3"
                      @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                    >
                      <template v-slot:message="{ message }">
                        <span v-html="message"></span>
                      </template>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
                <span v-else class="tulisan-td" v-html="item.dataNilai.tugas7 ? item.dataNilai.tugas7 : 0" />
              </template>
              <template #[`item.tugas8`]="{ item }">
                <v-edit-dialog
                  v-if="task.tugas8[item.idUser]"
                  :return-value.sync="item.dataNilai.tugas8"
                  persistent
                  @open="() => { inputTemp[item.idUser] = item.dataNilai.tugas8; }"
                  @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'tugas8', 'dalam')"
                  @cancel="() => { inputTemp[item.idUser] = ''; }"
                >
                  <span class="tulisan-td" v-html="item.dataNilai.tugas8 ? item.dataNilai.tugas8 : 0" /> <v-icon small>edit</v-icon>
                  <template v-slot:input>
                    <v-text-field
                      class="ma-3"
                      v-model="inputTemp[item.idUser]"
                      placeholder="Ubah Nilai Tugas 1"
                      label="Ubah Nilai Tugas 1"
                      outlined
                      dense
                      hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                      persistent-hint
                      color="light-blue darken-3"
                      @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                    >
                      <template v-slot:message="{ message }">
                        <span v-html="message"></span>
                      </template>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
                <span v-else class="tulisan-td" v-html="item.dataNilai.tugas8 ? item.dataNilai.tugas8 : 0" />
              </template>
              <template #[`item.tugas9`]="{ item }">
                <v-edit-dialog
                  v-if="task.tugas9[item.idUser]"
                  :return-value.sync="item.dataNilai.tugas9"
                  persistent
                  @open="() => { inputTemp[item.idUser] = item.dataNilai.tugas9; }"
                  @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'tugas9', 'dalam')"
                  @cancel="() => { inputTemp[item.idUser] = ''; }"
                >
                  <span class="tulisan-td" v-html="item.dataNilai.tugas9 ? item.dataNilai.tugas9 : 0" /> <v-icon small>edit</v-icon>
                  <template v-slot:input>
                    <v-text-field
                      class="ma-3"
                      v-model="inputTemp[item.idUser]"
                      placeholder="Ubah Nilai Tugas 1"
                      label="Ubah Nilai Tugas 1"
                      outlined
                      dense
                      hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                      persistent-hint
                      color="light-blue darken-3"
                      @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                    >
                      <template v-slot:message="{ message }">
                        <span v-html="message"></span>
                      </template>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
                <span v-else class="tulisan-td" v-html="item.dataNilai.tugas9 ? item.dataNilai.tugas9 : 0" />
              </template>
              <template #[`item.tugas10`]="{ item }">
                <v-edit-dialog
                  v-if="task.tugas10[item.idUser]"
                  :return-value.sync="item.dataNilai.tugas10"
                  persistent
                  @open="() => { inputTemp[item.idUser] = item.dataNilai.tugas10; }"
                  @save="simpanPerubahan(inputTemp[item.idUser], item.dataNilai, item.idUser, mapel, 'tugas10', 'dalam')"
                  @cancel="() => { inputTemp[item.idUser] = ''; }"
                >
                  <span class="tulisan-td" v-html="item.dataNilai.tugas10 ? item.dataNilai.tugas10 : 0" /> <v-icon small>edit</v-icon>
                  <template v-slot:input>
                    <v-text-field
                      class="ma-3"
                      v-model="inputTemp[item.idUser]"
                      placeholder="Ubah Nilai Tugas 1"
                      label="Ubah Nilai Tugas 1"
                      outlined
                      dense
                      hint="untuk batal tekan ESC<br>untuk simpan tekan Enter"
                      persistent-hint
                      color="light-blue darken-3"
                      @keypress.native="onlyNumber($event, 3, inputTemp[item.idUser])"                          
                    >
                      <template v-slot:message="{ message }">
                        <span v-html="message"></span>
                      </template>
                    </v-text-field>
                  </template>
                </v-edit-dialog>
                <span v-else class="tulisan-td" v-html="item.dataNilai.tugas10 ? item.dataNilai.tugas10 : 0" />
              </template>
            </v-data-table>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="DialogJumlahTugas"
      max-width="800px"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>Ubah Jumlah Tugas & KKM</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { DialogJumlahTugas = false; }"
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
              Jumlah Tugas
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-text-field
                v-model="jumlahTugas"
                placeholder="Jumlah Tugas"
                outlined
                dense
                label="Jumlah Tugas"
                color="light-black darken-3"
                hide-details
                @keypress.native="onlyNumber($event, 2, jumlahTugas)"                          
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              KKM
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-text-field
                v-model="kkm"
                placeholder="KKM"
                outlined
                dense
                label="KKM"
                color="light-black darken-3"
                hide-details
                @keypress.native="onlyNumber($event, 3, kkm)"                          
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row 
            no-gutters
            class="mr-3"
          >
            <v-col
              class="text-end"
              cols="12"
            >
              <v-btn
                color="light-blue darken-3"
                class="white--text text--darken-2"
                small
                dense
                depressed
                :disabled="jumlahTugas === '0' || kkm === '0' ? true : false"
                @click="ubahJumlahTask(kelasText, mapelText)"
              >
                Ubah Tugas & KKM
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
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
    kondisi: '',
    mapel: '',
    kelas: '',
    isLoading: false,
		DataSiswaSiswi: [],
		DataNilai: [],
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
		headers: [],
		headersTask: [
      { text: "Nomor Induk", value: "nomorInduk", sortable: false },
      { text: "Nama", value: "nama", sortable: false },
      { text: "Tugas 1", value: "tugas1", sortable: false },
      { text: "Tugas 2", value: "tugas2", sortable: false },
      { text: "Tugas 3", value: "tugas3", sortable: false },
      { text: "Tugas 4", value: "tugas4", sortable: false },
      { text: "Tugas 5", value: "tugas5", sortable: false },
      { text: "Tugas 6", value: "tugas6", sortable: false },
      { text: "Tugas 7", value: "tugas7", sortable: false },
      { text: "Tugas 8", value: "tugas8", sortable: false },
      { text: "Tugas 9", value: "tugas9", sortable: false },
      { text: "Tugas 10", value: "tugas10", sortable: false },
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
    DialogKehadiran: false,
    DialogTask: false,
    DialogJumlahTugas: false,
    endecryptType: '',
    jumlahTugas: '',
    kkm: '',
    inputKehadiran: {
      idUser: '',
      mapel: '',
      sakit: 0,
      alfa: 0,
      ijin: 0,
    },
    inputTemp: [],
    task: {
      tugas1: [],
      condition_tugas1: false,
      tugas2: [],
      condition_tugas2: false,
      tugas3: [],
      condition_tugas3: false,
      tugas4: [],
      condition_tugas4: false,
      tugas5: [],
      condition_tugas5: false,
      tugas6: [],
      condition_tugas6: false,
      tugas7: [],
      condition_tugas7: false,
      tugas8: [],
      condition_tugas8: false,
      tugas9: [],
      condition_tugas9: false,
      tugas10: [],
      condition_tugas10: false,
      UTS: [],
      condition_UTS: false,
      UAS: [],
      condition_UAS: false,
    },

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
      this.mapel = this.$route.query.mapel
      this.kondisi = this.$route.params.kondisi
      if(this.kondisi == 'penilaian'){
        this.getNilai(this.kelas, this.mapel)
      }
      this.getSiswaSiswi(1, 20, '', this.kelas)
      this.headerKondisi(this.kondisi)
      return this.kelas
    },
    mapelText() {
      this.mapel = this.$route.query.mapel
      return this.mapel
    }
  },
  watch: {
    page: {
			deep: true,
			handler(value) {
        if(this.kondisi == 'penilaian'){
          this.getNilai(this.kelas, this.mapel)
        }
				this.getSiswaSiswi(value, this.limit, this.searchData, this.kelas)
        this.headerKondisi(this.kondisi)
			}
		},
    limit: {
			deep: true,
			handler(value) {
        if(this.kondisi == 'penilaian'){
          this.getNilai(this.kelas, this.mapel)
        }
				this.getSiswaSiswi(1, value, this.searchData, this.kelas)
        this.headerKondisi(this.kondisi)
			}
		},
  },
  mounted() {
    this.roleID = localStorage.getItem('roleID')
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
			.then(async (res) => {
        let resdata = res.data.result
        if(this.kondisi == 'penilaian'){
          let kumpul = resdata.records
          this.jumlahTugas = this.DataNilai.jumlahTugas
          this.kkm = this.DataNilai.kkm
          await kumpul.map(str => {
            let nilai = this.DataNilai.dataSiswaSiswi.filter(val => val.idUser === str.idUser)[0].nilai
            let kehadiran = this.DataNilai.dataSiswaSiswi.filter(val => val.idUser === str.idUser)[0].kehadiran
            let totalNilaiTugas = Number(nilai.tugas1) + Number(nilai.tugas2) + Number(nilai.tugas3) + Number(nilai.tugas4) + Number(nilai.tugas5) + Number(nilai.tugas6) + Number(nilai.tugas7) + Number(nilai.tugas8) + Number(nilai.tugas9) + Number(nilai.tugas10)
            let rataRataTugas = totalNilaiTugas === 0 ? 0 : totalNilaiTugas / Number(this.jumlahTugas)
            let rataRataNilai = (Number(rataRataTugas) + Number(nilai.uts) + Number(nilai.uas)) / 3
            this.DataSiswaSiswi.push({
              ...str,
              dataNilai: nilai,
              dataKehadiran: kehadiran,
              totalNilaiTugas: rataRataTugas != 0 ? Math.ceil(rataRataTugas) : 0,
              rataRataNilai: rataRataNilai != 0 ? Math.ceil(rataRataNilai) : 0,
              hurufNilai: rataRataNilai <= 50 ? 'E' : rataRataNilai <= 65 ? 'D' : rataRataNilai <= 75 ? 'C' : rataRataNilai <= 85 ? 'B' : 'A',
            })
            // console.log(totalNilaiTugas, rataRataTugas, this.jumlahTugas);
          })
        }else if(this.kondisi == 'view'){
          this.DataSiswaSiswi = resdata.records
        }
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
    getNilai(kelas, mapel) {
      this.DataNilai = []
			let payload = {
        method: "get",
				url: `user/nilai?kelas=${kelas}&mapel=${mapel}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.DataNilai = res.data.result        
			})
			.catch((err) => {
        this.DataNilai = []
        this.notifikasi("error", err.response.data.message, "1")
			});
		},
    headerKondisi(kondisi) {
      this.headers = []
      if(kondisi === 'view'){
        this.headers.push(
          { text: "No", value: "number", sortable: false, width: "5%" },
          { text: "#", value: "data-table-expand", sortable: false, width: "5%" },
          { text: "Nomor Induk", value: "nomorInduk", sortable: false },
          { text: "Nama", value: "nama", sortable: false },
          { text: "Email", value: "email", sortable: false },
          { text: "Status", value: "statusAktif", sortable: false },
        )
      }else if(kondisi === 'penilaian'){
        this.headers.push(
          { text: "No", value: "number", sortable: false, width: "5%" },
          { text: "#", value: "data-table-expand", sortable: false, width: "5%" },
          { text: "Nomor Induk", value: "nomorInduk", sortable: false },
          { text: "Nama", value: "nama", sortable: false },
          { text: "Nilai Akhir Tugas", value: "tugas", sortable: false },
          { text: "Nilai UTS", value: "uts", sortable: false },
          { text: "Nilai UAS", value: "uas", sortable: false },
          { text: "Kehadiran", value: "kehadiran", sortable: false },
          { text: "Rata - Rata Nilai", value: "rataRataNilai", sortable: false },
          { text: "Nilai Huruf", value: "hurufNilai", sortable: false },
        )
      }
    },
    simpanPerubahan(nilai, item, idUser, mapel, task, posisi) {
      let key = Object.keys(item)
      let value = Object.values(item)
      let obj = {
        tugas1: key[0] == task ? Number(nilai) : value[0],
        tugas2: key[1] == task ? Number(nilai) : value[1],
        tugas3: key[2] == task ? Number(nilai) : value[2],
        tugas4: key[3] == task ? Number(nilai) : value[3],
        tugas5: key[4] == task ? Number(nilai) : value[4],
        tugas6: key[5] == task ? Number(nilai) : value[5],
        tugas7: key[6] == task ? Number(nilai) : value[6],
        tugas8: key[7] == task ? Number(nilai) : value[7],
        tugas9: key[8] == task ? Number(nilai) : value[8],
        tugas10: key[9] == task ? Number(nilai) : value[9],
        uts: key[10] == task ? Number(nilai) : value[10],
        uas: key[11] == task ? Number(nilai) : value[11],
      }
      let bodyData = {
        jenis: 'nilai',
        idUser: idUser,
        mapel: mapel,
        dataNilai: [
          { nilai: obj }
        ]
      }
      let payload = {
				method: "post",
				url: `user/nilai`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.DialogTask = false
        if(this.kondisi == 'penilaian'){
          this.getNilai(this.kelas, this.mapel)
        }
        this.getSiswaSiswi(1, 20, this.searchData, this.kelas)
        if(posisi === 'dalam'){
          this.taskDialog(this.DataSiswaSiswi)
        }
        // this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    ubahJumlahTask(kelas, mapel) {
      let bodyData = {
        jenis: 'jumlah_tugas',
        mapel: mapel,
        kelas: kelas,
        jumlahTugas: this.jumlahTugas,
        kkm: this.kkm,
      }
      let payload = {
				method: "post",
				url: `user/nilai`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        if(this.kondisi == 'penilaian'){
          this.getNilai(this.kelas, this.mapel)
        }
        this.getSiswaSiswi(1, 20, this.searchData, this.kelas)
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
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
    taskDialog(item){
      item.map(str => {
        this.task.tugas1[str.idUser] = false
        this.task.tugas2[str.idUser] = false
        this.task.tugas3[str.idUser] = false
        this.task.tugas4[str.idUser] = false
        this.task.tugas5[str.idUser] = false
        this.task.tugas6[str.idUser] = false
        this.task.tugas7[str.idUser] = false
        this.task.tugas8[str.idUser] = false
        this.task.tugas9[str.idUser] = false
        this.task.tugas10[str.idUser] = false
        this.task.condition_tugas1 = false
        this.task.condition_tugas2 = false
        this.task.condition_tugas3 = false
        this.task.condition_tugas4 = false
        this.task.condition_tugas5 = false
        this.task.condition_tugas6 = false
        this.task.condition_tugas7 = false
        this.task.condition_tugas8 = false
        this.task.condition_tugas9 = false
        this.task.condition_tugas10 = false
      })
      this.DialogTask = true
    },
    formNilai(item, status, trig){
      item.map(str => {
        if(trig === 'tugas1'){
          this.task.tugas1[str.idUser] = status
          this.task.condition_tugas1 = status
        }else if(trig === 'tugas2'){
          this.task.tugas2[str.idUser] = status
          this.task.condition_tugas2 = status
        }else if(trig === 'tugas3'){
          this.task.tugas3[str.idUser] = status
          this.task.condition_tugas3 = status
        }else if(trig === 'tugas4'){
          this.task.tugas4[str.idUser] = status
          this.task.condition_tugas4 = status
        }else if(trig === 'tugas5'){
          this.task.tugas5[str.idUser] = status
          this.task.condition_tugas5 = status
        }else if(trig === 'tugas6'){
          this.task.tugas6[str.idUser] = status
          this.task.condition_tugas6 = status
        }else if(trig === 'tugas7'){
          this.task.tugas7[str.idUser] = status
          this.task.condition_tugas7 = status
        }else if(trig === 'tugas8'){
          this.task.tugas8[str.idUser] = status
          this.task.condition_tugas8 = status
        }else if(trig === 'tugas9'){
          this.task.tugas9[str.idUser] = status
          this.task.condition_tugas9 = status
        }else if(trig === 'tugas10'){
          this.task.tugas10[str.idUser] = status
          this.task.condition_tugas10 = status
        }else if(trig === 'uts'){
          this.task.UTS[str.idUser] = status
          this.task.condition_UTS = status
        }else if(trig === 'uas'){
          this.task.UAS[str.idUser] = status
          this.task.condition_UAS = status
        }
      })
    },
    bukaDialog(item){
      this.inputKehadiran = {
        idUser: item.idUser,
        mapel: this.mapel,
        sakit: item.dataKehadiran.sakit,
        alfa: item.dataKehadiran.alfa,
        ijin: item.dataKehadiran.ijin,
      }
      this.DialogKehadiran = true
    },
    simpanKehadiran(){
      let bodyData = {
        jenis: 'kehadiran',
        idUser: this.inputKehadiran.idUser,
        mapel: this.inputKehadiran.mapel,
        dataKehadiran: [
          { 
            kehadiran: {
              sakit: Number(this.inputKehadiran.sakit),
              alfa: Number(this.inputKehadiran.alfa),
              ijin: Number(this.inputKehadiran.ijin),
            }
          }
        ]
      }
      let payload = {
				method: "post",
				url: `user/nilai`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        if(this.kondisi == 'penilaian'){
          this.getNilai(this.kelas, this.mapel)
        }
        this.getSiswaSiswi(1, 20, this.searchData, this.kelas)
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    gotolist(kondisi, param = null) {
      if(kondisi === 'view'){
        this.$router.push({name: "DataKelasSiswa", params: { kelas: param }});
      }else{
        this.$router.push({name: "DataAkademis"});
      }
    },
    gotolist2(mapel) {
      this.$router.push({name: "DataDetailAkademis", params: { mapel: mapel.replace(' ', '-') }});
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
.wadah {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
}
.iconstyle {
  margin-left: 5px;
  margin-right: 5px;
}
.link {
  color: #000;
  cursor: pointer;
  text-decoration: none;
}
.link:hover {
  color: #6fe484;
  cursor: pointer;
  text-decoration: underline;
}
.tulisan-td {
  font-size: 12px !important;
}
.titik2 {
  text-indent: 5em;
}
</style>