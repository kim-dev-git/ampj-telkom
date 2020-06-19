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
    <v-lazy
      v-model="isActive"
      :options="{ threshold: .5 }"
      transition="fade-transition">
      <div class="mt-n4 mt-sm-0">
        <contentTable
          v-if="customersFiltered !== []"
          :headers="headers"
          :items="customersFiltered"/>
      </div>
    </v-lazy>

    <report v-if="print"
      :headers="headers"
      :table="customers"
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
    headers: [
      { text: 'Tim', value: 'team' },
      { text: 'Nama', value: 'name' },
      { text: 'Status', value: 'status' },
      { text: 'Tanggal', value: 'createdAt' },
      { text: '', value: 'action' },
    ],
  }),
  computed: {
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