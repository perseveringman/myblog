<template>
  <div class="main-content ">
    <section class="blog-intro " >
      <h1>Ryan's Blog</h1>
      <p>Nothing diminishes anxiety faster than action.</p>
    </section>
    <section class="article-list fadeInUp animated delay">
      <div class="article-container">
        <div class="article-item">
          <a href="#">
            <img src="../../static/img/small2.jpg" alt="">
          </a>
          <a href="#">
            <h2>Opinion: Mobile camera apps have reached saturation point</h2>

          </a>
          <div class="blog-item__author">
              <em class="by">by</em>
              <span>Cameron Smith</span>
          </div>
          <p>Quantitative vs. qualitative disrupt paradigm ideate user story parallax user story prototype hacker. Steve Jobs entrepreneur human-centered design parallax parallax cortado waterfall is so 2000 and late SpaceTeam unicorn workflow ship it integrate latte.</p>
          <hr>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  @import "../../static/style/articleList.scss";
</style>
