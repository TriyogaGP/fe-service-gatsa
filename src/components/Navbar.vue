<template>
	<nav>
		<v-app-bar color="light-black darken-3" dark app>
			<!-- <v-avatar size="35"> -->
				<img src="../../public/gatsa.png" width="40" />
			<!-- </v-avatar> -->
			<div class="ml-2 mr-2">{{ namaSekolah }}</div>
			<v-divider vertical />
			<v-divider vertical />
			<v-list dense style="padding: 0px; margin-left: 3px;" v-if="roleID === '1' || roleID === '2'">
				<v-list-item
					router to="/dashboard"
					class="SelectedMenu"
					active-class="SelectedMenu-active"
				>
					<v-icon left middle>dashboard</v-icon>
					<v-list-item-title>
						<span>Dashboard</span>
					</v-list-item-title>
				</v-list-item>
			</v-list>
			<v-menu
				v-for="data in menuOptions" :key="data.menuText"
				open-on-hover
				rounded="t-xs b-lg"
				offset-y
				transition="slide-y-transition"
				bottom
			>
				<template v-slot:activator="{ attrs, on }">
					<v-list dense style="padding: 0px; margin-left: 3px;">
						<v-list-item
							v-if="data.menuText !== 'Wali Kelas' && (roleID === '1' || roleID === '2' || roleID === '4')"
							router :to="!data.kondisi ? data.menuRoute : ''"
							class="SelectedMenu"
							active-class="SelectedMenu-active"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon left middle>{{ data.menuIcon }}</v-icon>
							<v-list-item-title>
								<span>{{ data.menuText }}</span>
							</v-list-item-title>
						</v-list-item>
						<v-list-item
							v-if="data.menuText !== 'Wali Kelas' && data.menuText !== 'Jadwal Mengajar' && data.menuText !== 'Guru' && data.menuText !== 'Siswa Siswi' && roleID === '3'"
							router :to="!data.kondisi ? data.menuRoute : ''"
							class="SelectedMenu"
							active-class="SelectedMenu-active"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon left middle>{{ data.menuIcon }}</v-icon>
							<v-list-item-title>
								<span>{{ data.menuText }}</span>
							</v-list-item-title>
						</v-list-item>
						<v-list-item
							v-if="data.menuText === 'Wali Kelas' && wali_kelas !== ''"
							router :to="data.menuRoute"
							class="SelectedMenu"
							active-class="SelectedMenu-active"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon left middle>{{ data.menuIcon }}</v-icon>
							<v-list-item-title>
								<span>{{ `${data.menuText}${wali_kelas == null ? '':' '+wali_kelas}` }}</span>
							</v-list-item-title>
						</v-list-item>
						<v-list-item
							v-if="data.menuText === 'Jadwal Mengajar' && kondisiWaKaBidKurikulum && roleID === '3'"
							router :to="data.menuRoute"
							class="SelectedMenu"
							active-class="SelectedMenu-active"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon left middle>{{ data.menuIcon }}</v-icon>
							<v-list-item-title>
								<span>{{ data.menuText }}</span>
							</v-list-item-title>
						</v-list-item>
						<v-list-item
							v-if="data.menuText === 'Siswa Siswi' && kondisiWaKaBidKesiswaan && roleID === '3'"
							router :to="data.menuRoute"
							class="SelectedMenu"
							active-class="SelectedMenu-active"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon left middle>{{ data.menuIcon }}</v-icon>
							<v-list-item-title>
								<span>{{ data.menuText }}</span>
							</v-list-item-title>
						</v-list-item>
						<v-list-item
							v-if="(data.menuText === 'Siswa Siswi' || data.menuText === 'Guru') && kondisiKepalaSekolah && roleID === '3'"
							router :to="data.menuRoute"
							class="SelectedMenu"
							active-class="SelectedMenu-active"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon left middle>{{ data.menuIcon }}</v-icon>
							<v-list-item-title>
								<span>{{ data.menuText }}</span>
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</template>

				<v-list v-if="data.subMenu.length && !data.kondisi" dense>
					<v-list-item
						v-for="v in data.subMenu"
						:key="v.menuText"
						router :to="v.menuRoute"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
					>
						<v-list-item-title>
							<span>{{ v.menuText }}</span>
						</v-list-item-title>
						<v-icon right>{{ data.menuIcon }}</v-icon>
					</v-list-item>
				</v-list>
				<v-list v-if="data.kondisi" dense>
					<v-list-item
						v-for="v in mengajarOptions"
						:key="v.label"
						router :to="'/dataAkademis/'+v.link"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
					>
						<v-list-item-title>
							<span>{{ v.label }}</span>
						</v-list-item-title>
						<v-icon right>fa-book</v-icon>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-spacer />
			<v-badge
				v-if="roleID === '1'"
				:content="totalNotif"
				:value="totalNotif"
				color="green"
				overlap
				class="badgeNotif"
			>
				<v-btn icon small class="ma-1" router to="/notifikasi">
					<v-icon medium>notifications</v-icon>
				</v-btn>
			</v-badge>
			<!-- <v-menu
				v-if="roleID === '1'"
				open-on-hover
				rounded="t-xs b-lg"
				offset-y
				transition="slide-y-transition"
				bottom
			>
				<template v-slot:activator="{ attrs, on }">
					<span
						class="white--text ma-3"
						v-bind="attrs"
						v-on="on"
					>
						<v-badge
							:content="totalNotif"
							:value="totalNotif"
							color="green"
							overlap
							class="badgeNotif"
						>
							<v-icon medium>notifications</v-icon>
						</v-badge>
					</span>
				</template>

				<v-list dense style="width: 350px;">
					<div class="scrollNotif">
						<div
							v-for="(notif, index) in dataNotif"
							:key="index"
						>
							<div @click="() => { Hasil(notif.idNotification); }" class="SelectedMenuNotif pa-2" active-class="SelectedMenuNotif-active">
								<v-row no-gutters>
                  <v-col
                    cols="12"
                    md="6"
                  >
										<span class="box fourcorners" style="background-color: green;">{{notif.type}}</span>
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
								<p class="pesanNotif">{{(notif.pesan || '').length > 60 ? `${notif.pesan.substring(0, 60)}...` : notif.pesan}}</p>
								<p class="tanggalNotif">{{notif.createdAt}}</p>
							</div>
							<div class="mt-2 mb-2"><v-divider /></div>
						</div>
					</div>
					<v-list-item
						class="SelectedMenuNotif"
						active-class="SelectedMenuNotif-active"
					>
						<v-list-item-title>
							<span>Lihat Semua Notifikasi</span>
						</v-list-item-title>
						<v-icon right>arrow_forward</v-icon>
					</v-list-item>
				</v-list>
			</v-menu> -->
			<v-menu
				open-on-hover
				rounded="t-xs b-lg"
				offset-y
				transition="slide-y-transition"
				bottom
			>
				<template v-slot:activator="{ attrs, on }">
					<span
						class="white--text ma-3 UserPanel"
						v-bind="attrs"
						v-on="on"
					>
						{{ inisialuppercaseLetterFirst(nama) }}
						<v-avatar size="35">
							<v-img :src="fotoProfil"></v-img>
						</v-avatar>
					</span>
				</template>

				<v-list dense>
					<v-list-item
						v-if="roleID === '1'"
						router to="/settings"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
						>
						<v-list-item-title>
							<span>Pengaturan</span>
						</v-list-item-title>
						<v-icon medium right>settings</v-icon>
					</v-list-item>
					<v-list-item
						router to="/profile"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
					>
						<v-list-item-title>
							<span>Profil</span>
						</v-list-item-title>
						<v-icon right>person</v-icon>
					</v-list-item>
					<v-list-item
						router to="/broadcast"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
						>
						<v-list-item-title>
							<span>Broadcast</span>
						</v-list-item-title>
						<span class="boxnotif" v-html="totalBroadcast" />
						<v-icon medium right>fas fa-bullhorn</v-icon>
					</v-list-item>
					<v-list-item
						v-if="roleID === '3' || roleID === '4'"
						router to="/percakapan"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
						>
						<v-list-item-title>
							<span>Percakapan</span>
						</v-list-item-title>
						<v-icon medium right>chat</v-icon>
					</v-list-item>
					<v-list-item
						@click="keluar()"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
					>
						<v-list-item-title>
							<span>Keluar</span>
						</v-list-item-title>
						<v-icon medium right>exit_to_app</v-icon>
					</v-list-item>
				</v-list>
			</v-menu>
			<v-app-bar-nav-icon v-if="roleID === '1' || roleID === '2'" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
		</v-app-bar>
		<v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
			right
    >
			<h4 class="text-center">----- Menu Lainnya -----</h4>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
	</nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PopUpNotifikasiVue from "../views/Layout/PopUpNotifikasi.vue";
