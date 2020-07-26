<template>
	<view>
		<custom bgColor="bg-white" :isTitle="true">
			<block slot="title">
				<view class="text-xl">购物车</view>
			</block>
			<block slot="right">
				<view class="action" v-if="cartGoods.length!=0">
					<button class="cu-btn bg-red round shadow">编辑</button>
				</view>
			</block>
		</custom>
		<abnor :px="-1" name="NoCart" title="购物车空空如也" v-if="cartGoods.length==0">
			<block slot="btn"><button class="cu-btn bg-orange round shadow margin-top">去看看</button></block>
		</abnor> 
		<view class="" v-else>
			
		</view>
		<view class="cu-title center-title margin-top">
			<view class="text-bold text-xl">
				猜你喜欢
			</view>
			<view class="text-ABC text-orange text-sm">Guess you like</view>
		</view>
		
		<view class="cu-card goods col-goods col-twice">
			<view class="cu-item shadow bg-white" v-for="(item,index) in 4" :key="index">
				<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
				<view class="content">
					<view class="title">
						<view class="text-line2cut">玻尿酸补水面膜26ml*5片 抗皱淡化皱纹</view>
					</view>
					<view class="flex align-center margin-top-xs">
						<view class="cu-tag sm line-orange">精选</view>
						<view class="cu-tag sm line-orange">包邮</view>
					</view>
					<view class="flex justify-between align-end margin-top-xs">
						<view class="flex align-end">
							<view class="margin-right-sm"> <text class="text-price text-red text-bold text-lg">199</text></view>
							<view class="margin-right-sm"> <text class="text-price text-gray text-del text-sm">259</text></view>
						</view>
						<view class="padding-left-xs text-right text-gray text-sm">
							售22件
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-load margin-bottom" :class="!isLoad?'loading':'over'"></view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartGoods: [],
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
