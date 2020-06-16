<template>
  <v-app>
    <v-content
      :class="content">
      <login v-if="currPath === '/masuk'" />
      <component v-else v-bind:is="layout" />
    </v-content>
  </v-app>
</template>

<script>
import login from '@/views/User/Login.vue'

export default {
  name: 'App',

  components: {
    login,
  },

  data: () => ({
  }),
  computed : {
    currPath() {
      return this.$router.currentRoute.path
    },
    layout() {
      var folder = "./views/layouts/"
      var component = null
      if (this.$vuetify.breakpoint.smAndUp)
        component = "Default"
      else
        component = "Mobile"

      //var currPath = this.$router.currentRoute.path
      //if (currPath === '/masuk') {
      //  component = "Login"
      //  folder = "./views/User/"
      //}

			return () => import(`${folder}${component}.vue`)
    },
    content() {
      var x = null
      if (this.currPath === '/masuk')
        x = x + "align-center"
      
      if (this.$vuetify.breakpoint.smAndUp)
        //x = x + " grey lighten-4"
        x = x + " white"
      else
        x = x + " white"

      return x
    }
  },
  mounted () {
    //console.log(this.$router.currentRoute.path)
  }
};
</script>

<style lang="scss">
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
