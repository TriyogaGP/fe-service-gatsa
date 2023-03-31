<template>
  <div>
		<h1 class="subheading grey--text">Panel Hak Akses Menu</h1>
		<v-row no-gutters class="pa-2">
			<v-col cols="12" md="6" />
			<v-col cols="12" md="6">
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
					@keyup.enter="getHakAksesMenu(1, limit, searchData)"
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
				:items="DataHakAksesMenu"
				:single-expand="singleExpand"
				:expanded.sync="expanded"
				show-expand
				item-key="idRoleMenu"
				hide-default-footer
				class="elevation-1"
				:items-per-page="itemsPerPage"
				@page-count="pageCount = $event"
			>
				<template #[`item.number`]="{ item }">
					{{ DataHakAksesMenu.indexOf(item) + 1 }}
				</template>
				<template #[`item.menu`]="{ item }">
					<v-btn
						color="#04f7f7"
						small
						dark
						dense
						class="ma-2"
						@click="openDetail(item.menu)"
					>
					<v-icon small>info</v-icon>&nbsp;Detail
					</v-btn> 
				</template>
				<!-- <template #[`item.menu`]="{ item }">
					<v-tooltip top>
						<template v-slot:activator="{ on, attrs }">
							Detail <v-icon small v-bind="attrs" v-on="on">info</v-icon>
						</template>
						<div v-if="item.menu.length">
							<div v-for="(val, i) in item.menu" :key="i">
								{{ val.menuText }}
							</div>
						</div>
						<span v-else>Tidak ada Menu</span>
					</v-tooltip>
				</template> -->
				<template #expanded-item="{ headers, item }">
					<td :colspan="headers.length" class="white">
						<v-btn
							:value="item.idRoleMenu"
							color="#0bd369"
							small
							dark
							dense
							class="ma-2"
							@click="bukaDialog(item)"
						>
						<v-icon small>edit</v-icon>&nbsp;Ubah
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
						outlined
						dense
						hide-details
						:disabled="DataHakAksesMenu.length ? false : true"
					/>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataHakAksesMenu.length ? pageSummary.page != 1 ? false : true : true"
						@click="getHakAksesMenu(pageSummary.page - 1, limit, searchData)"
					>
						keyboard_arrow_left
					</v-icon>
					<v-icon
						style="cursor: pointer;"
						large
						:disabled="DataHakAksesMenu.length ? pageSummary.page != pageSummary.totalPages ? false : true : true"
						@click="getHakAksesMenu(pageSummary.page + 1, limit, searchData)"
					>
						keyboard_arrow_right
					</v-icon>
				</div>
			</v-col>
		</v-row>
		<v-dialog
      v-model="DialogRoleMenu"
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
          <v-toolbar-title>Ubah Data Hak Akses Menu</v-toolbar-title>
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
				<v-card-text class="pt-4">
					<v-card
						class="pa-2 mb-2"
						elevation="1"
						v-for="(v, i) in inputRoleMenu.kumpulanMenu"
						:key="v.idMenu"
					>
						<div class="text-right">
							<v-btn  
								v-if="i !== (inputRoleMenu.kumpulanMenu.length - 1)"
								icon
								@click="() => { inputRoleMenu.kumpulanMenu.splice(i, 1) }"
							>
								<v-icon color="red" small>close</v-icon>
							</v-btn>
						</div>
						<v-row no-gutters>
							<v-col
								cols="12"
								md="4"
								class="pt-2 d-flex align-center font-weight-bold"
							>
								Menu
							</v-col>
							<v-col
								cols="12"
								md="8"
								class="pt-3"
							>
								<v-autocomplete
									:value="v.idMenu"
									:items="menuOptions"
									placeholder="Pilih Menu"
									label="Pilih Menu"
									item-text="menuText"
									item-value="idMenu"
									outlined
									hide-details
									dense
									color="light-black darken-3"
									@change="changeData($event, i, 'menu')"
								/>
							</v-col>
						</v-row>
						<v-row no-gutters>
							<v-col
								cols="12"
								md="4"
								class="pt-2 d-flex align-center font-weight-bold"
							>
								Sub Menu
							</v-col>
							<v-col
								cols="12"
								md="8"
								class="pt-3"
							>
								<v-autocomplete
									:value="v.submenu"
									:items="submenuOptions"
									placeholder="Pilih Sub Menu"
									label="Pilih Sub Menu"
									item-text="menuText"
									item-value="idMenu"
									multiple
									outlined
									hide-details
									dense
									color="light-black darken-3"
									clearable
									@change="addDataSubMenu($event, v.idMenu)"
								>
									<template #selection="data">
										<v-chip
											v-bind="data.attrs"
											:input-value="data.selected"
											close
											small
											outlined
											class="ma-1"
											color="light-black darken-3"
											@click="data.select"
											@click:close="removeDataSubMenu(data.item, v.idMenu)"
										>
											{{ data.item.menuText }}
										</v-chip>
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
								Kondisi
							</v-col>
							<v-col
								cols="12"
								md="8"
								class="pt-3"
							>
								<v-autocomplete
									:value="v.kondisi"
									:items="kondisiOptions"
									placeholder="Kondisi"
									label="Kondisi"
									item-text="value"
									item-value="value"
									outlined
									hide-details
									dense
									color="light-black darken-3"
									@change="changeData($event, i, 'kondisi')"
								/>
							</v-col>
						</v-row>
					</v-card>
				</v-card-text>
				<v-divider />
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
								color="light-blue darken-3"
								class="white--text text--darken-2"
								small
								dense
								depressed
								@click="SimpanForm()"
							>
								Ubah Data
							</v-btn>
						</v-col>
					</v-row>
				</v-card-actions>
      </v-card>
    </v-dialog>
		<v-bottom-sheet
      v-model="DetailMenu"
			scrollable
      persistent
    >
      <v-sheet style="font-size: 14px;">
        <div class="text-right">
          <v-btn  
            icon
            @click="() => { DetailMenu = false; menu = []; }"
          >
            <v-icon large>close</v-icon>
          </v-btn>
        </div>
        <v-card class="ma-4 pa-2">
					<div v-if="menu.length">
						<ul>
							<li v-for="val in menu" :key="val.idMenu">
								{{ `${val.menuText} (${val.kondisi})` }}
								<ul>
									<li v-for="v in val.subMenu" :key="v.idMenu">
										{{ v.menuText }}
									</li>
								</ul>
							</li>
						</ul>
						<strong>*NB: jika true submenu dari luar dan jika false submenu dari dalam</strong>
					</div>
					<span v-else>Tidak ada Menu</span>
				</v-card>
      </v-sheet>
    </v-bottom-sheet>
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
export default {
  name: 'HakAksesMenu',
	components: { PopUpNotifikasiVue },
  data: () => ({
    isLoading: false,
		DataHakAksesMenu: [],
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
      { text: "Nama Role", value: "namaRole", sortable: false },
      { text: "Menu", value: "menu", sortable: false },
    ],
    rowsPerPageItems: { "items-per-page-options": [5, 10, 25, 50] },
    totalItems: 0,
		menuOptions: [],
		submenuOptions: [],
		menu: [],
		DialogRoleMenu: false,
		DetailMenu: false,
		kondisiTombol: true,
		editedIndex: 0,
		inputRoleMenu: {
			id_role_menu: '',
			id_role: '',
			menu: [],
			submenu: [],
			kondisi: [],
			kumpulanMenu: [],
		},
		kondisiOptions: [
			{ value: true },
			{ value: false },
		],

		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Settings (Hak Akses Menu) - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
	watch: {
		limit: {
			deep: true,
			handler(value) {
				this.getHakAksesMenu(1, value, this.searchData)
			}
		},
	},
	mounted() {
		this.getHakAksesMenu(1, this.limit, this.searchData);
	},
	methods: {
		...mapActions(["fetchData"]),
		getHakAksesMenu(page = 1, limit, keyword) {
			this.isLoading = true
			this.DataHakAksesMenu = []
			this.pageSummary = {
				page: '',
				limit: '',
				total: '',
				totalPages: ''
			}
			let payload = {
				method: "get",
				url: `settings/RoleMenu?page=${page}&limit=${limit}${keyword ? `&keyword=${keyword}` : ''}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
				let resdata = res.data.result
				this.DataHakAksesMenu = resdata.records
				this.pageSummary = {
					page: resdata.pageSummary.page,
					limit: resdata.pageSummary.limit,
					total: resdata.pageSummary.total,
					totalPages: resdata.pageSummary.totalPages
				}
				this.isLoading = false
			})
			.catch((err) => {
				this.isLoading = false
				this.DataHakAksesMenu = []
				this.pageSummary = {
					page: '',
					limit: '',
					total: '',
					totalPages: ''
				}
				this.notifikasi("error", err.response.data.message, "1")
			});
		},
		getMenu() {
			let payload = {
				method: "get",
				url: `settings/Menu?pilihan=ALL`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
				let data = res.data.result;
				data.map(str => {
					if(str.kategori === 'menu'){
						this.menuOptions.push(str)
					}else if(str.kategori === 'submenu'){
						this.submenuOptions.push(str)
					}
				})
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
		},
		bukaDialog(item){
			this.getMenu()
			this.inputRoleMenu.id_role_menu = item.idRoleMenu
			this.inputRoleMenu.id_role = item.idRole
			let kumpulanMenu = []
			let kumpulanSubMenu = []
			let menuid = []
			let kondisi = []
			if(!item.menu.length){
				this.inputRoleMenu.kumpulanMenu.push({
					idMenu: '',
					menuText: '',
					kondisi: false,
					submenu: []
				})
				this.inputRoleMenu.submenu.push({
					menuID: '',
					idMenu: [],
				})		
				this.inputRoleMenu.menu.push('')
				this.inputRoleMenu.kondisi.push(false)
			}
			item.menu.map(el => {
				kumpulanMenu.push({ 
					idMenu: el.idMenu,
					menuText: el.menuText,
					kondisi: el.kondisi,
					submenu: el.subMenu.map(v => {
						return { 
							idMenu: v.idMenu,
							menuText: v.menuText,
						}
					})
				})
				this.inputRoleMenu.kumpulanMenu = [
					...kumpulanMenu,
					{ 
						idMenu: '',
						menuText: '',
						kondisi: false,
						submenu: []
					}
				]

				kumpulanSubMenu.push({ 
					menuID: el.idMenu,
					idMenu: el.subMenu.map(v => {
						return { 
							idMenu: v.idMenu,
						}
					}),
				})
				this.inputRoleMenu.submenu = [
					...kumpulanSubMenu,
					{
						menuID: '',
						idMenu: [],
					}
				]
				
				menuid.push(el.idMenu)
				this.inputRoleMenu.menu = [...menuid, '']

				kondisi.push(el.kondisi)
				this.inputRoleMenu.kondisi = [...kondisi, false]
			})
      this.DialogRoleMenu = true
    },
		tutupDialog(){
			this.inputRoleMenu = {
				id_role_menu: '',
				id_role: '',
				menu: [],
				submenu: [],
				kondisi: [],
				kumpulanMenu: [],
			},
			this.DialogRoleMenu = false
		},
		SimpanForm() {
			const menu = [];
      for (let i = 0; i < this.inputRoleMenu.kumpulanMenu.length; i++) {
				if(this.inputRoleMenu.menu[i] !== '') {
					let submenu = this.inputRoleMenu.submenu.filter(el => el.menuID == this.inputRoleMenu.menu[i])
					menu.push({
						idMenu: this.inputRoleMenu.menu[i],
						subMenu: submenu[0].idMenu,
						kondisi: this.inputRoleMenu.kondisi[i],
					});
				}
			}
			let bodyData = {
				id_role_menu: this.inputRoleMenu.id_role_menu,
        id_role: this.inputRoleMenu.id_role,
        menu: menu.length ? menu : [],
      }
      let payload = {
				method: "post",
				url: `settings/RoleMenu`,
        body: bodyData,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.tutupDialog()
        this.getHakAksesMenu(1, this.limit, this.searchData);
        this.notifikasi("success", res.data.message, "1")
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
		},
		removeDataSubMenu(item, menuID) {
			let check = this.inputRoleMenu.kumpulanMenu.filter(str => str.idMenu === menuID)[0]
			let index = check.submenu.map(str => str.idMenu).indexOf(item.idMenu)
			let check2 = this.inputRoleMenu.submenu.filter(str => str.menuID === menuID)[0]
			let index2 = check2.idMenu.map(str => str.idMenu).indexOf(item.idMenu)
      check.submenu.splice(index, 1);
      check2.idMenu.splice(index2, 1);
    },
		addDataSubMenu(idMenu, menuID) {
			let kumpul = this.inputRoleMenu.submenu
			this.inputRoleMenu.submenu = []
			kumpul.map(str => {
				let obj
				if(str.menuID === menuID){
					let data = str.idMenu.map(el => el.idMenu)
					let difference = idMenu.filter(x => !data.includes(x))
					obj = {
						idMenu: str.idMenu.concat(difference.map(z => { return { idMenu: z } })),
						menuID: str.menuID
					}
				}else{
					obj = {
						idMenu: str.idMenu,
						menuID: str.menuID
					}
				}
				this.inputRoleMenu.submenu.push(obj)
			})
		},
		changeData(diganti, index, untuk) {
			if(untuk === 'menu') {
				this.inputRoleMenu.menu[index] = diganti
				this.inputRoleMenu.submenu[index].menuID = diganti
			}else if(untuk === 'kondisi') {
				this.inputRoleMenu.kondisi[index] = diganti
			}
		},
		openDetail(item){
			this.menu = item
			this.DetailMenu = true
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
</style>