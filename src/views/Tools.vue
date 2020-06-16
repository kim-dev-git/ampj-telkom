<template>
  <div id="tools">
    <navbar @print="print = true" />
    <bottom-nav />
    <div id="tools-loadng" v-if="!show">
      Loading
    </div>
    <div id="tools-content" v-else>
      <tool-list title="Modem" type="modem" />
      <tool-list title="Fiber" type="fiber" />
      <tool-list title="Lainnya" type="etc" />
    </div>
    <report v-if="print"
      :headers="headers"
      :table="tools"
      title="Laporan Stok Perangkat" />
  </div>
</template>

<script>
import report from '@/components/Report/Default'
import { mapState, mapGetters } from "vuex"
import ToolList from "@/components/ToolList"

import Navbar from '@/components/Navbar/Mobile/Navbar'
import BottomNav from '@/components/Navbar/Mobile/BottomNav'

export default {
  components: {
    report,
    ToolList,
    BottomNav,
    Navbar
  },
  data: () => ({
    print: false,
    headers: [
      { text: 'Nama Perangkat', value: 'name' },
      { text: 'Jenis', value: 'type' },
      { text: 'Stok', value: 'qty' },
      { text: '', value: 'action' },
    ]
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
}
</script>

<style>

</style>