<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的足迹</block>
		</custom>
		<view class="cu-card goods no-card" v-for="(card,items) in 4" :key="items">
			<view class="padding">
				2019年07月01日
			</view>
			<view class="cu-item bg-white" v-for="(item,index) in 4" :key="index" @tap="toGoodsDetail()">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
				<view class="content">
					<view class="title">
						<view class="text-line2cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view>
					</view>

					<view class="flex align-center margin-top-xs">
						<view class="cu-tag sm line-orange">精选</view>
						<view class="cu-tag sm line-orange">包邮</view>
					</view>
					<view class="flex justify-between align-end margin-top-sm">
						<view class="flex align-end flex-sub">
							<view class=""> <text class="text-price text-red text-xxl">199</text></view>
							<view class="margin-left-xs"> <text class="text-price text-gray text-del text-lg">259</text></view>
						</view>
						<view class="padding-left-xl text-right text-gray text-sm">
							销量 1091 件
						</view>
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

			}
		},
		methods: {

		}
	}
</script>

<style>
	.cu-card.goods.no-card>.cu-item>image {
		width: 200upx;
		height: 200upx;
	}
</style>
