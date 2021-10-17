<template>
  <div id="app">
    <app-navigation></app-navigation>
    <v-content>
    <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
  import Navigation from "./pages/Navigation";
  export default {
    components: {
      'app-navigation': Navigation
    },
    name: 'app',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App',
      // link: '<a href="#">Link</a>'
    }
  },
    computed: {
      loadedNews() {
        return this.$store.getters.loadedNews
      },
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
