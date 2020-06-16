<template>
  <v-layout id="request-heading"
    row class="d-flex align-center pl-3 pr-0 px-sm-3">
    <v-flex id="request-heading-title"
      xs12 lg6
      v-if="$vuetify.breakpoint.smAndUp">
      <v-card-title class="ml-n4">Permintaan Perangkat Jaringan</v-card-title>
      <v-card-text class="ml-n4 mt-n4 text--secondary">A little description here.</v-card-text>
    </v-flex>
    <v-spacer />
    <search-box class="mt-2 my-sm-0" />
    <v-flex id="request-heading-add-button"
      xs3 offset-xs9 md2 offset-md1 offset-lg0 lg2 order-xs2 order-sm3 class="d-flex justify-end mb-4 mb-lg-0 pr-4 pr-sm-0"
      v-if="$vuetify.breakpoint.smAndUp">
      <v-btn
        depressed
        rounded
        :color="$vuetify.breakpoint.smAndUp ? 'grey lighten-3' : 'grey lighten-3'"
      >
        <v-icon left>mdi-plus</v-icon>
        Tambah Data
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SearchBox from "./SearchBox"
import { mapState } from "vuex"

export default {
  components: {
    SearchBox,
  },
  data: () => ({
    search: null
  }),
}
</script>

<style>

</style>