const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('./db');
// var article1 = {
// 	id : "1",
// 	title : "Opinion: Mobile camera apps",
// 	author : "Cameron Smith",
// 	intro : "Quantitative vs. qualitative disrupt paradigm ideate user story parallax user story prototype hacker. Steve Jobs entrepreneur human-centered design parallax parallax cortado waterfall is so 2000 and late SpaceTeam unicorn workflow ship it integrate latte.",
// 	img : "../../static/img/small2.jpg",
// 	date: "20160925",
// 	content: `## <center>VR研究周报</center>
// <center>周延博&nbsp;&nbsp;&nbsp;&nbsp;2016/07/08</center>
// ### 一周成果简述
// - 入门Three.js
// - 研究将video绘制到canvas上的原理
// - 初步做出了VR视频转换为360全景视频的demo

// 演示demo需要起一个服务器打开

// ### three.js使用入门

// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;three.js是JavaScript编写的WebGL第三方库，引用该库，主要为了完成将视频的每一帧做成360度全景图的任务。下面将介绍如何使用该库。（如果想先了解整个视频的原理和完成情况可以忽略该部分，直接从360全景部分看起）  
// ##### 三要素
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在Three.js中，要渲染物体到网页中，我们需要3个要素：场景（scene）、相机（camera）和渲染器（renderer）。
// 创建这三要素的代码如下：
    
//     // 场景 
// 	var scene = new THREE.Scene();  
	
// 	// 透视相机 
// 	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); 
	
// 	// 渲染器
// 	var renderer = new THREE.WebGLRenderer();   
// 	renderer.setSize(window.innerWidth, window.innerHeight); 
	
// 	 // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
// 	document.body.appendChild(renderer.domElement);
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;渲染器renderer的domElement元素，表示渲染器中的画布，所有的渲染都是画在domElement上的，所以这里的appendChild表示将这个domElement挂接在body下面，这样渲染的结果就能够在页面中显示了。
	
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;透视相机的参数解释如下：

// 	//THREE.PerspectiveCamera(fov, aspect, near, far)
//     //fov为视景体竖直方向上的张角。aspect等于width / height，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例。           
//     //near和far分别是照相机到视景体最近、最远的距离，均为正值，且far应大于near。 
    

// ##### 添加物体到场景中
	
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;添加一个物体到场景中，首先需要定义一个物体，然后定义它的材质，这里我们的需求是将每一帧作为贴图贴在物体上，使用了一个普通的材质THREE.MeshBasicMaterial，材质中有一个map属性，可以直接接受纹理,通过给map属性赋值可以替换贴图。之后再定义一个网格模型，参数为物体和材质，再将这个模型放入场景中。以下是示例代码

// 	//定义一个球体
// 	geometry = new THREE.SphereGeometry( 500, 60, 40 );
	
// 	//定义材质
// 	material = new THREE.MeshBasicMaterial({
// 		map: new THREE.TextureLoader().load( '1.png' )
// 	} );
// 	//定义网格模型
// 	mesh = new THREE.Mesh( geometry, material );
// 	//将网格模型添加到场景中
// 	scene.add( mesh );
	

	
// ##### 渲染循环
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因为需要将一帧一帧图片连起来变成动画，我们需要用实时渲染来不停的对画面进行渲染。而实现这个功能最重要的函数是requestAnimationFrame，这个函数就是让浏览器去执行一次参数中的函数，每次在执行完renderer.render(scene, camera)函数，渲染结束后，会调用requestAnimationFrame()函数，requestAnimationFrame()函数又让rander()再执行一次，就形成了实时循环。

// 	function animate() {
// 		//这里写一些操作
// 		renderer.render( scene, camera );
// 		requestAnimationFrame( animate );
// 	}

// ### 360全景
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在大概清楚了如何使用three.js制作简单的场景之后，开始着手实现360全景，首先是要建立一个模型：
// ##### 建立模型
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;想要将一张从vr拍摄的视频中的单帧图片变成360全景，首先想到的是将整张图片包围在一个球体上，所以这里建立一个球体模型：

// 	//定义一个球体
// 	geometry = new THREE.SphereGeometry( 500, 60, 40 );
	
// ##### 贴图
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;建立好模型后，需要将图片贴在模型上，由于最终的目标是实现360全景视频播放，所以贴图的代码应该写在动画函数中，每次获得图片时都执行一遍贴图
	
// 	material.map.image= imgTemp;
// 	material.map.needsUpdate = true;	

// 上文提到过，给map属性赋值实现贴图，并使贴图可更新

// ##### 相机视角
// 通过给相机camera添加target属性（没有查询到这个属性，应该是新建的属性，临时用来表示视角）表示当前相机观察的视角，并通过相机的lookAt方法将camera对象的观察点始终保持在视角上。而具体的点就应该是球面上的每一个点，根据球坐标系和直角坐标系的转换，得到球面的点的公式是：

