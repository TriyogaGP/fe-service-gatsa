import ApiService from "@/core/services/api.service";

export const getAgama = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsAgama`, localStorage.getItem('user_token'));
		commit('SET_AGAMA', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getHobi = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsHobi`, localStorage.getItem('user_token'));
		commit('SET_HOBI', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getCitaCita = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsCitaCita`, localStorage.getItem('user_token'));
		commit('SET_CITACITA', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getPendidikan = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsPendidikan`, localStorage.getItem('user_token'));
		commit('SET_PENDIDIKAN', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getPekerjaan = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsPekerjaan`, localStorage.getItem('user_token'));
		commit('SET_PEKERJAAN', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getPenghasilan = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsPenghasilan`, localStorage.getItem('user_token'));
		commit('SET_PENGHASILAN', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getStatusOrangTua = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsStatusOrangtua`, localStorage.getItem('user_token'));
		commit('SET_STATUSORANGTUA', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getStatusTempatTinggal = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsStatusTempatTinggal`, localStorage.getItem('user_token'));
		commit('SET_STATUSTEMPATTINGGAL', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getJarakRumah = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsJarakRumah`, localStorage.getItem('user_token'));
		commit('SET_JARAKRUMAH', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getTransportasi = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsTransportasi`, localStorage.getItem('user_token'));
		commit('SET_TRANSPORTASI', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getJabatan = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsJabatan`, localStorage.getItem('user_token'));
		commit('SET_JABATAN', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getMengajar = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsMengajar`, localStorage.getItem('user_token'));
		commit('SET_MENGAJAR', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getJenjangSekolah = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/optionsJenjangSekolah`, localStorage.getItem('user_token'));
		commit('SET_JENJANGSEKOLAH', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getKelas = async ({ commit }, data) => {
	try {
		let res = await ApiService.get(`settings/optionsKelas?kondisi=${data.kondisi}&walikelas=${data.walikelas}`, localStorage.getItem('user_token'));
		commit('SET_KELAS', { kelas: res.data.result, kategori: data.kondisi })
	} catch (error) {
		console.log(error);
	}
}

export const getWilayah = async ({ commit }, data) => {
	try {
		let res = await ApiService.get(`settings/optionsWilayah?bagian=${data.bagian}&KodeWilayah=${data.KodeWilayah}`, localStorage.getItem('user_token'));
		commit('SET_WILAYAH', { wilayah: res.data.result, kategori: data.bagian })
	} catch (error) {
		console.log(error);
	}
}

export const getAdminbyUID = async ({ commit }, uid) => {
	try {
		let res = await ApiService.get(`user/admin/${uid}`, localStorage.getItem('user_token'));
		// console.log(res.data.result);
		commit('SET_ADMINBY', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getStrukturalbyUID = async ({ commit }, uid) => {
	try {
		let res = await ApiService.get(`user/struktural/${uid}`, localStorage.getItem('user_token'));
		// console.log(res.data.result);
		commit('SET_STRUKTURALBY', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getSiswaSiswibyUID = async ({ commit }, uid) => {
	try {
		let res = await ApiService.get(`user/siswasiswi/${uid}`, localStorage.getItem('user_token'));
		// console.log(res.data.result);
		commit('SET_SISWASISWIBY', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

export const getCMSSettings = async ({ commit }) => {
	try {
		let res = await ApiService.get(`settings/cmssetting`, localStorage.getItem('user_token'));
		// console.log(res.data.result);
		commit('SET_CMSSETTINGS', res.data.result)
	} catch (error) {
		console.log(error);
	}
}

