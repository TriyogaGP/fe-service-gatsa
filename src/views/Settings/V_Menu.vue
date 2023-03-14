<template>
  <div>
		<h1 class="subheading grey--text">Panel Menu</h1>
		<v-row no-gutters class="pa-2">
			<v-col cols="12" md="6">
				<v-btn
					color="light-blue darken-3"
					small
					dense
					depressed
					class="ma-2 white--text text--darken-2"
					@click.stop="bukaDialog(null, 0)"
				>
					<v-icon small>add</v-icon>&nbsp;Tambah
				</v-btn>
				<v-btn
					color="light-blue darken-3"
					small
					dense
					depressed
					class="ma-2 white--text text--darken-2"
					@click.stop="bukaDialogSet()"
				>
					<v-icon small>settings</v-icon>&nbsp;Set Urutan Menu
				</v-btn>
			</v-col>
			<v-col cols="12" md="6">
				<v-text-field
					v-model="searchData"
					append-icon="mdi-magnify"
					label="Pencarian..."
					single-line
					hide-details
					solo
					color="light-black darken-3"
					clearable
          @keyup.enter="getMenu(1, limit, searchData)"
				/>
			</v-col>
    </v-row>
    <div class="px-1">
			<v-data-table
				loading-text="Sedang memuat... Harap tunggu"
				no-data-text="Tidak ada data yang tersedia"
				no-results-text="Tidak ada catatan yang cocok ditemukan"
				:headers="headers"
				:loading="isLoading"
				:items="DataMenu"
				:single-expand="singleExpand"
				:expanded.sync="expanded"
				show-expand
				item-key="idMenu"
				hide-default-footer
				class="elevation-1"
				:items-per-page="itemsPerPage"
				@page-count="pageCount = $event"
			>
				<template #[`item.number`]="{ item }">
					{{ DataMenu.indexOf(item) + 1 }}
				</template>
				<template #[`item.menuIcon`]="{ item }">
					<v-icon midle>{{ item.menuIcon }}</v-icon>
				</template>
				<template #[`item.statusAktif`]="{ item }">
					<v-icon small v-if="item.statusAktif === true" color="green">check</v-icon>
					<v-icon small v-else-if="item.statusAktif == false" color="red">clear</v-icon>
					<br>
					<span v-html="item.statusAktif == true ? 'Active' : 'Non Active'" /> 
				</template>
				<template #expanded-item="{ headers, item }">
					<td :colspan="headers.length" class="white">
						<v-btn
							:value="item.idMenu"
							color="#0bd369"
							small
							dark
							dense
							class="ma-2"
							@click="bukaDialog(item, 1)"
						>
						<v-icon small>edit</v-icon>&nbsp;Ubah
						</v-btn> 
						<v-btn
							v-if="item.statusAktif == false"
							:value="item.idMenu"
							color="#0bd369"
							small
							dark
							dense
							class="ma-2"
							@click="StatusRecord(item, 1)"
						>
						<v-icon small>visibility</v-icon>&nbsp;Active
						</v-btn> 
						<v-btn
							v-else-if="item.statusAktif == true"
							:value="item.idMenu"
							color="#0bd369"
							small
							dark
							dense
							class="ma-2"
							@click="StatusRecord(item, 0)"
						>
						<v-icon small>visibility_off</v-icon>&nbsp;Non Active
						</v-btn> 
						<v-btn
							:value="item.idMenu"
							color="#bd3a07"
							small
							dark
							dense
							class="ma-2"
							@click="HapusRecord(item)"
						>
						<v-icon small>delete</v-icon>&nbsp;Hapus
						</v-btn> 
						<v-divider />
					</td>
				</template>
			</v-data-table>
		</div>
		<v-row>
			<!-- <v-col cols="12" class="mt-2 pa-2 px-5">
				<v-pagination
					v-if="DataMenu.length > 0"
					v-model="page"
					:length="pageCount"
					:total-visible="7"
				/>
			</v-col> -->
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
						outlined
						dense
            color="light-black darken-3"
						hide-details
						:disabled="DataMenu.length ? false : true"
					/>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataMenu.length ? pageSummary.page != 1 ? false : true : true"
						@click="getMenu(pageSummary.page - 1, limit, searchData)"
					>
						keyboard_arrow_left
					</v-icon>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataMenu.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
						@click="getMenu(pageSummary.page + 1, limit, searchData)"
					>
						keyboard_arrow_right
					</v-icon>
				</div>
			</v-col>
		</v-row>
		<v-dialog
      v-model="DialogMenu"
      max-width="800px"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>{{editedIndex == 0 ? 'Tambah' : editedIndex == 1 ? 'Ubah' : 'View'}} Data Menu</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="tutupDialog"
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
              <v-row no-gutters>
                <v-col
                  cols="12"
                  md="4"
                  class="pt-2 d-flex align-center font-weight-bold"
                >
                  Kategori Menu
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
									<v-autocomplete
										v-model="inputMenu.kategori"
										:items="kategoriOptions"
										item-text="text"
										item-value="value"
										placeholder="Kategori Menu"
										label="Kategori Menu"
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
                  Menu Text
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  <v-text-field
                    v-model="inputMenu.menu_text"
                    placeholder="Menu Text"
                    outlined
                    dense
                    label="Menu Text"
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
                  Menu Route
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  <v-text-field
                    v-model="inputMenu.menu_route"
                    placeholder="Menu Route"
                    outlined
                    dense
                    label="Menu Route"
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
                  Menu Icon
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  class="pt-3"
                >
                  <v-text-field
                    v-model="inputMenu.menu_icon"
                    placeholder="Menu Icon"
                    outlined
                    dense
                    label="Menu Icon"
                    color="light-black darken-3"
                    hide-details
                    clearable
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </div>
          <v-card-actions>
            <v-row 
              no-gutters
              class="mt-1 mr-3"
            >
              <v-col
                class="text-end"
                cols="12"
              >
                <v-btn
                  v-if="editedIndex == 0"
                  color="light-blue darken-3"
                  class="white--text text--darken-2"
                  small
                  dense
                  depressed
                  :disabled="kondisiTombol"
                  @click="SimpanForm(0)"
                >
                  Simpan Data
                </v-btn> 
                <v-btn
                  v-else-if="editedIndex == 1"
                  color="light-blue darken-3"
                  class="white--text text--darken-2"
                  small
                  dense
                  depressed
                  :disabled="kondisiTombol"
                  @click="SimpanForm(1)"
                >
                  Ubah Data
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
		<v-dialog
      v-model="DialogSet"
      max-width="800px"
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="light-black darken-3"
        >
          <v-toolbar-title>Set Urutan Menu</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="() => { DialogSet = false }"
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
              <v-tabs
							 	v-model="tab"
								fixed-tabs
								background-color="light-black darken-3"
								dark
							>
								<v-tab key="menu">
									Menu ({{ Menu.length }})
								</v-tab>
								<v-tab key="submenu">
									SubMenu ({{ SubMenu.length }})
								</v-tab>
							</v-tabs>
							<v-tabs-items v-model="tab">
								<v-tab-item key="menu">
									<v-card class="pa-1" elevation="0">
                    <v-container>
                      <v-flex>
                        <v-toolbar color="light-black darken-3" dark>
                          <v-toolbar-title>Menu</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn icon @click="actionMenu('edit')" v-if="!editingMenu">
                            <v-icon>sort</v-icon>
                          </v-btn>
                          <v-btn icon @click="actionMenu('done')" v-if="editingMenu">
                            <v-icon>done</v-icon>
                          </v-btn>
                          <v-btn icon @click="actionMenu('undo')" v-if="editingMenu">
                            <v-icon>close</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-list two-line>
                          <draggable v-bind="optionsMenu" v-model="Menu" class="kotakDrag">
                            <v-list-item v-for="v in Menu" :key="v.idMenu" class="kotak">
                              <v-list-item-avatar color="white">
                                <v-icon small>{{ v.menuIcon }}</v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>{{ v.menuText }}</v-list-item-title>
                                <v-list-item-subtitle style="color: white !important;">{{ v.menuRoute }}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </draggable>
                        </v-list>
                      </v-flex>
                    </v-container>
                  </v-card>
                </v-tab-item>
								<v-tab-item key="submenu">
                  <v-card class="mt-2 mb-2 pa-1" elevation="0">
                    <v-container>
                      <v-flex>
                        <v-toolbar color="light-black darken-3" dark>
                          <v-toolbar-title>SubMenu</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn icon @click="actionSubMenu('edit')" v-if="!editingSubMenu">
                            <v-icon>sort</v-icon>
                          </v-btn>
                          <v-btn icon @click="actionSubMenu('done')" v-if="editingSubMenu">
                            <v-icon>done</v-icon>
                          </v-btn>
                          <v-btn icon @click="actionSubMenu('undo')" v-if="editingSubMenu">
                            <v-icon>close</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-list two-line>
                          <draggable v-bind="optionsSubMenu" v-model="SubMenu" class="kotakDrag">
                            <v-list-item v-for="v in SubMenu" :key="v.idMenu" class="kotak">
                              <v-list-item-avatar color="white">
                                <v-icon small>{{ v.menuIcon }}</v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>{{ v.menuText }}</v-list-item-title>
                                <v-list-item-subtitle style="color: white !important;">{{ v.menuRoute }}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </draggable>
                        </v-list>
                      </v-flex>
                    </v-container>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
          </div>
          <v-divider />
          <v-card-actions class="pa-5"/>
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
import PopUpNotifikasiVue from "../Layout/PopUpNotifikasi.vue";
import draggable from "vuedraggable";
export default {
  name: 'Menu',
	components: { PopUpNotifikasiVue, draggable },
  data: () => ({
		tab: "",
    isLoading: false,
		DataMenu: [],
		expanded: [],
    singleExpand: true,
		searchData: "",
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
		pageSummary: {
			page: '',
			limit: '',
			total: '',
			totalPages: ''
		},
		headers: [
      { text: "No", value: "number", sortable: false, width: "7%" },
      { text: "#", value: "data-table-expand", sortable: false, width: "5%" },
      { text: "Kategori", value: "kategori", sortable: false },
      { text: "Nama Menu", value: "menuText", sortable: false },
      { text: "Nama Route", value: "menuRoute", sortable: false },
      { text: "Nama Icon", value: "menuIcon", sortable: false },
      { text: "Status", value: "statusAktif", sortable: false },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,
		kategoriOptions: [
			{ value: "menu", text: "Menu" },
			{ value: "submenu", text: "SubMenu" },
		],
		DialogMenu: false,
		DialogSet: false,
		kondisiTombol: true,
		editedIndex: 0,
		inputMenu: {
      id_menu: '',
			kategori: '',
			menu_text: '',
			menu_route: '',
			menu_icon: '',
		},
    Menu: [],
    SubMenu: [],
    beforeMenu: null,
		editingMenu: false,
    beforeSubMenu: null,
		editingSubMenu: false,
    
		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Settings (Menu) - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
		optionsMenu () {
			return {
				disabled: !this.editingMenu
			}
		},
		optionsSubMenu () {
			return {
				disabled: !this.editingSubMenu
			}
		}
  },
	watch: {
    inputMenu: {
      deep: true,
      handler(value){
				if(value.kategori == null){ this.inputMenu.kategori = '' }
				if(value.menu_text == null){ this.inputMenu.menu_text = '' }
				if(value.menu_route == null){ this.inputMenu.menu_route = '' }
				if(value.menu_icon == null){ this.inputMenu.menu_icon = '' }
        
        if(value.kategori != '' && value.menu_text != '' && value.menu_icon != ''){
          this.kondisiTombol = false
        }else{
          this.kondisiTombol = true
        }
      }
    },
    limit: {
			deep: true,
			handler(value) {
				this.getMenu(1, value, this.searchData)
			}
		},
  },
	mounted() {
		this.getMenu(1, this.limit, this.searchData);
	},
	methods: {
		...mapActions(["fetchData"]),
		getMenu(page = 1, limit, keyword) {
      this.itemsPerPage = limit
			this.isLoading = true
      this.DataMenu = []
			this.pageSummary = {
				page: '',
				limit: '',
				total: '',
				totalPages: ''
			}
      this.Menu = []
      this.SubMenu = []
			let payload = {
				method: "get",
				url: `settings/Menu?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ''}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let resdata = res.data.result
				this.DataMenu = resdata.records
				this.pageSummary = {
					page: resdata.pageSummary.page,
					limit: resdata.pageSummary.limit,
					total: resdata.pageSummary.total,
					totalPages: resdata.pageSummary.totalPages
				}
        this.DataMenu.map(val => { 
          if(val.kategori === 'menu'){
            this.Menu.push(val)
          }else if(val.kategori === 'submenu'){
            this.SubMenu.push(val)
          }
        })
        this.isLoading = false
			})
			.catch((err) => {
				this.isLoading = false
        this.DataMenu = []
        this.pageSummary = {
          page: '',
          limit: '',
          total: '',
          totalPages: ''
        }
        this.Menu = []
        this.SubMenu = []
				this.notifikasi("error", err.response.data.message, "1")
			});
		},
    getSequenceMenu() {
			let payload = {
				method: "get",
				url: `settings/SequenceMenu`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.Menu = []
        this.SubMenu = []
        let resdata = res.data.result
				this.Menu = resdata.Menu
				this.SubMenu = resdata.SubMenu
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
		},
		bukaDialog(item, index){
      this.editedIndex = index
      if(index == 0){
        this.inputMenu.id_menu = ''
        this.inputMenu.kategori = ''
        this.inputMenu.menu_text = ''
        this.inputMenu.menu_route = ''
        this.inputMenu.menu_icon = ''
      }else{
				this.inputMenu.id_menu = item.idMenu
				this.inputMenu.kategori = item.kategori
        this.inputMenu.menu_text = item.menuText
        this.inputMenu.menu_route = item.menuRoute
        this.inputMenu.menu_icon = item.menuIcon
      }
      this.DialogMenu = true
    },
    bukaDialogSet(){
      this.getSequenceMenu()
      this.DialogSet = true
    },
		tutupDialog(){
			this.inputMenu.id_menu = ''
			this.inputMenu.kategori = ''
			this.inputMenu.menu_text = ''
			this.inputMenu.menu_route = ''
			this.inputMenu.menu_icon = ''
			this.DialogMenu = false
		},
		SimpanForm(index) {
      let bodyData = {
        jenis: index == 0 ? 'ADD' : 'EDIT',
        id_menu: index == 0 ? '' : this.inputMenu.id_menu,
        kategori: this.inputMenu.kategori,
        menu_text: this.inputMenu.menu_text,
        menu_route: this.inputMenu.menu_route,
        menu_icon: this.inputMenu.menu_icon,
      }
      let payload = {
				method: "post",
				url: `settings/Menu`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.DialogMenu = false
        this.getMenu(1, this.limit, this.searchData);
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    HapusRecord(item) {
      let bodyData = {
        jenis: 'DELETE',
        id_menu: item.idMenu,
      }
      let payload = {
				method: "post",
				url: `settings/Menu`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.DialogMenu = false
        this.getMenu(1, this.limit, this.searchData);
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    StatusRecord(item, status_aktif) {
      let bodyData = {
        jenis: 'STATUSRECORD',
        id_menu: item.idMenu,
        status_aktif: status_aktif,
      }
      let payload = {
				method: "post",
				url: `settings/Menu`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.DialogMenu = false
        this.getMenu(1, this.limit, this.searchData);
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    SimpanSequenceMenu(kategori) {
      let payload = {
				method: "post",
				url: `settings/SequenceMenu`,
        body: {
          Menu : kategori === 'menu' ? this.Menu : this.SubMenu
        },
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.getSequenceMenu()
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
    actionMenu (e) {
      if (e === 'edit') {
        this.beforeMenu = Object.assign([],this.Menu)
      }      
      if (e === 'undo') {
        this.Menu = this.beforeMenu
        this.beforeMenu = null
      }
      if (e === 'done') {
        this.SimpanSequenceMenu('menu')
        this.beforeMenu = null
      }
      this.editingMenu = !this.editingMenu
    },
    actionSubMenu (e) {
      if (e === 'edit') {
        this.beforeSubMenu = Object.assign([],this.SubMenu)
      }      
      if (e === 'undo') {
        this.SubMenu = this.beforeSubMenu
        this.beforeSubMenu = null
      }
      if (e === 'done') {
        this.SimpanSequenceMenu('submenu')
        this.beforeSubMenu = null
      }
      this.editingSubMenu = !this.editingSubMenu
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
.kotak {
	border: 2px dashed #000;
	border-radius: 10px;
	text-align: justify;
	background: rgb(98, 97, 97);
	color: rgb(255, 255, 255) !important;
	margin: 2px;
  /* padding: 2px; */
  font-size: 12pt;
}
.kotakDrag {
  border: 2px solid #000;
	border-radius: 10px;
  background: rgb(98, 97, 97);
	margin: 2px;
  color: rgb(255, 255, 255) !important;
  font-size: 12pt;
}
</style>