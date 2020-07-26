<template>
	<view>
		<!-- 头部 -->
		<view class="cu-custom home-custom" :style="[{height:CustomH + 'px'}]">
			<view class="cu-bar fixed bg-white" :style="style">
				<navigator class="action" url="/pages/notice/notice" hover-class="none">
					<view class="icon-notice">
						<view class="cu-tag badge round">3</view>
					</view>
				</navigator>
				<view class="search-form round" @tap="toSearch">
					<view class="icon-search"></view>
					<input type="text" placeholder="输入商品关键字" disabled></input>
				</view>
				<navigator url="/pages/invita/invita" hover-class="none" class="action">
					<view class="icon-share"></view>
				</navigator>
			</view>
			<!-- 导航栏 -->
			<scroll-view scroll-x class="nav home-nav fixed bg-white" scroll-with-animation :scroll-left="scrollLeft" :style="[{top:CustomBar + 'px'}]">
				<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in nav" :key="index" @tap="tabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
		</view>
		<view class="cu-menu" :style="[{top:CustomBar + 'px'}]" v-if="modalName=='NavMenuModal'" @tap="hideModal">
			<view class="icon-close"></view>
		</view>
		<view class="cu-menu" :style="[{top:CustomBar + 'px'}]" @tap="showModal" v-else data-target="NavMenuModal">
			<view class="icon-cascades"></view>
		</view>
		<view class="cu-modal" :class="modalName=='NavMenuModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="NavMenu cu-list grid col-4 solid-top" :style="[{top:CustomH + 'px'}]">
					<view class="cu-item" :class="index==TabCur?'text-orange':'text-gray'" v-for="(item,index) in nav" :key="index"
					 @tap="tabSelect" :data-id="index">
						<view :class="'icon-' + item.icon"></view>
						<view class="text-sm margin-top-xs">{{item.name}}</view>
					</view>
					<navigator url="/pages/sort/sort" hover-class="none" class="cu-item text-grey">
						<view class="icon-kinds"></view>
						<view class="text-sm margin-top-xs">全部分类</view>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 首屏 -->
		<block v-if="TabCur==0">
			<!-- 轮播图 -->
			<view class="home-swiper">
				<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
				 duration="500" @change="swiper">
					<swiper-item v-for="(item,index) in bannerList" :key="index" :class="cardCur==index?'cur':''">
						<image :src="item.bg" mode="aspectFill" v-if="item.type=='image'" class="swiperBG"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 首屏图标导航 -->
			<view class="cu-list home-icon grid col-4 no-border">
				<navigator :url="item.url" hover-class="none" class="cu-item" v-for="(item,index) in iconList" :key="index">
					<view class="ellipseIcon">
						<image src="/static/up.gif" mode="aspectFill" v-if="item.color == 'pink'"></image>
						<view :class="'icon-' + item.icon"></view>
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
						<view class="icon-ellipse text-shadow" :class="'text-' + item.color"></view>
					</view>
					<text>{{item.name}}</text>
				</navigator>
			</view>

			<!-- 首屏资讯 -->
			<view class="cu-bar bg-white home-zixun">
				<view class="action margin-right-sm">
					<image src="/static/home-zixun.png" mode="aspectFill"></image>
				</view>
				<swiper :circular="true" :indicator-dots="false" vertical :autoplay="true" interval="5000" duration="500" class="solid-left">
					<swiper-item v-for="(item,index) in zixun" :key="index">
						<view class="text-cut">
							<view class="cu-tag line-orange radius">{{item.tag}}</view> {{item.title}}
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!-- 首屏广告 -->
			<view class="padding-bottom padding-lr padding-top-sm bg-white">
				<view class="flex-sub radiusCard">
					<image src="/static/topad1.png" mode="widthFix" style="width: 100%;"></image>
				</view>
				<view class="flex margin-tb-sm">
					<view class="basis-df radiusCard">
						<image src="/static/topaddby.png" mode="widthFix" style="width: 100%;"></image>
					</view>
					<view class="basis-df radiusCard margin-left-sm">
						<image src="/static/topaddxr.png" mode="widthFix" style="width: 100%;"></image>
					</view>
				</view>
				<view class="flex">
					<view class="basis-df radiusCard">
						<image src="/static/toaddjx.png" mode="widthFix" style="width: 100%;"></image>
					</view>
					<view class="basis-df radiusCard margin-left-sm">
						<image src="/static/topaddbk.png" mode="widthFix" style="width: 100%;"></image>
					</view>
				</view>
			</view>

			<!-- 首屏秒杀 -->
			<view class="cu-bar bg-white home-ms margin-top">
				<view class="action">
					<image src="/static/home-ms.png" mode="aspectFill"></image>
					<view class="margin-left" v-if="MsTabCur==2">
						<view class="cu-tag margin-right-xs sm radius bg-black">04</view>:<view class="cu-tag margin-right-xs sm radius bg-black">33</view>:<view
						 class="cu-tag margin-right-xs sm radius bg-black">36</view>
					</view>
				</view>
				<navigator class="action text-gray" url="/pages/seckill/seckill">
					<view>查看更多 <text class="icon-right text-sm"></text></view>
				</navigator>
			</view>
			<scroll-view scroll-x class="bg-white nav MsTab" scroll-with-animation :scroll-left="MsScrollLeft">
				<view class="cu-item" :class="index==MsTabCur?item.state==0?'bg-black cur':item.state==1?'bg-orange cur':item.state==2?'bg-pink cur':'bg-brown cur':''"
				 v-for="(item,index) in msNav" :key="index" @tap="MsSelect" :data-id="index">
					<view class="time">{{item.time}}</view>
					<view class="text">{{item.text}}</view>
				</view>
			</scroll-view>
			<!-- 缩略图单列 -->
			<view class="cu-card goods no-card" v-if="MsTabCur<=2">
				<view class="cu-item bg-white" v-for="(item,index) in 4" :key="index" @tap="toGoodsDetail()">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
					<view class="content">
						<view class="title">
							<view class="text-line2cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view>
						</view>
						<view class="margin-top-xs"> 抢购价：<text class="text-price text-red text-xl">199</text></view>
						<view class="margin-top-xs"> 市场价：<text class="text-price text-gray text-del text-lg">259</text></view>
						<view class="flex justify-between align-end">
							<view class="flex align-center flex-sub">
								<view class="cu-progress round xs margin-right-sm flex-sub">
									<!-- <view class="bg-red" :style="[{ width:loading?'72%':'72%'}]"></view> -->
									<view class="bg-red" style="width:61.8%"></view>
								</view>
								<view class="text-gray text-sm flex-sub">已抢72%</view>
							</view>
							<view class="padding-left-xl text-right">
								<button class="cu-btn bg-orange round shadow sm"><text class="icon-lightfill"> </text>抢购</button>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 缩略图卡片单列 -->
			<view class="cu-card goods" v-if="MsTabCur==3">
				<view class="cu-item bg-white shadow" v-for="(item,index) in 4" :key="index" @tap="toGoodsDetail()">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
					<view class="content">
						<view class="title">
							<view class="text-line2cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view>
						</view>
						<view class="margin-top-xs"> 抢购价：<text class="text-price text-red text-xl">199</text></view>
						<view class="margin-top-xs"> 市场价：<text class="text-price text-gray text-del text-lg">259</text></view>
						<view class="flex justify-between align-end">
							<view class="flex align-center flex-sub">
								<view class="cu-progress round xs margin-right-sm flex-sub">
									<!-- <view class="bg-red" :style="[{ width:loading?'72%':'72%'}]"></view> -->
									<view class="bg-red" style="width:61.8%"></view>
								</view>
								<view class="text-gray text-sm flex-sub">已抢72%</view>
							</view>
							<view class="padding-left-xl text-right">
								<button class="cu-btn bg-orange round shadow sm"><text class="icon-lightfill"> </text>抢购</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 大图卡片单列 -->
			<view class="cu-card goods col-goods" v-if="MsTabCur==4">
				<view class="cu-item shadow bg-white" v-for="(item,index) in 4" :key="index" @tap="toGoodsDetail()">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
					<view class="content">
						<view class="title">
							<view class="text-line2cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view>
						</view>
						<view class="flex align-end margin-top-xs">
							<view class="margin-right-sm"> 抢购价：<text class="text-price text-red text-xl">199</text></view>
							<view class="margin-right-sm"> 市场价：<text class="text-price text-gray text-del text-lg">259</text></view>
						</view>
						<view class="flex justify-between align-end">
							<view class="flex align-center flex-sub">
								<view class="cu-progress round xs margin-right-sm flex-sub">
									<!-- <view class="bg-red" :style="[{ width:loading?'72%':'72%'}]"></view> -->
									<view class="bg-red" style="width:61.8%"></view>
								</view>
								<view class="text-gray text-sm flex-sub">已抢72%</view>
							</view>
							<view class="padding-left-xl text-right">
								<button class="cu-btn bg-orange round shadow"><text class="icon-lightfill"> </text>抢购</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 大图卡片双列 -->
			<view class="cu-card goods col-goods col-twice" v-if="MsTabCur>=5">
				<view class="cu-item shadow bg-white" v-for="(item,index) in 4" :key="index" @tap="toGoodsDetail()">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
					<view class="content">
						<view class="title">
							<view class="text-line2cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view>
						</view>
						<view class="flex align-center margin-top-xs">
							<view class="cu-progress round xs margin-right-sm flex-sub">
								<!-- <view class="bg-red" :style="[{ width:loading?'72%':'72%'}]"></view> -->
								<view class="bg-red" style="width:61.8%"></view>
							</view>
							<view class="text-gray text-sm text-cut">已抢72%</view>
						</view>
						<view class="flex justify-between align-end margin-top-xs">
							<view class="flex align-end">
								<view class="margin-right-sm"> <text class="text-price text-red text-bold text-lg">199</text></view>
								<view class="margin-right-sm"> <text class="text-price text-gray text-del text-sm">259</text></view>
							</view>
							<view class="padding-left-xs text-right">
								<button class="cu-btn bg-orange round sm shadow"><text class="icon-lightfill"> </text>抢购</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 活动热卖 -->
			<view class="cu-title bg-white center-title margin-top padding-top">
				<view class="text-bold text-xl">
					活动热卖
				</view>
				<view class="text-ABC text-orange text-sm">Project activities</view>
			</view>
			<view class="cu-card case bg-white">
				<view class="cu-item shadow" v-for="(item,index) in 4" :key="index">
					<view class="image">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="widthFix"></image>
						<!-- <view class="cu-tag bg-blue">史诗</view> -->
						<view class="bg-black padding-sm flex align-center">
							<view class="flex-sub">
								<view class="text-cut text-lg">全球购海囤运动</view>
								<view class="text-cut">用世界来爱你</view>
							</view>
							<view class="action">
								<button class="cu-btn lines-white round"><text class="margin-right-sm text-sm">抢购价</text> <text class="text-price text-lg">19.99</text></button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 猜你喜欢 -->
			<view class="cu-title center-title margin-top">
				<view class="text-bold text-xl">
					猜你喜欢
				</view>
				<view class="text-ABC text-orange text-sm">Guess you like</view>
			</view>
			<view class="cu-card goods col-goods col-twice">
				<view class="cu-item shadow bg-white" v-for="(item,index) in 4" :key="index" @tap="toGoodsDetail()">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
					<view class="content">
						<view class="title">
							<view class="text-line2cut">玻尿酸补水面膜26ml*5片 抗皱淡化皱纹</view>
						</view>
						<view class="flex align-center margin-top-xs">
							<view class="cu-tag sm line-orange">精选</view>
							<view class="cu-tag sm line-orange">包邮</view>
						</view>
						<view class="flex justify-between align-end margin-top-xs">
							<view class="flex align-end">
								<view class="margin-right-sm"> <text class="text-price text-red text-bold text-lg">199</text></view>
								<view class="margin-right-sm"> <text class="text-price text-gray text-del text-sm">259</text></view>
							</view>
							<view class="padding-left-xs text-right text-gray text-sm">
								售22件
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-load margin-bottom" :class="!isLoad?'loading':'over'"></view>
		</block>

		<block v-if="TabCur==(navIndex+1)" v-for="(navitem,navIndex) in nav" :key="navIndex">
			<!-- 子分类轮播图 -->
			<view class="home-swiper">
				<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
				 duration="500" @change="swiper">
					<swiper-item v-for="(item,index) in bannerList" :key="index" :class="cardCur==index?'cur':''">
						<image :src="item.bg" mode="aspectFill" v-if="item.type=='image'" class="swiperBG"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 子分类导航 -->
			<view class="cu-list home-sort grid col-4 no-border">
				<view class="cu-item" v-for="(item,index) in 8" :key="index">
					<view class="cu-avatar lg round bg-orange light">
						<view class="margin-0" :class="'icon-'+ nav[TabCur].icon"></view>
					</view>
					<text>{{nav[TabCur].name}}</text>
				</view>
			</view>

			<!-- 精选推荐 -->
			<view class="cu-title center-title margin-top">
				<view class="text-bold text-xl">
					精选推荐
				</view>
				<view class="text-ABC text-orange text-sm">Recommend</view>
			</view>
			<view class="cu-card goods col-goods col-twice">
				<view class="cu-item shadow bg-white" v-for="(item,index) in 4" :key="index">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
					<view class="content">
						<view class="title">
							<view class="text-line2cut">玻尿酸补水面膜26ml*5片 抗皱淡化皱纹</view>
						</view>
						<view class="flex align-center margin-top-xs">
							<view class="cu-tag sm line-orange">精选</view>
							<view class="cu-tag sm line-orange">包邮</view>
						</view>
						<view class="flex justify-between align-end margin-top-xs">
							<view class="flex align-end">
								<view class="margin-right-sm"> <text class="text-price text-red text-bold text-lg">199</text></view>
								<view class="margin-right-sm"> <text class="text-price text-gray text-del text-sm">259</text></view>
							</view>
							<view class="padding-left-xs text-right text-gray text-sm">
								售22件
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-load margin-bottom" :class="!isLoad?'loading':'over'"></view>
		</block>

		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				modalName: null,
				TabCur: 0,
				MsTabCur: 2,
				scrollLeft: 0,
				MsScrollLeft: 0,
				isLoad: false,
				nav: [{
					icon: 'goodsnewfill',
					name: '精选'
				}, {
					icon: 'meizhuang',
					name: '个护美妆'
				}, {
					icon: 'shuma',
					name: '手机数码'
				}, {
					icon: 'qiche',
					name: '汽车用品'
				}, {
					icon: 'shipin1',
					name: '休闲食品'
				}, {
					icon: 'shenghuo1',
					name: '居家生活'
				}, {
					icon: 'chaye',
					name: '茶叶茶具'
				}, {
					icon: 'fushi',
					name: '潮流服饰'
				}, {
					icon: 'huiyuan',
					name: '会员专享'
				}],
				msNav: [{
					time: '00:00',
					state: 0,
					text: '已开抢'
				}, {
					time: '08:00',
					state: 0,
					text: '已开抢'
				}, {
					time: '16:00',
					state: 1,
					text: '正在抢购'
				}, {
					time: '20:00',
					state: 2,
					text: '即将开抢'
				}, {
					time: '00:00',
					state: 3,
					text: '明日预告'
				}, {
					time: '08:00',
					state: 3,
					text: '明日预告'
				}, {
					time: '16:00',
					state: 3,
					text: '明日预告'
				}, {
					time: '20:00',
					state: 3,
					text: '明日预告'
				}, ],
				cardCur: 0,
				bannerList: [{
					id: 0,
					type: 'image',
					bg: '/static/banner-1.png'
				}, {
					id: 1,
					type: 'image',
					bg: '/static/banner-1.png'
				}, {
					id: 2,
					type: 'image',
					bg: '/static/banner-1.png'
				}],
				iconList: [{
					icon: 'goodsnewfill',
					color: 'orange',
					badge: 0,
					name: '每日新品',
					url: '/pages/newGoods/newGoods'
				}, {
					icon: 'crownfill',
					color: 'blue',
					badge: 0,
					name: '会员专享',
					url: '/pages/vipGoods/vipGoods'
				}, {
					icon: 'countdownfill',
					color: 'mauve',
					badge: 0,
					name: '秒杀专场',
					url: '/pages/seckill/seckill'
				}, {
					icon: 'noticefill',
					color: 'pink',
					badge: 0,
					name: '升级云店',
					url: '/pages/index/index?cur=earn'
				}],
				zixun: [{
					title: '不管这世界阴晴圆缺只愿和春天有个约会,管这世界阴晴圆缺只愿和春天有个约会',
					tag: '生活主题',
					url: ''
				}, {
					title: '不管这世界阴晴圆缺只愿和春天有个约会,管这世界阴晴圆缺只愿和春天有个约会',
					tag: '居家攻略',
					url: ''
				}, {
					title: '不管这世界阴晴圆缺只愿和春天有个约会,管这世界阴晴圆缺只愿和春天有个约会',
					tag: '周边好货',
					url: ''
				}],
			}
		},
		name: 'home',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			},
			CustomH() {
				return this.CustomBar + uni.upx2px(100)
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.modalName = null;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			MsSelect(e) {
				this.MsTabCur = e.currentTarget.dataset.id;
				this.MsScrollLeft = (e.currentTarget.dataset.id - 1) * 40
			},
			swiper(e) {
				this.cardCur = e.detail.current
			},
			HomeTouchstart(e) {
				this.touch = e.changedTouches[0].pageX
			},
			HomeTouchend(e) {
				console.log(e.changedTouches[0].pageX - this.touch)
				if (e.changedTouches[0].pageX - this.touch > 120 && this.TabCur > 0) {
					this.TabCur = this.TabCur - 1;
				}
				if (e.changedTouches[0].pageX - this.touch < -120 && this.TabCur < this.nav.length - 1) {
					this.TabCur = this.TabCur + 1
				}
				this.scrollLeft = this.TabCur * 40
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
			toGoodsDetail() {
				uni.navigateTo({
					url: '/pages/goodsdetail/goodsdetail'
				});
			}
		}
	}
