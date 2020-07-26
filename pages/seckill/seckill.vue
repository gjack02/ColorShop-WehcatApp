<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
				<image src="/static/home-ms.png" mode="aspectFill" style="width: 125upx;height: 37upx"></image>
			</block>
		</custom>
		<scroll-view scroll-x class="bg-white nav MsTab" scroll-with-animation :scroll-left="MsScrollLeft">
			<view class="cu-item" :class="index==MsTabCur?item.state==0?'bg-black cur':item.state==1?'bg-orange cur':item.state==2?'bg-pink cur':'bg-brown cur':''"
			 v-for="(item,index) in msNav" :key="index" @tap="MsSelect" :data-id="index">
				<view class="time">{{item.time}}</view>
				<view class="text">{{item.text}}</view>
			</view>
		</scroll-view>
		<!-- 缩略图单列 -->
		<view class="cu-card goods no-card">
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

	</view>
</template>

<script>
	export default {
		data() {
			return {
				MsTabCur: 2,
				MsScrollLeft: 0,
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
			}
		},
		methods: {
			MsSelect(e) {
				this.MsTabCur = e.currentTarget.dataset.id;
				this.MsScrollLeft = (e.currentTarget.dataset.id - 1) * 40
			},

		}
	}
</script>

<style>

</style>
