<template>
	<view>
		<!-- 头部 -->
		<view class="cu-custom">
			<view class="cu-bar fixed" :style="[{height:CustomBar + 'px',paddingTop:StatusBar + 'px'}]">
				<view class="content text-white" :style="[{top:StatusBar + 'px'}]">升级云店</view>
			</view>
		</view>
		<view class="up-top bg-img" :style="[{paddingTop:(CustomBar + 10) + 'px',backgroundImage:'url(https://image.weilanwl.com/qhShop/upBg.jpg)'}]">
			<view class="up-main">
				<view class="cu-bar">
					<view class="action">
						<text class="icon-radiobox"></text> 升级云店
					</view>
				</view>
				<view class="padding-lr padding-bottom flex align-center">
					<view class="flex-sub">
						<view class="text-xl">
							升级云店 享 <text class="text-xxl margin-lr-xs"> 4 </text> 大权益
						</view>
						<view class="text-lg text-brown">
							各种优惠领到手软
						</view>
					</view>
					<view class="padding-lr">
						<view class="icon-huiyuan text-xsl text-brown"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list home-sort grid col-4 no-border bg-white shadow padding-top">
			<view class="cu-item">
				<view class="cu-avatar lg round bg-brown light">
					<view class="margin-0 icon-ticket"></view>
				</view>
				<text>超值优惠券</text>
			</view>
			<view class="cu-item">
				<view class="cu-avatar lg round bg-brown light">
					<view class="margin-0 icon-tag"></view>
				</view>
				<text>购物有折扣</text>
			</view>
			<view class="cu-item">
				<view class="cu-avatar lg round bg-brown light">
					<view class="margin-0 icon-sponsor"></view>
				</view>
				<text>分享赚返利</text>
			</view>
			<view class="cu-item">
				<view class="cu-avatar lg round bg-brown light">
					<view class="margin-0 icon-group"></view>
				</view>
				<text>邀请有奖励</text>
			</view>
		</view>
		<!-- none -->
	<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
			}
		},
		created() {
		},
		methods: {
			upShop() {
				uni.setStorageSync('isShoper',true)
				uni.navigateTo({
					url:'/pages/index/index?cur=shop'
				})
			}
		}
	}
</script>

<style>
	.up-top {
		padding-left: 30upx;
		padding-right: 30upx;
	}

	.up-main {
		background-image: linear-gradient(45deg, #f7daac, #f6b160);
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
	}
</style>
