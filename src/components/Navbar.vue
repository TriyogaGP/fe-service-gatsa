<template>
	<nav>
		<v-app-bar color="light-black darken-3" dark app>
			<v-avatar size="35">
				<v-img src="../../public/gatsa.png"></v-img>
			</v-avatar>
			<div class="ml-2 mr-2">{{ namaSekolah }}</div>
			<v-divider vertical />
			<v-divider vertical />
			<v-list dense style="padding: 0px; margin-left: 3px;" v-if="roleID === '1'">
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
				v-for="data in menu" :key="data.menuText"
				open-on-hover
				rounded="t-xs b-lg"
				offset-y
				transition="slide-y-transition"
				bottom
			>
				<template v-slot:activator="{ attrs, on }">
					<v-list dense style="padding: 0px; margin-left: 3px;">
						<v-list-item
							v-if="data.menuText !== 'Wali Kelas'"
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
							v-if="data.menuText === 'Wali Kelas' && (roleID === '1' || roleID === '2')"
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
							v-if="data.menuText === 'Wali Kelas' && wali_kelas !== '' && roleID === '3'"
							router :to="data.menuRoute"
							class="SelectedMenu"
							active-class="SelectedMenu-active"
							v-bind="attrs"
							v-on="on"
						>
							<v-icon left middle>{{ data.menuIcon }}</v-icon>
							<v-list-item-title>
								<span>{{ `${data.menuText} ${wali_kelas}` }}</span>
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
			<v-menu
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
							:content="6"
							:value="6"
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
						<!-- <div
							v-for="(notif, index) in dataNotif"
							:key="index"
						>
							<div @click="() => { Hasil(notif.idNotification); }" class="SelectedMenuNotif pa-2" active-class="SelectedMenuNotif-active">
								<p class="kondisiNotif">{{notif.isRead ? 'sudah dibaca' : 'belum dibaca' }} <v-icon small :color="notif.isRead == true ? 'green' : 'red'">{{ notif.isRead == true ? 'check' : 'clear' }}</v-icon></p>
								<p class="judulNotif">{{notif.judul}}</p>
								<p class="pesanNotif">{{(notif.pesan || '').length > 60 ? `${notif.pesan.substring(0, 60)}...` : notif.pesan}}</p>
								<p class="tanggalNotif">{{notif.createdAt}}</p>
							</div>
							<div class="mt-2 mb-2"><v-divider /></div>
						</div> -->
						<div>	
							<div class="SelectedMenuNotif pa-2" active-class="SelectedMenuNotif-active">
								<p class="kondisiNotif">sudah dibaca <v-icon small color="green">check</v-icon></p>
								<p class="judulNotif">judul notifikasi</p>
								<p class="pesanNotif">pesan notifikasi</p>
								<p class="tanggalNotif">jam notifikasi</p>
							</div>
							<div class="mt-2 mb-2"><v-divider /></div>
						</div>
					</div>
					<!-- router to="/Notifikasi" -->
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
			</v-menu>
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
						<v-icon right>settings</v-icon>
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
						@click="keluar()"
						class="SelectedMenu"
						active-class="SelectedMenu-active"
					>
						<v-list-item-title>
							<span>Keluar</span>
						</v-list-item-title>
						<v-icon right>exit_to_app</v-icon>
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
import { mapActions } from "vuex";
import PopUpNotifikasiVue from "../views/Layout/PopUpNotifikasi.vue";
export default {
	components: {
    PopUpNotifikasiVue
  },
	props: {
    namaSekolah: {
      type: String,
      default: null
    },
  },
	data: () => ({
		drawer: false,
		group: null,
		fotoProfil: '',
		roleID: '',
		nama: '',
		wali_kelas: '',
		menu: [],
		jabatanOptions: [],
		mengajarOptions: [],

		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
	}),
	watch: {
		group () {
			this.drawer = false
		},
	},
	mounted() {
		if(!localStorage.getItem('user_token')) return this.$router.push({name: 'Login'});
		this.fotoProfil = localStorage.getItem('fotoProfil')
		this.nama = localStorage.getItem('nama')
		this.roleID = localStorage.getItem('roleID')
		this.wali_kelas = localStorage.getItem('wali_kelas')
		this.getData()
		this.optionMengajar()
	},
	methods: {
		...mapActions(["fetchData"]),
		getData() {
      let payload = {
				method: "get",
				url: `settings/optionsMenu?id_role=${this.roleID}`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
				let resdata = res.data.result
				this.menu = resdata[0].menu
			})
			.catch((err) => {
				this.notifikasi("warning", err.response.data.message, "2")
			});
		},
		optionJabatan(){
      let payload = {
        method: "get",
				url: `settings/optionsJabatan`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        this.jabatanOptions = res.data.result
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		optionMengajar(){
      let payload = {
        method: "get",
				url: `settings/optionsMengajar`,
				authToken: localStorage.getItem('user_token')
			};
			this.fetchData(payload)
			.then((res) => {
        let data = res.data.result
				if(this.roleID === '3'){
					let mengajar_bidang = localStorage.getItem('mengajar_bidang').split(', ')
					mengajar_bidang.map(str => {
						let hasil = data.filter(val => { return val.kode == str })[0].label
						this.mengajarOptions.push({ label: hasil, link: hasil.replace(' ', '-') })
					})
				}
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
		keluar() {
			this.notifikasi("question", "Apakah anda yakin ingin keluar ?", "2")
		},
		goToProses(){
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
}
.UserPanel {
	cursor: pointer;
}
.scrollNotif{
  max-height: 500px !important;
  overflow-y: auto !important;
}
.judulNotif {
	margin-bottom: 2px !important;
	font-size: 14px;
	font-weight: bold;
}
.pesanNotif {
	margin-bottom: 2px !important;
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
.kondisiNotif {
	margin-bottom: 1px !important;
	font-size: 10px;
	text-align: right;
	font-style: italic;
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
</style>