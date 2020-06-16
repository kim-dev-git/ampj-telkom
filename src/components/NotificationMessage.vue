<template>
  <div>
    <v-snackbar
      v-if="notifType === 'snackbar'"
      top
      v-model="active"
      :color="notification.type"
      :timeout="timeout"
    >
      {{ notification.message }}
      <v-btn
        dark
        icon
        @click="snackbar = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-alert
      v-else
      dismissible
      :type="notification.type">
      {{ notification.message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: [
    'notification'
  ],
  data () {
    return {
      notifType: "alert",
      active: true,
      //timeout: 3000, // for snackbar
      timeout: null
    }
  },
  methods: {
    removeNotification() {
      this.$store.dispatch('removeNotification', this.notification)
    }
  },
  created() {
    this.timeout = setTimeout(() => {
      this.removeNotification()
    }, 3000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  }
}
</script>

<style>

</style>