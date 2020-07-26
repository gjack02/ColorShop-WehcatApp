<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单详情</block>
		</custom>
		<!-- 状态 -->
		<view class='bg-orange padding text-center '>
			<view class='text-xxl icon-copy'></view>
			<view class="margin-top-xs">已完成</view>
		</view>
		<!-- 收货信息 -->
		<view class="flex align-center bg-white padding-tb-sm">
			<view class="icon-locationfill text-orange padding text-xxl"></view>
			<view class="flex-sub">
				<view class="text-lg">文晓港 17373728521</view>
				<view class="text-sm text-gray">广东省广州市荔湾区请求翁奥多啥所</view>
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
		<view class="padding bg-white">
			<view class="padding-top padding-bottom-xs flex justify-between solid-top">
				<view class="text-gray">商品总价</view>
				<view class=""><text class="text-price">345</text></view>
			</view>
			<view class="padding-tb-xs flex justify-between">
				<view class="text-gray">运费</view>
				<view class=""><text class="text-price">0</text></view>
			</view>
			<view class="padding-tb-xs flex justify-between">
				<view class="text-gray">购物优惠</view>
				<view class=""><text class="text-price">30</text></view>
			</view>
			<view class="padding-tb flex justify-between">
				<view class="text-gray">合计应付</view>
				<view class=""><text class="text-price text-orange text-xl">375</text></view>
			</view>

			<view class="padding-top padding-bottom-xs flex justify-between solid-top">
				<view class="text-gray">订单号</view>
				<view class="">12312312312</view>
			</view>
			<view class="padding-tb-xs flex justify-between">
				<view class="text-gray">提交时间</view>
				<view class="">2019年07月08日</view>
			</view>
		</view>
		<view class="padding text-center">
			<button class="cu-btn bg-orange shadow margin-lr-sm round"><text class="icon-messagefill margin-right-xs"></text> 备注留言</button>
			<button class="cu-btn bg-green shadow margin-lr-sm round"><text class="icon-servicefill margin-right-xs"></text> 联系客服</button>
		</view>
		<view class="cu-tabbar-height"></view>
		<view class="cu-bar justify-end bg-white foot">
			<view class="action">
				<button class="cu-btn line-black radius margin-right-xs">查看物流</button>
				<button class="cu-btn line-orange radius">确认收货</button>
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
		onLoad(e) {

		},
		methods: {

		}
	}
</script>

<style>
	.flex .content {
		width: 570upx;
		margin-left: 20upx;
	}
</style>
