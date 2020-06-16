<template>
  <v-list class="mx-n4">
    <v-list-item-group>
      <v-list-item v-for="item in items" :key="item.id" class="pt-2" @click="clickItem(item.id)">
        <!-- Permintaan -->
        <v-layout v-if="currentPath === '/permintaan'"
          class="align-center">
          <div class="mr-4 mt-n3">
            <v-avatar color="red" style="cursor: pointer">
              <span class="white--text headline">{{ (item.name).substring(0,1) }}</span>
            </v-avatar>
          </div>
          <div style="width: 100%">
            <v-layout class="align-center">
              <span class="subtitle-1 font-weight-bold">{{ item.team }}</span>
              <div :class="status(item.status)" class="status caption text-uppercase font-weight-bold white--text px-1 ml-2">
                <span>{{ item.status }}</span>
              </div>
            </v-layout>
            <v-layout>
              <p class="body-2 text--disabled mt-0">{{ item.name }}</p>
              <v-spacer />
              <span class="body-2 text--disabled mt-0">{{ item.createdAt.seconds * 1000 | dateShort }}</span>
            </v-layout>
          </div>    
        </v-layout>

        <!-- Tim -->
        <v-layout v-else-if="currentPath === '/tim'"
          class="align-center"
        >
          <div class="mr-4 mt-n3">
            <v-avatar color="red">
              <span class="white--text headline">{{ (item.teamName).substring(0,1) }}</span>
            </v-avatar>
          </div>
          <div style="width: 100%">
            <v-layout class="align-center">
              <span class="subtitle-1 font-weight-bold">{{ item.teamName }}</span>
            </v-layout>
            <v-layout>
              <p class="body-2 text--disabled mt-0">{{ item.tlName }}</p>
            </v-layout>
          </div>    
        </v-layout>

        
        <!-- Pasang Baru -->
        <v-layout v-else-if="currentPath === '/pasangbaru'"
          class="align-center pt-0 pb-3"
        >
          <div class="mr-4">
            <v-avatar color="red" size="64">
              <span class="white--text headline">{{ (item.name).substring(0,1) }}</span>
            </v-avatar>
          </div>
          <div style="width: 100%">
            <v-layout class="align-center">
              <span class="title font-weight-bold">{{ item.name }}</span>
            </v-layout>
            <v-layout class="ml-n1 mb-1">
              <div :class="sto(item.sto)" class="mx-1 status caption text-uppercase font-weight-bold white--text px-1 text-center">
                <span>{{ item.sto }}</span>
              </div>
              <div :class="packages(item.package)" class="mx-1 status caption text-uppercase font-weight-bold white--text px-1 text-center">
                <span>{{ item.package }}</span>
              </div>
            </v-layout>
            <v-layout class="ml-n1">
              <div v-if="item.team" class="mx-1 grey lighten-1 status caption text-uppercase font-weight-bold white--text px-1 text-center">
                <span>{{ item.team }}</span>
              </div>
              <div v-if="item.status" class="mx-1 grey lighten-1 status caption text-uppercase font-weight-bold white--text px-1 text-center">
                <span>{{ item.status }}</span>
              </div>
            </v-layout>
          </div>    
        </v-layout>
        
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: ['items'],
  computed: {
    currentPath() {
      return this.$route.path
    },
  },
  methods: {
    clickItem(id) {
      const path = (this.currentPath).substring(1)
      this.$router.push(`${path}/${id}`)
    },
    status(status) {
      var color = null
      if (status === 'Belum')
        color = 'warning'
      else if (status === 'Sudah')
        color = 'info'
      else if (status === 'Ready')
        color = 'success'
      else if (status === 'Selesai')
        color = 'grey lighten-2'

      return color
    },
    sto(sto) {
      var color = null
      if (sto === 'BJM')
        color = 'error'
      else if (sto === 'ULI')
        color = 'info'
      else if (sto === 'KYG')
        color = 'warning'
      else if (sto === 'GMB')
        color = 'success'

      return color
    },
    packages(packages) {
      var color = null
      if (packages === '2P STREAMIX')
        color = 'warning'
      else if (packages === '3P PRESTIGE')
        color = 'info'
      else if (packages === '2P PHOENIX')
        color = 'success'

      return color
    },
  }
}
</script>

<style>

</style>