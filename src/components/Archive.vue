<template>
	<div class="archive-container fadeInUp animated delay">
		<section class="archive-item" v-for = "yearItem in yearItems">
			<h2>{{yearItem.year}}</h2>
			<ul class="archive-year-list">
				<li class="article-item" v-for = "article in yearItem.articles">
					<span class="post-info">{{article.date | getDay}}</span>
					<h4 class="post-title-link" @click="detail(article.id)">{{article.title}}</h4>
				</li>
				<hr>
			</ul>
		</section>
	</div>
	
</template>
<script>
	export default {
		data() {
			return{
				yearItems:[]
			}
		},
		filters: {
			// getYear: (value) => {
			// 	let d = new Date(value);
			// 	return d.getFullYear();
			// },
			getDay: (value) => {
				
				let d = new Date(value);
				console.log(d);
				// value = parseInt(value);
				return `${d.getMonth() + 1}月${d.getDate()}日`;
				// let month = value.slice(4,6);
				// let day = value.slice(6,8);
				// return `${month}月${day}日`
			}
		},
		created() {
			this.$http.get('http://123.206.19.251:3000/articles')
				.then((res) => {
					let items = res.body;
					let yearSplit = [];
					items = items.sort((a, b) => {return b - a});
					// console.log(yearSplit);
					let yearTemp = {year:"",articles:[]};
					for (let i = 0; i < items.length; i++) {
						if(i == 0) {
							yearTemp.year = items[0].date.slice(0,4);
							yearTemp.articles.push(items[0]);
							console.log(yearTemp);
						} else {
							if(items[i].date.slice(0,4) != items[i - 1].date.slice(0,4)){
								yearSplit.push(yearTemp);
								
								yearTemp.article = [];
								yearTemp.year = items[i].date.slice(0,4);
							} else {
								yearTemp.articles.push(items[i]);
								console.log(yearTemp);
							}
						}
					}
					if(yearTemp.article != []){
						yearSplit.push(yearTemp);
					}
					// for (let i = 0; i < items.length; i++) {
					// 	console.log(items[i]);
					// 	items[i].articles.sort((a, b) => {
					// 		return new Date(b.date) - new Date(a.date);
					// 	});
					// }
					this.yearItems = yearSplit;
				}, (err) => {
					console.log(err);
				});
		},
	    methods:{
	      detail(id) {
	        this.$router.push(`/article?id=${id}`);
	      }
	    }
	}
</script>
<style lang="sass">
	@import "../../static/style/Archive.scss";
</style>