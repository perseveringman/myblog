<template>
  <div class="main-content ">
    <section class="blog-intro fadeInUp animated delay" >
      <h1>Ryan's Blog</h1>
      <p>Nothing diminishes anxiety faster than action.</p>
    </section>
    <section :class="['article-list',contentShow]" :style="{visibility:isShow}">
      <div class="article-container">
        <div class="article-item" v-for="article in articles">
          <img :src="article.img" alt="" @click="detail(article.id)">
          <h2 @click="detail(article.id)">{{article.title}}</h2>
          <div class="blog-item__author">
              <em class="by">by</em>
              <span>{{article.author}}</span>
          </div>
          <p>{{article.intro}}</p>
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
        articles: null,
        isAddClass: false,
        isShow: 'hidden'
      }
    },
    computed: {
      contentShow() {
        console.log(this.isAddClass);
        if(this.isAddClass) {
          return{
            fadeInUp: true,
            animated: true,
          }
        }
      }
    },
    created() {
      function checkScroll(){
        let windowH = window.screen.availHeight;
        let scrollSlide = document.body.scrollTop || document.documentElement.scrollTop; 
        console.log(windowH, scrollSlide);
        if(scrollSlide > windowH / 10) {
          this.isAddClass = true;
          this.isShow = 'visible';
          window.removeEventListener('scroll',checkScroll);
        }
      }
      checkScroll = checkScroll.bind(this);
      window.addEventListener('scroll',checkScroll, false);


      this.$http.get('http://123.206.19.251:3000/articles')
          .then((res) => {
            // let arts = JSON.parse(res.body);
            let arts = res.body;
            // arts.sort((a, b) => return new Date(b.date) - new Date(a.date));
            console.log(arts[0],arts[1]);
            this.articles = arts.sort((a, b) => {return new Date(b.date) - new Date(a.date)});
          },(error) => {
            console.log(error);
          });
    },
    methods:{
      detail(id) {
        this.$router.push(`/article?id=${id}`);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  @import "../../static/style/articleList.scss";
</style>
