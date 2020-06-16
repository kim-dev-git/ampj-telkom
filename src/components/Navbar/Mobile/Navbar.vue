<template>
  <v-app-bar
    app
    elevate-on-scroll
    color="white"
    height="64"
    v-if="!$vuetify.breakpoint.smAndUp"
  >
    <router-link to="profil" style="text-decoration: none">
      <v-avatar color="red" size="38" style="cursor: pointer">
        <span class="white--text headline" v-if="user.name">{{ (user.name).substring(0,1) }}</span>
      </v-avatar>
    </router-link>

    <v-toolbar-title class="ml-5 headline font-weight-bold">{{ pageTitle }}</v-toolbar-title>

    <v-spacer></v-spacer>
    
    <v-btn @click="$emit('print')"
      icon
      color="black"
      class="grey lighten-3 mr-2 mt-1"
      height="36" width="36">
      <v-icon>mdi-printer</v-icon>
    </v-btn>

    <mini-cart class="mr-2 mt-1" v-if="currentPath === '/perangkat' && $store.state.user.role === 'Teknisi'" />
 
    <new-tool v-if="currentPath === '/perangkat' && $store.state.user.role === 'Admin Gudang'" />

    <new-team v-if="currentPath === '/tim' && $store.state.user.role === 'Team Leader'" />

    <new-customer v-if="currentPath === '/pasangbaru' && $store.state.user.role === 'Plaza'" />

  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex"
import MiniCart from '@/components/Navbar/Default/MiniCart'
import NewTool from '@/components/Tools/NewTool'
import NewTeam from '@/components/Teams/NewTeam'
import NewCustomer from '@/components/Customer/NewCustomer'

export default {
  components: {
    MiniCart,
    NewTool,
    NewTeam,
    NewCustomer,
  },
  computed: {
    ...mapGetters(
      "cart", ["cartItemCount"],
    ),
    user() {
      return this.$store.getters.user
    },
    currentPath() {
      return this.$route.path
    },
    menus() {
      return this.$store.state.menus
    },
    pageTitle() {
      var title = null
      const path = this.currentPath
      const menus = this.menus
      menus.forEach(menu => {
        if (path === menu.link)
          title = menu.title
      })
      return title
    }
  }
}
</script>

<style>

</style>