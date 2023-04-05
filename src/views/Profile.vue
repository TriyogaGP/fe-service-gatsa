<template>
  <div>
    <v-card class="ma-1" style="border: 1px solid #000; border-radius: 5px;">
      <v-row class="ma-1">
        <v-col cols="8" class="kotakleft">
          <v-tabs
            v-model="tab"
            fixed-tabs
            background-color="light-black darken-3"
            dark
          >
            <v-tab v-for="item in itemsTab" :key="item.code" :href="`#${item.code}`">
              <v-icon left>
                {{ item.icon }}
              </v-icon>
              {{ item.text }}
            </v-tab>
            <v-tab-item value="1">
              <div v-if="roleID === '1' || roleID === '2'" class="customScrollLeft">
                <div class="text-right">
                  <v-btn
                    color="#0bd369"
                    small
                    dense
                    depressed
                    class="white--text text--darken-2 mt-2"
                    @click="kondisiForm = !kondisiForm"
                  >
                    <v-icon small>{{ kondisiForm ? 'visibility_off' : 'visibility' }}</v-icon>&nbsp;Ubah Data Diri
                  </v-btn>
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
                    <span v-if="kondisiForm" v-html="previewData.nama"></span>
                    <v-text-field
                      v-else
                      v-model="inputAdministrator.nama"
                      placeholder="Nama Lengkap"
                      outlined
                      dense
                      label="Nama Lengkap"
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
                    Username
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                    class="pt-3"
                  >
                    <span v-if="kondisiForm" v-html="previewData.username"></span>
                    <v-text-field
                      v-else
                      v-model="inputAdministrator.username"
                      placeholder="Username"
                      outlined
                      dense
                      label="Username"
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
                    Email
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                    class="pt-3"
                  >
                    <span v-if="kondisiForm" v-html="previewData.email"></span>
                    <v-text-field
                      v-else
                      v-model="inputAdministrator.email"
                      placeholder="Email"
                      outlined
                      dense
                      label="Email"
                      color="light-black darken-3"
                      :rules="this.inputAdministrator.email != '' ? [rules.emailRules] : []"
                      hide-details="auto"
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
                    <span v-if="kondisiForm">{{ `${previewData.tempat}, ${convertDateForMonth(previewData.tanggalLahir)}` }}</span>
                    <v-row v-else no-gutters>
                      <v-col
                        cols="12"
                        md="6"
                        class="d-flex justify-center align-center"
                      >
                        <v-text-field
                          v-model="inputAdministrator.tempat"
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
                          v-model="inputAdministrator.tanggalLahir" 
                          circle
                          lang="id"
                          position="bottom right"
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
                    <span v-if="kondisiForm" v-html="previewData.jenisKelamin"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputAdministrator.jenisKelamin"
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
                    <span v-if="kondisiForm" v-html="previewData.agama"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputAdministrator.agama"
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
                    <span v-if="kondisiForm" v-html="previewData.telp"></span>
                    <v-text-field
                      v-else
                      v-model="inputAdministrator.telp"
                      placeholder="Telepon"
                      outlined
                      dense
                      label="Telepon"
                      color="light-black darken-3"
                      @keypress.native="onlyNumber($event, 15, inputAdministrator.telp)"
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
                    <span v-if="kondisiForm" v-html="previewData.alamat"></span>
                    <v-textarea
                      v-else
                      v-model="inputAdministrator.alamat"
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
                    <span v-if="kondisiForm" v-html="previewData.provinsi"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputAdministrator.provinsi"
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
                    <span v-if="kondisiForm" v-html="previewData.kabKota"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputAdministrator.kabKota"
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
                      :disabled="inputAdministrator.provinsi ? false : true"
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
                    <span v-if="kondisiForm" v-html="previewData.kecamatan"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputAdministrator.kecamatan"
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
                      :disabled="inputAdministrator.kabKota ? false : true"
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
                    <span v-if="kondisiForm" v-html="previewData.kelurahan"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputAdministrator.kelurahan"
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
                      :disabled="inputAdministrator.kecamatan ? false : true"
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
                    <span v-if="kondisiForm" v-html="previewData.kodePos"></span>
                    <v-text-field
                      v-else
                      v-model="inputAdministrator.kodePos"
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
                <div class="text-right">
                  <v-btn
                    v-if="!kondisiForm"
                    color="#0bd369"
                    small
                    dense
                    depressed
                    class="white--text text--darken-2 mt-2"
                    @click="SimpanDataProfile()"
                  >
                    Simpan Data
                  </v-btn>
                </div>
              </div>
              <div v-if="roleID === '3'" class="customScrollLeft">
                <div class="text-right">
                  <v-btn
                    color="#0bd369"
                    small
                    dense
                    depressed
                    class="white--text text--darken-2 mt-2"
                    @click="kondisiForm = !kondisiForm"
                  >
                    <v-icon small>{{ kondisiForm ? 'visibility_off' : 'visibility' }}</v-icon>&nbsp;Ubah Data Diri
                  </v-btn>
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
                    <span v-if="kondisiForm" v-html="previewData.nama"></span>
                    <v-text-field
                      v-else
                      v-model="inputGuru.nama"
                      placeholder="Nama Lengkap"
                      outlined
                      dense
                      label="Nama Lengkap"
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
                    Username
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                    class="pt-3"
                  >
                    <span v-if="kondisiForm" v-html="previewData.username"></span>
                    <v-text-field
                      v-else
                      v-model="inputGuru.username"
                      placeholder="Username"
                      outlined
                      dense
                      label="Username"
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
                    Email
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                    class="pt-3"
                  >
                    <span v-if="kondisiForm" v-html="previewData.email"></span>
                    <v-text-field
                      v-else
                      v-model="inputGuru.email"
                      placeholder="Email"
                      outlined
                      dense
                      label="Email"
                      color="light-black darken-3"
                      :rules="this.inputGuru.email != '' ? [rules.emailRules] : []"
                      hide-details="auto"
                      clearable
                    />
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
                    <span v-if="kondisiForm">{{ `${previewData.tempat}, ${convertDateForMonth(previewData.tanggalLahir)}` }}</span>
                    <v-row v-else no-gutters>
                      <v-col
                        cols="12"
                        md="6"
                        class="d-flex justify-center align-center"
                      >
                        <v-text-field
                          v-model="inputGuru.tempat"
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
                          v-model="inputGuru.tanggalLahir" 
                          circle
                          lang="id"
                          position="bottom right"
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
                    <span v-if="kondisiForm" v-html="previewData.jenisKelamin"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputGuru.jenisKelamin"
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
                    <span v-if="kondisiForm" v-html="previewData.agama"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputGuru.agama"
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
                    <span v-if="kondisiForm" v-html="previewData.telp"></span>
                    <v-text-field
                      v-else
                      v-model="inputGuru.telp"
                      placeholder="Telepon"
                      outlined
                      dense
                      label="Telepon"
                      color="light-black darken-3"
                      @keypress.native="onlyNumber($event, 15, inputGuru.telp)"
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
                    <span v-if="kondisiForm" v-html="previewData.alamat"></span>
                    <v-textarea
                      v-else
                      v-model="inputGuru.alamat"
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
                    <span v-if="kondisiForm" v-html="previewData.provinsi"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputGuru.provinsi"
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
                    <span v-if="kondisiForm" v-html="previewData.kabKota"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputGuru.kabKota"
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
                      :disabled="inputGuru.provinsi ? false : true"
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
                    <span v-if="kondisiForm" v-html="previewData.kecamatan"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputGuru.kecamatan"
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
                      :disabled="inputGuru.kabKota ? false : true"
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
                    <span v-if="kondisiForm" v-html="previewData.kelurahan"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputGuru.kelurahan"
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
                      :disabled="inputGuru.kecamatan ? false : true"
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
                    <span v-if="kondisiForm" v-html="previewData.kodePos"></span>
                    <v-text-field
                      v-else
                      v-model="inputGuru.kodePos"
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
                    <span v-if="kondisiForm" v-html="previewData.nomorInduk"></span>
                    <v-text-field
                      v-else
                      v-model="inputGuru.nomorInduk"
                      placeholder="Nomor Induk"
                      outlined
                      dense
                      label="Nomor Induk"
                      color="light-black darken-3"
                      @keypress.native="onlyNumber($event, 25, inputGuru.nomorInduk)"
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
                    <span v-if="kondisiForm" v-html="previewData.pendidikanGuru"></span>
                    <v-autocomplete
                      v-else
                      v-model="inputGuru.pendidikanGuru"
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
                <div class="text-right">
                  <v-btn
                    v-if="!kondisiForm"
                    color="#0bd369"
                    small
                    dense
                    depressed
                    class="white--text text--darken-2 mt-2"
                    @click="SimpanDataProfile()"
                  >
                    Simpan Data
                  </v-btn>
                </div>
              </div>
              <div v-if="roleID === '4'" class="customScrollLeft">
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
              </div>
            </v-tab-item>
            <v-tab-item value="2">
              <div class="customScrollLeft">
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    md="4"
                    class="pt-2 d-flex align-center"
                  >
                    Kata Sandi Lama
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                    class="pt-3"
                  >
                    <v-text-field
                      v-model="authData.passwordLama"
                      placeholder="Kata Sandi Lama"
                      :type="passTypeLama ? 'text' : 'password'"
                      outlined
                      dense
                      label="Kata Sandi Lama"
                      color="light-black darken-3"
                      hide-details
                      clearable
                    >
                      <template v-slot:append>
                        <v-icon
                          class="mr-1"
                          color="light-black darken-3"
                          tabindex="-1"
                          @click="onClickVisible('passTypeLama')"
                          >{{ passTypeLama ? 'visibility' : 'visibility_off' }}</v-icon
                        >
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    md="4"
                    class="pt-2 d-flex align-center"
                  >
                    Kata Sandi Baru
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                    class="pt-3"
                  >
                    <v-text-field
                      v-model="authData.passwordBaru"
                      placeholder="Kata Sandi Baru"
                      :type="passTypeBaru ? 'text' : 'password'"
                      outlined
                      dense
                      label="Kata Sandi Baru"
                      color="light-black darken-3"
                      hide-details
                      clearable
                    >
                      <template v-slot:append>
                        <v-icon
                          class="mr-1"
                          color="light-black darken-3"
                          tabindex="-1"
                          @click="onClickVisible('passTypeBaru')"
                          >{{ passTypeBaru ? 'visibility' : 'visibility_off' }}</v-icon
                        >
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    md="4"
                    class="pt-2 d-flex align-center"
                  >
                    Kata Sandi Konfirmasi Baru
                  </v-col>
                  <v-col
                    cols="12"
                    md="8"
                    class="pt-3"
                  >
                    <v-text-field
                      v-model="authData.passwordConfBaru"
                      placeholder="Kata Sandi Konfirmasi Baru"
                      :type="passTypeConfBaru ? 'text' : 'password'"
                      outlined
                      dense
                      label="Kata Sandi Konfirmasi Baru"
                      color="light-black darken-3"
                      hide-details
                      clearable
                    >
                      <template v-slot:append>
                        <v-icon
                          class="mr-1"
                          color="light-black darken-3"
                          tabindex="-1"
                          @click="onClickVisible('passTypeConfBaru')"
                          >{{ passTypeConfBaru ? 'visibility' : 'visibility_off' }}</v-icon
                        >
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <div class="text-right mt-2">
                  <v-btn
                    color="light-black darken-3"
                    class="white--text text--darken-2"
                    small
                    dense
                    depressed
                    :disabled="kondisiTombol"
                    @click="UbahKataSandi()"
                    >
                    Ubah Kata Sandi
                  </v-btn>
                </div>
              </div>
            </v-tab-item>
          </v-tabs>
        </v-col>
        <v-col cols="4" class="kotakright">
          <v-layout>
            <v-flex class="mt-2">
              <div class="d-flex flex-column justify-space-between align-center">
                <div class="avatar" @click="pilihFile()">
                  <span class="tulisan">
                    <v-icon small color="white">fa-solid fa-camera</v-icon>&nbsp;Ubah Foto Profil
                  </span>
                  <v-img :src="previewData.fotoProfil" />
                </div>
                <input 
                  ref="fotoProfile"
                  :key="componentKey"
                  type="file"
                  accept="image/*"
                  style="display: none"
                  @change="uploadFotoProfile($event)"
                >
              </div>
              <p class="white--text subheading mt-1 text-center"><strong>{{nama}}</strong></p>
              <p class="white--text text-center">{{namaRole}}</p>
            </v-flex>
          </v-layout>
          <v-divider style="border: 1px solid #FFF" />
          <div v-if="roleID === '4'" class="customScrollRight">
            <h4 class="white--text text-center ma-4">******&nbsp;Berkas - Berkas&nbsp;******</h4>
            <v-row no-gutters class="mb-2">
              <v-col cols="12" md="6" class="text-left">
                <span class="white--text">*FC Ijazah</span>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <v-btn
                  :loading="isLoadingbtnPDF1"
                  color="#0bd369"
                  small
                  dense
                  depressed
                  class="white--text text--darken-2"
                  @click="pdfCreate(previewData.fcIjazah, 'ijazah')"
                >
                  <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-2">
              <v-col cols="12" md="6" class="text-left">
                <span class="white--text">*FC SKHUN</span>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <v-btn
                  :loading="isLoadingbtnPDF2"
                  color="#0bd369"
                  small
                  dense
                  depressed
                  class="white--text text--darken-2"
                  @click="pdfCreate(previewData.fcSKHUN, 'skhun')"
                >
                  <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-2">
              <v-col cols="12" md="6" class="text-left">
                <span class="white--text">*FC SKHUN</span>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <v-btn
                  :loading="isLoadingbtnPDF3"
                  color="#0bd369"
                  small
                  dense
                  depressed
                  class="white--text text--darken-2"
                  @click="pdfCreate(previewData.fcKK, 'kk')"
                >
                  <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-2">
              <v-col cols="12" md="6" class="text-left">
                <span class="white--text">*FC KTP Orangtua</span>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <v-btn
                  :loading="isLoadingbtnPDF4"
                  color="#0bd369"
                  small
                  dense
                  depressed
                  class="white--text text--darken-2"
                  @click="pdfCreate(previewData.fcKTPOrtu, 'ktp')"
                >
                  <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-2">
              <v-col cols="12" md="6" class="text-left">
                <span class="white--text">*FC Akta Lahir</span>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <v-btn
                  :loading="isLoadingbtnPDF4"
                  color="#0bd369"
                  small
                  dense
                  depressed
                  class="white--text text--darken-2"
                  @click="pdfCreate(previewData.fcAktaLahir, 'aktalahir')"
                >
                  <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-2">
              <v-col cols="12" md="6" class="text-left">
                <span class="white--text">*FC SKL</span>
              </v-col>
              <v-col cols="12" md="6" class="text-right">
                <v-btn
                  :loading="isLoadingbtnPDF4"
                  color="#0bd369"
                  small
                  dense
                  depressed
                  class="white--text text--darken-2"
                  @click="pdfCreate(previewData.fcSKL, 'skl')"
                >
                  <v-icon small>visibility</v-icon>&nbsp;Lihat Berkas
                </v-btn>
              </v-col>
            </v-row>
            <!-- <h4 class="white--text text-center ma-4">******&nbsp;Raport Nilai&nbsp;******</h4> -->
          </div>
          <div v-if="roleID === '3'" class="customScrollRight">
            <h4 class="white--text text-center ma-4">******&nbsp;Data Kelengkapan&nbsp;******</h4>
            <v-row no-gutters class="mb-2">
              <v-col cols="12" md="12">
                <div class="white--text text-left" style="font-weight: bold;">*Jabatan Struktural</div>
                <div class="white--text text-left" style="font-size: 13px;">
                  <ul v-for="jabatan in arrayData.jabatanGuru" :key="jabatan">
                    <li>{{ jabatan }}</li>
                  </ul>  
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-2">
              <v-col cols="12" md="12">
                <div class="white--text text-left" style="font-weight: bold;">*Mangajar Bidang</div>
                <div class="white--text text-left" style="font-size: 13px;">
                  <ul v-for="bidang in arrayData.mengajarBidang" :key="bidang">
                    <li>{{ bidang }}</li>
                  </ul>  
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-2">
              <v-col cols="12" md="12">
                <div class="white--text text-left" style="font-weight: bold;">*Mangajar Kelas</div>
                <div class="white--text text-left" style="font-size: 13px;">
                  <ul v-for="kelas in arrayData.mengajarKelas" :key="kelas">
                    <li>{{ kelas }}</li>
                  </ul>  
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters class="mb-2">
              <v-col cols="12" md="12">
                <div class="white--text text-left" style="font-weight: bold;">*Wali Kelas</div>
                <div class="white--text text-left" style="font-size: 13px;">{{ previewData.waliKelas ? previewData.waliKelas : '-' }}</div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog
      v-model="dialogPDF"
      transition="dialog-bottom-transition"
			persistent
			width="1000px"
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
        <v-card>
          <PdfCetakan
            :dialog-pdf.sync="dialogPDF"
            :url-sk.sync="urlSk"
          />
        </v-card>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogCrop"
      scrollable
      width="700px"
      height="500px"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-text class="pt-4">
          <cropper
            ref="cropper"
            class="cropper"
            :auto-zoom="true"
            :src="image.src"
            stencil-component="circle-stencil"
          />
            <!-- :stencil-size="{
              width: 300,
              height: 300
            }"
            :stencil-props="{
              handlers: {},
              movable: false,
              resizable: false,
              aspectRatio: 1,
            }"
            image-restriction="stencil" -->
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
                color="#e6e7e8"
                class="elevation-0 tombol-tutup mr-3"
                @click="tutupDialogCrop()"
              >
                Tutup
              </v-btn>
              <v-btn
                color="#e6e7e8"
                class="elevation-0 tombol-tutup"
                @click="crop"
              >
                Crop Lampiran
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
        @proses="goToProses"
        @cancel="dialogNotifikasi = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import PopUpNotifikasiVue from "./Layout/PopUpNotifikasi.vue";
