<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">提现</block>
		</custom>
		<view class="text-center padding-top-xl">
			<text>余额:</text>
			<text class="text-price margin-left"></text>
			<text class="text-xxl">12,000</text>
		</view>
		<view class="bg-white padding-sm margin radius flex shadow align-center">
			<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
			<view class="flex-sub margin-left">
				文晓港的微信
			</view>
			<view class="icon-right"></view>
		</view>
		<view class="bg-white padding margin radius shadow">
			<view class="text-xxl">
				提现金额
			</view>
			<view class="padding-top-sm padding-bottom-sm solid-bottom flex align-center">
				<view class="text-price text-xxl"></view>
				<input type="number" value="" placeholder="最低2元起提" class="response flex-sub  margin-lr" />
				<button class="cu-btn line-orange shadow sm">全部</button>
			</view>
		</view>
		<view class="padding-lr text-sm">
			手续费：¥1.00,预计一个工作日到账
		</view>
		<view class="padding-top-xl padding-lr-xl">
			<view class="padding-lr-xl">
				<button class="cu-btn bg-orange shadow round lg block ">确定提现</button>
			</view>
		</view>
		<view class="footnav text-center text-grey">
			<navigator hover-class="none" class="padding-lr-sm">
				<view class="text-sm margin-top-xs">联系客服</view>
			</navigator>
			<navigator hover-class="none" url="/pages/wallet/detail?type=1" class="padding-lr-sm solid-left">
				<view class="text-sm margin-top-xs">提现记录</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style>

</style>
