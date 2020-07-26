<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">转账</block>
		</custom>
		<view class="text-center padding-top-xl">
			<text>余额:</text>
			<text class="text-price margin-left"></text>
			<text class="text-xxl">12,000</text>
		</view>
		<view class="bg-white margin radius flex shadow align-center">
			<view class="cu-form-group">
				<view class="title">账户</view>
				<input placeholder="请输入账号" name="input"></input>
			</view>
		</view>
		<view class="bg-white padding margin radius shadow">
			<view class="text-xxl">
				转账金额
			</view>
			<view class="padding-top-sm padding-bottom-sm solid-bottom flex align-center">
				<view class="text-price text-xxl"></view>
				<input type="number" value="" placeholder="请输入转账金额" class="response flex-sub  margin-lr" />
			</view>
		</view>
		<view class="padding-lr text-sm">
			手续费：¥0.00,预计一个工作日到账
		</view>
		<view class="padding-top-xl padding-lr-xl">
			<view class="padding-lr-xl">
				<button class="cu-btn bg-orange shadow round lg block ">确定转账</button>
			</view>
		</view>
		<view class="footnav text-center text-grey">
			<navigator hover-class="none" class="padding-lr-sm">
				<view class="text-sm margin-top-xs">联系客服</view>
			</navigator>
			<navigator hover-class="none" url="/pages/wallet/detail?type=0" class="padding-lr-sm solid-left">
				<view class="text-sm margin-top-xs">转账记录</view>
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
