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
          <v-btn text color="info" class="mr-n4" :disabled="loading" @click="newTool()">Simpan</v-btn>
        </v-layout>
        <v-text-field label="ID Perangkat" class="mt-n2" v-model="input.id"></v-text-field>
        <v-text-field label="Nama Perangkat" class="mt-n2" v-model="input.name"></v-text-field>
        <v-combobox label="Jenis" class="mt-n2" :items="type" v-model="input.type"></v-combobox>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    isActive: false,
    input: {},
    type: ['modem', 'fiber', 'etc']
  }),
  computed: {
    loading() { return this.$store.getters.loading }
  },
  methods: {
    newTool() {
      const id = this.input.id
      const data = this.input
      this.$store.dispatch('tool/addTool', { id, data }).then(() => this.isActive = false)
    }
  }
}
</script>

<style>

</style>