// 	x=rsinθcosφ
// 	y=rsinθsinφ
// 	z=rcosθ

// 据此写出表示相机视角的代码：
	
// 	camera.target.x = 500* Math.sin( phi ) * Math.cos( theta );
// 	camera.target.y = 500* Math.cos( phi );
// 	camera.target.z = 500* Math.sin( phi ) * Math.sin( theta );
// 	//使相机观察的焦点为之前计算出的位置
// 	camera.lookAt( camera.target );
// ### 鼠标或手指滑动改变视角
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这里通过绑定鼠标/手指点下、滑动、放开的三个事件，来计算移动过的距离。这里主要维护的两个变量是lat,lon。当点下时记录当前的点的x，y坐标，当滑动时计算差值得到lat（y方向差值），lon（x方向差值）。得到差值再乘上0.1，得到一个大概在－100到＋100以内的值，并判断是否在（－85，85）范围内，不在就取临界值（不取90的原因是90时会出现非常扭曲的情况，所以只取到85）。用这两个处理过的值作为xoz平面的偏移角度和y轴垂直方向上的偏移角度，弧度化后带入坐标公式，得到改变的视角。
	
// 	onPointerDownPointerX = event.clientX;
// 	onPointerDownPointerY = event.clientY;
// 	...
// 	lon = ( onPointerDownPointerX - event.clientX ) *0.1+ onPointerDownLon;
// 	lat = ( event.clientY - onPointerDownPointerY ) *0.1+ onPointerDownLat;
// 	...
// 	lat = Math.max( - 85, Math.min( 85, lat ) );
// 	phi = THREE.Math.degToRad( 90- lat );
// 	//水平方向角度
// 	theta = THREE.Math.degToRad( lon );
	

