<template>
  <div id="request" class="overflow-hidden">
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

        <div id="request-content" class="white" v-if="request">
          <v-layout id="request-header"
            class="justify-center"
            v-if="request">
            <div>
              <v-card-title class="headline font-weight-bold mb-n4">{{ request.team }}</v-card-title>
              <p class="subtitle-1 text--secondary text-center mb-0">{{ request.name }}</p>
              <p class="caption text--disabled text-center">{{ request.createdAt.seconds * 1000 | dateShort }}</p>
              <v-layout class="justify-center ml-n2 mt-n3 mb-4">
                <div :class="status(request.status)" class="status caption text-uppercase font-weight-bold white--text px-1 ml-2 text-center">
                  <span>{{ request.status }}</span>
                </div>
              </v-layout>
            </div>
          </v-layout>
          <v-layout id="request-action"
            class="justify-center">
            <div id="request-action-print"
              class="mx-4">
              <v-btn icon color="black" class="grey lighten-3" @click="print = true">
                <v-icon>mdi-printer</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <p class="subtitle-2 font-weight-regular text-center mt-1">Print</p>
            </div>
            <div id="request-action-approve"
              v-if="request.status === 'Belum' && user.role === 'Team Leader' || request.status === 'Belum' && user.role === 'Super Admin'"
              class="mx-4"
              @click="doing = 'approve', dialog = true" >
              <v-btn icon color="black" class="grey lighten-3">
                <v-icon>mdi-check-circle</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <p class="subtitle-2 font-weight-regular text-center mt-1 ml-n1">Setujui</p>
            </div>
            <div id="request-action-ready"
              v-if="request.status === 'Sudah' && user.role === 'Admin Gudang' || request.status === 'Sudah' && user.role === 'Super Admin'"
              class="mx-4"
              @click="doing = 'ready', dialog = true" >
              <v-btn icon color="black" class="grey lighten-3">
                <v-icon>mdi-briefcase-check</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <p class="subtitle-2 font-weight-regular text-center mt-1 ml-n2">Siapkan</p>
            </div>
            <div id="request-action-done"
              v-if="request.status === 'Ready' && user.role === 'Teknisi' || request.status === 'Ready' && user.role === 'Super Admin'"
              class="mx-4"
              @click="doing = 'done', dialog = true" >
              <v-btn icon color="black" class="grey lighten-3">
                <v-icon>mdi-check-bold</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <p class="subtitle-2 font-weight-regular text-center mt-1">Ambil</p>
            </div>
            <v-dialog id="request-action-dialog"
              v-model="dialog" persistent max-width="300">
              <v-card class="pa-2">
                <v-card-title class="headline">
                  <span v-if="doing === 'approve'">Setujui permintaan ?</span>
                  <span v-else-if="doing === 'ready'">Permintaan sudah disiapkan ?</span>
                  <span v-else-if="doing === 'done'">Perangkat sudah diambil ?</span>
                </v-card-title>
                <v-card-actions class="mr-4 pb-4">
                  <v-spacer></v-spacer>
                  <v-btn outlined color="info" text @click="dialog = false" :disabled="loading">Batal</v-btn>
                  <v-btn v-if="doing === 'approve'" color="info" @click="onApprove()" :loading="loading">Setujui</v-btn>
                  <v-btn v-else-if="doing === 'ready'" color="info" @click="onReady()" :loading="loading">Sudah</v-btn>
                  <v-btn v-else-if="doing === 'done'" color="info" @click="onDone()" :loading="loading">Sudah</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
          <v-layout
            v-if="request">
            <v-list v-if="request.items && !loading" style="width: 100%">
              <v-list-item-group>
                <v-list-item v-for="item in request.items" :key="item.id">
                  <v-layout class="align-center pt-3">
                    <div class="mr-4 mt-n3">
                      <v-avatar :color="color(item.type)" style="cursor: pointer">
                        <v-icon dark color="white">{{ icon(item.type) }}</v-icon>
                      </v-avatar>
                    </div>
                    <div style="width: 100%">
                      <v-layout class="align-center">
                        <span class="subtitle-1 font-weight-bold">{{ item.pName }}</span>
                        <div class="status caption text-uppercase font-weight-bold white--text grey lighten-2 px-1 ml-2">
                          <span>{{ item.pType }}</span>
                        </div>
                      </v-layout>
                      <v-layout>
                        <p class="body-2 text--disabled mt-0 text-uppercase">{{ item.type }}</p>
                        <v-spacer />
                        <span class="title font-weight-normal text--secondary mt-n4 mr-2">{{ item.qty }}</span>
                      </v-layout>
                    </div>    
                  </v-layout>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-layout>
        </div>

        <v-container fill-height v-else class="justify-center align-center" style="height: 50vh">
          <v-progress-circular indeterminate size="32" />
        </v-container>

        <report v-if="print"
          :headers="headers"
          :table="request"
          title="Laporan Detail Permintaan" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import report from '@/components/Report/Request'

export default {
  props:['id'],
  components: { report },
  data: () => ({
    dialog: null,
    doing: null,
    print: null,
    headers: [
      { text: 'Perangkat', value: 'pName'},
      { text: 'Jenis', value: 'type'},
      { text: 'Jumlah', value: 'qty'},
    ]
  }),
  computed: {
    ...mapState("request", ["request"]),
    ...mapGetters(["loading", "user"])
  },
  methods: {
    icon(type) {
      var icon = null
      if (type === 'modem')
        icon = 'mdi-router-wireless'
      else if (type === 'fiber')
        icon = 'mdi-ethernet-cable'
      else if (type === 'etc')
        icon = 'mdi-paperclip'

      return icon
    },
    color(type) {
      var color = null
      if (type === 'modem')
        color = 'error'
      else if (type === 'fiber')
        color = 'info'
      else if (type === 'etc')
        color = 'warning'

      return color
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
    onApprove() {
      this.$store.dispatch('request/approveRequest', this.id).then(() => {
        this.dialog = null
        this.doing = null
      })
    },
    onReady() {
      this.$store.dispatch('request/readyRequest', this.id).then(() => {
        this.dialog = null
        this.doing = null
      })
    },
    onDone() {
      this.$store.dispatch('request/doneRequest', this.id).then(() => {
        this.dialog = null
        this.doing = null
      })
    },
  },
  mounted() {
    this.$store.state.request.request = null
    this.$store.dispatch("request/getRequest", this.id)
  }
}
</script>

<style>

</style>