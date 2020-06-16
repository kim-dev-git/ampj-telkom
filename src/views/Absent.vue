<template>
  <div id="absent">
    <navbar />
    <bottom-nav />
    <div class="px-4">
      <div id="absent-select-team">
        <label for="team" class="subtitle-2">Pilh Tim</label>
        <v-combobox dense flat solo filled id="team" placeholder="Plih tim" :items="teamsID" v-model="teamID" background-color="grey lighten-3"></v-combobox>
      </div>
      <div id="absent-select-team" class="mt-n4">
        <label for="date" class="subtitle-2">Tanggal</label>
        <v-text-field dense flat solo filled id="date" type="date" v-model="date" background-color="grey lighten-3"></v-text-field>
      </div>
    </div>
    <div id="team-members-content" class="white" v-if="team">
      <v-layout
        v-if="!loading">
        <v-list v-if="team.members && !loading && teamID" class="mt-n4" style="width: 100%">
          <v-list-item-group>
            <v-list-item v-for="member in team.members" :key="member.name">
              <v-layout class="align-center pt-3">
                <div class="mr-4 mt-n3">
                  <v-avatar color="red">
                    <span class="white--text headline">{{ (member.name).substring(0,1) }}</span>
                  </v-avatar>
                </div>
                <div style="width: 100%">
                  <v-layout class="align-center">
                    <span class="subtitle-1 font-weight-bold">{{ member.name }}</span>
                  </v-layout>
                  <v-layout>
                    <p class="body-2 text--disabled mt-0 text-uppercase">{{ team.teamName }}</p>
                    <v-spacer />
                    <v-btn
                      v-if="!getStatus(member)"
                      @click="onAbsent(member)"
                      depressed rounded small
                      color="grey lighten-2"
                      class="mt-n4 mr-2">
                      Absen
                    </v-btn>
                    <v-btn
                      v-else depressed rounded small
                      color="grey lighten-2"
                      class="mt-n4 mr-2">
                      <v-icon>mdi-check</v-icon>
                    </v-btn>
                  </v-layout>
                </div>    
              </v-layout>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-layout v-else column>
          <v-card flat tile class="grey lighten-3 px-4 py-2">
            <span class="subtitle-2 text--disabled ml-2">Pilih tim terlebih dahulu</span>
          </v-card>
        </v-layout>
      </v-layout>
      <v-container id="loading"
        v-else fill-height class="justify-center align-center" style="height: 50vh">
        <v-progress-circular indeterminate size="32" />
      </v-container>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Mobile/Navbar'
import BottomNav from '@/components/Navbar/Mobile/BottomNav'
export default {
  components: {
    Navbar,
    BottomNav,
  },
  data: () => ({
    teamID: null,
    date: new Date ().toISOString().substr(0, 10),
  }),
  computed: {
    loading() { return this.$store.getters.loading },
    team() { return this.$store.state.team.team },
    teams() { return this.$store.state.team.teams },
    teamsID() {
      const array = []
      this.teams.forEach(team => {
        array.push(team.teamName)
      })
      return array
    },
    absent() { return this.$store.state.absent.absent },
  },
  methods: {
    getStatus(item) {
      const self = this
      const date = new Date(this.date).getDate()
      const items = self.absent
      var obj = {}

      obj = items.filter(x => x.id.indexOf(item.id) !== -1)
      console.log(item.name, obj)

      if (obj[0] !== undefined && obj[0][date] !== undefined) {
        return true
      } else {
        return false
      }
    },
    onAbsent (member) {
      const payload = {
        month: this.date.substr(0,7),
        day: new Date(this.date).getDate(),
        teamID: this.team.teamName,
        uid: member.id
      }
      this.$store.dispatch('absent/setAbsent', payload).then(() => {
        var payload = {
          month: this.date.substr(0,7),
          day: new Date(this.date).getDate(),
          teamID: this.teamID
        }
        this.$store.dispatch('absent/getAbsent', payload)
      })
    },
  },
  watch: {
    teamID(newValue) {
      if (this.teamID !== null && newValue) {
        var payload = {
          month: this.date.substr(0,7),
          day: new Date(this.date).getDate(),
          teamID: this.teamID
        }
        this.$store.dispatch('team/getTeam', this.teamID)
        this.$store.dispatch('absent/getAbsent', payload)
      }
    },
    date(newValue) {
      if(this.date !== newValue) { 
        var payload = {
          month: this.date.substr(0,7),
          day: new Date(this.date).getDate(),
          teamID: this.teamID
        }
        this.$store.dispatch('team/getTeam', this.teamID)
        this.$store.dispatch('absent/getAbsent', payload)
      }
    }
  }
}
</script>

<style>

</style>