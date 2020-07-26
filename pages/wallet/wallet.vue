<template>
	<view>
		<custom bgColor="text-white" :isBack="true" :hasHeight="false">
			<block slot="backText">返回</block>
			<block slot="content">我的钱包</block>
		</custom>
		<view class="bg-img text-white" style="background-image: url(https://image.weilanwl.com/qhShop/walletBg.jpg);" :style="[{paddingTop:CustomBar+'px'}]">
			<view class="padding text-center">
				<view class="text-sl"> <text class="text-xxl text-price"></text> 2000</view>
				<view class="margin-top-xs"> 当前总资产</view>
			</view>
			<view class="walletHead">
				<navigator hover-class="none" class="flex-sub">
					<view class='text-xxl text-light'>200</view>
					<view class="text-sm margin-top-xs">可提现</view>
				</navigator>
				<navigator hover-class="none" class="flex-sub">
					<view class='text-xxl text-light'>300</view>
					<view class="text-sm margin-top-xs">已提现</view>
				</navigator>
				<image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-black response"></image>
			</view>
		</view>
		<view class="cu-list menu sm-border">
			<navigator url="/pages/wallet/payment" hover-class="none"  class="cu-item arrow">
				<view class="content">
					<text class="icon-refund text-blue"></text>
					<text class="text-grey">转账</text>
				</view>
			</navigator>
			<navigator url="/pages/wallet/cashOut" hover-class="none"  class="cu-item arrow">
				<view class="content">
					<text class="icon-sponsor text-green"></text>
					<text class="text-grey">提现</text>
				</view>
			</navigator>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="icon-titles text-orange"></text>
				业绩奖
			</view>
		</view>
		<view class="cu-list menu-avatar solid-top">
			<view class="cu-item" v-for="(item,index) in 4" :key="index">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">文晓港</view>
						<view class="cu-tag round bg-orange sm">会员</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							2019年07月01日13:28:49
						</view>
					</view>
				</view>
				<view class="action">
					<text class="text-price text-orange">15.00</text>
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
			}
		},
		methods: {

		}
	}
</script>

<style>
	.walletHead {
		position: relative;
		padding: 30upx 0 60upx;
		display: flex;
		text-align: center;
		border-radius: 10upx;
	}

	.walletHead image {
		position: absolute;
		width: 100%;
		height: 100upx;
		bottom: 0;
	}
</style>
