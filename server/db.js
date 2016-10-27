var mongoose = require('mongoose');
var	Schema = mongoose.Schema,
	//在Schma里定义数据类型
	BlogPost = new Schema({
		id : Number,
		title : String,
		author : String,
		intro : String,
		img : String,
		date: Date,
		content: String
	});

mongoose.Promise = global.Promise; // 不写这句会有个warning
mongoose.connect('mongodb://127.0.0.1:27017/myblog');
mongoose.set('debug', true);

//将该Schema发布为Model
mongoose.model('Article',BlogPost);

//Articles为model name
var Article = mongoose.model('Article');
// var article = new Articles({
//     id : 1,
// 	title : "Opinion: Mobile camera apps",
// 	author : "Cameron Smith",
// 	intro : "Quantitative vs. qualitative disrupt paradigm ideate user story parallax user story prototype hacker. Steve Jobs entrepreneur human-centered design parallax parallax cortado waterfall is so 2000 and late SpaceTeam unicorn workflow ship it integrate latte.",
// 	img : "../../static/img/small2.jpg",
// 	date: Date.now(),
// 	content: `## <center>VR研究周报</center>
// 				<center>周延博&nbsp;&nbsp;&nbsp;&nbsp;2016/07/08</center>
// 				### 一周成果简述
// 				- 入门Three.js
// 				- 研究将video绘制到canvas上的原理
// 				- 初步做出了VR视频转换为360全景视频的demo

// 				演示demo需要起一个服务器打开

// 				### three.js使用入门`
// });

var db = mongoose.connection;
db.on('error', function () {
    console.log('error')
});
db.once('open', function () {
    console.log('opened')
	// book.save(function (err) {
 //                    console.log('save status:',err ? 'failed' : 'success');
 //                })
	// var Articles = mongoose.model('Book');
	// console.log(Book.find({}, function(err, docs){}));
});

module.exports = Article;