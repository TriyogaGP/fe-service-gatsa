<template>
  <div id="inspire">
    <v-container class="fill-height" fluid>
      <nav>
        <v-app-bar color="light-black darken-3" dark app>
          <v-avatar size="35">
            <v-img src="../../public/gatsa.png"></v-img>
          </v-avatar>
          <div class="ml-2 mr-2">{{ namaSekolah }}</div>
          <v-divider vertical />
          <v-divider vertical />
          <v-spacer />
        </v-app-bar>
      </nav>
      <v-row class="d-flex justify-center align-center">
        <v-col cols="12" sm="6" md="6">
          <div style="margin-top: 110px;" />
          <v-card class="elevation-12">
            <v-row>
              <v-col cols="12" md="12">
                <v-card-text>
                  <h6 class="text-center display-1 light-black--text"><strong>{{ namaSekolah }}</strong></h6>
                  <h6 class="text-center display-1 light-black--text mb-3"><div class="pembungkus"><h4>Masuk Panel</h4></div></h6>
                  <v-form>
                    <v-col cols="12" class="py-0 px-0 mb-3">
                      <v-text-field
                        v-model="username"
                        placeholder="user@mail.com atau username55"
                        type="text"
                        color="light-black darken-3"
                        outlined
                        hide-details
                        @keyup.enter="AutentificationLogin()"
                      >
                      <template v-slot:prepend-inner>
                        <v-icon color="light-black darken-3">email</v-icon>
                      </template>
                    </v-text-field>

                    </v-col>
                    <v-col cols="12" class="py-0 px-0 mb-3">
                      <v-text-field
                        v-model="katasandi"
                        placeholder="Kata Sandi"
                        :type="passType ? 'text' : 'password'"
                        color="light-black darken-3"
                        outlined
                        hide-details
                        @keyup.enter="AutentificationLogin()"
                      >
                        <template v-slot:prepend-inner>
                          <v-icon color="light-black darken-3">lock</v-icon>
                        </template>
                        <template v-slot:append>
                          <v-icon
                            color="light-black darken-3"
                            tabindex="-1"
                            @click="onClickVisible('passType')"
                            >{{ passType ? 'visibility' : 'visibility_off' }}</v-icon
                          >
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-form>
                  <h3 class="tombolLupaPass" @click="lupaSandi()">Lupa Kata Sandi ?</h3>
                </v-card-text>
                <div class="text-center mt-3 mb-10">
                  <v-btn color="light-black darken-3" dark @click="AutentificationLogin()">Masuk</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <Footer :nama-sekolah="namaSekolah"/>
    </v-container>
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
import { mapActions, mapGetters } from "vuex";
import PopUpNotifikasiVue from "./Layout/PopUpNotifikasi.vue";
import Footer from '../components/Footer.vue';
import io from 'socket.io-client'
export default {
  name: 'Login',
  components: {
    PopUpNotifikasiVue,
    Footer
  },
  data: () => ({
    API_URL: '',
    passType: '',
    username: '',
    katasandi: '',

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  metaInfo: {
		title: "Masuk - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
  computed: {
    ...mapGetters({
      cmssettings: 'setting/cmssettings'
    }),
    namaSekolah(){
      // console.log(this.cmssettings);
      return this.cmssettings ? this.cmssettings.namasekolah : null
    }
  },
  mounted() {
    if(localStorage.getItem('user_token')) return this.$router.push({name: "Dashboard"});
    this.API_URL = process.env.VUE_APP_BASE_URL_VIEW
    this.getCMSSettings()
  },
  methods: {
    ...mapActions({
      fetchData: 'fetchData',
      getCMSSettings: 'setting/getCMSSettings',
    }),
    AutentificationLogin(){
      const payload = {
        username: this.username,
        password: this.katasandi,
      }
      this.$store.dispatch('auth/AuthLogin', payload)
      .then((res) => {
        let data = res.data.result;
        localStorage.setItem('user_token', data.accessToken);
        localStorage.setItem('nama', data.nama);
        localStorage.setItem('nama_role', data.namaRole);
        localStorage.setItem('idLogin', data.idUser);
        localStorage.setItem('roleID', data.consumerType);
        localStorage.setItem('fotoProfil', data.fotoProfil);
        if(data.consumerType === 3){
          localStorage.setItem('jabatan_guru', data.jabatanGuru);
          localStorage.setItem('mengajar_bidang', data.mengajarBidang);
          localStorage.setItem('mengajar_kelas', data.mengajarKelas);
          localStorage.setItem('wali_kelas', data.waliKelas ? data.waliKelas : '');
        }else if(data.consumerType === 4){
          localStorage.setItem('kelas', data.kelas);
        }
        const socket = io(this.API_URL);
        socket.emit("dataonline");
        this.notifikasi("success", res.data.message, "2")
			})
			.catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
			});
    },
    goToProses() {
      const socket = io(this.API_URL);
      socket.emit("dataonline");
      this.dialogNotifikasi = false
      let roleID = localStorage.getItem('roleID')
      this.$router.push(roleID === '4' ? {name: "Profile"} : {name: "Dashboard"});
      window.location.reload();
    },
    lupaSandi() {
      this.$router.push({name: 'ForgotPass', params: { siteLogin: 'Admin' }});
    },
    onClickVisible(d) {
      this[d] = !this[d]
    },
    notifikasi(kode, text, proses){
      this.dialogNotifikasi = true
      this.notifikasiKode = kode
      this.notifikasiText = text
      this.notifikasiButton = proses
    },
  }
};
</script>

<style>
.v-text-field--outlined {
  border-radius: 8px !important;
}
.v-btn {
  border-radius: 8px !important;
}
.tombolLupaPass {
  text-align: center;
  cursor: pointer;
}
a:link {
  color: #272727;
  text-decoration: none;
}
.pembungkus{text-align: center;}
.pembungkus h4{position: relative;  display: inline-block;}
.pembungkus h4:before{
  content: " ";
  position: absolute;
  border-bottom: 2px solid black;
  width: 100px;
  left: -130px;
  top: 50%;
}
.pembungkus h4:after{
  content: " ";
  position: absolute;
  border-bottom: 2px solid black;
  width: 100px;
  right: -130px;	
  top: 50%;
}
</style>