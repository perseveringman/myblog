<template>
  <div id="app">
<!--     <img src="./assets/logo.png">
    <hello></hello> -->
    <app-nav>
    </app-nav>
    <app-nav :class="['fix',navShow]" :style="{display:isShow}">
    </app-nav>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appNav from './components/appNav';
import appFooter from './components/appFooter';
export default {
  data() {
    return {
      isAddClass: 0,
      isShow: 'none'

    }
  },
  name: 'app',
  components: {
    appNav,
    appFooter
  },
  computed: {
    navShow() {
      if(this.isAddClass == "1") {
        return{
          fadeInDown: true,
          animated_5: true,
          fadeOutUp: false
        }
      } else if(this.isAddClass == "2") {
        return{
          fadeInDown: false,
          animated_5: true,
          fadeOutUp: true,
        }
      }
    }
  },
  created() {

    function showNav() {
      let windowH = window.screen.availHeight;
      let scrollSlide = document.body.scrollTop || document.documentElement.scrollTop;
      if(scrollSlide > windowH / 1.5){
        this.isShow = 'block';
        this.isAddClass = "1";
        window.removeEventListener('scroll',showNav);
        window.addEventListener('scroll',checkScrollZero, false);
      }
    }
    function checkScrollZero(){
      let windowH = window.screen.availHeight;
      let scrollSlide = document.body.scrollTop || document.documentElement.scrollTop;
      if(scrollSlide < windowH / 1.5 && scrollSlide) {
        // alert('ah');
        this.isAddClass = "2";
        window.removeEventListener('scroll',checkScrollZero);
        window.addEventListener('scroll',showNav, false);
      } else if(!scrollSlide) {
        this.isShow = 'none';
      }
    }
    showNav = showNav.bind(this);
    checkScrollZero = checkScrollZero.bind(this);
    window.addEventListener('scroll',showNav, false);
    
  }
}
</script>

<style lang="scss">
@import "../static/style/common.scss";
@import "../static/style/animate.scss";
@import "../static/style/app.scss";
</style>
