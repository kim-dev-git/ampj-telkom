<template>
  <v-container fill-height style="height: 95vh">
    <v-layout class="align-center">
      <v-flex xs12 md8 lg4 offset-md2 offset-lg4>
        <v-card :class="$vuetify.breakpoint.smAndUp ? 'elevation-5' : ''" flat>
          <v-card-title class="d-flex justify-center">
            <p class="mt-4">
              AMPJ-Telkom
            </p>
          </v-card-title>
          <v-card-text class="px-8 pb-4">
            <v-text-field
              label="Email"
              type="email"
              v-model="email"
            />
            <v-text-field
              class="mt-n2"
              label="Password"
              type="password"
              v-model="password"
              @keyup.enter="onLogin"
            />
          </v-card-text>
          <v-card-actions class="px-8 mt-n6 pb-8">
            <v-btn
              block
              color="primary"
              @click="onLogin"
              :loading="loading"
            >
              Masuk
            </v-btn>
          </v-card-actions>
          <v-card-actions class="px-8 mt-n6 pb-8">
            <v-btn
              disabled
              block
              outlined
              color="primary"
              @click="onRegister"
            >
              Daftar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null,
  }),
  computed: {
    loading() { return this.$store.getters.loading }
  },
  methods: {
    onLogin() {
      var payload = {
        email: this.email,
        password: this.password,
      }
      this.$store.commit('SET_LOADING', true, { root: true })
      this.$store.dispatch('userLogin', payload).then(() => {
        this.$store.commit('SET_LOADING', false, { root: true })
      })
    },
    onRegister() {
      this.$router.push('/daftar')
    }
  }
}
</script>

<style>

</style>