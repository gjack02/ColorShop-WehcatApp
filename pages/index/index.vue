<template>
	<view>
		<view class="launchScreen"></view>
		<home :style="{ display: PageCur == 'home' ? '' : 'none' }"></home>
		<find :style="{ display: PageCur == 'find' ? '' : 'none' }"></find>
		<sort :style="{display:PageCur=='sort'?'':'none'}"></sort>
		<earn :style="{ display: PageCur == 'earn' ? '' : 'none' }"></earn>
		<shop :style="{ display: PageCur == 'shop' ? '' : 'none' }" :scrollTop="scrollTop"></shop>
		<cart :style="{ display: PageCur == 'cart' ? '' : 'none' }"></cart>
		<my :style="{ display: PageCur == 'my' ? '' : 'none' }" :scrollTop="scrollTop"></my>

		<view class="cu-bar tabbar foot bg-filter solid-top">
			<view class="action" @tap="NavChange" data-cur="home" :class="PageCur == 'home' ? 'text-orange' : 'text-gray'">
				<view class="text-shadow" :class="PageCur == 'home' ? 'icon-homefill cur text-orange' : 'icon-home'"></view>
				<view>首页</view>
			</view>
			<view class="action" @tap="NavChange" data-cur="find" :class="PageCur == 'find' ? 'text-orange' : 'text-gray'">
				<view class="text-shadow" :class="PageCur == 'find' ? 'icon-discoverfill cur text-orange' : 'icon-discover'"></view>
				<view>发现</view>
			</view>
			<view class="action" @tap="NavChange" data-cur="sort" :class="PageCur == 'sort' ? 'text-orange' : 'text-gray'">
				<view class="text-shadow" :class="PageCur == 'sort' ? 'icon-circlefill cur text-orange' : 'icon-circle'"></view>
				<view>分类</view>
			</view>
<!-- 			<view class="action" @tap="NavChange" data-cur="shop" :class="PageCur == 'shop' ? 'text-orange' : 'text-gray'" v-if="isShoper">
				<view class="text-shadow" :class="PageCur == 'shop' ? 'icon-choicenessfill cur text-orange' : 'icon-choiceness'"></view>
				<view>云店</view>
			</view>
			<view class="action" @tap="NavChange" data-cur="earn" :class="PageCur == 'earn' ? 'text-orange' : 'text-gray'" v-else>
				<view class="text-shadow" :class="PageCur == 'earn' ? 'icon-choicenessfill cur text-orange' : 'icon-choiceness'"></view>
				<view>开店</view>
			</view> -->
			<view class="action" @tap="NavChange" data-cur="cart" :class="PageCur == 'cart' ? 'text-orange' : 'text-gray'">
				<view class="text-shadow" :class="PageCur == 'cart' ? 'icon-cartfill cur text-orange' : 'icon-cart'"></view>
				<view>购物车</view>
			</view>
			<view class="action" @tap="NavChange" data-cur="my" :class="PageCur == 'my' ? 'text-orange' : 'text-gray'">
				<view class="text-shadow" :class="PageCur == 'my' ? 'icon-myfill cur text-orange' : 'icon-my'"></view>
				<view>我的</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			PageCur: 'home',
			isShoper: false,
			scrollTop: 0
		};
	},
	onLoad(e) {
		if (e.cur) {
			this.PageCur = e.cur;
		}
		if (uni.getStorageSync('isShoper')) {
			this.isShoper = true;
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内分享按钮
			console.log(res.target);
		}
		return {
			title: 'ColorShop',
			path: '/pages/index/index'
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		}
	}
};
</script>

<style>
.cu-bar .action {
	background-color: rgba(255, 255, 255, 0) !important;
}
</style>
