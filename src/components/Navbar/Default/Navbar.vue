<template>
  <div>
  <v-app-bar
    app
    elevate-on-scroll
    color="white"
  >
    <!--<v-container :class="container">-->
      <v-app-bar-nav-icon v-show="!drawer" @click="$emit('drawer')" />

      <v-toolbar-title v-if="!drawer">AMPJ-Telkom</v-toolbar-title>

      <v-spacer></v-spacer>

      <mini-cart class="mr-4" />

      <navbar-avatar />

    <!--</v-container>-->
  </v-app-bar>
  <v-divider></v-divider>
  </div>
</template>

<script>
import MiniCart from './MiniCart'
import NavbarAvatar from './NavbarAvatar'
export default {
  props: [
    'drawer'
  ],
  components: {
    MiniCart,
    NavbarAvatar,
  },
  computed: {
    container() {
      var x = 'fill-height'
      if (this.$vuetify.breakpoint.mdAndUp)
        x = x+ ' mt-n4'
      else if (this.$vuetify.breakpoint.smAndUp)
        x = x+ ' mt-n6'
      return x
    }
  }
}
</script>

<style>

</style>