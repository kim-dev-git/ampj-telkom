<template>
    <v-flex xs12 sm6 md4 xl3 class="pa-2">
      <v-card id="tool-list-card"
        elevation="0"
        color="grey lighten-4"
        class="py-2 px-4">
        <v-layout class="d-flex align-center">
          <div id="tool-list-card-icon"
            :class="color(tool.type)"
            class="pa-2">
            <v-icon
              color="white">
              {{ icon(tool.type) }}
            </v-icon>
          </div>
          <div id="tool-list-card-text"
            class="ml-3">
            <router-link :to="`/perangkat/${tool.id}`" style="text-decoration: none">
              <span class="font-weight-bold black--text">{{ tool.name }}</span>
            </router-link>
            <v-spacer></v-spacer>
            <span class="text--secondary">{{ tool.qty }}</span>
          </div>
          <v-spacer />
          <v-btn id="tool-list-card-request"
            v-if="user.role === 'Teknisi' || user.role === 'Super Admin'"
            depressed
            rounded
            small
            color="grey lighten-2"
            @click="addToCart()">
            Pesan  
          </v-btn>
          <v-dialog id="tool-list-card-add-stock"
            v-if="user.role === 'Admin Gudang' || user.role === 'Super Admin'"
            v-model="dialog" persistent max-width="300">
            <template v-slot:activator="{ on }">
              <v-btn id="tool-list-card-request"
                depressed
                rounded
                small
                color="grey lighten-2"
                v-on="on">
                Tambah Stok  
              </v-btn>
            </template>
            <v-card class="pa-2">
              <v-card-title class="headline">
                {{ tool.name }}
                <span class="text-1">({{ tool.qty }})</span>
              </v-card-title>
              <v-card-text>
                <v-text-field flat filled solo v-model="qty" label="Tambah stok" type="number" :disabled="loading" />
              </v-card-text>
              <v-card-actions class="mt-n12 mr-4 pb-4">
                <v-spacer></v-spacer>
                <v-btn outlined color="info" text @click="dialog = false" :disabled="loading">Batal</v-btn>
                <v-btn color="info" @click="addStock(tool.id)" :loading="loading" :disabled="valid">Tambah</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-card>
    </v-flex>
  </v-skeleton-loader>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: [
    'tool'
  ],
  data: () => ({
    qty: null,
    dialog: null
  }),
  computed: {
    ...mapGetters([
      "loading", "user"
    ]),
    valid () {
      return this.qty === null && !this.loading
    }
  },
  methods: {
    ...mapActions("cart", ["addToolToCart"]),
    addToCart() {
      this.addToolToCart({
        uid: this.$store.state.user.uid,
        tool: this.tool
      })
    },
    addStock(id) {
      const qty = this.qty
      console.log(id, qty)
      this.$store.dispatch('tool/addStock', { id, qty }).then(() => {
        this.dialog = null
        this.qty = null
      })
    },
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
    }
  }
}
</script>

<style>

</style>