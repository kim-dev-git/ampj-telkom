<template>
  <div>
    <v-card flat v-if="$vuetify.breakpoint.smAndUp">
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        class="elevation-0 mb-4"
      >

        <!-- Header text -->
        <!--<template #header="{ props }">
          <tr>
            <td v-for="data in headers">
              {{ data.text }}
            </td>
          </tr>
        </template>-->

        <!-- Row data -->
        <template #item="props">
          <tr>
            <td v-for="header in headers">
              {{ props.item[header.value] }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <list v-else :items="items" />

  </div>
</template>

<script>
import { mapState } from "vuex"
import list from './List'
export default {
  components: {
    list,
  },
  props: [
    'items',
    'headers'
  ],
  computed: {
    ...mapState(["search"])
  },
  methods: {
    clickItem(id) {
      this.$router.push(`permintaan/${id}`)
    },
    status(status) {
      var color = null
      if (status === 'Belum')
        color = 'warning'
      else if (status === 'Sudah')
        color = 'info'
      else if (status === 'Ready')
        color = 'success'
      else if (status === 'Selesai')
        color = 'grey lighten-2'

      return color
    }
  }

}
</script>

<style lang="scss">
  .status {
    border-radius: 4px;
  }
</style>
