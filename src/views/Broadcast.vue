<template>
  <div>
    <h1 class="subheading grey--text">Data Broadcast</h1>
    <v-btn
      v-if="roleID === '1' || roleID === '2' || roleID === '3'"
      color="light-blue darken-3"
      small
      dense
      depressed
      class="ma-2 white--text text--darken-2"
      @click="() => {
        this.getBerkas({kategori: 'tautan'})
        this.DialogBroadcast = true
      }"
    >
      <v-icon small>fas fa-bullhorn</v-icon>&nbsp;Broadcast
    </v-btn>
    <v-card class="mt-2 mb-2 pa-1" outlined elevation="0">
      <v-tabs
        v-if="roleID === '1' || roleID === '2' || roleID === '3'"
        v-model="tab"
        grow
        background-color="light-white darken-3"
        dark
      >
        <v-tab v-for="item in itemsTab" :key="item.code" :href="`#${item.code}`">
          <v-icon left medium>{{ item.icon }}</v-icon>&nbsp;{{ item.text }}
        </v-tab>
        <v-tab-item value="1">
          <div v-if="dataNotifikasi.length" class="wadah-notif">
            <v-row>
              <v-col cols="12" md="12" class="text-right">
                <v-btn
                  color="light-blue darken-3"
                  x-small
                  dense
                  depressed
                  class="ma-2 white--text text--darken-2 align-right"
                  @click="tandai(dataNotifikasi)"
                >
                  Tandai Telah Dibaca
                </v-btn>
              </v-col>
            </v-row>
            <div v-for="notif, k in dataNotifikasi" :key="k" class="kotak-notif" @click="!downloadTautan ? openDialog(notif) : ''">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="6"
                >
                  <span class="box fourcorners" style="background-color: rgba(19, 234, 216, 0.822); color: black;">{{notif.type}}</span>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="kondisiNotif"
                >
                  <p>{{notif.isRead ? 'sudah dibaca' : 'belum dibaca' }} <v-icon small :color="notif.isRead == true ? 'green' : 'red'">{{ notif.isRead == true ? 'check' : 'clear' }}</v-icon></p>
                </v-col>
              </v-row>
              <p class="judulNotif">{{notif.judul}}</p>
              <span class="pesanNotif" v-html="notif.pesan.message" /><br>
              <span v-if="notif.pesan.payload" class="pesanNotif">payload: </span>
              <span v-if="notif.pesan.payload" class="pesanNotif" v-html="notif.pesan.payload" />
              <v-row v-if="notif.tautan.length">
                <v-col
                  class="grid-col-tautan"
                  v-for="tautan in notif.tautan" :key="tautan.idBerkas"
                >
                  <div class="kotak-tautan" @click="downloadBerkas(tautan)">
                    <v-icon v-if="tautan.type === 'Gambar'" medium>far fa-file-image</v-icon>
                    <v-icon v-if="tautan.type === 'File' && tautan.ext === 'docx'" medium>far fa-file-word</v-icon>
                    <v-icon v-if="tautan.type === 'File' && tautan.ext === 'xlsx'" medium>far fa-file-excel</v-icon>
                    <v-icon v-if="tautan.type === 'File' && tautan.ext === 'pdf'" medium>far fa-file-pdf</v-icon>
                    <v-icon v-if="tautan.type === 'File' && tautan.ext === 'txt'" medium>far fa-file-alt</v-icon>
                    {{ (tautan.title || '').length > 25 ? `${tautan.title.substring(0, 25)}...` : `${tautan.title}.${tautan.ext}` }}
                  </div>
                </v-col>
              </v-row>
              <p class="tanggalNotif" v-html="notif.dikirim" />
              <p class="tanggalNotif">{{notif.createdAt}}</p>
            </div>
          </div>
          <div v-if="dataNotifikasi.length" class="wadah-kategori">
            <v-btn 
              class="kotak-type"
              :disabled="!pageSummary.hasNext"
              @click="() => {
                getNotifikasi({kategori: kodeKategori, page: pageSummary.page + 1, limit: limit})
                page = pageSummary.page + 1
              }"
            >Tampilkan lebih banyak lagi</v-btn>
          </div>
          <span v-else>Tidak ada Broadcast</span>
        </v-tab-item>
        <v-tab-item value="2">
          <div class="px-1">
            <v-btn
              color="#bd3a07"
              small
              dense
              depressed
              class="ma-2 white--text text--darken-2"
              :disabled="selectRecord.length ? false : true"
              @click="hapusNotifikasi(selectRecord, 'Multiple')"
            >
              <v-icon small>delete</v-icon>&nbsp;Hapus Ceklis ({{ selectRecord.length }})
            </v-btn>
						<v-data-table
							loading-text="Sedang memuat... Harap tunggu"
							no-data-text="Tidak ada data yang tersedia"
							no-results-text="Tidak ada catatan yang cocok ditemukan"
							:headers="headers"
							:loading="loadingtable"
							:items="dataNotifikasi"
							item-key="idNotifikasi"
							hide-default-footer
							class="elevation-1"
							:items-per-page="itemsPerPage"
							@page-count="pageCount = $event"
						>
							<template #[`item.number`]="{ item }">
								{{ page > 1 ? ((page - 1)*limit) + dataNotifikasi.indexOf(item) + 1 : dataNotifikasi.indexOf(item) + 1 }}
							</template>
							<template #[`item.check`]="{ item }">
                <v-checkbox
                  v-model="selectRecord"
                  :value="item.idNotifikasi"
                ></v-checkbox>
              </template>
							<template #[`item.pesan`]="{ item }">
                <span v-html="item.pesan.message" />
              </template>
							<template #[`item.isRead`]="{ item }">
								<v-icon small v-if="item.isRead === true" color="green">check</v-icon>
								<v-icon small v-else-if="item.isRead == false" color="red">clear</v-icon>
								<br>
								<span v-html="item.isRead == true ? 'Dibaca' : 'Belum Dibaca'" />
							</template>
              <template #[`item.opsi`]="{ item }">
                <v-btn
                  :value="item.idNotifikasi"
                  color="#bd3a07"
                  small
                  dense
                  depressed
                  class="ma-2 white--text text--darken-2"
                  @click="hapusNotifikasi(item, 'Single')"
                >
                  <v-icon small>delete</v-icon>&nbsp;Hapus
                </v-btn>
              </template>
						</v-data-table>
					</div>
					<v-row>
						<v-col cols="9" class="mt-2 d-flex justify-start align-center">
							<span>Halaman <strong>{{ pageSummary.page ? pageSummary.page : 0 }}</strong> dari Total Halaman <strong>{{ pageSummary.totalPage ? pageSummary.totalPage : 0 }}</strong> (Records {{ pageSummary.total ? pageSummary.total : 0 }})</span>
						</v-col>
						<v-col cols="3" class="mt-2 text-right">
							<div class="d-flex justify-end">
								<v-autocomplete
									v-model="limit"
									:items="limitPage"
									item-text="value"
									item-value="value"
									outlined
									dense
									color="light-black darken-3"
									hide-details
									:disabled="dataNotifikasi.length ? false : true"
								/>
								<v-icon
									style="cursor: pointer;"
									large
									:disabled="dataNotifikasi.length ? pageSummary.page != 1 ? false : true : true"
									@click="() => { page = pageSummary.page - 1 }"
								>
									keyboard_arrow_left
								</v-icon>
								<v-icon
									style="cursor: pointer;"
									large
									:disabled="dataNotifikasi.length ? pageSummary.page != pageSummary.totalPage ? false : true : true"
									@click="() => { page = pageSummary.page + 1 }"
								>
									keyboard_arrow_right
								</v-icon>
							</div>
						</v-col>
					</v-row>
        </v-tab-item>
      </v-tabs>

      <!-- untuk siswa -->
      <div v-if="dataNotifikasi.length && roleID === '4'" class="wadah-notif">
        <v-row>
          <v-col cols="12" md="12" class="text-right">
            <v-btn
              color="light-blue darken-3"
              x-small
              dense
              depressed
              class="ma-2 white--text text--darken-2 align-right"
              @click="tandai(dataNotifikasi)"
            >
              Tandai Telah Dibaca
            </v-btn>
          </v-col>
        </v-row>
        <div v-for="notif in dataNotifikasi" :key="notif.idNotifikasi" class="kotak-notif" @click="!downloadTautan ? openDialog(notif) : ''">
          <v-row no-gutters>
            <v-col
              cols="12"
              md="6"
            >
              <span class="box fourcorners" style="background-color: rgba(19, 234, 216, 0.822); color: black;">{{notif.type}}</span>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="kondisiNotif"
            >
              <p>{{notif.isRead ? 'sudah dibaca' : 'belum dibaca' }} <v-icon small :color="notif.isRead == true ? 'green' : 'red'">{{ notif.isRead == true ? 'check' : 'clear' }}</v-icon></p>
            </v-col>
          </v-row>
          <p class="judulNotif">{{notif.judul}}</p>
          <span class="pesanNotif" v-html="notif.pesan.message" /><br>
          <span v-if="notif.pesan.payload" class="pesanNotif">payload: </span>
          <span v-if="notif.pesan.payload" class="pesanNotif" v-html="notif.pesan.payload" />
          <v-row v-if="notif.tautan.length">
            <v-col
              class="grid-col-tautan"
              v-for="tautan in notif.tautan" :key="tautan.idBerkas"
            >
              <div class="kotak-tautan" @click="downloadBerkas(tautan)">
                <v-icon v-if="tautan.type === 'Gambar'" medium>far fa-file-image</v-icon>
                <v-icon v-if="tautan.type === 'File' && tautan.ext === 'docx'" medium>far fa-file-word</v-icon>
                <v-icon v-if="tautan.type === 'File' && tautan.ext === 'xlsx'" medium>far fa-file-excel</v-icon>
                <v-icon v-if="tautan.type === 'File' && tautan.ext === 'pdf'" medium>far fa-file-pdf</v-icon>
                <v-icon v-if="tautan.type === 'File' && tautan.ext === 'txt'" medium>far fa-file-alt</v-icon>
                {{ (tautan.title || '').length > 25 ? `${tautan.title.substring(0, 25)}...` : `${tautan.title}.${tautan.ext}` }}
              </div>
            </v-col>
          </v-row>
          <p class="tanggalNotif" v-html="notif.dikirim" />
          <p class="tanggalNotif">{{notif.createdAt}}</p>
        </div>
      </div>
      <div v-if="dataNotifikasi.length && roleID === '4'" class="wadah-kategori">
        <v-btn 
          class="kotak-type"
          :disabled="!pageSummary.hasNext"
          @click="() => {
            getNotifikasi({kategori: kodeKategori, page: pageSummary.page + 1, limit: limit})
            page = pageSummary.page + 1
          }"
        >Tampilkan lebih banyak lagi</v-btn>
      </div>
      <span v-else-if="!dataNotifikasi.length && roleID === '4'">Tidak ada Broadcast</span>
      <!-- untuk siswa -->
    </v-card>
    <v-dialog
      v-model="DialogNotifikasi"
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
          <v-toolbar-title>Detail Notifikasi</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="DialogNotifikasi = false"
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
              Type
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              {{ `: ${detailData.type}` }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Judul
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              {{ `: ${detailData.judul}` }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Pesan
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <!-- {{ `: ${detailData.pesan}` }} -->
              : <span class="pesanNotif" v-html="detailData.pesan.message" /><br>
              <span v-if="detailData.pesan.payload" class="pesanNotif">payload: </span>
              <span v-if="detailData.pesan.payload" class="pesanNotif" v-html="detailData.pesan.payload" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Params
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              {{ `: ${detailData.params ? detailData.params : '-'}` }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Dikirim Oleh
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              : <span v-html="detailData.dikirim"></span>  
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              cols="12"
              md="4"
              class="pt-2 d-flex align-center font-weight-bold"
            >
              Waktu
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              {{ `: ${detailData.createdAt}` }}
            </v-col>
          </v-row>
          <v-row v-if="detailData.tautan.length">
            <v-col
              class="grid-col-tautan"
              v-for="tautan in detailData.tautan" :key="tautan.idBerkas"
            >
              <div class="kotak-tautan" @click="downloadBerkas(tautan)">
                <v-icon v-if="tautan.type === 'Gambar'" medium>far fa-file-image</v-icon>
                <v-icon v-if="tautan.type === 'File' && tautan.ext === 'docx'" medium>far fa-file-word</v-icon>
                <v-icon v-if="tautan.type === 'File' && tautan.ext === 'xlsx'" medium>far fa-file-excel</v-icon>
                <v-icon v-if="tautan.type === 'File' && tautan.ext === 'pdf'" medium>far fa-file-pdf</v-icon>
                <v-icon v-if="tautan.type === 'File' && tautan.ext === 'txt'" medium>far fa-file-alt</v-icon>
                {{ (tautan.title || '').length > 25 ? `${tautan.title.substring(0, 25)}...` : `${tautan.title}.${tautan.ext}` }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions />
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="DialogBroadcast"
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
          <v-toolbar-title>Share Broadcast</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => {
                this.clearData()
                this.DialogBroadcast = false
              }"
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
              Kategori
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
            <v-autocomplete
              v-model="kategoriBroadcast"
              :items="pilihanKategori"
              item-text="text"
              item-value="value"
              placeholder="Kategori"
              label="Kategori"
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
              ID User{{ kategoriBroadcast && ` - kategori ${kategoriBroadcast.toLowerCase()}` }}
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-autocomplete
                v-model="inputData.idUser"
                :items="pilihanUser"
                item-text="text"
                item-value="value"
                :placeholder="`${kategoriBroadcast ? `ID User - kategori ${kategoriBroadcast.toLowerCase()}` : 'ID User'}`"
                :label="`${kategoriBroadcast ? `ID User - kategori ${kategoriBroadcast.toLowerCase()}` : 'ID User'}`"
                multiple
                outlined
                dense
                color="light-black darken-3"
                hide-details
                clearable
                chips
                :disabled="idUserField"
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
                    @click:close="remove(data.item)"
                  >
                    {{ data.item.text }}
                  </v-chip>
                </template>
                <template v-if="kategoriBroadcast === 'USER'" v-slot:item="data">
                  <v-row no-gutters>
                    <v-col cols="1" class="textPilihan">
                      <v-avatar size="30">
                        <v-img :src="data.item.fotoProfil"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col cols="11" class="textPilihan">
                      {{ data.item.text }}
                    </v-col>
                  </v-row>
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
              Judul
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-textarea
                v-model="inputData.judul"
                placeholder="Judul"
                outlined
                dense
                rows="4"
                label="Judul"
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
              Pesan
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-textarea
                v-model="inputData.pesan"
                placeholder="Pesan"
                outlined
                dense
                rows="4"
                label="Pesan"
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
              Tautan Berkas
            </v-col>
            <v-col
              cols="12"
              md="8"
              class="pt-3"
            >
              <v-autocomplete
                v-model="inputData.tautan"
                :items="berkasOptions"
                item-text="title"
                item-value="idBerkas"
                placeholder="Tautan Berkas"
                label="Tautan Berkas"
                multiple
                outlined
                dense
                color="light-black darken-3"
                hide-details
                clearable
                chips
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
                    @click:close="remove(data.item)"
                  >
                    {{ data.item.title }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <v-row no-gutters>
                    <v-col cols="1" class="iconPilihan">
                      <img v-if="data.item.type === 'Gambar'" :src="data.item.file" width="30">
                      <v-icon v-if="data.item.type === 'File' && data.item.ext === 'docx'" medium>far fa-file-word</v-icon>
                      <v-icon v-if="data.item.type === 'File' && data.item.ext === 'xlsx'" medium>far fa-file-excel</v-icon>
                      <v-icon v-if="data.item.type === 'File' && data.item.ext === 'pdf'" medium>far fa-file-pdf</v-icon>
                      <v-icon v-if="data.item.type === 'File' && data.item.ext === 'txt'" medium>far fa-file-alt</v-icon>
                    </v-col>
                    <v-col cols="11" class="textPilihan">
                      {{ data.item.title }}
                    </v-col>
                  </v-row>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row no-gutters>
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
                :disabled="kondisiTombol"
                @click="postRecord(kategoriBroadcast)"
              >
                Share Broadcast
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="isProcessing" z-index="500">
      <div style="width: 550px;">
        <v-progress-linear
          v-model="progress"
          color="light-green darken-4"
          height="25"
          striped
          :active="show"
          :indeterminate="query"
          :query="true"
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
        <h4 style="color: #000; text-align: center; background-color: #FFF;">Sedang proses broadcast</h4>
      </div>
    </v-overlay>
    <!-- <v-dialog
			v-model="isProcessing"
			transition="dialog-bottom-transition"
			persistent
			width="500px"
		>
      <v-progress-linear
        v-model="progress"
        color="light-green darken-4"
        height="25"
        striped
        :active="show"
        :indeterminate="query"
        :query="true"
      >
        <template v-slot:default="{ value }">
          <strong>{{ Math.ceil(value) }}%</strong>
        </template>
      </v-progress-linear>
			<h4 style="color: #000; text-align: center; background-color: #FFF;">Sedang proses broadcast</h4>
		</v-dialog> -->
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
import { mapActions, mapState, mapGetters } from "vuex";
import PopUpNotifikasiVue from "./Layout/PopUpNotifikasi.vue";
import notifikasi from "../core/services/composeables/notifikasi";

export default {
  name: 'Broadcast',
  components: {
    PopUpNotifikasiVue
  },
  data: () => ({
    roleID: '',
    page: 1,
    limit: 20,
    DialogNotifikasi: false,
    DialogBroadcast: false,
    isProcessing: false,
    idUserField: true,
    kondisiTombol: true,
    dataNotifikasi: [],
    kodeKategori: '',
    pageSummary: {
      limit: '',
      page: '',
      hasNext: false,
      lastID: '',
      total: '',
      totalPage: '',
    },
    detailData: {
      idNotifikasi: '',
      idUser: '',
      type: '',
      judul: '',
      pesan: '',
      params: null,
      tautan: '',
      dikirim: '',
      isRead: false,
      createdAt: ''
    },
    pilihanKategori: [
      { text: 'user', value: 'USER' },
      { text: 'kelas', value: 'KELAS' },
    ],
    pilihanUser: [],
    kategoriBroadcast: '',
    inputData: {
      idUser: '',
      judul: '',
      pesan: '',
    },
    progress: 0,
    query: false,
    show: true,
    interval: 0,
    dataBroadcast: 0,
    downloadTautan: false,
    itemsTab: [
			{code: '1', text: 'Menerima', icon: 'fas fa-bullhorn'},
			{code: '2', text: 'Mengirim', icon: 'fas fa-bullhorn'},
		],
		tab: '',
    pageCount: 0,
    itemsPerPage: 100,
		limitPage: [
			{ value: 5 },
			{ value: 10 },
			{ value: 20 },
			{ value: 50 },
			{ value: 100 },
		],
    headers: [
      { text: "No", value: "number", sortable: false, width: "3%" },
      { text: "", value: "check", sortable: false, width: "2%" },
      { text: "TUJUAN", value: "tujuan", sortable: false, width: "10%" },
      { text: "JUDUL", value: "judul", sortable: false, width: "15%" },
      { text: "PESAN", value: "pesan", sortable: false, width: "25%" },
      { text: "ISREAD", value: "isRead", sortable: false, width: "5%" },
      { text: "OPSI", value: "opsi", sortable: false, width: "5%" },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,
    selectRecord: [],

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Broadcast - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  setup() {
    const { refetch: dataCountNotifikasi } = notifikasi.countingNotif({
      enabled: false,
    })
    return { dataCountNotifikasi }
  },
  computed: {
    ...mapState({
      berkas: store => store.setting.berkasOptions,
			loadingtable: store => store.setting.loadingtable,
    }),
    ...mapGetters({
      notifikasiAll: 'setting/notifikasiAll',
      userBroadcastAll: 'setting/userBroadcastAll',
    }),
		berkasOptions(){
			return this.berkas
		},
  },
  watch: {
    inputData: {
			deep: true,
			handler(value) {
				if(value.idUser != '' && value.judul != '' && value.pesan != ''){
					this.kondisiTombol = false
				}else{
					this.kondisiTombol = true
				}
			}
		},
    kategoriBroadcast: {
      deep: true,
      handler(value){
        this.inputData.idUser = ''
        this.idUserField = true
        this.pilihanUser = []
        const jabatan = localStorage.getItem('jabatan_guru') ? localStorage.getItem('jabatan_guru').split(', ') : []
        this.getUserBroadcast({kategori: value, kode: jabatan.includes('1') || jabatan.includes('2') || jabatan.includes('3') || jabatan.includes('4') ? 1 : 0})
        // this.getUserBroadcast({kategori: value, kode: jabatan.includes('1') ? 1 : 0})
      }
    },
    userBroadcastAll: {
      deep: true,
      handler(value){
        this.idUserField = false
        value.map(val => {
          if(val.nama !== localStorage.getItem('nama')){
            this.pilihanUser.push(val)
          }
        })
      }
    },
    notifikasiAll: {
      deep: true,
      handler(value){
        let data = value.records
        this.dataNotifikasi = []
        if(this.kodeKategori === 'penerima'){
          data.map(val => {
            this.dataNotifikasi.push(val)
          })
          this.pageSummary = {
            limit: value.pageSummary.limit,
            page: value.pageSummary.page,
            hasNext: value.pageSummary.hasNext,
            lastID: value.pageSummary.lastID,
            totalPage: value.pageSummary.totalPage
          }
        }else{
          this.dataNotifikasi = data
          this.pageSummary = {
            page: value.pageSummary.page,
            limit: value.pageSummary.limit,
            total: value.pageSummary.total,
            totalPage: value.pageSummary.totalPage
          }
        }
      }
    },
    tab: {
      deep: true,
      handler(value){
        if(value === '1'){
          this.kodeKategori = 'penerima'
        }else{
          this.kodeKategori = 'pengirim'
        }
        this.dataNotifikasi = []
			  this.getNotifikasi({kategori: '4', untuk: this.kodeKategori, page: this.page, limit: this.limit})
      }
    },
  },
  mounted() {
    this.roleID = localStorage.getItem('roleID')
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
	methods: {
		...mapActions({
      getNotifikasi: 'setting/getNotifikasi',
      getUserBroadcast: 'setting/getUserBroadcast',
			getBerkas: "setting/getBerkas",
    }),
    openDialog(item){
      this.detailData = {
        idNotifikasi: item.idNotifikasi,
        idUser: item.idUser,
        type: item.type,
        judul: item.judul,
        pesan: item.pesan,
        params: item.params,
        dikirim: item.dikirim,
        tautan: item.tautan,
        isRead: item.isRead,
        createdAt: item.createdAt
      }
      if(this.detailData.isRead) this.DialogNotifikasi = true
      let bodyData = {
        jenis: 'ISREAD',
        idNotifikasi: item.idNotifikasi,
      }
      this.$store.dispatch('setting/postNotifikasi', bodyData)
      .then((res) => {
        this.DialogNotifikasi = true
        this.dataNotifikasi = []
        this.dataCountNotifikasi()
        this.tab = '2'
        this.getNotifikasi({kategori: '4', untuk: this.kodeKategori, page: this.page, limit: this.limit})
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
    async tandai(data){
      let dataFilter = data.filter(x => !x.isRead)
      if(!dataFilter.length) return this.notifikasi("warning", 'Semua sudah ditandai', "1")
      let kirim = await Promise.all(dataFilter.map(async val => {
        let status = []
        let bodyData = {
          jenis: 'ISREAD',
          idNotifikasi: val.idNotifikasi,
        }
        try {
					let response = await this.$store.dispatch('setting/postNotifikasi', bodyData)
          status.push(response.data.status)
				} catch (err) {
          status.push(err.response.data.status)
				}
        return status[0]
      }))
      if(kirim.filter(el => el == 200).length){
        this.dataNotifikasi = []
        this.dataCountNotifikasi()
        this.tab = '1'
        this.getNotifikasi({kategori: '4', untuk: this.kodeKategori, page: this.page, limit: this.limit})
      }else{
        this.notifikasi("error", 'Gagal proses data', "1")
      }
    },
    remove(item){
      this.inputData.idUser.splice(this.inputData.idUser.indexOf(item.value), 1);
    },
    clearData(){
      this.pilihanUser = []
      this.kategoriBroadcast = ''
      this.inputData = {
        idUser: '',
        judul: '',
        pesan: '',
      }
    },
    postRecord(kategoriBroadcast){
      const hasil = []
      if(kategoriBroadcast === 'KELAS') {
        this.inputData.idUser.map(val => {
          this.pilihanUser.map(k => {
            if(val === k.text){
              k.listUser.map(v => {
                hasil.push(v)
              })
            }
          })
        })
        this.dataBroadcast = hasil.length
      }
      
      if(kategoriBroadcast === 'USER'){
        this.dataBroadcast = this.inputData.idUser.length
      }
      let bodyData = {
        jenis: 'BROADCAST',
        idUser: kategoriBroadcast === 'USER' ? this.inputData.idUser : hasil,
        type: 'Broadcast',
        judul: this.inputData.judul,
        pesan: JSON.stringify({
            message: this.inputData.pesan,
          payload: null,
        }),
        tautan: this.inputData.tautan ? JSON.stringify(this.inputData.tautan) : null,
        dikirim: `dikirim oleh <strong>${localStorage.getItem('nama')} - sebagai ${localStorage.getItem('nama_role')} </strong>`,
        createBy: localStorage.getItem('idLogin'),
        params: null,
      }
      this.queryAndIndeterminate(1, bodyData)
    },
    downloadBerkas(item) {
      this.downloadTautan = true
			fetch(item.file, {
				method: 'GET',
				dataType: "xml",
			})
			.then(response => response.arrayBuffer())
			.then(async response => {
				// console.log(response)
				let blob = new Blob([response], {
          type: item.ext === 'docx'
							? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : item.ext === 'xlsx'
							? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : item.ext === 'pdf'
							? 'application/pdf' : 'plain/text',
        })
				this.downloadBlob(blob,`${item.title}.${item.ext}`)
        this.downloadTautan = false
			})
		},
    queryAndIndeterminate(dataindex, bodyData) {
      this.isProcessing = true
      this.query = true
      this.show = true
      this.progress = 0
      let nilai = 0

      setTimeout(() => {
        this.query = false
        this.interval = setInterval(() => {
          if (this.progress === 100 || nilai === this.dataBroadcast-1) {
            // console.log(bodyData);
            this.$store.dispatch('setting/postNotifikasi', bodyData)
            .then((res) => {
              clearInterval(this.interval)
              this.query = false
              this.show = false
              this.progress = 0
              this.isProcessing = false
              this.clearData()
              this.DialogBroadcast = false
              this.tab = '2'
              this.getNotifikasi({kategori: '4', untuk: this.kodeKategori, page: 1, limit: this.limit})
              this.notifikasi("success", "Share Broadcast telah berhasil", "1")
            })
            .catch((err) => {
              this.notifikasi("error", err.response.data.message, "1")
            });
            // return setTimeout(this.queryAndIndeterminate, 2000)
          }
          nilai += dataindex
          const data = (nilai / this.dataBroadcast) * 100
          this.progress = Math.ceil(data)
        }, 1000)
      }, 2500)
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
    hapusNotifikasi(item, kategori){
      let bodyData = {
        jenis: 'DELETEBROADCAST',
        idNotifikasi: kategori === 'Single' ? item.idNotifikasi : this.selectRecord
      }
      this.$store.dispatch('setting/postNotifikasi', bodyData)
      .then((res) => {
        this.tab = '2'
        this.selectRecord = []
        this.getNotifikasi({kategori: '4', untuk: this.kodeKategori, page: 1, limit: this.limit})
        this.notifikasi("success", res.data.message, "1")
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
.v-tab {
	font-size: 8pt !important;
	font-weight: bold !important;
}
.v-input .v-label {
  font-size: 11pt !important;
}
.kondisiNotif {
	margin-bottom: 1px !important;
	font-size: 10px;
	text-align: right;
	font-style: italic;
}
.judulNotif {
	margin-bottom: 1px !important;
	font-size: 14px;
	font-weight: bold;
}
.pesanNotif {
	margin-bottom: 1px !important;
	font-size: 12px;
	font-weight: 500;
	text-align: justify;
}
.tanggalNotif {
	margin-bottom: 1px !important;
	font-size: 10px;
	font-weight: 500;
	text-align: right;
	font-style: italic;
}
.wadah-kategori {
  height: 100%;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}
.v-btn:not(.v-btn--round).v-size--default {
  height: 28px;
  min-width: 64px;
  padding: 0 12px;
}
.wadah-notif {
  width: 100%;
  padding: 0px 100px;
  margin-top: 5px;
}
.kotak-notif {
  height: 100%;
  width: 100%;
  border: 2px solid #000;
  border-radius: 10px;
  background-color: #FFF;
  padding: 10px;
  margin: 5px 0px;
  cursor: pointer;
}
.kotak-type {
  margin: 0px 5px;
  border: 2px solid #000;
  border-radius: 50px !important;
  color: black;
  background-color: white;
  font-size: 8pt;
  align-items: center;
  display: flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
.fourcorners{
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	-khtml-border-radius: 5px; 
	border-radius: 5px;
	padding: 5px;
	text-align: center;
	font-size: 10px;
}
.textPilihan {
	font-size: 0.8125rem;
  font-weight: 500;
  align-items: center;
  display: flex;
  line-height: normal;
  height: 40px;
}
.iconPilihan {
  align-items: center;
  display: flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  height: 40px;
}
.kotak-tautan {  
  color: black;
  background-color: white;
  font-size: 8pt;
  font-weight: 500;
  cursor: pointer;
  height: 55px;
  width: max-content;
	border-radius: 5px !important;
	border: 2px solid #000;
	padding: 5px !important;
  margin: 5px 0px;
	display: grid;
	grid-template-columns: repeat(auto-fit,minmax(125px,1fr));
	justify-items: center;
	grid-gap: 2px;
}
.kotak-tautan:hover{
  background-color: rgb(100, 94, 94);
  color: #FFF;
  transition: 0.8s;
}
</style>
<style>
.theme--light.v-subheader {
  color: rgba(0, 0, 0, 0.6) !important;
  font-weight: bold !important;
}
.grid-col-tautan {
  flex-grow: 0 !important;
  padding: 10px 0px 5px 5px !important;
  margin-left: 10px !important;
}
</style>