<template>
	<nav class="navbar" >
		<div class="navbar-container">
			<div class="navbar-img">
				<router-link to="/">
					<span></span>
				</router-link>
			</div>
				
	    	<ul>
	    		<li><router-link to="/">blog</router-link></li>
	    		<li><router-link to="/archive">archive</router-link></li>
	    		<li><router-link to="/about">about</router-link></li>
	    		<li><a href="#">github</a></li>
	    	</ul>
	    	<div class="li-border"></div>
	    </div>
	</nav>
</template>

<style scoped lang="sass">
	@import "../../static/style/appNav.scss";
</style>