<template>
  <div id="app">
    <m-title/>
    <router-view/>
  </div>
</template>

<script>
import mTitle from './components/Title'
export default {
  components: {
    mTitle
  }
}
</script>

<style lang="scss">
// @import '../../style/background.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #191a1bbd;
  height: 100vh;
  background-color: rgb(240, 243, 248);
}
</style>
