<template>
  <div id="request" class="px-4">
    <navbar @print="print = true" />
    <bottom-nav />
    <contentHeading />
    <v-lazy
      v-model="isActive"
      :options="{ threshold: .5 }"
      transition="fade-transition">
      <div class="mt-n4 mt-sm-0">
        <contentTable
          v-if="requestByRole !== []"
          :headers="headers"
          :items="requestByRole"/>
      </div>
    </v-lazy>

    <report v-if="print"
      :headers="headers"
      :table="requestByRole"
      title="Laporan Permintaan Perangkat" />
    
  </div>
</template>

<script>

import report from '@/components/Report/Default'
import { mapState, mapGetters, mapActions } from "vuex"
import contentHeading from '@/components/Content/Heading.vue'
import contentTable from '@/components/Content/Table.vue'

import Navbar from '@/components/Navbar/Mobile/Navbar'
import BottomNav from '@/components/Navbar/Mobile/BottomNav'

export default {
  components: {
    report,
    contentHeading,
    contentTable,
    Navbar,
    BottomNav,
  },
  data: () => ({
    print: false,
    isActive: false,
    headers: [
      { text: 'Tim', value: 'team' },
      { text: 'Nama', value: 'name' },
      { text: 'Status', value: 'status' },
      { text: 'Tanggal', value: 'createdAt' },
      { text: '', value: 'action' },
    ],
  }),
  computed: {
    ...mapGetters("request", ["requestsByDate"]),
    requestByRole() {
      var result = []
      const datas = this.requestsByDate
      const role = this.$store.state.user.role
      if(role === 'Teknisi') {
        const team = this.$store.state.user.team
        datas.forEach(data => {
          if(data.team === team) { result.push(data) }
        })
      } else if(role === 'Team Leader') {
        const teams = this.$store.state.team.teams
        teams.forEach(team => {
          datas.forEach(data => {
            if(data.team === team.id) { result.push(data) }
          })
        })
      } else {
        result = datas
      }

      return result
    }
  },
  methods: {
    //...mapActions("request", ["getRequests"])
  },
  mounted() {
    //this.getRequests()
  }
}
</script>

<style>

</style>