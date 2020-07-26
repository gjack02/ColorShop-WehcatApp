<template>
	<view>
		<!-- 头部 -->
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="nav fixed bg-white home-nav text-center" :style="style">
				<view class="cu-avatar round" :style="[{backgroundImage: 'url(https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf)',top:StatusBar+'px',height:avatar + 'px',width:avatar + 'px'}]"
				 @tap="toMy">
					<view class="cu-tag badge"></view>
				</view>
				<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in nav" :key="index" @tap="tabSelect"
				 :data-id="index" :style="[{height:CustomBar - StatusBar - 2 + 'px',lineHeight:CustomBar - StatusBar - 5 + 'px'}]">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- 瀑布流 -->
		<block v-if="TabCur==0">
			<abnor :px="CustomBar" :upx="100"></abnor>
		</block>
		<block v-if="TabCur==2">
			<view class="findCard">
				<view class="cu-card goods col-goods" v-for="(card,id) in list" :key="id">
					<view class="cu-item shadow bg-white" v-for="(item,index) in card" :key="index" @tap="toDetail(index)">
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
		<block v-if="TabCur==1">
			<scroll-view scroll-x class="topicBox">
				<view v-for="(item,index) in topicList" :key="index" :class="'bg-' + item.color" class="cu-item shadow">
					<view class="text-bold text-line2cut">
						#{{item.title}}#
					</view>
					<view class="text-xs">
						<num :num="item.num"></num> 人在参与
					</view>
					<image :src="item.imgUrl" mode="aspectFill"></image>
				</view>
				<view class="cu-item shadow bg-red">
					<view class="text-sm">更多话题</view>
					<view class="text-center icon-roundrightfill text-xl margin-top-xs"></view>
					<image src="https://image.weilanwl.com/qhShop/topicbg.png" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<view class="findCard">
				<view class="cu-card goods col-goods" v-for="(card,id) in list" :key="id">
					<view class="cu-item shadow bg-orange topic-item" v-if="id==0">
						<view class="text-center padding-tb-lg">
							<view>#618必囤好物清单#</view>
							<view class="text-xs margin-top-xs">发布推荐 得奖品</view>
						</view>
						<view class="flex justify-between align-center padding-bottom-sm padding-right-sm">
							<view class="cu-avatar-group">
								<view class="cu-avatar round sm" v-for="(item,index) in 4" :key="index" :style="[{ backgroundImage:'url(' + 'https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf' + ')' }]"></view>
							</view>
							<view class="text-xs">
								<num num="12312"></num> 人参加
							</view>
						</view>
						<image src="https://image.weilanwl.com/qhShop/topicbg.png" mode="aspectFill"></image>
					</view>
					<view class="cu-item shadow bg-white" v-for="(item,index) in card" :key="index" @tap="toDetail(index)">
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


		<view class="cu-bar foot" v-if="TabCur!=0">
			<button class="cu-btn bg-gradual-orange round lg shadow" @tap="toAdd">
				<view class="icon-wenxue margin-right-xs"></view> 发布动态
			</button>
		</view>
		<view class="cu-tabbar-height" v-if="TabCur!=0"></view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				modalName: null,
				TabCur: 1,
				nav: [{
					name: '关注'
				}, {
					name: '推荐'
				}, {
					name: '最新'
				}],
				scrollLeft: 0,
				isLoad: false,
				topicList: [{
					title: '好物撩一撩',
					num: 12312,
					imgUrl: 'https://hbimg.huabanimg.com/c2b3a8aff0df4a7e4c65ad06404278c20020802adf63d-fre8vM_fw658',
					color: 'blue'
				}, {
					title: '618必囤好物清单',
					num: 3421,
					imgUrl: 'https://hbimg.huabanimg.com/c2b3a8aff0df4a7e4c65ad06404278c20020802adf63d-fre8vM_fw658',
					color: 'red'
				}, {
					title: '好物撩一撩',
					num: 12312,
					imgUrl: 'https://hbimg.huabanimg.com/c2b3a8aff0df4a7e4c65ad06404278c20020802adf63d-fre8vM_fw658',
					color: 'pink'
				}, {
					title: '618必囤好物清单',
					num: 3421,
					imgUrl: 'https://hbimg.huabanimg.com/c2b3a8aff0df4a7e4c65ad06404278c20020802adf63d-fre8vM_fw658',
					color: 'green'
				}, ],
				list: [
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
		name: 'find',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style
			},
			avatar() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				return CustomBar - StatusBar - 10
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.modalName = null;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			toMy() {
				uni.navigateTo({
					url: '/pages/find/my'
				});
			},
			toAdd() {
				uni.navigateTo({
					url: '/pages/find/add'
				});
			},
			toDetail(index) {
				uni.navigateTo({
					url: '/pages/find/detail?id=' + index
				});
			}
		}
	}
</script>

<style>
	.home-nav .cu-avatar {
		position: absolute;
		left: 20upx;
		margin-top: 5px;
	}

	.cu-bar.foot {
		/* #ifndef MP-WEIXIN */
		bottom: calc(100upx + env(safe-area-inset-bottom) / 2);
		/* #endif */
		/* #ifdef MP-WEIXIN */
		bottom: 110upx;
		/* #endif */
		height: 120upx;
		justify-content: center;
		box-shadow: none;
	}
</style>
