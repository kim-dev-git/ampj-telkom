<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: .5
    }"
    transition="fade-transition"
  >
    <div id="tool-list"
      class="mt-2">
      <span class="subtitle-1 font-weight-bold ml-4 text--disabled">{{ title }}</span>
      <v-layout
        row wrap
        class="mx-2 mx-sm4 mt-0">

        <tool-card v-for="tool in filteredTools(type)" :key="tool.id" :tool="tool" />
        
      </v-layout>
    </div>
  </v-lazy>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import ToolCard from '@/components/ToolCard'

export default {
  props: [
    'title',
    'type'
  ],
  components: {
    ToolCard
  },
  data: () => ({
    isActive: false
  }),
  computed: {
    ...mapState("tool", ["tools"]),
    ...mapGetters(["loading"]),
    show() {
      var show = null
      
      if(this.tools.length > 0)
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
    filteredTools(type) {
      return this.tools.filter(function (el) {
        return el.type === type
      })
    }
  },
  mounted() {
    //
  }
}
</script>

<style>

</style>