<template>
  <div id="request" class="px-4">
    <navbar />
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
    
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex"
import contentHeading from '@/components/Content/Heading.vue'
import contentTable from '@/components/Content/Table.vue'

import Navbar from '@/components/Navbar/Mobile/Navbar'
import BottomNav from '@/components/Navbar/Mobile/BottomNav'

export default {
  components: {
    contentHeading,
    contentTable,
    Navbar,
    BottomNav,
  },
  data: () => ({
    isActive: false,
    headers: [
      { text: 'Tim', value: 'team' },
      { text: 'Nama', value: 'name' },
      { text: 'Status', value: 'status' },
      { text: 'Tanggal', value: 'createdAt' },
      { text: '', value: 'action' },
    ],
    items: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
        group: 'kak'
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
        group: 'zzz'
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: '6%',
      },
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