<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的订单</block>
			<block slot="right">
				<view class="action icon-search"></view>
			</block>
		</custom>
		<view class="bg-white nav fixed flex text-center" scroll-with-animation :scroll-left="scrollLeft" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in nav" :key="index"
			 @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</view>
		<view class="nav">
			<view class="cu-item"></view>
		</view>
		<view class="cu-card order no-card">
			<view class="cu-item" v-for="(item,index) in 10" :key="index">
				<view class="cu-bar bg-white">
					<view class="action">
						订单号：13232O23232
					</view>
					<view class="action text-orange">
						交易完成
					</view>
				</view>
				<view class="bg-gray padding-sm flex">
					<image class="radius" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill" style="width:120upx;height:120upx"></image>
					<view class="content">
						<view class="response">
							<view class="text-cut response">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view>
						</view>
						<view class="text-gray">
							x2
						</view>
						<view class="text-xl text-orange text-price">
							158
						</view>
					</view>
				</view>
				<view class="cu-bar solid-bottom solid-top justify-end bg-white">
					<view class="action">
						共2件商品 <text class="text-price">340</text>（免运费）
					</view>
				</view>
				<view class="cu-bar justify-end bg-white margin-bottom">
					<view class="action">
						<button class="cu-btn line-black radius margin-right-xs">查看物流</button>
						<button class="cu-btn line-orange radius">确认收货</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				TabCur: 0,
				nav: ['全部', '待付款', '待发货', '待收货', '待评价'],
			}
		},
		onLoad(e) {
			if (e.nav) {
				this.TabCur = e.nav
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id
			},
		}
	}
</script>

<style>
.cu-card.order .cu-item .content{
	width: 570upx;
	margin-left: 20upx;
}
</style>
