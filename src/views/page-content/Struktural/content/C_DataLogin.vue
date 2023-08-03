<template>
  <div>
		<v-card class="mb-0 pa-8" outlined elevation="0">
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
					Guru
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
					<v-text-field
						v-model="inputDataLogIn.nama_lengkap"
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
					<v-text-field
						v-model="inputDataLogIn.username"
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
					<v-text-field
						v-model="inputDataLogIn.email"
						placeholder="Email"
						outlined
						dense
						label="Email"
						color="light-black darken-3"
						:rules="this.inputDataLogIn.email != '' ? [rules.emailRules] : []"
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
					<v-text-field
						v-model="inputDataLogIn.password"
						placeholder="Kata Sandi"
						:type="passType ? 'text' : 'password'"
						outlined
						dense
						label="Kata Sandi"
						color="light-black darken-3"
						hide-details
						clearable
					>
						<template v-slot:append>
							<v-icon
								class="mr-1"
								color="light-black darken-3"
								tabindex="-1"
								@click="onClickVisible('passType')"
								>{{ passType ? 'visibility' : 'visibility_off' }}</v-icon
							>
							<v-icon
								color="light-black darken-3"
								tabindex="-1"
								@click="endecryptData('endecryptType', kondisi)"
								>{{ endecryptType ? 'lock' : 'lock_open' }}</v-icon
							>
						</template>
					</v-text-field>
				</v-col>
			</v-row>
		</v-card>
		<v-row no-gutters>
			<v-col cols="12" class="float-right">
				<v-btn
					color="#00479b"
					class="float-right mt-3 white--text text--darken-2"
					small
					:disabled="kondisiTombol"
					@click="stepOne()"
				>
					Selanjutnya
				</v-btn>
				<v-btn
					color="#9b1f15"
					class="float-right mr-4 mt-3"
					dark
					small
					@click="gotolist()"
				>
					Kembali Ke List
				</v-btn>
			</v-col>
		</v-row>
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
import PopUpNotifikasiVue from "../../../Layout/PopUpNotifikasi.vue";
export default {
	components: {
    PopUpNotifikasiVue
  },
	props: {
    stepperVal: {
      type: Number,
      default: null
    },
		dataStruktural: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data: () => ({
		inputDataLogIn: {
      id_user: '',
      nama_lengkap: '',
      username: '',
      email: '',
      password: '',
    },
    passType: '',
    endecryptType: '',
    kondisi: '',
    kondisiTombol: true,
    rules: {
			emailRules: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'email tidak valid'
			},
		},

		//notifikasi
    dialogNotifikasi: false,
    notifikasiKode: '',
    notifikasiText: '',
    notifikasiButton: '',
	}),
	watch: {
		inputDataLogIn: {
			deep: true,
			handler(value) {
				if(value.nama_lengkap != '' && value.username != '' && value.email != '' && value.password != ''){
					this.kondisiTombol = false
				}else{
					this.kondisiTombol = true
				}
				this.wadahInput()
			}
		},
		dataStruktural: {
			deep: true,
			handler(value) {
				this.inputDataLogIn = {
					id_user: value.idUser ? value.idUser : null,
					nama_lengkap: value.nama ? value.nama : null,
					username: value.username ? value.username : null,
					email: value.email ? value.email : null,
					password: value.kataSandi ? value.kataSandi : null,
				}
			}
		},
	},
	mounted() {
		this.inputDataLogIn.id_user = this.$route.params.uid;
		this.kondisi = this.$route.params.kondisi;
	},
	methods: {
		...mapActions(['fetchData']),
		wadahInput(){
			let inputFormOne = {
				idUser: this.inputDataLogIn.id_user,
				nama: this.inputDataLogIn.nama_lengkap,
				username: this.inputDataLogIn.username,
				email: this.inputDataLogIn.email,
				password: this.inputDataLogIn.password,
			}
      this.$emit("DataStepOne", inputFormOne)
    },
		onClickVisible(d) {
      this[d] = !this[d]
    },
    endecryptData(d, kondisi) {
      this[d] = !this[d]
      let url = kondisi === 'EDIT' ? this[d] ? 'decryptPass' : 'encryptPass' : this[d] ? 'encryptPass' : 'decryptPass' 
      let payload = {
				method: "get",
				url: `settings/${url}?kata=${this.inputDataLogIn.password}`,
				authToken: localStorage.getItem('user_token')
			};
      this.inputDataLogIn.password = ''
			this.fetchData(payload)
			.then((res) => {
				this.inputDataLogIn.password = res.data.result.hasil;
			})
			.catch((err) => {
				this.notifikasi("error", err.response.data.message, "1")
			});
    },
		gotolist() {
      this.$emit("BackToList");
    },
		stepOne() {
			this.$emit("StepOne");
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
.v-input .v-label {
  font-size: 11pt !important;
}
.v-text-field.v-input--dense {
  font-size: 13px !important;
}
</style>