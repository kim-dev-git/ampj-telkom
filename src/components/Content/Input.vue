<template>
  <div id="input">
    <div v-for="config in configs" :key="config.value">
      <v-text-field v-if="config.type === 'text' || config.type === 'email' || config.type === 'password' || config.type === 'number'"
        :type="config.type"
        :label="config.label"
        v-model="config.value"
        class="mt-n2" />
      <v-combobox v-else-if="config.type === 'combobox'"
        :label="config.label"
        :items="config.option"
        v-model="input.value"
        class="mt-n2" />
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'configs' ]
}
</script>

<style>

</style>