<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">所有评论</block>
		</custom>
		<view class="cu-card dynamic no-card">
			<view class="cu-item solid-top" v-for="(card,id) in 3" :key="id">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view>
								<view class="text-cut" style="width: 200upx">
									wenxiaoasdsadsa
								</view>
								<view class='margin-left-xs'>
									<text v-for="(star,rating) in 5" :key="rating" :class="rating<3?'icon-favorfill text-orange':'icon-favor text-gray'"></text>
								</view>
							</view>
							<view class="text-gray text-sm flex justify-between">
								规格：【XL 80-100斤】 颜色：893黑色
							</view>
						</view>
					</view>
				</view>
				<view class="text-content">
					折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
				</view>
				<view class="grid flex-sub padding-lr col-3 grid-square padding-bottom">
					<view class="bg-img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
					 v-for="(item,index) in 5" :key="index">
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
		onLoad() {
		},
		methods: {
		
		}
	}
</script>

<style>

</style>
