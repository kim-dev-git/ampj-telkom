<template>
  <div id="customer" class="overflow-hidden">
    <div id="mobile" v-if="!$vuetify.breakpoint.smAndUp">
      <v-app-bar
        app
        color="white"
        elevate-on-scroll
      >
        <router-link to="/pasangbaru" style="text-decoration: none">
          <v-icon class="text--primary headline">mdi-arrow-left</v-icon>
        </router-link>
        <v-spacer />
        <div v-if="customer">
          <v-btn id="btn-dispatch"
            v-if="$store.state.user.role === 'Team Leader'"
            icon
            width="36"
            height="36"
            class="grey lighten-3 text--primary mr-1 mt-1"
            @click="isActive = !isActive"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn id="btn_otw"
            v-if="$store.state.user.role === 'Teknisi' && customer.status === 'Dispatch'"
            icon
            width="36"
            height="36"
            class="grey lighten-3 text--primary mr-1 mt-1"
            @click="dialog_otw = !dialog_otw"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn id="btn-arrived"
            v-if="$store.state.user.role === 'Teknisi' && customer.status === 'Berangkat'"
            icon
            width="36"
            height="36"
            class="grey lighten-3 text--primary mr-1 mt-1"
            @click="dialog_arrived = !dialog_arrived"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn id="btn-decision"
            v-if="$store.state.user.role === 'Teknisi' && customer.status === 'Tiba'"
            icon
            width="36"
            height="36"
            class="grey lighten-3 text--primary mr-1 mt-1"
            @click="dialog_decision = !dialog_decision"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn id="btn-setting"
            v-if="$store.state.user.role === 'Teknisi' && customer.status === 'OGP'"
            icon
            width="36"
            height="36"
            class="grey lighten-3 text--primary mr-1 mt-1"
            @click="dialog_setting = !dialog_setting"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn id="btn-installed"
            v-if="$store.state.user.role === 'Teknisi' && customer.status === 'Setting'"
            icon
            width="36"
            height="36"
            class="grey lighten-3 text--primary mr-1 mt-1"
            @click="dialog_installed = !dialog_installed"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
        </div>
      </v-app-bar>

        <div id="customer-content" class="white mb-n2" v-if="customer">
          <div id="customer-info"
            class="pr-8 pl-6">
            <v-layout id="customer-avatar"
              class="justify-center">
              <v-avatar color="red" size="96">
                <span class="white--text display-1">{{ (customer.name).substring(0,1) }}</span>
              </v-avatar>
            </v-layout>
            <v-layout id="customer-name"
              class="justify-center title font-weight-bold mt-2" >
              {{ customer.name }}
            </v-layout>
            <v-layout id="customer-ktp"
              class="justify-center text--secondary subtitle-1 mt-n1" >
              {{ customer.ktp }}
            </v-layout>
            <v-layout id="customer-sto-and-package"
              class="justify-center my-2" >
              <div :class="sto(customer.sto)" class="mx-1 status caption text-uppercase font-weight-bold white--text px-1 text-center">
                <span>{{ customer.sto }}</span>
              </div>
              <div :class="packages(customer.package)" class="mx-1 status caption text-uppercase font-weight-bold white--text px-1 text-center">
                <span>{{ customer.package }}</span>
              </div>
              <div v-if="customer.team" class="mx-1 grey lighten-1 status caption text-uppercase font-weight-bold white--text px-1 text-center">
                <span>{{ customer.team }}</span>
              </div>
              <div v-if="customer.status" class="mx-1 grey lighten-1 status caption text-uppercase font-weight-bold white--text px-1 text-center">
                <span>{{ customer.status }}</span>
              </div>
            </v-layout>

            <v-layout id="customer-nohp"
              class="mt-6" >
              <v-icon left>mdi-book</v-icon>
              <span class="text--secondary">No HP</span>
              <v-spacer />
              <span class="font-weight-bold">{{ customer.nohp }}</span>
            </v-layout>
            <v-layout id="customer-email"
              class="mt-4" >
              <v-icon left>mdi-email-outline</v-icon>
              <span class="text--secondary">Email</span>
              <v-spacer />
              <span class="font-weight-bold">{{ customer.email }}</span>
            </v-layout>
            <div id="customer-address"
              class="mt-4" >
              <v-icon left>mdi-email-outline</v-icon>
              <span class="text--secondary">Alamat</span>
              <p class="body-2 font-weight-medium">{{ customer.address }}</p>
            </div>
          </div>

          <div id="customer-log"
            v-if="customer.logs"
            class="mt-4">
            <v-list>
              <v-list-group class="grey lighten-4">
                <template #activator>
                  <v-list-item-title class="pl-2 title">Log</v-list-item-title>
                </template>
                <v-list-item v-for="log in customer.logs" :key="log.id" class="pt-2 pb-4 px-6">
                  <div>
                    <span class="text--disabled" v-if="log.createdAt.seconds">{{ log.createdAt.seconds * 1000 | dateShort }}</span>
                    <v-card
                      flat
                      class="py-2 px-4">
                      {{ log.desc }}
                    </v-card>
                  </div>
                </v-list-item>
              </v-list-group>
            </v-list>
          </div>

          
          <v-bottom-sheet id="dispatch-team"
            v-model="isActive" persistent>
            <v-sheet class="px-4 pt-2 py-4">
              <v-layout class="align-center mb-4">
                <v-btn small depressed color="white" class="ml-n4" @click="isActive = !isActive">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn text color="info" class="mr-n4" :disabled="loading" @click="onDispatch()">Dispatch</v-btn>
              </v-layout>
              <v-combobox
                label="Pilih tim"
                :items="teamsName"
                v-model="input.team"
                class="mt-n2" />
            </v-sheet>
          </v-bottom-sheet>

          <v-layout row v-if="show">
            <v-flex xs6>
              <v-layout column>
                <div class="mb-n4">
                  <span class="caption font-weight-bold text--disabled">Nama Pelanggan</span>
                  <p class="subtitle-1 font-weight-bold text--primary mt-n1">{{ customer.name }}</p>
                </div>
                <div class="mb-n4">
                  <span class="caption font-weight-bold text--disabled">No Handphone</span>
                  <p class="subtitle-1 font-weight-bold text--primary mt-n1">{{ customer.nohp }}</p>
                </div>
                <div class="mb-n4">
                  <span class="caption font-weight-bold text--disabled">No KTP</span>
                  <p class="subtitle-1 font-weight-bold text--primary mt-n1">{{ customer.ktp }}</p>
                </div>
                <div class="mb-n4">
                  <span class="caption font-weight-bold text--disabled">Alamat</span>
                  <p class="subtitle-1 font-weight-bold text--primary mt-n1">{{ customer.address }}</p>
                </div>
                <div class="mb-n4">
                  <span class="caption font-weight-bold text--disabled">STO</span>
                  <p class="subtitle-1 font-weight-bold text--primary mt-n1">{{ customer.sto }}</p>
                </div>
                <div class="mb-n4">
                  <span class="caption font-weight-bold text--disabled">Paket</span>
                  <p class="subtitle-1 font-weight-bold text--primary mt-n1">{{ customer.package }}</p>
                </div>
                <div class="mb-n4" v-if="customer.createdAt">
                  <span class="caption font-weight-bold text--disabled">Tanggal</span>
                  <p class="subtitle-1 font-weight-bold text--primary mt-n1">{{ customer.createdAt }}</p>
                </div>
              </v-layout>
            </v-flex>
            <v-flex xs6>
            </v-flex>
          </v-layout>

          <v-dialog id="dialog_otw"
            v-model="dialog_otw"
            width="500"
          >
            <v-card class="pt-4">
              <v-card-text>
                Berangkat ke TKP ?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey"
                  text
                  @click="dialog_otw = !dialog_otw"
                >
                  Tunda
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="onOTW()"
                >
                  Berangkat
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog id="dialog_arrived"
            v-model="dialog_arrived"
            width="500"
          >
            <v-card class="pt-4">
              <v-card-text>
                Sudah tiba di TKP ?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey"
                  text
                  @click="dialog_arrived = !dialog_arrived"
                >
                  Kembali
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="onArrived()"
                >
                  Sudah
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog id="dialog_decision"
            v-model="dialog_decision"
            width="500"
          >
            <v-card class="pt-4">
              <v-card-text>
                <v-combobox
                  label="Kendala/OGP" :items="['Kendala', 'OGP']" v-model="input.decision" />
                <v-combobox
                  v-if="input.decision === 'Kendala'" label="Pilih kendala" :items="['ODP full', 'Perlu tiang', 'Kendala jalur']" v-model="input.problem" />
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey"
                  text
                  @click="dialog_decision = !dialog_decision"
                >
                  Kembali
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="onDecision()"
                >
                  Simpan
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog id="dialog_setting"
            v-model="dialog_setting"
            width="500"
          >
            <v-card class="pt-4">
              <v-card-text>
                Lanjut ke tahap setting ?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey"
                  text
                  @click="dialog_arrived = !dialog_setting"
                >
                  Kembali
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="onSetting()"
                >
                  Ya
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog id="dialog_installed"
            v-model="dialog_installed"
            width="500"
          >
            <v-card class="pt-4">
              <v-card-text>
                Sudah terpasang ?
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey"
                  text
                  @click="dialog_installed = !dialog_installed"
                >
                  Kembali
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="onInstalled()"
                >
                  Sudah
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          
        </div>

        <v-container fill-height v-else class="justify-center align-center" style="height: 50vh">
          <v-progress-circular indeterminate size="32" />
        </v-container>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