import PdfCetakan from './Layout/PdfCetakan.vue';
import { Cropper, CircleStencil, RectangleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

function getMimeType(file, fallback = null) {
	const byteArray = (new Uint8Array(file)).subarray(0, 4);
  let header = '';
  for (let i = 0; i < byteArray.length; i++) {
      header += byteArray[i].toString(16);
  }
	switch (header) {
    case "89504e47":
      return "image/png";
      case "47494638":
        return "image/gif";
        case "ffd8ffe0":
          case "ffd8ffe1":
    case "ffd8ffe2":
      case "ffd8ffe3":
        case "ffd8ffe8":
          return "image/jpeg";
    default:
      return fallback;
    }
  }

export default {
  name: 'Profile',
  components: { PopUpNotifikasiVue, PdfCetakan, Cropper, CircleStencil, RectangleStencil },
  data: () => ({
    roleID: '',
    nama: '',
    namaRole: '',
    isLoadingbtnPDF1: false,
    isLoadingbtnPDF2: false,
    isLoadingbtnPDF3: false,
    isLoadingbtnPDF4: false,
    isLoadingbtnPDF5: false,
    isLoadingbtnPDF6: false,
    dialogPDF: false,
    urlSk: window.location.href,
    BASE_URL: '',
    inputAdministrator: {
      idUser: '',
      nama: '',
      username: '',
      email: '',
      tempat: '',
      tanggalLahir: '',
      jenisKelamin: '',
      agama: '',
      telp: '',
      alamat: '',
      provinsi: '',
      kabKota: '',
      kecamatan: '',
      kelurahan: '',
      kodePos: '',
    },
    inputGuru: {
      idUser: '',
      nomorInduk: '',
      nama: '',
      username: '',
      email: '',
      tempat: '',
      tanggalLahir: '',
      jenisKelamin: '',
      agama: '',
      telp: '',
      alamat: '',
      provinsi: '',
      kabKota: '',
      kecamatan: '',
      kelurahan: '',
      kodePos: '',
      pendidikanGuru: '',
    },
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
      pendidikanGuru: '',
      jabatanGuru: '',
      mengajarBidang: '',
      mengajarKelas: '',
      waliKelas: '',
      fotoProfil: '',
      fcIjazah: '',
      fcSKHUN: '',
      fcKK: '',
      fcKTPOrtu: '',
      fcAktaLahir: '',
      fcSKL: '',
    },
    arrayData: {
      jabatanGuru: '',
      mengajarBidang: '',
      mengajarKelas: '',
    },
    authData: {
      passwordLama: '',
      passwordBaru: '',
      passwordConfBaru: '',
    },
    kondisiForm: true,
    jenisKelaminOptions: [
			{ text: 'Laki - Laki', value: 'Laki - Laki' },
			{ text: 'Perempuan', value: 'Perempuan' },
		],
    levelOptions: [
			{ text: 'Super Administrator', value: 1 },
			{ text: 'Administrator', value: 2 },
		],
    kondisiTombol: true,
    passType: '',
    passTypeLama: '',
    passTypeBaru: '',
    passTypeConfBaru: '',
    endecryptType: '',
    rules: {
			emailRules: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'email tidak valid'
			},
		},
    itemsTab: [
			{code: '1', text: 'Data Profile', icon: 'mdi-account'},
			{code: '2', text: 'Ubah Kata Sandi', icon: 'mdi-lock'},
		],
		tab: '',
		componentKey: 0,
    dialogCrop: false,
    image: {
      src: null,
      type: null,
    },
    FileFotoProfil: '',
    fotoProfil: '',

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Profile - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
		agamaOptions(){
			return this.$store.state.agamaOptions
		},
		pendidikanOptions(){
			return this.$store.state.pendidikanOptions
		},
		ProvinsiOptions(){
			return this.$store.state.ProvinsiOptions
		},
		KabKotaOptions(){
			return this.$store.state.KabKotaOptions
		},
		KecamatanOptions(){
			return this.$store.state.KecamatanOptions
		},
		KelurahanOptions(){
			return this.$store.state.KelurahanOptions
		},
  },
  watch:{
		tab:{
			handler(value){
				if (value == '1') {
          this.getProfile(localStorage.getItem("idLogin"))
          this.passType = true
          this.endecryptType = false
          this.clearForm()
        }
			}
		},
    authData: {
      deep: true,
      handler(value){
        if(value.passwordLama == null){ this.authData.passwordLama = '' }
        if(value.passwordBaru == null){ this.authData.passwordBaru = '' }
        if(value.passwordConfBaru == null){ this.authData.passwordConfBaru = '' }
  
        if(value.passwordLama != '' && value.passwordBaru != '' && value.passwordConfBaru != ''){
          this.kondisiTombol = false
        }else{
          this.kondisiTombol = true	
        }
      }
    },
    inputGuru:{
			deep: true,
			handler(value) {
				if(!value.provinsi){
					this.inputGuru.kabKota = ''
					this.inputGuru.kecamatan = ''
					this.inputGuru.kelurahan = ''
					this.inputGuru.kodePos = ''
				}
      }
    },
	},
  mounted() {
    this.roleID = localStorage.getItem("roleID")
    this.nama = localStorage.getItem("nama")
    this.namaRole = localStorage.getItem("nama_role")
    this.BASE_URL = process.env.VUE_APP_NODE_ENV === "production" ? process.env.VUE_APP_VIEW_PROD_API_URL : process.env.VUE_APP_VIEW_DEV_API_URL
    this.passType = true
    this.endecryptType = false
    this.passTypeLama = false
    this.passTypeBaru = false
    this.passTypeConfBaru = false
  },
  methods: {
    ...mapActions({
      fetchData: "fetchData",
      uploadFiles: "upload/uploadFiles",
    }),
		getProfile(id) {
			let payload = {
				method: "put",
				url: `auth/profile/${id}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
				let data = res.data.result;
        if(this.roleID === '3'){
          this.inputGuru = {
            idUser: data.idUser,
            nomorInduk: data.nomorInduk,
            nama: this.uppercaseLetterFirst2(data.nama),
            username: data.username,
            email: data.email,
            tempat: data.tempat,
            tanggalLahir: data.tanggalLahir,
            jenisKelamin: data.jenisKelamin,
            agama: data.agama.kode,
            telp: data.telp,
            alamat: this.uppercaseLetterFirst2(data.alamat),
            provinsi: data.provinsi.kode,
            kabKota: data.kabKota.kode,
            kecamatan: data.kecamatan.kode,
            kelurahan: data.kelurahan.kode,
            kodePos: data.kodePos,
            pendidikanGuru: data.pendidikanGuru.kode,
          }
          this.$store.dispatch('getAgama')
          this.$store.dispatch('getPendidikan')
		      this.$store.dispatch('getWilayah', { bagian: 'provinsi', KodeWilayah: null })
		      this.$store.dispatch('getWilayah', { bagian: 'kabkota', KodeWilayah: this.inputGuru.provinsi })
		      this.$store.dispatch('getWilayah', { bagian: 'kecamatan', KodeWilayah: this.inputGuru.kabKota })
		      this.$store.dispatch('getWilayah', { bagian: 'kelurahan', KodeWilayah: this.inputGuru.kecamatan })
        }
        if(this.roleID === '1' || this.roleID === '2'){
          this.inputAdministrator = {
            idUser: data.idUser,
            nama: this.uppercaseLetterFirst2(data.nama),
            username: data.username,
            email: data.email,
            tempat: data.tempat,
            tanggalLahir: data.tanggalLahir,
            jenisKelamin: data.jenisKelamin,
            agama: data.agama.kode,
            telp: data.telp,
            alamat: data.alamat ? this.uppercaseLetterFirst2(data.alamat) : '-',
            provinsi: data.provinsi.kode,
            kabKota: data.kabKota.kode,
            kecamatan: data.kecamatan.kode,
            kelurahan: data.kelurahan.kode,
            kodePos: data.kodePos,
          }
          this.$store.dispatch('getAgama')
		      this.$store.dispatch('getWilayah', { bagian: 'provinsi', KodeWilayah: null })
		      this.$store.dispatch('getWilayah', { bagian: 'kabkota', KodeWilayah: this.inputAdministrator.provinsi })
		      this.$store.dispatch('getWilayah', { bagian: 'kecamatan', KodeWilayah: this.inputAdministrator.kabKota })
		      this.$store.dispatch('getWilayah', { bagian: 'kelurahan', KodeWilayah: this.inputAdministrator.kecamatan })
        }
        this.previewData = {
          idUser: data.idUser,
          namaRole: data.namaRole,
          nama: this.uppercaseLetterFirst2(data.nama),
          username: data.username,
          email: data.email,
          password: data.kataSandi,
          nikSiswa: this.roleID === '4' ? data.nikSiswa ? data.nikSiswa : '-' : null,
          nomorInduk: this.roleID === '4' || this.roleID === '3' ? data.nomorInduk : null,
          tempat: data.tempat,
          tanggalLahir: data.tanggalLahir,
          jenisKelamin: data.jenisKelamin,
          agama: data.agama.label,
          anakKe: this.roleID === '4' ? data.anakKe ? data.anakKe : '-' : null,
          jumlahSaudara: this.roleID === '4' ? data.jumlahSaudara ? data.jumlahSaudara : '-' : null,
          hobi: this.roleID === '4' ? data.hobi ? data.hobi.label : '-' : null,
          citaCita: this.roleID === '4' ? data.citaCita ? data.citaCita.label : '-' : null,
          kelas: this.roleID === '4' ? data.kelas ? data.kelas : '-' : null,
          jenjang: this.roleID === '4' ? data.dataSekolahSebelumnya.jenjang.label : null,
          statusSekolah: this.roleID === '4' ? data.dataSekolahSebelumnya.statusSekolah.label : null,
          namaSekolah: this.roleID === '4' ? data.dataSekolahSebelumnya.namaSekolah : null,
          npsn: this.roleID === '4' ? data.dataSekolahSebelumnya.npsn ? data.dataSekolahSebelumnya.npsn : '-' : null,
          alamatSekolah: this.roleID === '4' ? this.uppercaseLetterFirst2(data.dataSekolahSebelumnya.alamatSekolah) : null,
          kabkotSekolah: this.roleID === '4' ? this.uppercaseLetterFirst2(data.dataSekolahSebelumnya.kabkotSekolah.nama) : null,
          noPesertaUN: this.roleID === '4' ? data.dataSekolahSebelumnya.noPesertaUN ? data.dataSekolahSebelumnya.noPesertaUN : '-': null,
          noSKHUN: this.roleID === '4' ? data.dataSekolahSebelumnya.noSKHUN ? data.dataSekolahSebelumnya.noSKHUN : '-' : null,
          noIjazah: this.roleID === '4' ? data.dataSekolahSebelumnya.noIjazah ? data.dataSekolahSebelumnya.noSKHUN : '-' : null,
          nilaiUN: this.roleID === '4' ? data.dataSekolahSebelumnya.nilaiUN ? data.dataSekolahSebelumnya.noSKHUN : '-' : null,
          noKK: this.roleID === '4' ? data.noKK : null,
          namaKK: this.roleID === '4' ? this.uppercaseLetterFirst2(data.namaKK) : null,
          telp: this.roleID === '4' ? data.dataAlamatOrangtua.telp ? data.dataAlamatOrangtua.telp : '-' : data.telp ? data.telp : '-',
          alamat: this.uppercaseLetterFirst2(this.roleID === '4' ? data.dataAlamatOrangtua.alamat ? data.dataAlamatOrangtua.alamat : '-' : data.alamat ? data.alamat : '-'),
          provinsi: this.uppercaseLetterFirst2(this.roleID === '4' ? data.dataAlamatOrangtua.provinsi.nama : data.provinsi.nama),
          kabKota: this.uppercaseLetterFirst2(this.roleID === '4' ? data.dataAlamatOrangtua.kabKota.nama : data.kabKota.nama),
          kecamatan: this.uppercaseLetterFirst2(this.roleID === '4' ? data.dataAlamatOrangtua.kecamatan.nama : data.kecamatan.nama),
          kelurahan: this.uppercaseLetterFirst2(this.roleID === '4' ? data.dataAlamatOrangtua.kelurahan.nama : data.kelurahan.nama),
          kodePos: this.roleID === '4' ? data.dataAlamatOrangtua.kodePos : data.kodePos,
          nikAyah: this.roleID === '4' ? data.dataOrangtua.dataAyah.nikAyah : null,
          namaAyah: this.roleID === '4' ? this.uppercaseLetterFirst2(data.dataOrangtua.dataAyah.namaAyah) : null,
          tahunAyah: this.roleID === '4' ? data.dataOrangtua.dataAyah.tahunAyah : null,
          statusAyah: this.roleID === '4' ? data.dataOrangtua.dataAyah.statusAyah.label : null,
          pendidikanAyah: this.roleID === '4' ? data.dataOrangtua.dataAyah.pendidikanAyah.label : null,
          pekerjaanAyah: this.roleID === '4' ? data.dataOrangtua.dataAyah.pekerjaanAyah.label : null,
          telpAyah: this.roleID === '4' ? data.dataOrangtua.dataAyah.telpAyah : null,
          nikIbu: this.roleID === '4' ? data.dataOrangtua.dataIbu.nikIbu : null,
          namaIbu: this.roleID === '4' ? this.uppercaseLetterFirst2(data.dataOrangtua.dataIbu.namaIbu) : null,
          tahunIbu: this.roleID === '4' ? data.dataOrangtua.dataIbu.tahunIbu : null,
          statusIbu: this.roleID === '4' ? data.dataOrangtua.dataIbu.statusIbu.label : null,
          pendidikanIbu: this.roleID === '4' ? data.dataOrangtua.dataIbu.pendidikanIbu.label : null,
          pekerjaanIbu: this.roleID === '4' ? data.dataOrangtua.dataIbu.pekerjaanIbu.label : null,
          telpIbu: this.roleID === '4' ? data.dataOrangtua.dataIbu.telpIbu : null,
          nikWali: this.roleID === '4' ? data.dataOrangtua.dataWali.nikWali ? data.dataOrangtua.dataWali.nikWali : '-' : null,
          namaWali: this.roleID === '4' ? data.dataOrangtua.dataWali.namaWali ? this.uppercaseLetterFirst2(data.dataOrangtua.dataWali.namaWali) : '-' : null,
          tahunWali: this.roleID === '4' ? data.dataOrangtua.dataWali.tahunWali ? data.dataOrangtua.dataWali.tahunWali : '-' : null,
          pendidikanWali: this.roleID === '4' ? data.dataOrangtua.dataWali.pendidikanWali ? data.dataOrangtua.dataWali.pendidikanWali.label : '-' : null,
          pekerjaanWali: this.roleID === '4' ? data.dataOrangtua.dataWali.pekerjaanWali ? data.dataOrangtua.dataWali.pekerjaanWali.label : '-' : null,
          telpWali: this.roleID === '4' ? data.dataOrangtua.dataWali.telpWali ? data.dataOrangtua.dataWali.telpWali : '-' : null,
          penghasilan: this.roleID === '4' ? data.penghasilan ? data.penghasilan.label : '-' : null,
          statusTempatTinggal: this.roleID === '4' ? data.dataLainnya.statusTempatTinggal ? data.dataLainnya.statusTempatTinggal.label : '-' : null,
          jarakRumah: this.roleID === '4' ? data.dataLainnya.jarakRumah ? data.dataLainnya.jarakRumah.label : '-' : null,
          transportasi: this.roleID === '4' ? data.dataLainnya.transportasi ? data.dataLainnya.transportasi.label : '-' : null,
          pendidikanGuru: this.roleID === '3' ? data.pendidikanGuru.label : null,
          jabatanGuru: this.roleID === '3' ? data.jabatanGuru.map(str => { return str.label; }).sort().join(', ') : null,
          mengajarBidang: this.roleID === '3' ? data.mengajarBidang.map(str => { return str.label; }).sort().join(', ') : null,
          mengajarKelas: this.roleID === '3' ? data.mengajarKelas : null,
          waliKelas: this.roleID === '3' ? data.waliKelas : null,
          fotoProfil: data.fotoProfil,
          fcIjazah: this.roleID === '4' ? data.berkas.fcIjazah : null,
          fcSKHUN: this.roleID === '4' ? data.berkas.fcSKHUN : null,
          fcKK: this.roleID === '4' ? data.berkas.fcKK : null,
          fcKTPOrtu: this.roleID === '4' ? data.berkas.fcKTPOrtu : null,
          fcAktaLahir: this.roleID === '4' ? data.berkas.fcAktaLahir : null,
          fcSKL: this.roleID === '4' ? data.berkas.fcSKl : null,
        }
        this.arrayData = {
          jabatanGuru: this.roleID === '3' ? data.jabatanGuru.map(str => { return str.label; }).sort() : null,
          mengajarBidang: this.roleID === '3' ? data.mengajarBidang.map(str => { return str.label; }).sort() : null,
          mengajarKelas: this.roleID === '3' ? data.mengajarKelas.split(', ') : null,
        }
        localStorage.setItem('fotoProfil', this.previewData.fotoProfil)
			})
			.catch((err) => {
				console.log(err)
			});
		},
    wilayah(kondisi, e){
			if(kondisi === 'provinsi'){
				if(e){
					this.$store.dispatch('getWilayah', { bagian: 'kabkota', KodeWilayah: e })
					this.inputGuru.kabKota = ''
					this.inputGuru.kecamatan = ''
					this.inputGuru.kelurahan = ''
					this.inputGuru.kodePos = ''
				}
			}else if(kondisi === 'kabkota'){
				if(e){
					this.$store.dispatch('getWilayah', { bagian: 'kecamatan', KodeWilayah: e })
					if(e !== this.inputGuru.kecamatan) {
						this.inputGuru.kelurahan = ''
						this.inputGuru.kodePos = ''	
					}
				}else{
					this.inputGuru.kecamatan = ''
					this.inputGuru.kelurahan = ''
					this.inputGuru.kodePos = ''
				}
			}else if(kondisi === 'kecamatan'){
				if(e){
					this.$store.dispatch('getWilayah', { bagian: 'kelurahan', KodeWilayah: e })
					if(e !== this.inputGuru.kelurahan) {
						this.inputGuru.kodePos = ''	
					}
				}else{
					this.inputGuru.kelurahan = ''
					this.inputGuru.kodePos = ''
				}
			}else if(kondisi === 'kelurahan'){
				if(e){
					let data = this.KelurahanOptions.filter(str => str.value === e)
          this.inputGuru.kodePos = data[0].kodePos
				}else{
					this.inputGuru.kodePos = ''
				}
			}
		},
    SimpanDataProfile(){
      if(this.roleID === '3'){
        let bodyData = {
          idUser: localStorage.getItem('idLogin'),
          role: this.roleID,
          nomorInduk: this.inputGuru.nomorInduk,
          nama: this.inputGuru.nama,
          username: this.inputGuru.username,
          email: this.inputGuru.email,
          tempat: this.inputGuru.tempat,
          tanggalLahir: this.inputGuru.tanggalLahir,
          jenisKelamin: this.inputGuru.jenisKelamin,
          agama: this.inputGuru.agama,
          telp: this.inputGuru.telp,
          alamat: this.inputGuru.alamat,
          provinsi: this.inputGuru.provinsi,
          kabKota: this.inputGuru.kabKota,
          kecamatan: this.inputGuru.kecamatan,
          kelurahan: this.inputGuru.kelurahan,
          kodePos: this.inputGuru.kodePos,
          pendidikanGuru: this.inputGuru.pendidikanGuru,
        }
        let payload = {
          method: "post",
          url: `auth/ubah-profile`,
          body: bodyData,
          authToken: localStorage.getItem('user_token')
        };
        this.fetchData(payload)
        .then(async (res) => {
          this.kondisiForm = true
          this.clearForm()
          this.getProfile(localStorage.getItem('idLogin'))
          this.notifikasi("success", res.data.message, "1")
        })
        .catch((err) => {
          this.notifikasi("error", err.response.data.message, "1")
        });
      }
      if(this.roleID === '1' || this.roleID === '2'){
        let bodyData = {
          idUser: localStorage.getItem('idLogin'),
          role: this.roleID,
          nama: this.inputAdministrator.nama,
          username: this.inputAdministrator.username,
          email: this.inputAdministrator.email,
          tempat: this.inputAdministrator.tempat,
          tanggalLahir: this.inputAdministrator.tanggalLahir,
          jenisKelamin: this.inputAdministrator.jenisKelamin,
          agama: this.inputAdministrator.agama,
          telp: this.inputAdministrator.telp,
          alamat: this.inputAdministrator.alamat,
          provinsi: this.inputAdministrator.provinsi,
          kabKota: this.inputAdministrator.kabKota,
          kecamatan: this.inputAdministrator.kecamatan,
          kelurahan: this.inputAdministrator.kelurahan,
          kodePos: this.inputAdministrator.kodePos,
        }
        let payload = {
          method: "post",
          url: `auth/ubah-profile`,
          body: bodyData,
          authToken: localStorage.getItem('user_token')
        };
        this.fetchData(payload)
        .then(async (res) => {
          this.kondisiForm = true
          this.clearForm()
          this.getProfile(localStorage.getItem('idLogin'))
          this.notifikasi("success", res.data.message, "1")
        })
        .catch((err) => {
          this.notifikasi("error", err.response.data.message, "1")
        });
      }
    },
    UbahKataSandi() {
      // console.log(this.authData);
      let bodyData = {
        idUser: localStorage.getItem('idLogin'),
        passwordLama: this.authData.passwordLama,
        passwordBaru: this.authData.passwordBaru,
        passwordConfBaru: this.authData.passwordConfBaru,
      }
      let payload = {
				method: "post",
				url: `auth/ubah-katasandi`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then(async (res) => {
				this.clearForm()
        this.getProfile(localStorage.getItem('idLogin'))
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    pdfCreate(berkas, jenis) {
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
        return this.notifikasi("warning", 'Berkas tidak ditemukan !', "1")
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
    },
    pilihFile() {
      this.$refs.fotoProfile.click();
    },
    async uploadFotoProfile(e) {
      let files = e.target.files[0];
      if(!files) return this.notifikasi("warning", 'Ulangi unggah Foto Profile', "1")
      let ukuran = (files.size / (1024*1024)).toFixed(2);
      if(ukuran > 5.00) { 
        this.componentKey++; 
        return this.notifikasi("warning", 'Unggah Foto Profile anda terlalu besar !', "1")
      }
      this.fotoProfil = files.name
      this.loadImage(files)
    },
    loadImage(files) {
      this.dialogCrop = true
      const blob = URL.createObjectURL(files);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = {
          src: blob,
          type: getMimeType(e.target.result, files.type),
        }
      }
      reader.readAsArrayBuffer(files);
    },
    crop() {
			const { canvas } = this.$refs.cropper.getResult();
			canvas.toBlob(async (blob) => {
        this.FileFotoProfil = blob
        let uploadFotoProfil = await this.uploadLampiran(localStorage.getItem("idLogin"), this.FileFotoProfil)
        if(uploadFotoProfil != undefined){ 
          localStorage.setItem('fotoProfil', `${this.BASE_URL}/image/${uploadFotoProfil.data.result.idUser}/${uploadFotoProfil.data.result.namaFile}`)
          this.tutupDialogCrop()
          this.notifikasi("success", "Berhasil ubah Foto Profile", "2")
        }else{ 
          this.componentKey++;
          this.tutupDialogCrop()
          this.notifikasi("error", 'Gagal ubah Foto Profile', "1")
        }
			}, this.image.type);

		},
    tutupDialogCrop(){
      this.FileFotoProfil = ''
      this.fotoProfil = '';
      this.$refs.fotoProfile.value = null
      this.dialogCrop = false
    },
    async uploadLampiran(idUser, dataUpload) {
			if(dataUpload){
				const bodyData = {
					idUser: idUser,
					field: 'fotoprofil',
					nama_folder: idUser,
					nama_file: `${idUser}-fotoprofil`,
					jenis: "image",
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
    goToProses() {
      window.location.reload();
    },
    onClickVisible(d) {
      this[d] = !this[d]
    },
    endecryptData(d) {
      this[d] = !this[d]
      let url = this[d] ? 'decryptPass' : 'encryptPass' 
      let payload = {
				method: "get",
				url: `settings/${url}?kata=${this.previewData.password}`,
				authToken: localStorage.getItem('user_token')
			};
      this.previewData.password = ''
			this.fetchData(payload)
			.then((res) => {
				this.previewData.password = res.data.result.hasil;
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    clearForm(){
      this.authData = {
        passwordLama: '',
        passwordBaru: '',
        passwordConfBaru: '',
      }
      if(this.roleID === '3'){
        this.inputGuru = {
          idUser: '',
          nomorInduk: '',
          nama: '',
          username: '',
          email: '',
          tempat: '',
          tanggalLahir: '',
          jenisKelamin: '',
          agama: '',
          telp: '',
          alamat: '',
          provinsi: '',
          kabKota: '',
          kecamatan: '',
          kelurahan: '',
          kodePos: '',
          pendidikanGuru: '',
        }
      }
      if(this.roleID === '1' || this.roleID === '2'){
        this.inputAdministrator = {
          idUser: '',
          nama: '',
          username: '',
          email: '',
          tempat: '',
          tanggalLahir: '',
          jenisKelamin: '',
          agama: '',
          telp: '',
          alamat: '',
          provinsi: '',
          kabKota: '',
          kecamatan: '',
          kelurahan: '',
          kodePos: '',
        }
      }
    },
		notifikasi(kode, text, proses){
      this.dialogNotifikasi = true
      this.notifikasiKode = kode
      this.notifikasiText = text
      this.notifikasiButton = proses
    },
  },
}
</script>
<style>
.v-calendar .input-field input {
	width: 265px !important;
  height: 40px !important;
}
</style>
<style scoped>
.kotakleft {
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
  border-right: 3px solid #4CAF50;
}
.kotakright {
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
  padding: 10px;
  background-color: #272727;
}
.kotak {
	border: 2px dashed #000;
	border-radius: 5px;
	text-align: justify;
	background: #FFF;
	color: #000;
	margin: 5px;
  padding: 5px;
  font-size: 9pt;
}
.v-tab {
	font-size: 8pt !important;
	font-weight: bold !important;
}
.v-input .v-label {
  font-size: 11pt !important;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
.avatar {
  border: solid 2px #FFF;
  border-radius: 50%;
  align-items: center;
  display: flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  width: 185px;
  height: 185px;
  cursor: pointer;
}
.avatar:hover {
  border: solid 2px #FFF;
  opacity: 0.5;
}

.avatar:hover img {
  position: absolute;
  z-index: 1;
}
.tulisan {
  position: absolute;
  visibility: hidden;
}
.avatar:hover .tulisan {
  border-radius: 5px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  background: #000000;
  color: #FFF;
  font-size: 12px;
  visibility: visible;
  font-weight: bold;
  z-index: 100;
  width: 185px;
  height: 30px;
}
.cropper {
  height: 450px !important;
}
.customScrollLeft {
  width: 100%;
  height: 500px;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 5px;
  padding: 8px;
  border: 2px solid #000;
	border-radius: 5px;
}

.customScrollLeft::-webkit-scrollbar {
  width: 16px;
}
.customScrollLeft::-webkit-scrollbar-thumb {
  background-color: #4CAF50;
  border: 5px solid #fff;
  border-radius: 10rem;
}
.customScrollLeft::-webkit-scrollbar-track {
  position: absolute;
  right: -3rem;
  top: -50rem;
  background: transparent;
}
.customScrollRight {
  width: 100%;
  height: 270px;
  background: #272727;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 5px;
}

.customScrollRight::-webkit-scrollbar {
  width: 16px;
}
.customScrollRight::-webkit-scrollbar-thumb {
  background-color: #4CAF50;
  border: 5px solid #272727;
  border-radius: 10rem;
}
.customScrollRight::-webkit-scrollbar-track {
  position: absolute;
  right: -3rem;
  top: -50rem;
  /* background: transparent; */
}
</style>