<template>
	<view>
		<custom bgColor="bg-white shadow" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">全部分类</block>
		</custom>
		<view class="VerticalBox">
			<view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" :style="[{height:'calc(100vh - '+CustomBar+'px)'}]">
				<view class="cu-item" :class="index==tabCur?'text-orange cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</view>
			<scroll-view class="VerticalMain" scroll-y="" :style="[{height:'calc(100vh - '+CustomBar+'px)'}]">
				<view class="" v-for="(item,index) in list" :key="index" v-if="index == tabCur">
					<view class="padding">
						<view class="cu-title bg-white center-title padding-top">
							<view class="text-bold text-xl">
								{{item.name}}
							</view>
						</view>
					</view>

					<view class="cu-list home-sort grid col-3 no-border">
						<view class="cu-item" v-for="(itemc,indexc) in 12" :key="indexc">
							<view class="cu-avatar lg round bg-orange light">
								<view class="margin-0" :class="'icon-'+ item.icon"></view>
							</view>
							<text>{{item.name}}</text>
						</view>
					</view>

					<view class="padding">
						<view class="cu-title bg-white center-title margin-top padding-top">
							<view class="text-bold text-xl">
								品牌
							</view>
						</view>
					</view>

					<view class="cu-list home-sort grid col-3 no-border">
						<view class="cu-item" v-for="(itemc,indexc) in 9" :key="indexc">
							<view class="cu-avatar lg round bg-orange light">
								<view class="margin-0" :class="'icon-'+ item.icon"></view>
							</view>
							<text>{{item.name}}</text>
						</view>
					</view>

					<view class="padding"></view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				list: [{
					icon: 'goodsnewfill',
					name: '精选'
				}, {
					icon: 'meizhuang',
					name: '个护美妆'
				}, {
					icon: 'shuma',
					name: '手机数码'
				}, {
					icon: 'qiche',
					name: '汽车用品'
				}, {
					icon: 'shipin1',
					name: '休闲食品'
				}, {
					icon: 'shenghuo1',
					name: '居家生活'
				}, {
					icon: 'chaye',
					name: '茶叶茶具'
				}, {
					icon: 'fushi',
					name: '潮流服饰'
				}, {
					icon: 'huiyuan',
					name: '会员专享'
				}],
				tabCur: 0,
				verticalNavTop: 0,
				load: true
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #f1f1f1;
		margin: 0;
		border: none;
		position: relative;
		height: 120upx;
		line-height: 120upx;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #fff;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #FFFFFF;
		flex: 1;
	}

	.cu-list.home-sort.grid {
		padding: 10upx 20upx 0;
	}

	.cu-list.home-sort.grid .cu-item {
		justify-content: center;
		align-items: center;
	}
</style>
