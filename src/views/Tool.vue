<template>
  <div id="tool">
    {{ tool }}
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

export default {
  props: [
    'id'
  ],
  computed: {
    ...mapState("tool", ["tool"]),
    ...mapGetters(["loading"])
  },
  methods: {
    ...mapActions("tool", ["getTool" ])
  },
  mounted() {
    this.getTool(this.id)
  }
}
</script>

<style>

</style>