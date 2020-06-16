<template>
  <div class="text-center">
    <v-btn
      icon
      width="36"
      height="36"
      class="grey lighten-3 text--primary mr-1 mt-1"
      @click="isActive = !isActive"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="isActive" persistent>
      <v-sheet class="px-4 pt-2 py-4">
        <v-layout class="align-center mb-4">
          <v-btn small depressed color="white" class="ml-n4" @click="isActive = !isActive">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn text color="info" class="mr-n4" :disabled="loading" @click="newCustomer()">Simpan</v-btn>
        </v-layout>
        <div id="input"
          v-for="config in configs" :key="config.value">
          <v-text-field v-if="config.type === 'text' || config.type === 'email' || config.type === 'password' || config.type === 'number'"
            :type="config.type"
            :label="config.label"
            v-model="input[config.value]"
            class="mt-n2" />
          <v-combobox v-else-if="config.type === 'combobox'"
            :label="config.label"
            :items="config.option"
            v-model="input[config.value]"
            class="mt-n2" />
        </div>


      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    isActive: false,
    input: {},
    configs: [
      { label: 'No KTP', type: 'text', value: 'ktp', },
      { label: 'Nama Pelanggan', type: 'text', value: 'name', },
      { label: 'No HP', type: 'text', value: 'nohp', },
      { label: 'Email', type: 'email', value: 'email', },
      { label: 'Alamat', type: 'text', value: 'address', },
      { label: 'STO', type: 'combobox', value: 'sto', option: [ 'BJM', 'ULI', 'KYG', 'GMB' ]},
      { label: 'Paket', type: 'combobox', value: 'package', option: [ '3P PRESTIGE', '2P STREAMIX', '2P PHOENIX' ]},
    ]
  }),
  computed: {
    loading() { return this.$store.getters.loading }
  },
  methods: {
    newCustomer() {
      const data = this.input
      //console.log(data)
      this.$store.dispatch('customer/newCustomer', { data }).then(() => this.isActive = false)
    }
  }
}
</script>

<style>

</style>