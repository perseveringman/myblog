import Vue from 'vue';
import App from './App';
import Home from './components/articleList';
import Archive from './components/Archive';
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';

Vue.config.debug = true;

Vue.use(vueRouter);
Vue.use(vueResource);


const router = new vueRouter(
	{
		mode: 'history',
		base: __dirname,
		routes: [
			{
				path: '/',
				component: Home
			},
			{
				path: '/archive',
				component: Archive
			},
			{
				path: '*',
				redirect: '/'
			}
		]
	})

/* eslint-disable no-new */
const app = new Vue({
	router,
	render: h => h(App)
}).$mount('#app');