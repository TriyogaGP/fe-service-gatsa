<template>
  <v-app>
    <Navbar
      :nama-sekolah="namaSekolah"
      :total-notif="roleID === '1' || roleID === '2' ? this.dataNotifikasi.allNotif : 0"
      :total-broadcast="this.dataNotifikasi.broadcast"
    />
    <v-main class="ma-4">
      {{ dataNotifikasi.length }}
      <router-view style="margin-bottom: 20px;" />
      <div v-if="roleID === '3' || roleID === '4'" class="floating" @click="sendMessageAdmin()">
        <span class="tulisan"><v-icon small>chat</v-icon>&nbsp;Chat Administrator</span>
      </div>
    </v-main>
    <Footer :nama-sekolah="namaSekolah" />
    <v-dialog
      v-model="DialogPengaduan"
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
          <v-toolbar-title>Send Message Admin</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              dark
              @click="DialogPengaduan = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="pt-4">
          Send Message Admin
        </v-card-text>
        <v-divider />
        <v-card-actions />
      </v-card>
    </v-dialog>
    <!-- <v-overlay :value="dialogPopup">
      <v-icon style="cursor: pointer;" @click="dialogPopup = false">clear</v-icon>
      <v-img :src="fotoProfil" width="300"/>
    </v-overlay> -->
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from '../../components/Navbar.vue';
import Footer from '../../components/Footer.vue';
import { computed } from '@vue/composition-api';
import notifikasi from "../../core/services/composeables/notifikasi";

export default {
  name: "App",
  components: { Navbar, Footer },
  data: () => ({
    dataNotifikasi: {
      allNotif: 0,
      record: 0,
      report: 0,
      broadcast: 0,
    },
    musik: '',
    DialogPengaduan: false,
    // dialogPopup: false,
    // fotoProfil: '',
	}),
  setup() {
    const roleID = localStorage.getItem('roleID')
    const { data: dataCountNotifikasi } = notifikasi.countingNotif()
    return { dataCountNotifikasi, roleID }
  },
	computed: {
    ...mapGetters({
      cmssettings: 'setting/cmssettings',
    }),
    namaSekolah(){
      return this.cmssettings ? this.cmssettings.namasekolah : null
    }
  },
  watch: {
    dataCountNotifikasi: {
      deep: true,
      handler(value){
        this.dataNotifikasi = {
          allNotif: value.length ? value[0].count : 0,
          record: value.length ? value[1].count : 0,
          report: value.length ? value[2].count : 0,
          broadcast: value.length ? value[3].count : 0,
        }
        var data = { soundurl : require('../../../public/media-notifikasi/notif.mp3')}
        this.musik = new Audio(data.soundurl);
        if((this.roleID === '1' || this.roleID === '2') && this.dataNotifikasi.allNotif > 0) {
          this.audio()
        }
        if((this.roleID === '3' || this.roleID === '4') && this.dataNotifikasi.broadcast > 0) {
          this.audio()
        }
      }
    }
  },
	mounted(){
    this.fotoProfil = localStorage.getItem('popup')
    this.getCMSSettings()
    var data = { soundurl : require('../../../public/media-notifikasi/notif.mp3')}
    this.musik = new Audio(data.soundurl);
    // this.dialogPopup = true
	},
	methods: {
		...mapActions({
      getCMSSettings: 'setting/getCMSSettings',
    }),
    sendMessageAdmin(){
      this.DialogPengaduan = true
    },
    audio(){
      this.musik.autoplay = true;
      this.musik.play();
      setInterval(() => {
        this.musik.pause();
        this.musik.currentTime = 0;
      }, 1000);
    },
	}
};
</script>
<style scoped>
.floating {
  cursor: pointer;
  position: fixed;
  width: 160px;
  height: 40px;
  bottom: 45px;
  right: 10px;
  background-color: #25d366;
  border-radius: 30px;
  font-size: 11pt;
  box-shadow: 2px 3px 6px #000000;
  border: solid 2px #000000;
  z-index: 100;
}
.tulisan{
  color: #fff;
  height: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  line-height: normal;
  position: relative;
  text-align: center;
  vertical-align: middle;
}
</style>