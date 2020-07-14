<template>
  <v-container id="stop-subs">
    <navbar @print="print = true" />
    <bottom-nav />
    <contentHeading />
    <!-- <v-layout class="pa-2 mb-n4">
      <v-text-field dense solo background-color="grey lighten-4" label="Masukkan ID Pelanggan" v-model="customerID" />
      <v-btn text color="primary" class="mt-1" :disabled="!customerID" @click="get()">
        <v-icon left>mdi-magnify</v-icon>
        Cari
      </v-btn>
    </v-layout> -->
    <v-card class="mx-2 pa-4" v-if="customer">
      <v-layout column>
        <span class="text--disabled caption">Nama</span>
        <span>{{ customer.name }}</span>
        <v-divider class="my-2" />
        <span class="text--disabled caption">Paket</span>
        <span>{{ customer.package }}</span>
        <v-divider class="my-2" />
        <span class="text--disabled caption">STO</span>
        <span>{{ customer.sto }}</span>
        <v-divider class="my-2" />
        <span class="text--disabled caption">Email</span>
        <span>{{ customer.email }}</span>
        <v-divider class="my-2" />
        <span class="text--disabled caption">No HP</span>
        <span>{{ customer.nohp }}</span>
        <v-divider class="my-2" />
        <span class="text--disabled caption">Alamat</span>
        <span>{{ customer.address }}</span>
        <v-divider class="my-2" />
        <span class="text--disabled caption">Status</span>
        <span>{{ customer.status }}</span>
        <v-divider class="my-2" />
        <v-layout column v-if="customer.status === 'Berhenti Berlangganan'">
          <span class="text--disabled caption">Alasan</span>
          <span>{{ customer.reason }}</span>
          <v-divider class="my-2" />
        </v-layout>

        <v-layout class="mt-2" v-if="customer.status !== 'Berhenti Berlangganan'">
          <v-spacer />
          <v-btn depressed color="error" @click="dialog = true">Berhenti Berlangganan</v-btn>
        </v-layout>

      </v-layout>
    </v-card>

    <v-dialog v-model="dialog" width="400">
      <v-card class="pa-4 pt-2">
        <v-btn icon class="ml-n2 mb-2" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-textarea outlined color="error" label="Alasan berhenti berlangganan" v-model="reason" />
        <v-btn depressed block color="error" class="mt-n4" @click="put()">Berhenti Berlangganan</v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { db } from '@/firebase'
const customersRef = db.collection('listCustomers')

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
    dialog: null,
    customerID: null,
    customer: null,
    reason: null
  }),
  computed: {
    search() { return this.$store.state.search }
  },
  methods: {
    async get() {
      this.customer = null
      let result = await customersRef.doc(this.search).get()
      let response = result.data()
      this.customer = result.data()
    },
    async put() {
      const data = { createdAt: new Date(), desc: `Berhenti berlangganan (${this.reason})` }
      const key = (new Date().getTime() / 1000).toFixed(0)

      let update = await customersRef.doc(this.search).set({
        status: 'Berhenti Berlangganan',
        reason: this.reason
      }, { merge: true })

      let updateLog = await db.collection(`listCustomers/${this.search}/logs`).doc(key).set(data, { merge: true })
      
      this.$store.dispatch('addNotification', {
        type: 'error',
        message: `${this.customer.name} berhenti berlangganan`
      })

      this.get()
      
      this.dialog = false
    }
  },
  watch: {
    search(value) {
      if(value !== null && value !== '') {
        this.get()
      } else {
        this.customer = null
      }
    }
  }
}
</script>

<style>

</style>