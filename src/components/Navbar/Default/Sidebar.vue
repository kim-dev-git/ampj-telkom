<template>
  <v-navigation-drawer
    app
    v-model="active"
    color="white">
    <v-app-bar
      elevation="0"
      color="white"
    >
      <v-app-bar-nav-icon @click="$emit('clicked')"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="drawer">AMPJ-Telkom</v-toolbar-title>
    </v-app-bar>

    <v-divider></v-divider>

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.link"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    props: [
      'drawer'
    ],
    data () {
      return {
        active: null,
        items: [
          { title: 'Dasbor', icon: 'mdi-view-dashboard', link: '/dasbor' },
          { title: 'Perangkat', icon: 'mdi-image', link: '/perangkat' },
          { title: 'Permintaan', icon: 'mdi-image', link: '/permintaan' },
          { title: 'Masuk', icon: 'mdi-image', link: '/masuk' },
          { title: 'Tentang', icon: 'mdi-help-box', link: '/about' },
        ],
        right: null,
      }
    },
    watch: {
      active (value) {
        if (value === true)
          this.$emit('drawer', value)
        else
          this.$emit('drawer', value)
      },
      drawer (value) {
        if (value)
          this.active = value
        else
          this.active = value
      }
    }
  }
</script>

<style lang="scss">
  .theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
    background-color: rgba(0, 0, 0, 0) !important;
  }
</style>