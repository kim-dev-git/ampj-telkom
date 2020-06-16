<template>
  <div class="home">
    <tools v-if="currentPath === '/'" />
    <router-view v-else />
  </div>
</template>

<script>
import Tools from "@/views/Tools"

export default {
  name: 'Home',
  components: {
    Tools
  },
  computed: {
    currentPath() {
      return this.$route.path
    }
  }
}
</script>
