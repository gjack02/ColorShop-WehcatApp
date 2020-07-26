<template>
	<view>
		<custom :transparent="true" :top="scrollTop" :isBack="true">
			<block slot="right">
				<navigator class="action roundIcon" url="/pages/notice/notice" hover-class="none">
					<view class="icon-notice">
						<view class="cu-tag badge round"></view>
					</view>
				</navigator>
			</block>
		</custom>
		<!-- 头部 -->
		<view class="bg-custom">
			<view class="topImg">
				<image src="https://hbimg.huabanimg.com/a93f35df96eb6fd176313decd3c27ade7b71c7c378630-l6CXXd_fw658" mode="aspectFill"
				 :style="[{height:topImgH + 'px'}]"></image>
			</view>
			<view class="my-detail">
				<view class="cu-avatar round lg" :style="[{backgroundImage: 'url(https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf)'}]"></view>
				<view class="padding-top-xl padding-lr-xl">
					<view class="text-bold text-xl margin-bottom-xs">
						文晓港
					</view>
					<navigator class="flex align-center justify-between text-gray" url="/pages/textEdit/textEdit?type=mydesc"
					 hover-class="none">
						<view class="text-sm">
							你还没有填写个人简介哦~
						</view>
						<view class="icon-edit text-lg"></view>
					</navigator>
				</view>
				<view class="padding-lr padding-tb-sm flex">
					<navigator url="/pages/find/userlist?type=follow" class="bg-gray flex-sub radius text-center padding-sm margin-xs"
					 hover-class="none">
						<view class="text-xl text-bold">3</view>
						<view class="text-sm text-gray margin-top-xs">
							我的关注 <text class="icon-right"></text>
						</view>
					</navigator>
					<navigator url="/pages/find/userlist?type=fans" class="bg-gray flex-sub radius text-center padding-sm margin-xs"
					 hover-class="none">
						<view class="text-xl text-bold">3</view>
						<view class="text-sm text-gray margin-top-xs">
							关注我的 <text class="icon-right"></text>
						</view>
					</navigator>
					<view class="bg-gray flex-sub radius text-center padding-sm margin-xs">
						<view class="text-xl text-bold">3</view>
						<view class="text-sm text-gray margin-top-xs">
							获赞
						</view>
					</view>
				</view>
			</view>
			<view class="nav bg-white shadow home-nav text-center">
				<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in nav" :key="index" @tap="tabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</view>
			<view class="nav bg-white shadow home-nav fixed text-center" v-if="fixed" :style="[{top:(CustomBar - 2) + 'px'}]">
				<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in nav" :key="index" @tap="tabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 瀑布流 -->
		<block v-if="TabCur==0">
			<block v-if="publishList.length!=0">
				<view class="findCard bg-gray">
					<view class="cu-card goods col-goods" v-for="(card,id) in publishList" :key="id">
						<view class="cu-item shadow bg-white" v-for="(item,index) in card" :key="index">
							<image :src="item.imgUrl" mode="widthFix"></image>
							<view class="content">
								<view class="title">
									<view class="text-line2cut">{{item.title}}</view>
								</view>
								<view class="flex justify-between align-center margin-top-xs">
									<view class="flex align-center">
										<view class="cu-avatar sm round" :style="[{backgroundImage:'url(' + item.avatar + ')'}]"></view>
										<view class="text-cut text-sm flex-sub">{{item.name}}</view>
									</view>
									<view class="padding-left-xs text-right flex align-centers">
										<view :class="item.isFavor?'icon-appreciatefill text-red':'icon-appreciate text-gray' "></view>
										<view class="text-gray text-sm margin-left-xs">{{item.favor}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-load margin-bottom" :class="!isLoad?'loading':'over'"></view>
			</block>
			<abnor :px="CustomBar" upx="100" v-else></abnor>
		</block>
		<block v-if="TabCur==1">
			<block v-if="likesList.length!=0">
				<view class="findCard bg-gray">
					<view class="cu-card goods col-goods" v-for="(card,id) in likesList" :key="id">
						<view class="cu-item shadow bg-white" v-for="(item,index) in card" :key="index">
							<image :src="item.imgUrl" mode="widthFix"></image>
							<view class="content">
								<view class="title">
									<view class="text-line2cut">{{item.title}}</view>
								</view>
								<view class="flex justify-between align-center margin-top-xs">
									<view class="flex align-center">
										<view class="cu-avatar sm round" :style="[{backgroundImage:'url(' + item.avatar + ')'}]"></view>
										<view class="text-cut text-sm flex-sub">{{item.name}}</view>
									</view>
									<view class="padding-left-xs text-right flex align-centers">
										<view :class="item.isFavor?'icon-appreciatefill text-red':'icon-appreciate text-gray' "></view>
										<view class="text-gray text-sm margin-left-xs">{{item.favor}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-load margin-bottom" :class="!isLoad?'loading':'over'"></view>
			</block>
			<abnor :px="CustomBar" upx="0" v-else bg="bg-gray"></abnor>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				modalName: null,
				fixed: false,
				scrollTop:0,
				topImgH: 200,
				TabCur: 0,
				nav: [{
					name: '我的发布'
				}, {
					name: '我赞过的'
				}],
				scrollLeft: 0,
				isLoad: false,
				likesList: [],
				publishList: [
					[{
						title: '英国的"外科医生"，竟然把nike运动服改造成了高级定制西装',
						imgUrl: 'https://hbimg.huabanimg.com/c2b3a8aff0df4a7e4c65ad06404278c20020802adf63d-fre8vM_fw658',
						avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
						name: '盒子芥末',
						isFavor: false,
						favor: 333
					}, {
						title: '英国的"外科医生"，竟然把nike运动服改造成了高级定制西装',
						imgUrl: 'https://hbimg.huabanimg.com/a93f35df96eb6fd176313decd3c27ade7b71c7c378630-l6CXXd_fw658',
						avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
						name: '盒子芥末',
						isFavor: true,
						favor: 333
					}, {
						title: '英国的"外科医生"，竟然把nike运动服改造成了高级定制西装',
						imgUrl: 'https://hbimg.huabanimg.com/d500eab4467f91bcde88782f19a8336c2b81ce75bdb1a-kedNbr_fw658',
						avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
						name: '盒子芥末',
						isFavor: true,
						favor: 333
					}, {
						title: '英国的"外科医生"，竟然把nike运动服改造成了高级定制西装',
						imgUrl: 'https://hbimg.huabanimg.com/d500eab4467f91bcde88782f19a8336c2b81ce75bdb1a-kedNbr_fw658',
						avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
						name: '盒子芥末',
						isFavor: true,
						favor: 333
					}],
					[{
						title: '潮男Eugene Tong教你在冬天如何戴好一头好帽',
						imgUrl: 'https://hbimg.huabanimg.com/1e2595586608f1729cefa00a5e4c72fcbf903ed7c8e6-7IxJF0_fw658',
						avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
						name: '盒子芥末',
						isFavor: false,
						favor: 333
					}, {
						title: '潮男Eugene Tong教你在冬天如何戴好一头好帽',
						imgUrl: 'https://hbimg.huabanimg.com/a93f35df96eb6fd176313decd3c27ade7b71c7c378630-l6CXXd_fw658',
						avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
						name: '盒子芥末',
						isFavor: true,
						favor: 333
					}, {
						title: '潮男Eugene Tong教你在冬天如何戴好一头好帽',
						imgUrl: 'https://hbimg.huabanimg.com/d500eab4467f91bcde88782f19a8336c2b81ce75bdb1a-kedNbr_fw658',
						avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
						name: '盒子芥末',
						isFavor: true,
						favor: 333
					}, {
						title: '潮男Eugene Tong教你在冬天如何戴好一头好帽',
						imgUrl: 'https://hbimg.huabanimg.com/d500eab4467f91bcde88782f19a8336c2b81ce75bdb1a-kedNbr_fw658',
						avatar: 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf',
						name: '盒子芥末',
						isFavor: true,
						favor: 333
					}]
				]
			}
		},
		computed: {
			CustomH() {
				return this.CustomBar + uni.upx2px(100)
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			if (e.scrollTop < 0) {
				this.topImgH = 0 - e.scrollTop + 200
			} else {
				this.topImgH = 200
			}
			if (e.scrollTop > 200 + uni.upx2px(354) - this.CustomBar) {
				this.fixed = true;
			} else {
				this.fixed = false;
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
		}
	}
</script>

<style>
	
	.bg-custom {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
	}

	.bg-custom .topImg {
		width: 100%;
		height: 200px;
		/* background-color: #FFFFFF; */
		overflow: hidden;
	}

	.bg-custom .topImg image {
		width: 100%;
		height: 200px;
		position: fixed;
		top: 0;
		z-index: -1;
		/* 		filter: blur(40px);
		transform: scale(1.2); */
	}

	.my-detail {
		background-color: #FFFFFF;
		padding-top: 20upx;
		width: 100%;
		position: relative;
	}

	.my-detail .cu-avatar {
		position: absolute;
		top: -50upx;
		left: 30upx;
	}

	.fixedBox {
		z-index: 9999;
	}
</style>
