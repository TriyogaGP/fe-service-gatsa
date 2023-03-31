<template>
	<v-footer dark padless app inset>
		<v-card class="flex" flat tile color="light-black darken-3" :elevation="10">
			<v-card-text class="py-2 white--text text-center">
				© {{new Date().getFullYear()}} - <strong>{{ namaSekolah }}</strong>
			</v-card-text>
		</v-card>
	</v-footer>
</template>
<script>
export default {
	props: {
    namaSekolah: {
      type: String,
      default: null
    },
  },
	data: () => ({
	}),
}
</script>