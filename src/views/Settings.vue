<template>
  <div>
    <h1 class="subheading grey--text">Pengaturan</h1>
    <v-card class="mt-2 mb-2" outlined elevation="0">
			<v-layout class="ma-1" row wrap>
        <v-flex sm6 xs12 md3 lg3 class="pa-1">
          <v-card @click="LinkRoute(1)">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
								<v-sheet color="green" width="40" height="40" elevation="6">
									<v-icon dark middle>fa-solid fa-wrench</v-icon>
								</v-sheet>
							</v-list-item-avatar>
              <v-list-item-content>
                <div class="judul text-center">General CMS</div>
                <v-list-item-title class="mb-2 text-center">&nbsp;</v-list-item-title>
                <v-divider />
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md3 lg3 class="pa-1">
          <v-card @click="LinkRoute(2)">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
								<v-sheet color="green" width="40" height="40" elevation="6">
									<v-icon dark middle>admin_panel_settings</v-icon>
								</v-sheet>
							</v-list-item-avatar>
              <v-list-item-content>
                <div class="judul text-center">Hak Akses</div>
                <v-list-item-title class="mb-2 text-center">&nbsp;</v-list-item-title>
                <v-divider />
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md3 lg3 class="pa-1">
          <v-card @click="LinkRoute(3)">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
								<v-sheet color="green" width="40" height="40" elevation="6">
									<v-icon dark middle>list</v-icon>
								</v-sheet>
							</v-list-item-avatar>
              <v-list-item-content>
                <div class="judul text-center">Menu</div>
                <v-list-item-title class="mb-2 text-center">&nbsp;</v-list-item-title>
                <v-divider />
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md3 lg3 class="pa-1">
          <v-card @click="LinkRoute(4)">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
								<v-sheet color="green" width="40" height="40" elevation="6">
									<v-icon dark middle>admin_panel_settings</v-icon>
								</v-sheet>
							</v-list-item-avatar>
              <v-list-item-content>
                <div class="judul text-center">Hak Akses Menu</div>
                <v-list-item-title class="mb-2 text-center">&nbsp;</v-list-item-title>
                <v-divider />
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
		</v-card>
		<v-divider />
		<v-card v-if="settingPanel != 0" class="mt-2 mb-2 pa-1" outlined elevation="0">
			<V_GeneralCMSVue v-if="settingPanel == 1" />
			<V_HakAkses v-if="settingPanel == 2" />
			<V_Menu v-if="settingPanel == 3" />
			<V_HakAksesMenu v-if="settingPanel == 4" />
		</v-card>
  </div>
</template>

<script>
import V_GeneralCMSVue from './Settings/V_GeneralCMS.vue'
import V_HakAkses from './Settings/V_HakAkses.vue'
import V_Menu from './Settings/V_Menu.vue'
import V_HakAksesMenu from './Settings/V_HakAksesMenu.vue'

export default {
	name: "Pengaturan",
	components: { V_GeneralCMSVue, V_HakAkses, V_Menu, V_HakAksesMenu },
	data: () => ({
		settingPanel: 0,
	}),
	mounted() {
		this.settingPanel = 0
	},
	metaInfo: {
		title: "Pengaturan - MTsS SIROJUL ATHFAL",
		htmlAttrs: {
			lang: "id",
			amp: true,
		},
	},
	methods:{
		LinkRoute(number){
			this.settingPanel = number
		}
	}
}
</script>
<style>
.judul {
  font-size: 10pt !important;
  font-weight: bold;
  letter-spacing: 0.1666666667em !important;
  line-height: 2rem;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif !important;
}
</style>