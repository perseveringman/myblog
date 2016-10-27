<template>
	<article class="article-container">
		<!-- <h1 class="article-title">{{article.title}}</h1>
		<div class="article-author">
			<em>by</em>
			<span>{{article.author}}</span>
		</div> -->
		<div class="article-intro fadeInUp animated">
			<div class="article-title">
				<h1>{{article.title}}</h1>
			</div>
			
			<div class="article-author">
				<em>by </em>
				<span>{{article.author}}</span>
			</div>
		</div>
		<div :class="contentShow" :style="{visibility:isShow}">
			<div class="article-banner">
				<img :src="article.img" alt="">
			</div>
			<div class="article-content" v-html="article.content">
				<!-- {{{articles}}} -->
				<h5>A new approach</h5>
	            <p>
	                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
	            </p>
	            <p>
	                Dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
	            </p>
	            <blockquote>
	                “User engagement and experience has become a major focus for any web-based service in recent years”
	            </blockquote>
	            <p>
	                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
	                <a href="#">as evidenced</a>, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
	            </p>
	            <h5>So where to from here then?</h5>
	            <p>
	                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
	            </p>
	            
			</div>
			<hr>
		</div>
		
	</article>
</template>

<script>
var marked = require('../../static/js/marked.min.js');
var hljs = require('highlight.js');
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: false,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
export default {
	data() {
		return {
			isAddClass: false,
			isShow: 'hidden',
			article: {},
			articles: `<p>dd</p>`
		}
	},
	filters: {
		marked
	},
	computed: {
		contentShow() {
			console.log(this.isAddClass);
			if(this.isAddClass) {
				return{
					fadeIn: true,
					animated: true,
				}
			}
		}
	},
	created() {

		document.body.scrollTop ? document.body.scrollTop = 0: document.documentElement.scrollTop = 0; 
		function checkScroll(){
			let windowH = window.screen.availHeight;
			let scrollSlide = document.body.scrollTop || document.documentElement.scrollTop; 
			console.log(windowH, scrollSlide);
			if(scrollSlide > windowH / 5) {
				this.isAddClass = true;
				this.isShow = 'visible';
				window.removeEventListener('scroll',checkScroll);
			}
		}
		checkScroll = checkScroll.bind(this);
		window.addEventListener('scroll',checkScroll, false);

		function getQueryID() {
			let url = location.search;
			let id = url.split('=')[1];
			return id;

		}
		
		this.$http.get(`http://123.206.19.251:3000/article?id=${getQueryID()}`)
          .then((res) => {
          	console.log(res.body);
          	this.article = res.body;
          	console.log(this.article.content);
          	this.article.content = marked(this.article.content);
          	// console.log(hljs);
   //        	hljs.initHighlighting();
   //      	hljs.initHighlighting.called = false;
			// console.log(marked(this.article.content));
            // let arts = JSON.parse(res.body);
            // let items = res.body;
            // // arts.sort((a, b) => return new Date(b.date) - new Date(a.date));
            // let arts = [];
            // console.log(items);
            // for (var i = 0; i < items.length; i++) {
            //   items[i].articles.forEach((x) => arts.push(x));
            // }
            // this.articles = arts.sort((a, b) => {return new Date(b.date) - new Date(a.date)});
          },(error) => {
            console.log(error);
          });
	},
	mounted() {
		// console.log(hljs);
		// hljs.initHighlighting();
  //       hljs.initHighlighting.called = false;
	}
}
</script>
<style lang="sass">
	@import "../../static/style/article.scss";
	@import "../../static/styles/tomorrow-night.css";
</style>