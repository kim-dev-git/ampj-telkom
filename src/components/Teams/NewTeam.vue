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
        <v-text-field label="Nama Tim" class="mt-n2" v-model="input.name"></v-text-field>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    isActive: false,
    input: {},
  }),
  computed: {
    loading() { return this.$store.getters.loading },
    user() { return this.$store.getters.user },
  },
  methods: {
    newTool() {
      const id = this.input.name
      const data = {
        teamName: this.input.name,
        tlName: this.user.name,
        tlID: this.user.uid,
      }
      this.$store.dispatch('team/addTeam', { id, data }).then(() => this.isActive = false)
    }
  }
}
</script>

<style>

</style>