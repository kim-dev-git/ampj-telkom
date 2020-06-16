<template>
  <div id="team" class="overflow-hidden">
    <div id="mobile" v-if="!$vuetify.breakpoint.smAndUp">
      <v-app-bar
        app
        color="white"
        elevate-on-scroll
      >
        <router-link to="/tim" style="text-decoration: none">
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

        <div id="team-content" class="white" v-if="team">
          <v-layout id="team-header"
            class="justify-center"
            v-if="team">
            <div>
              <v-card-title class="headline font-weight-bold mb-n4">{{ team.teamName }}</v-card-title>
              <p class="subtitle-1 text--secondary text-center mb-0">{{ team.tlName }}</p>
            </div>
          </v-layout>
          <v-layout id="team-action"
            class="justify-center">
            <div id="team-action-print"
              class="mx-4">
              <v-btn icon color="black" class="grey lighten-3">
                <v-icon>mdi-printer</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <p class="subtitle-2 font-weight-regular text-center mt-1">Print</p>
            </div>
            <div id="team-action-add"
              class="text-center"
              v-if="$store.state.user.role === 'Team Leader'">
              <v-btn icon color="black" class="grey lighten-3" @click="dialog = !dialog">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <p class="subtitle-2 font-weight-regular text-center mt-1">Member</p>
              <v-bottom-sheet v-model="dialog" persistent>
                <v-sheet class="px-4 pt-2 py-4">
                  <v-layout class="align-center mb-4">
                    <v-btn small depressed color="white" class="ml-n4" @click="dialog = !dialog">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-spacer />
                    <v-btn text color="info" class="mr-n4" :disabled="loading" @click="newMember()">Tambah</v-btn>
                  </v-layout>
                  
                  <v-combobox label="Teknisi" class="mt-n2" :items="items" v-model="input.name"></v-combobox>
                </v-sheet>
              </v-bottom-sheet>
            </div>
          </v-layout>
          <v-layout
            v-if="team.members">
            <v-list v-if="team.members && !loading" style="width: 100%">
              <v-list-item-group>
                <v-list-item v-for="member in team.members" :key="member.name" class="py-2">
                  <v-layout class="align-center pt-3">
                    <div class="mr-4 mt-n3">
                      <v-avatar color="red" style="cursor: pointer">
                        <span class="white--text headline">{{ (member.name).substring(0,1) }}</span>
                      </v-avatar>
                    </div>
                    <div style="width: 100%">
                      <v-layout class="align-center mt-n2">
                        <span class="subtitle-1 font-weight-bold">{{ member.name }}</span>
                        <v-spacer />
                        <v-btn icon color="black" class="grey lighten-3" @click="deleteDialog = true, selected = member" v-if="$store.state.user.role === 'Team Leader'">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        <v-dialog
                          v-model="deleteDialog"
                          persistent
                          width="500"
                        >
                          <v-card class="pt-6">
                            <v-card-text>
                              Hapus teknisi {{ selected.name }} dari tim {{ team.teamName }} ?
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn text color="info" @click="deleteMember()">Hapus</v-btn>
                              <v-btn text class="text--secondary" @click="deleteDialog = !deleteDialog, selected = {}">Batal</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
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
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
export default {
  props:['id'],
  data: () => ({
    dialog: null,
    deleteDialog: null,
    doing: null,
    selected: {},
    input: {}
  }),
  computed: {
    ...mapState("team", ["team", "technicians"]),
    ...mapGetters(["loading", "user"]),
    techniciansFiltered() {
      const filtered = []
      this.technicians.forEach(technician => {
        if(!technician.team) {
          filtered.push(technician)
          this.items.push(technician.name)
        }
      })
      return filtered
    },
    items() {
      const filtered = []
      this.technicians.forEach(technician => {
        if(!technician.team) {
          filtered.push(technician.name)
        }
      })
      return filtered
    }
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
    newMember() {
      var id = this.team.teamName
      var uid = null
      var name = this.input.name
      this.techniciansFiltered.forEach(technician => {
        if(technician.name === name) { uid = technician.uid }
      })
      this.$store.dispatch("team/addMember", { id, uid, name }).then(() => {
        this.$store.dispatch("team/getTeam", this.id)
        this.dialog = false
      })
    },
    deleteMember() {
      var uid = this.selected.id
      var teamID = this.id
      this.$store.dispatch("team/deleteMember", { uid, teamID }).then(() => {
        this.deleteDialog = false
      })
    }
  },
  mounted() {
    this.$store.state.team.team = null
    this.$store.dispatch("team/getTeam", this.id)
    this.$store.dispatch("team/getTechnicians")
  }
}
</script>

<style>

</style>