import io from 'socket.io-client'
export default {
	components: {
    PopUpNotifikasiVue
  },
	props: {
    namaSekolah: {
      type: String,
      default: null
    },
    totalNotif: {
      type: Number,
      default: 0,
    },
    totalBroadcast: {
      type: Number,
      default: 0,
    },
  },
	data: () => ({
		API_URL: '',
		drawer: false,
		group: null,
		fotoProfil: '',
		roleID: '',
		nama: '',
		wali_kelas: '',
		kondisiKepalaSekolah: false,
		kondisiWaKaBidKesiswaan: false,
		kondisiWaKaBidKurikulum: false,
		menuOptions: [],

		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
	}),
	computed: {
		...mapState({
			mengajar: store => store.setting.mengajarOptions,
			jabatan: store => store.setting.jabatanOptions,
			// menu: store => store.setting.menuOptions,
		}),
		mengajarOptions(){
			if(this.roleID === '3'){
				let mengajar_bidang = localStorage.getItem('mengajar_bidang').split(', ')
				let result = []
				mengajar_bidang.map(str => {
					let hasil = this.mengajar.filter(val => { return val.kode == str })
					result.push({ label: hasil.length ? hasil[0].label : '', link: hasil.length ? hasil[0].label.replace(' ', '-') : '' })
				})
				return result
			}
		},
		jabatanOptions(){
			if(this.roleID === '3'){
				let jabatan_guru = localStorage.getItem('jabatan_guru').split(', ')
				let result = []
				jabatan_guru.map(str => {
					let hasil = this.jabatan.filter(val => { return val.kode == str })
					result.push(hasil.length ? hasil[0].label : '')
				})
				return result
			}
		},
  },
	watch: {
		group () {
			this.drawer = false
		},
		// menu: {
		// 	deep: true,
		// 	handler(value) {
		// 		this.menuOptions = value.length ? value[0].menu : null
		// 	}
		// },
		jabatanOptions: {
			deep: true,
			handler(value) {
				if(this.roleID === '3'){
					if(value.includes('WaKaBid. Kurikulum')){
						this.kondisiWaKaBidKurikulum = true
					}else if(value.includes('WaKaBid. Kesiswaan')){
						this.kondisiWaKaBidKesiswaan = true
					}else if(value.includes('Kepala Sekolah')){
						this.kondisiKepalaSekolah = true
					}
				}
			}
		}
	},
	mounted() {
		if(!localStorage.getItem('user_token')) return this.$router.push({name: 'Login'});
    this.API_URL = process.env.VUE_APP_NODE_ENV === "production" ? process.env.VUE_APP_VIEW_PROD_API_URL : process.env.VUE_APP_VIEW_DEV_API_URL
		this.fotoProfil = localStorage.getItem('fotoProfil')
		this.nama = localStorage.getItem('nama')
		this.roleID = localStorage.getItem('roleID')
		this.wali_kelas = localStorage.getItem('wali_kelas')
		this.Navbar()
		this.getMengajar()
		this.getJabatan()
	},
	methods: {
		...mapActions({
			fetchData: "fetchData",
			getMengajar: "setting/getMengajar",
			getJabatan: "setting/getJabatan",
			getMenu: "setting/getMenu",
			AuthLogout: "auth/AuthLogout",
		}),
		Navbar(){
			this.getMenu(this.roleID)
			.then((res) => {
				let data = res.data.result;
				this.menuOptions = data.length ? data[0].menu : null
			})
			.catch((err) => {
				if(err.response.data.kode === 401) {
					return this.notifikasi("error", err.response.data.message, "2")
				}
				this.notifikasi("error", err.response.data.message, "1")
			});
		},
		keluar() {
			this.notifikasi("question", "Apakah anda yakin ingin keluar ?", "2")
		},
		goToProses(){
			this.AuthLogout(localStorage.getItem('idLogin'))
			.then((res) => {
				const socket = io(this.API_URL);
        socket.emit("dataonline");

				localStorage.removeItem('user_token');
				localStorage.removeItem('nama');
				localStorage.removeItem('nama_role');
				localStorage.removeItem('idLogin');
				localStorage.removeItem('roleID');
				localStorage.removeItem('fotoProfil');
				localStorage.removeItem('jabatan_guru');
				localStorage.removeItem('mengajar_bidang');
				localStorage.removeItem('mengajar_kelas');
				localStorage.removeItem('wali_kelas');
				localStorage.removeItem('kelas');
				this.$router.push({name: "Login"});
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
.theme--light.v-list {
	width: 200px !important;
}
</style>

<style>
.menufont {
	font-size: 11px !important;
	color: #FFFFFF;
}
.SelectedTile:hover {
	border-radius: 2px;
	background: #44a4d0ae;
	color: white;
}
.SelectedTile-active {
	border-radius: 2px;
	background: rgba(10, 204, 117, 0.694);
	color: white;
}
.SelectedMenu:hover {
	border-radius: 2px;
	background: #939494;
	cursor: pointer;
}
.SelectedMenu-active {
	border-radius: 2px;
	background: rgba(132, 131, 195, 0.19);
	cursor: pointer;
}
.SelectedMenuNotif:hover {
	border-radius: 2px;
	background: #939494;
	cursor: pointer;
}
.SelectedMenuNotif-active {
	border-radius: 2px;
	background: rgba(132, 131, 195, 0.19);
	cursor: pointer;
}
.badgeNotif {
	cursor: pointer;
	margin-right: 10px;
}
.UserPanel {
	cursor: pointer;
}
.scrollNotif{
  max-height: 500px !important;
  overflow-y: auto !important;
}
.theme--dark.v-icon {
	color: #FFFFFF !important;
}
.v-list-item {
	padding: 0px 6px !important;
}
.v-icon--left {
	margin-right: 5px;
}
.theme--dark.v-list {
	background: #272727 !important;
}
.box{
	width: 75px;
	height: 20px;
  /* background-image:-moz-linear-gradient(top, #272727, #5a5757); */
	/* background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#272727), to(#5a5757), color-stop(1,#5a5757)); */
	margin: 2px;
  color: #FFF;
}
.boxnotif{
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	-khtml-border-radius: 5px; 
	border-radius: 5px;
	padding: 0px 5px;
	text-align: center;
	font-size: 8pt;
	font-weight: bold;
	background: rgba(10, 204, 117, 0.694);
	border: 1px solid #000;
	color: black;
}
</style>