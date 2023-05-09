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
                  <h6 class="text-center display-1 light-black--text mb-3"><div class="pembungkus"><h4>Lupa Kata Sandi</h4></div></h6>
                  <v-form>
                    <v-col cols="12" class="py-0 px-0 mb-3">
                      <v-text-field
                        v-model="email"
                        placeholder="user@mail.com"
                        type="text"
                        color="light-black darken-3"
                        outlined
                        hide-details
                        @keyup.enter="LupaKataSandi()"
                      >
                        <template v-slot:prepend-inner>
                          <v-icon color="light-black darken-3">email</v-icon>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-form>
                  <h3 class="tombolLupaPass">sudah punya akun ?<div @click="login()"> >>Masuk </div></h3>
                </v-card-text>
                <div class="text-center mt-3 mb-10">
                  <v-btn color="light-black darken-3" dark @click="LupaKataSandi()">Kirim</v-btn>
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
export default {
  name: 'Login',
  components: {
    PopUpNotifikasiVue,
    Footer
  },
  data: () => ({
    step: 1,
    email: '',

    //notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
  }),
  computed: {
    ...mapGetters(['cmssettings']),
    namaSekolah(){
      console.log(this.cmssettings);
      return this.cmssettings ? this.cmssettings.namasekolah : null
    }
  },
  metaInfo: {
    title: "Lupa Kata Sandi - MTsS SIROJUL ATHFAL",
    htmlAttrs: {
      lang: "id",
      amp: true,
    },
  },
  mounted() {
    this.getCMSSettings()
  },
  methods: {
    ...mapActions(["fetchData", "getCMSSettings"]),
    LupaKataSandi() {
    let bodyData = {
      email: this.email,
    }
    let payload = {
      method: "post",
      url: `auth/forgotpass`,
      body: bodyData,
      authToken: localStorage.getItem('user_token')
    };
    this.fetchData(payload)
      .then((res) => {
        this.notifikasi("success", res.data.message, "2")
      })
      .catch((err) => {
        this.notifikasi("error", err.response.data.message, "1")
      });
    },
    goToProses() {
      this.dialogNotifikasi = false
      this.$router.push({name: 'Admin'});
    },
    login() {
      this.$router.push({name: 'Login'});
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
  color: #272727;
}
a:link {
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