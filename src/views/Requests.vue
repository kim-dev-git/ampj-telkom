<template>
  <div id="request" class="px-4">
    <navbar @print="print = true" />
    <bottom-nav />
    <contentHeading />
    <filter-comp
      :headers="headers"
      :items="requestByRole"
      v-model="filtered"
    />
    <v-lazy
      v-model="isActive"
      :options="{ threshold: .5 }"
      transition="fade-transition">
      <div class="mt-n4 mt-sm-0">
        <contentTable
          v-if="requestByRole !== []"
          :headers="headers"
          :items="filtered"/>
      </div>
    </v-lazy>

    <report v-if="print"
      :headers="headers"
      :table="filtered"
      title="Laporan Permintaan Perangkat" />
    
  </div>
</template>

<script>

import report from '@/components/Report/Default'
import { mapState, mapGetters, mapActions } from "vuex"
import contentHeading from '@/components/Content/Heading.vue'
import contentTable from '@/components/Content/Table.vue'
import FilterComp from '@/components/FilterComp.vue'

import Navbar from '@/components/Navbar/Mobile/Navbar'
import BottomNav from '@/components/Navbar/Mobile/BottomNav'

export default {
  components: {
    report,
    contentHeading,
    FilterComp,
    contentTable,
    Navbar,
    BottomNav,
  },
  data: () => ({
    filtered: [],
    filterBy: null,
    filterValue: null,
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
    },
    getFilterBy() {
      const form = [...this.headers]
      // form.pop()
      for(var i = form.length -1; i >= 0; i--) {
        if(form[i].value === 'createdAt' || form[i].value === 'action') {
          form.splice(i, 1)
        }
      }
      return form
    },
    getFilterValue() {
      if (!this.filterBy) {
        return []
      }
      const arr = []
      const filter = this.filterBy.value
      const data = [...this.requestsByDate]
      data.forEach(d => {
        if(!arr.includes(d[filter])) {
          arr.push(d[filter])
        }
      })
      return arr
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