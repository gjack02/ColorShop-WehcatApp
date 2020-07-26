<template>
	<view>
		<custom bgColor="bg-orange" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">每日新品</block>
		</custom>
		<view class="bg-orange">
			<image src="https://image.weilanwl.com/qhShop/mrsx01.jpg" mode="widthFix" class="response"></image>
			<!-- 缩略图卡片单列 -->
			<view class="cu-card goods">
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
			toGoodsDetail() {
				uni.navigateTo({
					url: '/pages/goodsdetail/goodsdetail'
				});
			}

		}
	}
</script>

<style>

</style>
