<template>
	<view class="bg-gradual-purple" style="height: 100vh;">
		<custom bgColor="text-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">邀请有奖</block>
			<block slot="right">
				<view class="action">
					<view class="icon-question"></view>
				</view>
			</block>
		</custom>
		<swiper class="swiper" previous-margin="80px" next-margin="80px" :indicator-dots="false" :circular="true" interval="2000"
		 duration="500" @change="swiperChange" :style="[{height:'calc(100vh - 100px - ' + CustomBar +'px)'}]">
			<swiper-item v-for="(item,index) in 3" :key="index" :class="swiperCur==index?'cur':''">
				<image :src="'https://image.weilanwl.com/qhShop/WechatIMG58'+ (69+index) + '.jpeg'" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="bottom-bar">
			<view class="item">
				<view class="cu-avatar lg round bg-white text-mauve"><text class="icon-LinkDisabled"></text></view>
				<view class="text-sm">复制链接</view>
			</view>
			<view class="item">
				<view class="cu-avatar lg round bg-white text-green"><text class="icon-pic"></text></view>
				<view class="text-sm">分享海报</view>
			</view>
			<view class="item">
				<view class="cu-avatar lg round bg-white text-orange"><text class="icon-qr_code"></text></view>
				<view class="text-sm">二维码直推</view>
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
				swiperCur: 0
			}
		},
		methods: {
			swiperChange(e) {
				this.swiperCur = e.detail.current
			}
		}
	}
</script>

<style>
	.swiper swiper-item {
		padding: 5px;
		display: flex;
		align-items: center;
	}

	.swiper swiper-item image {
		border-radius: 10upx;
		overflow: hidden;
		transform: scale(0.9);
		transition: 0.2s;
	}

	.swiper swiper-item.cur image {
		transform: scale(1);
	}

	.bottom-bar {
		position: fixed;
		width: 100%;
		bottom: 0;
		display: flex;
		justify-content: center;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.15);
		height: 200upx;
		align-items: center;
	}

	.bottom-bar .item {
		padding: 0 40upx;
	}

	.bottom-bar .item .cu-avatar {
		width: 80upx;
		height: 80upx;
		margin-bottom: 10upx;
		font-size: 40upx;
	}
</style>
