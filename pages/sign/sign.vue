<template>
	<view>
		<custom bgColor="text-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">签到</block>
		</custom>
		<view class="padding-xl text-center">
			<button class="cu-btn line-white round">签到</button>
			<view class="text-white margin-top text-sm">已连续签到12天</view>
		</view>
		<calendar :date="date" :start-date="'2019-3-2'" :end-date="'2019-5-20'" @change="change" @to-click="toClick"></calendar>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				date: '2019-03-10'
			};
		},
		methods: {
			change(e) {
				console.log(e);
			},
			toClick(e) {
				console.log(e);
			}
		}
	}
</script>

<style>
	page {
		background-image: url(https://image.weilanwl.com/qhShop/signBg.jpg);
		background-size: cover;
	}

	calendar {
		margin: 30upx;
		overflow: hidden;
		border-radius: 10upx;
	}

</style>
