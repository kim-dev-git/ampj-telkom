<template>
  <div id="filter">
    <v-combobox
      v-model="filterBy"
      :items="getFilterBy"
      @change="filterValue = null"
      item-text="text"
      item-value="value"
      placeholder="Filter berdasarkan"
      prepend-inner-icon="mdi-filter"
      clearable
      dense
      outlined
    />
    <v-combobox
      v-if="filterBy"
      v-model="filterValue"
      :items="getFilterValue"
      placeholder="Filter"
      prepend-inner-icon="mdi-filter-outline"
      class="mt-n4"
      clearable
      dense
      outlined
    />
    <v-text-field
      v-model="filterDate"
      type="month"
      label="Bulan"
      class="mt-n4"
      clearable
      dense
      outlined
    />
  </div>
</template>

<script>
export default {
  props: [
    'headers',
    'items',
  ],
  data: () => ({
    filterDate: null,
    filterBy: null,
    filterValue: null,
    filtered: []
  }),
  computed: {
    getFilterBy() {
      const form = [...this.headers]
      for(var i = form.length -1; i >= 0; i--) {
        if(form[i].value === 'createdAt' || form[i].value === 'action') {
          form.splice(i, 1)
        }
      }
      return form
    },
    getFilterValue() {
      if (!this.filterBy) {
        return this.items
      }
      const arr = []
      const filter = this.filterBy.value
      const data = [...this.items]
      data.forEach(d => {
        if(!arr.includes(d[filter])) {
          arr.push(d[filter])
        }
      })
      // console.log('arr', arr)
      return arr
    },
  },
  watch: {
    filterValue: {
      immediate: true,
      handler() {
        if(this.filterValue) {
          const filterValue = this.filterValue
          const filterBy = this.filterBy
          const filtered = this.filtered.filter(v => {
            return v[filterBy.value] === filterValue
          })
          this.$emit('input', filtered)
          this.filtered = filtered
        } else {
          this.$emit('input', this.items)
          this.filtered = this.items
          return this.filtered
        }
      }
    },
    filterDate() {
      if(!this.filterDate) {
        this.$emit('input', this.filtered)
      } else {

        const arr = []
        const filterDate = this.filterDate

        this.filtered.filter(v => {
          if(v.createdAt) {
            const date = new Date(v.createdAt.seconds * 1000)
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            var monthString = month.toString()
            if(monthString.length === 1) {
              monthString = '0' + month
            }
            const filter = year + '-' + monthString

            if(filter === filterDate) {
              arr.push(v)
            }
          }
        })
        this.$emit('input', arr)
      }
    },
  },
  mounted() {
    this.filtered = this.items
    this.$emit('input', this.items)
  }
}
</script>

<style>

</style>