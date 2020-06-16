<template>
  <div id="cart">
    <v-skeleton-loader id="navbar-avatar"
      class="mx-auto"
      type="avatar"
      :loading="!show"
    >
      <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on }">     
          <div>
            <v-badge
              v-if="cartItemCount > 0"
              color="primary"
              :content="cartItemCount"
              overlap
              bordered
            >
              <v-btn
                icon
                v-on="on"
                height="38"
                width="38"
                class="grey lighten-3"
              >
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-badge>
            <v-btn
              v-else
              icon
              v-on="on"
              height="36"
              width="36"
              class="grey lighten-3 text--primary"
            >
              <v-icon>mdi-cart</v-icon>
            </v-btn>

          </div>   
        </template>
        <v-card
          class="pa-4"
          min-width="240">
          <div
            v-for="item in cart"
            :key="item.tool.id">
            <v-layout 
              v-if="cart.length"
              class="d-flex align-center">
              <div class="mb-n2 mt-2">
                <span class="font-weight-bold">{{ item.tool.name }}</span>
                <p>{{ item.qty }}</p>
              </div>
              <v-spacer />
              <div>
                <v-btn
                  icon
                  small
                  class="grey lighten-3"
                  @click="removeFromCart(item.tool)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-layout>
            <v-divider />
          </div>
          <div
            v-if="cart.length"
            class="d-flex justify-end mt-4">
            <v-btn
              small
              rounded
              depressed
              color="grey lighten-3"
              @click="addNewRequest()">
              Pesan sekarang
              <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
          <div
            v-else
            class="d-flex align-center justify-center text--secondary">
          <v-icon>mdi-flask-empty-off-outline</v-icon>
          <span class="ml-2">Belum ada perangkat yang dipesan.</span>
          </div>
        </v-card>
      </v-menu>
    </v-skeleton-loader>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  computed: {
    ...mapState("cart", ["cart"]),
    ...mapGetters(
      "cart", ["cartItemCount"]
    ),
    ...mapGetters(
      ["loading", "user"]
    ),
    show() {
      var show = null
      var data = this.cart
      
      if(data)
        show = true
      else
        if(this.loading) {
          show = false
        }else{
          show = true
        }

      return show
    },
  },
  methods: {
    ...mapActions(
      "cart", ["removeToolFromCart", "clearCartItems"]
    ),
    removeFromCart(tool) {
      this.removeToolFromCart( { tool, uid: this.$store.state.user.uid })
    },
    clearCart() {
      this.clearCartItems(this.$store.state.user.uid)
    },
    addNewRequest() {
      var data = {
        name: this.user.name,
        team: this.user.team,
        status: "Belum"
      }
      var items = []
      var uid = this.$store.getters.user.uid

      const cart = this.cart
      cart.forEach(item => {
        var obj = {}
        obj.pID = item.tool.id
        obj.pName = item.tool.name
        obj.type = item.tool.type
        obj.qty = item.qty
        items.push(obj)
      })
      this.$store.dispatch('request/addRequest', { data, items, uid })
    }
  }
}
</script>

<style>

</style>