</script>

<style>
	.home-custom .cu-bar .action:first-child>view {
		margin: 0;
	}

	.home-custom .cu-bar .action>view {
		position: relative;
		font-size: 38upx !important;
	}

	.home-custom .cu-bar .action>view .cu-tag.badge {
		top: -15upx;
		right: -15upx;
	}

	.home-custom .search-form input {
		height: 40upx;
		line-height: 40upx;
	}

	.cu-menu {
		width: 100upx;
		height: 100upx;
		position: fixed;
		right: 0;
		z-index: 1127;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cu-menu view {
		border-left: 1upx solid #dedede;
		width: 90upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		font-size: 40upx;
	}

	.NavMenu {
		background-color: #FFFFFF;
		position: fixed;
		width: 100%;
		left: 0;
		z-index: 1025;
	}

	.home-swiper {
		position: relative;
		overflow: hidden;
	}

	.home-swiper::after {
		content: "";
		position: absolute;
		width: 100vw;
		height: 35upx;
		background-position: 0 0;
		background-repeat: no-repeat;
		background-size: 100%;
		bottom: 0;
		left: 0;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAjCAYAAADL9I+JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NGQzMGQyMi04MjhhLTU3NGYtOWMzNi1mMjcxZDVlM2UzZjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTgzQTBDN0U4MDAyMTFFOTg4RTJBQTU5QTU5NEI0RDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTgzQTBDN0Q4MDAyMTFFOTg4RTJBQTU5QTU5NEI0RDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4OWVjZWZjYS05ZTNiLWEzNDctODYxNy0yOTRjMjMwZmZhNTkiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5ZmQ3MTE1My01ODRiLTJmNDEtODljZS1hZmYxZjYwMGY2ZDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Ugb+HAAACY0lEQVR42uzd3U4bMRAG0KRAaaFpy+P3KfkppZRCFy/yCGvVJJPdoCTiHMkXaIxX8gX6vJ4V867rZgAAwH77YAsAAEBwBwAABHcAABDcAQAAwR0AABDcAQBAcAcAAAR3AABAcAcAAMEdAAAQ3AEA4D06tgWwV87KOP3PAfvbhN9f5iI571MZn5Nzv5cxT8z7WMZ5cs2vZRwl/54tkmt+KeMkMe+oPn+bez+v+7SLve/KuEqu97uM++Tcq7r2On/KuEuueVPGU2Le3zJuk2v+LOMxMe+pPj/jVxkPiXlvtfeXyXmb7P11Gf8m/D7wRuZd19kFDvnguVgSxoaBa2ztvIbMKbVh8F5VAzgEbbh/qAeYTK09kI2tDQ9rY2vZgxwI7uxE++bypAbWTG0xe72dGVsbhuyxteybUgDIWhXqH+vPU2u39TlTasPboFU1BHdmr29W2+vuuKKO8NuGy/5tanxLMGwPGFtrQ/aq2jBIAwDvQ9vGNQz12Vp/c3I9sRYHkXhO2zYWbXbZ1jjB/UCDewTjaDnoe0D7XtC+v/SsCawRstt2hItBMI63u7Fm9KlGb2kE4036ZwEA2EzcWMQhIL73iG8s4mYkDgPtASG+94hWrVgrbiXu6jr3dd1ox9rkO5mDDe5jgnGE7HXBOPNGGwAAtiVzI7DNg0Ws2bY7pYL7j9nyVo9lb7QBAIDtWHcj8HKw6IO7JncAANhz/gETAAAI7gAAgOAOAACCOwAAILgDAACCOwAACO4AAIDgDgAACO4AACC4AwAAgjsAAAjuAACA4A4AAAjuAAAguAMAADv0LMAATLPU0q2EiksAAAAASUVORK5CYII=);
	}

	.home-swiper swiper .uni-swiper-dots,
	.home-swiper swiper .a-swiper-dots,
	.home-swiper swiper .wx-swiper-dots {
		bottom: 35upx;
	}

	.home-swiper .screen-swiper {
		height: 400upx;
	}

	.home-swiper .swiperBG {
		position: relative;
	}

	.home-zixun {
		min-height: 80upx;
	}

	.home-zixun image {
		width: 63upx;
		height: 37upx;
	}

	.home-zixun swiper {
		flex: 1;
		height: 50upx;
		line-height: 50upx;
		padding: 0 30upx;
	}

	.home-zixun swiper .cu-tag {
		font-size: 24upx;
		height: 40upx;
		padding: 0 10upx;
		margin-right: 15upx;
	}

	.radiusCard {
		border-radius: 10upx;
		overflow: hidden;
		background-color: transparent;
	}

	.radiusCard image {
		display: block;
	}

	.home-ms {
		min-height: 80upx;
	}

	.home-ms image {
		width: 125upx;
		height: 37upx;
	}
</style>
