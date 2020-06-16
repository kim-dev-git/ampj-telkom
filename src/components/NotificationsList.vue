<template>
  <div id="notifications-list"><notification-message v-for="notification in notifications" :key="notification.id" :notification="notification" />
  </div>
</template>

<script>
import NotificationMessage from "./NotificationMessage"

export default {
  components: {
    NotificationMessage
  },
  computed: {
    notifications() {
      return this.$store.state.notifications
    }
  }
}
</script>

<style>
  #notifications-list {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 15;
    width: 360px;
  }
</style>