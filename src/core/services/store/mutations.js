export const SET_AGAMA = (state, agama) => {
	state.agamaOptions = agama
}

export const SET_HOBI = (state, hobi) => {
	state.hobiOptions = hobi
}

export const SET_CITACITA = (state, citacita) => {
	state.citacitaOptions = citacita
}

export const SET_PENDIDIKAN = (state, pendidikan) => {
	state.pendidikanOptions = pendidikan
}

export const SET_PEKERJAAN = (state, pekerjaan) => {
	state.pekerjaanOptions = pekerjaan
}

export const SET_PENGHASILAN = (state, penghasilan) => {
	state.penghasilanOptions = penghasilan
}

export const SET_STATUSORANGTUA = (state, status) => {
	state.statusorangtuaOptions = status
}

export const SET_STATUSTEMPATTINGGAL = (state, status) => {
	state.statustempattinggalOptions = status
}

export const SET_JARAKRUMAH = (state, jarakrumah) => {
	state.jarakrumahOptions = jarakrumah
}

export const SET_TRANSPORTASI = (state, transportasi) => {
	state.transportasiOptions = transportasi
}

export const SET_JABATAN = (state, jabatan) => {
	state.jabatanOptions = jabatan
}

export const SET_MENGAJAR = (state, mengajar) => {
	state.mengajarOptions = mengajar
}

export const SET_JENJANGSEKOLAH = (state, jenjangsekolah) => {
	state.jenjangOptions = jenjangsekolah
}

export const SET_KELAS = (state, data) => {
	if(data.kategori === 'All'){
		state.kelasOptions = data.kelas
	}else if(data.kategori === 'Use'){
		state.kelasUseOptions = data.kelas
	}
}

export const SET_WILAYAH = (state, data) => {
	if(data.kategori === 'provinsi'){
		state.ProvinsiOptions = data.wilayah
	}else if(data.kategori === 'kabkota'){
		state.KabKotaOptions = data.wilayah
	}else if(data.kategori === 'kecamatan'){
		state.KecamatanOptions = data.wilayah
	}else if(data.kategori === 'kelurahan'){
		state.KelurahanOptions = data.wilayah
	}else if(data.kategori === 'kabkotaOnly'){
		state.KabKotaOnlyOptions = data.wilayah
	}
}

export const SET_ADMINBY = (state, data) => {
	state.dataAdministrator = data
}

export const SET_STRUKTURALBY = (state, data) => {
	state.dataStruktural = data
}

export const SET_SISWASISWIBY = (state, data) => {
	state.dataSiswaSiswi = data
}

export const SET_CMSSETTINGS = (state, data) => {
	state.dataCMSSetting = data
}