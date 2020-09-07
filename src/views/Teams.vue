<template>
  <div id="request" class="px-4">
    <navbar @print="print = true" />
    <bottom-nav />
    <contentHeading />
    <v-lazy
      v-model="isActive"
      :options="{ threshold: .5 }"
      transition="fade-transition">
      <div v-if="teams"
        class="mt-n4 mt-sm-0">
        <contentTable
          v-if="teams !== []"
          :headers="headers"
          :items="teams"/>
      </div>
      <v-container v-else fill-height class="justify-center align-center" style="height: 50vh">
        <v-progress-circular indeterminate size="32" />
      </v-container>
    </v-lazy>

    <report v-if="print"
      :headers="headers"
      :table="teams"
      :title="`Laporan Tim (TL: ${teams[0].tlName})`" />
    
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex"
import contentHeading from '@/components/Content/Heading.vue'
import contentTable from '@/components/Content/Table.vue'
import report from '@/components/Report/Default'

import Navbar from '@/components/Navbar/Mobile/Navbar'
import BottomNav from '@/components/Navbar/Mobile/BottomNav'

export default {
  components: {
    contentHeading,
    contentTable,
    Navbar,
    BottomNav,
    report
  },
  data: () => ({
    print: null,
    printz: null,
    isActive: false,
    headers: [
      { text: 'Tim', value: 'teamName' },
      { text: 'Ketua Tim', value: 'tlName' },
      { text: '', value: 'action' },
    ],
  }),
  computed: {
    //...mapGetters("request", ["requestsByDate"]),
    ...mapState("team", ["teams"])
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style>

</style>