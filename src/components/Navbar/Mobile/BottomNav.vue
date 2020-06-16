<template>
  <v-bottom-navigation
    v-if="!$vuetify.breakpoint.smAndUp"
    v-model="activeBtn"
    class="text--disabled"
    app
  >
    <v-layout class="justify-center" v-for="menu in menus" :key="menu.title">
      <v-btn :value="menu.link" active-class="black--text" :to="menu.link">
        <span :class="activeBtn === menu.link ? 'text--primary' : 'text--disabled'">{{ menu.title }}</span>
        <v-icon
          :class="activeBtn === menu.link ? 'text--primary' : 'text--disabled'"
          v-text="activeBtn === menu.link ? menu.icon : menu.icon + '-outline'" />
      </v-btn>
    </v-layout>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    activeBtn: null,
  }),
  computed: {
    currentPath() {
      return this.$route.path
    },
    menus() {
      return this.$store.getters.menus
    }
  },
  created() {
    this.activeBtn = this.currentPath
  }
}
</script>

<style>

</style>