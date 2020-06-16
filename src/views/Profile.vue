<template>
  <div id="mobile" v-if="!$vuetify.breakpoint.smAndUp">
      <v-app-bar
        app
        color="white"
        elevate-on-scroll
      >
        <router-link to="/permintaan" style="text-decoration: none">
          <v-icon class="text--primary headline">mdi-arrow-left</v-icon>
        </router-link>
        <v-spacer></v-spacer>

        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon class="text--primary headline">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="n in 5"
              :key="n"
              @click="() => {}"
            >
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

        <div id="user-content" class="white" v-if="user">
          <v-layout id="user-header"
            class="justify-center"
            v-if="user">
            <div>
              <v-layout class="justify-center">
                <v-avatar color="red" size="64">
                  <span class="white--text headline" v-if="user.name">{{ (user.name).substring(0,1) }}</span>
                </v-avatar>
              </v-layout>
              <v-card-title class="headline font-weight-bold mb-n4">{{ user.name }}</v-card-title>
              <p class="subtitle-1 text--secondary text-center mb-0">{{ user.role }}</p>
              <v-layout class="justify-center mt-4">
                <v-btn outlined color="info" @click="onLogout()">Logout</v-btn>
              </v-layout>
            </div>
          </v-layout>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    user() { return this.$store.state.user },
    back() { return -1 }
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