export default {
  props:['id'],
  data: () => ({
    show: false,
    dialog: null,
    dialog_otw: null,
    dialog_arrived: null,
    dialog_decision: null,
    dialog_setting: null,
    dialog_installed: null,
    isActive: null,
    doing: null,
    input: {}
  }),
  computed: {
    ...mapState("customer", ["customer"]),
    ...mapGetters(["loading", "user"]),
    teams() { return this.$store.state.team.teams },
    teamsName() {
      const array = []
      this.teams.forEach(team => {
        if(!team.working) {
          array.push(team.teamName)
        }
      })
      return array
    },
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
    onDispatch() {
      var x = this.input.team
      var selected = []
      this.teams.forEach(team => {
        if(team.teamName === x) {
          selected = team
        }
      })
      const payload = { id: this.id, teamID: selected.teamName }
      this.$store.dispatch('customer/dispatchTeam', payload).then(() => {
        this.$store.dispatch("customer/getCustomer", this.id)
        this.input = {}
        this.isActive = null
      })
    },
    onOTW() {
      const payload = {
        id: this.id,
        teamID: this.$store.state.user.team
      }
      this.$store.dispatch('customer/statusOTW', payload).then(() => {
        this.$store.dispatch("customer/getCustomer", this.id)
        this.dialog_otw = null
      })
    },
    onArrived() {
      const payload = {
        id: this.id,
        teamID: this.$store.state.user.team
      }
      this.$store.dispatch('customer/statusArrived', payload).then(() => {
        this.$store.dispatch("customer/getCustomer", this.id)
        this.dialog_arrived = null
      })
    },
    onDecision() {
      const payload = {
        id: this.id,
        teamID: this.$store.state.user.team,
        decision: this.input.decision,
        problem: this.input.problem,
      }
      this.$store.dispatch('customer/statusDecision', payload).then(() => {
        this.$store.dispatch("customer/getCustomer", this.id)
        this.dialog_decision = null
        this.input = {}
      })
    },
    onSetting() {
      const payload = {
        id: this.id
      }
      this.$store.dispatch('customer/statusSetting', payload).then(() => {
        this.$store.dispatch("customer/getCustomer", this.id)
        this.dialog_setting = null
      })
    },
    onInstalled() {
      const payload = {
        id: this.id,
        teamID: this.$store.state.user.team
      }
      this.$store.dispatch('customer/statusInstalled', payload).then(() => {
        this.$store.dispatch("customer/getCustomer", this.id)
        this.dialog_installed = null
      })
    },
  },
  mounted() {
    this.$store.state.customer.customer = null
    this.$store.dispatch("customer/getCustomer", this.id)
  }
}
</script>

<style>

</style>