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
              <p class="headline font-weight-bold text-center mb-n1">{{ user.name }}</p>
              <p class="subtitle-1 text--secondary text-center mb-0">{{ user.role }}</p>
              <v-layout class="justify-center mt-4">
                <v-btn outlined color="info" @click="onLogout()">Logout</v-btn>
              </v-layout>

              <v-divider class="mt-4" />

              <v-layout v-if="user && user.role === 'Teknisi' && teams && teams[0] && teams[0].bag">
                <div id="tool-list"
                  class="mt-2">
                  <p class="subtitle-1 font-weight-bold text-center text--disabled mb-0">Tas Teknisi</p>
                  <v-layout
                    row wrap
                    class="mx-2 mx-sm4 mt-0">

                    <tool-card v-for="tool in filteredTools('modem')" :key="tool.id" :tool="tool" v-if="tool.qty > 0" />
                    <tool-card v-for="tool in filteredTools('fiber')" :key="tool.id" :tool="tool" v-if="tool.qty > 0" />
                    <tool-card v-for="tool in filteredTools('etc')" :key="tool.id" :tool="tool" v-if="tool.qty > 0" />
                    
                  </v-layout>
                </div>
              </v-layout>
            </div>
          </v-layout>
        </div>
    </div>
</template>

<script>
import ToolCard from '@/components/ToolCard'
export default {
  components: {
    ToolCard
  },
  computed: {
    user() { return this.$store.state.user },
    teams() { return this.$store.state.team.teams },
    back() { return -1 },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('userLogout')
    },
    filteredTools(type) {
      return this.teams[0].bag.filter(function (el) {
        return el.type === type
      })
    }
  }
}
</script>

<style>

</style>