// ### video绘制到canvas并转换成img
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据烨哥给的例子：[HTML5 Screenshots](http://techslides.com/demos/video/dragdrop-video-screenshot.html )，借鉴其中的截屏代码，搬过来使用：

// 	//新建一个canvas标签
// 	var canvas1 = document.createElement("canvas");
// 	//取得当前的宽高
// 	var w = v.clientWidth ;
// 	var h = v.clientHeight ;
// 	canvas1.width = w;
// 	canvas1.height = h;
// 	var context = canvas1.getContext('2d');
// 	context.drawImage(v,0,0,w,h);
// 	//将canvas转换成base64格式的image
// 	var imgSrc = canvas1.toDataURL();
// 	var imgTemp = new Image();
// 	imgTemp.src=imgSrc;
	
// ### 仍需解决的问题
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现在的demo还存在很多问题：

// 1. 渲染出的画面很卡，需要进一步优化
// 2. 每次替换贴图报警告：image is not a power of two(某个尺寸)，resized to 某个尺寸。（性能的瓶颈很可能在这里，怀疑是THREE.MeshBasicMaterial的map属性应用不正确，需要进一步研究）
// 3. 需要自制一个播放的进度条
// 4. 需要实现尺寸可控，同时可全屏
// 5. 需要将代码改造成单例模式，封装成库


// ### 学习资料

// [从0到1学习three.js（1）](https://segmentfault.com/a/1190000004303208)（写的不错，比较短，可以读一遍感受一下）  
// [three.js入门指南中文版](http://www.ituring.com.cn/minibook/792)（毕业才一年的前端工作者，在校期间完成的翻译，膜拜）  
// [webgl中文网](http://www.hewebgl.com/)  （初级教程免费，后面的教程收费，好贵。。。初级的写的通俗易懂）  
// [three.js源码解析](http://blog.csdn.net/column/details/omni360threejs.html)（CSDN上的博客，完成了大部分的源码解析，虽然不是很详细，但可以当作查阅api的资料）  
// [three.js源码解析](http://www.cnblogs.com/yiyezhai/archive/2012/11/29/2791319.html)（另一个源码解析博客，没细看）  
// [learning-threejs](https://github.com/josdirksen/learning-threejs)（外国的教程，英语捉急，效率比较低，所以没有学习，但以前看英文教程的经历来说，国外的教程都很靠谱，可以尝试）  
// [极客学院three.js课程](http://www.jikexueyuan.com/course/threejs/)（极客学院的three.js课程，很基础很基础，几十分钟就看完了，不过这个网站还有很多其他的技术视频，我有个免费体验vip账号，你们有需要的话可以找我要来看）








// 	`
// }
// var article2 = {
// 	id : "2",
// 	title : "Opinion: Mobile camera apps ",
// 	author : "Cameron Smith",
// 	intro : "Quantitative vs. qualitative disrupt paradigm ideate user story parallax user story prototype hacker. Steve Jobs entrepreneur human-centered design parallax parallax cortado waterfall is so 2000 and late SpaceTeam unicorn workflow ship it integrate latte.",
// 	img : "../../static/img/small1.jpg",
// 	date: "20160915",
// 	content: `## <center>VR研究周报</center>
// <center>周延博&nbsp;&nbsp;&nbsp;&nbsp;2016/07/08</center>
// ### 一周成果简述
// - 入门Three.js
// - 研究将video绘制到canvas上的原理
// - 初步做出了VR视频转换为360全景视频的demo

// 演示demo需要起一个服务器打开

// ### three.js使用入门

// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;three.js是JavaScript编写的WebGL第三方库，引用该库，主要为了完成将视频的每一帧做成360度全景图的任务。下面将介绍如何使用该库。（如果想先了解整个视频的原理和完成情况可以忽略该部分，直接从360全景部分看起）  
// ##### 三要素
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在Three.js中，要渲染物体到网页中，我们需要3个要素：场景（scene）、相机（camera）和渲染器（renderer）。
// 创建这三要素的代码如下：
    
//     // 场景 
// 	var scene = new THREE.Scene();  
	
// 	// 透视相机 
// 	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); 
	
// 	// 渲染器
// 	var renderer = new THREE.WebGLRenderer();   
// 	renderer.setSize(window.innerWidth, window.innerHeight); 
	
// 	 // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
// 	document.body.appendChild(renderer.domElement);
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;渲染器renderer的domElement元素，表示渲染器中的画布，所有的渲染都是画在domElement上的，所以这里的appendChild表示将这个domElement挂接在body下面，这样渲染的结果就能够在页面中显示了。
	
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;透视相机的参数解释如下：

// 	//THREE.PerspectiveCamera(fov, aspect, near, far)
//     //fov为视景体竖直方向上的张角。aspect等于width / height，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例。           
//     //near和far分别是照相机到视景体最近、最远的距离，均为正值，且far应大于near。 
    

// ##### 添加物体到场景中
	
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;添加一个物体到场景中，首先需要定义一个物体，然后定义它的材质，这里我们的需求是将每一帧作为贴图贴在物体上，使用了一个普通的材质THREE.MeshBasicMaterial，材质中有一个map属性，可以直接接受纹理,通过给map属性赋值可以替换贴图。之后再定义一个网格模型，参数为物体和材质，再将这个模型放入场景中。以下是示例代码

// 	//定义一个球体
// 	geometry = new THREE.SphereGeometry( 500, 60, 40 );
	
// 	//定义材质
// 	material = new THREE.MeshBasicMaterial({
// 		map: new THREE.TextureLoader().load( '1.png' )
// 	} );
// 	//定义网格模型
// 	mesh = new THREE.Mesh( geometry, material );
// 	//将网格模型添加到场景中
// 	scene.add( mesh );
	

	
// ##### 渲染循环
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因为需要将一帧一帧图片连起来变成动画，我们需要用实时渲染来不停的对画面进行渲染。而实现这个功能最重要的函数是requestAnimationFrame，这个函数就是让浏览器去执行一次参数中的函数，每次在执行完renderer.render(scene, camera)函数，渲染结束后，会调用requestAnimationFrame()函数，requestAnimationFrame()函数又让rander()再执行一次，就形成了实时循环。

// 	function animate() {
// 		//这里写一些操作
// 		renderer.render( scene, camera );
// 		requestAnimationFrame( animate );
// 	}

// ### 360全景
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在大概清楚了如何使用three.js制作简单的场景之后，开始着手实现360全景，首先是要建立一个模型：
// ##### 建立模型
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;想要将一张从vr拍摄的视频中的单帧图片变成360全景，首先想到的是将整张图片包围在一个球体上，所以这里建立一个球体模型：

// 	//定义一个球体
// 	geometry = new THREE.SphereGeometry( 500, 60, 40 );
	
// ##### 贴图
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;建立好模型后，需要将图片贴在模型上，由于最终的目标是实现360全景视频播放，所以贴图的代码应该写在动画函数中，每次获得图片时都执行一遍贴图
	
// 	material.map.image= imgTemp;
// 	material.map.needsUpdate = true;	

// 上文提到过，给map属性赋值实现贴图，并使贴图可更新

// ##### 相机视角
// 通过给相机camera添加target属性（没有查询到这个属性，应该是新建的属性，临时用来表示视角）表示当前相机观察的视角，并通过相机的lookAt方法将camera对象的观察点始终保持在视角上。而具体的点就应该是球面上的每一个点，根据球坐标系和直角坐标系的转换，得到球面的点的公式是：

// 	x=rsinθcosφ
// 	y=rsinθsinφ
// 	z=rcosθ

// 据此写出表示相机视角的代码：
	
// 	camera.target.x = 500* Math.sin( phi ) * Math.cos( theta );
// 	camera.target.y = 500* Math.cos( phi );
// 	camera.target.z = 500* Math.sin( phi ) * Math.sin( theta );
// 	//使相机观察的焦点为之前计算出的位置
// 	camera.lookAt( camera.target );
// ### 鼠标或手指滑动改变视角
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这里通过绑定鼠标/手指点下、滑动、放开的三个事件，来计算移动过的距离。这里主要维护的两个变量是lat,lon。当点下时记录当前的点的x，y坐标，当滑动时计算差值得到lat（y方向差值），lon（x方向差值）。得到差值再乘上0.1，得到一个大概在－100到＋100以内的值，并判断是否在（－85，85）范围内，不在就取临界值（不取90的原因是90时会出现非常扭曲的情况，所以只取到85）。用这两个处理过的值作为xoz平面的偏移角度和y轴垂直方向上的偏移角度，弧度化后带入坐标公式，得到改变的视角。
	
// 	onPointerDownPointerX = event.clientX;
// 	onPointerDownPointerY = event.clientY;
// 	...
// 	lon = ( onPointerDownPointerX - event.clientX ) *0.1+ onPointerDownLon;
// 	lat = ( event.clientY - onPointerDownPointerY ) *0.1+ onPointerDownLat;
// 	...
// 	lat = Math.max( - 85, Math.min( 85, lat ) );
// 	phi = THREE.Math.degToRad( 90- lat );
// 	//水平方向角度
// 	theta = THREE.Math.degToRad( lon );
	

// ### video绘制到canvas并转换成img
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据烨哥给的例子：[HTML5 Screenshots](http://techslides.com/demos/video/dragdrop-video-screenshot.html )，借鉴其中的截屏代码，搬过来使用：

// 	//新建一个canvas标签
// 	var canvas1 = document.createElement("canvas");
// 	//取得当前的宽高
// 	var w = v.clientWidth ;
// 	var h = v.clientHeight ;
// 	canvas1.width = w;
// 	canvas1.height = h;
// 	var context = canvas1.getContext('2d');
// 	context.drawImage(v,0,0,w,h);
// 	//将canvas转换成base64格式的image
// 	var imgSrc = canvas1.toDataURL();
// 	var imgTemp = new Image();
// 	imgTemp.src=imgSrc;
	
// ### 仍需解决的问题
// &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现在的demo还存在很多问题：

// 1. 渲染出的画面很卡，需要进一步优化
// 2. 每次替换贴图报警告：image is not a power of two(某个尺寸)，resized to 某个尺寸。（性能的瓶颈很可能在这里，怀疑是THREE.MeshBasicMaterial的map属性应用不正确，需要进一步研究）
// 3. 需要自制一个播放的进度条
// 4. 需要实现尺寸可控，同时可全屏
// 5. 需要将代码改造成单例模式，封装成库


// ### 学习资料

// [从0到1学习three.js（1）](https://segmentfault.com/a/1190000004303208)（写的不错，比较短，可以读一遍感受一下）  
// [three.js入门指南中文版](http://www.ituring.com.cn/minibook/792)（毕业才一年的前端工作者，在校期间完成的翻译，膜拜）  
// [webgl中文网](http://www.hewebgl.com/)  （初级教程免费，后面的教程收费，好贵。。。初级的写的通俗易懂）  
// [three.js源码解析](http://blog.csdn.net/column/details/omni360threejs.html)（CSDN上的博客，完成了大部分的源码解析，虽然不是很详细，但可以当作查阅api的资料）  
// [three.js源码解析](http://www.cnblogs.com/yiyezhai/archive/2012/11/29/2791319.html)（另一个源码解析博客，没细看）  
// [learning-threejs](https://github.com/josdirksen/learning-threejs)（外国的教程，英语捉急，效率比较低，所以没有学习，但以前看英文教程的经历来说，国外的教程都很靠谱，可以尝试）  
// [极客学院three.js课程](http://www.jikexueyuan.com/course/threejs/)（极客学院的three.js课程，很基础很基础，几十分钟就看完了，不过这个网站还有很多其他的技术视频，我有个免费体验vip账号，你们有需要的话可以找我要来看）








// 	`
// }
let articles = [];

// router.get('/article', function(req, res, next) {
// 	res.send(articles);
// });
router.get('/articles', function(req, res, next) {
	// console.log(db.find({}, function(err, docs){}));
	db.find({}, (err, result) => {
            if(err) return console.log(err);
            console.log(result);
            articles = result;
            console.log('articles:' + articles);
            res.send(result);
        })
	// articles.push(Articles.find({}, function(err, docs){}));
	// res.send(articles);
});
router.get('/article', function(req, res, next) {
	var id = req.query.id;
	for (var i = 0; i < articles.length; i++) {
		if(articles[i].id == id) { 
			res.send(articles[i]);
			return
		}
	}
});
module.exports = router;
