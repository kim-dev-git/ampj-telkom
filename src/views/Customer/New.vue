<template>
  <div id="request" class="px-4">
    <navbar @print="print = true" />
    <bottom-nav />
    <contentHeading />
    <!--<v-layout v-if="$store.state.user.role === 'Team Leader'"
      class="py-4 mb-2">
      <ul>
        <li v-for="team in teams" :key="team.id">
          {{ team }}
        </li>
      </ul>
    </v-layout>-->
    <v-layout>
      <div style="overflow: auto;">
        <v-btn-toggle
          v-model="filter"
          tile
          color="error"
          group
        >
          <v-btn value="0">
            Semua
          </v-btn>

          <v-btn value="Terpasang">
            Terpasang
          </v-btn>

          <v-btn value="Kendala">
            Kendala
          </v-btn>

          <v-btn value="Berhenti Berlangganan">
            Berhenti Berlangganan
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-layout>
    <v-lazy
      v-model="isActive"
      :options="{ threshold: .5 }"
      transition="fade-transition">
      <div class="mt-n4 mt-sm-0">
        <contentTable
          v-if="customersFiltered !== []"
          :headers="headers"
          :items="customersFilteredStatus" />
      </div>
    </v-lazy>

    <report v-if="print"
      :headers="headers"
      :table="customersFilteredStatus"
      title="Laporan Data Pelanggan" />
    
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex"
import report from '@/components/Report/Default'
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
    filter: '0',
    headers: [
      { text: 'Tim', value: 'team' },
      { text: 'Nama', value: 'name' },
      { text: 'Status', value: 'status' },
      { text: 'Tanggal', value: 'createdAt' },
      { text: '', value: 'action' },
    ],
  }),
  computed: {
    search() { return this.$store.state.search },
    teams() { return this.$store.state.team.teams },
    customers() { return this.$store.state.customer.customers },
    customersFiltered() {
        if(this.$store.state.user.role === 'Teknisi') {
          const filtered = []
          this.customers.forEach(customer => {
            if(this.$store.state.user.team === customer.team) {
              filtered.push(customer)
            }
          })
          return filtered
        } else {
          return this.customers
        }
    },
    customersFilteredStatus() {
      if (this.filter === '0') {
        return this.customersFiltered
      } else {
        return this.customersFiltered.filter(customer => customer.status === this.filter)
      }
    }
    
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style>

</style>