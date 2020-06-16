<template>
  <v-flex id="request-heading-search-box"
    xs12 md9 lg4 order-xs3 order-sm2 class="d-flex justify-end mb-4 mb-lg-0">
    <v-text-field
      dense
      rounded
      filled
      single-line
      label="Cari"
      class="mr-4 mb-n6"
      :background-color="$vuetify.breakpoint.smAndUp ? '' : ''"
      v-model="search"
      @input="updateSearch()"
    >
      <template #prepend-inner>
        <v-icon left class="ml-n2 mr-1">mdi-magnify</v-icon>
      </template>
    </v-text-field>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    search: null
  }),
  methods: {
    updateSearch() {
      this.$store.state.search = this.search
    }
  },
}
</script>

<style>

</style>