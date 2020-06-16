<template>
  <v-skeleton-loader id="navbar-avatar"
    class="mx-auto"
    type="avatar"
    :loading="!user.name"
  >
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-avatar color="red" v-on="on" style="cursor: pointer" size="36">
          <span class="white--text headline" v-if="user.name">{{ (user.name).substring(0,1) }}</span>
        </v-avatar>
      </template>
      <v-card class="pa-4">
        <v-layout class="d-flex justify-center">
          <v-avatar color="red">
            <span class="white--text headline" v-if="user.name">{{ (user.name).substring(0,1) }}</span>
          </v-avatar>
        </v-layout>
        <v-card-title>
          {{ user.name }}
        </v-card-title>
        <v-card-text class="text-center mt-n4">
          {{ user.role }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            outlined
            block
            color="primary"
            @click="onLogout"
          >
            Keluar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-skeleton-loader>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('userLogout')
    }
  }
}
</script>

<style>

</style>