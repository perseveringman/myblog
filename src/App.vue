<template>
  <div id="app">
<!--     <img src="./assets/logo.png">
    <hello></hello> -->
    <app-nav>
    </app-nav>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appNav from './components/appNav';
import appFooter from './components/appFooter';
export default {
  name: 'app',
  components: {
    appNav,
    appFooter
  }
}
</script>

<style lang="scss">
@import "../static/style/common.scss";
@import "../static/style/animate.scss";
</style>
