<template>
  <div id="absent">
    <navbar @print="print = true" />
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
    <v-layout id="info"
      v-if="!teamID" column>
      <v-card flat tile class="grey lighten-3 px-4 py-2">
        <span class="subtitle-2 text--disabled ml-2">Pilih tim terlebih dahulu</span>
      </v-card>
    </v-layout>
    <v-card class="mb-8 grey lighten-4" flat v-if="teamID">
      <div v-if="team" class="font-weight-bold py-4 mx-5">Absen Bulan {{ monthNames[month] }} Tim {{ team.teamName }}</div>
      <div v-if="team" class="v-data-table__wrapper mx-2">
        <table class="v-data-table table">
          <thead class="v-data-table-header">
            <tr>
              <th class="text-start font-weight-bold">Nama</th>
              <th class="text-center" v-for="day in no_of_day.getDate()" :key="day">{{ day }}</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in cc" :key="user.id">
              <td class="font-weight-bold" style="width:100%">{{ user.name }}</td>
              <td v-for="day in no_of_day.getDate()" :key="day" class="text-center">
                <div v-if="user[day]">
                  &#10004;
                </div>
              </td>
              <td class="text-center">{{ (Object.keys(user).filter(data => user[data] !== undefined)).length - 2 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-card>
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
      </v-layout>
      <v-container id="loading"
        v-else fill-height class="justify-center align-center" style="height: 50vh">
        <v-progress-circular indeterminate size="32" />
      </v-container>
    </div>

    <report v-if="print"
      :cc="cc"
      :no_of_day="no_of_day"
      :title="titleReport" />

  </div>
</template>

<script>
import report from '@/components/Report/Absent'
import Navbar from '@/components/Navbar/Mobile/Navbar'
import BottomNav from '@/components/Navbar/Mobile/BottomNav'
export default {
  components: {
    report,
    Navbar,
    BottomNav,
  },
  data: () => ({
    print: false,
    teamID: null,
    date: new Date ().toISOString().substr(0, 10),
    monthNames: ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ],
  }),
  computed: {
    titleReport() { return `Absen Bulan ${this.monthNames[this.month]} Tim ${this.team.teamName }` },
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
    month () {
      return new Date(this.date).getMonth()
    },
    year () {
      return new Date(this.date).getYear()
    },
    no_of_day () {
      return new Date(this.year, this.month + 1, 0)
    },
    A () {
      return (parseInt((new Date(this.dateA).getTime() / 1000).toFixed(0)) - 28800) * 1000
    },
    B () {
      return (parseInt((new Date(this.dateB).getTime() / 1000).toFixed(0)) + 86400 - 28800) * 1000
    },
    cc () {

      const vm = this
      const items = vm.team.members
      
      const other = vm.absent
      var arr = []
      var obj = null
      if (items) {
        items.forEach(data => {
          //console.log('1. Data ',data.name , data)
          if (other) {
            obj = []
            obj.name = data.name
            other.forEach(doc => {
              //console.log('2. Data ID ',data.name, data.id, '&& Doc ID: ', doc.id)
              if (data.id === doc.id) {
                obj = doc
                obj.name = data.name
                obj.id = data.id
                //console.log('3. Obj ',data.name , obj)
              } else {
                // obj = []
                obj.name = data.name
                obj.id = data.id
                //console.log('3. Obj ', data.name, ' not found')
              }
              // obj.name = data.name
            })
          }
          arr.push(obj)
        })
      }
      return arr
    }
  },
  methods: {
    getStatus(item) {
      const vm = this
      const date = new Date(this.date).getDate()
      const items = vm.absent
      var obj = {}

      obj = items.filter(x => x.id.indexOf(item.id) !== -1)

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
  @import "../assets/vendor/bootstrap/css/bootstrap.min.css";
  @import "../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
  @import "../assets/vendor/animate/animate.css";
  @import "../assets/vendor/select2/select2.min.css";
  @import "../assets/vendor/perfect-scrollbar/perfect-scrollbar.css";
  @import "../assets/css/util.css";
  @import "../assets/css/main.css";
</style>