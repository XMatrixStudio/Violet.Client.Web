<template>
  <div id="app">
    <nav-bar :selected="path" />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/Nav'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      path: 'home'
    }
  },
  watch: {
    '$route' (to, from) {
      this.path = to.name
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  min-width: 850px;
  width: 100%;
  overflow: auto;
  padding: 0;
  margin: 0;
}
</style>
