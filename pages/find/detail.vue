<template>
	<view>
		<view class="bg-white">
			<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
				<view class="cu-bar fixed bg-white" :style="style">
					<view class="action" @tap="BackPage">
						<text class="icon-back"></text>
					</view>
					<view class="cu-avatar round" :style="[{backgroundImage: 'url(https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf)',top:StatusBar+'px',height:avatar + 'px',width:avatar + 'px'}]"
					 @tap="toMy"></view>
					<view class="flex-sub margin-left-xl padding-left-xl">
						<view class="">文晓港</view>
						<view class="text-xs text-gray">2019年07月11日</view>
					</view>
					<view class="action">
						<button class="cu-btn line-orange round sm">关注</button>
					</view>
				</view>
			</view>
			<swiper class="screen-swiper" :indicator-dots="false" :circular="true" :autoplay="true" :interval="5000" duration="500"
			 style="height:750upx" @change="swiperChange">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				</swiper-item>
			</swiper>
			<view class='swiper-tag'>
				<view class="cu-tag radius bg-white">{{swiperCur+1}}/{{swiperList.length}}</view>
			</view>
			<!-- 商品详情 -->
			<view class='goods-content padding'>
				<rich-text :nodes="dataInfo" class='rich-text'></rich-text>
			</view>
			<view class="padding-lr">
				<view class="cu-tag bg-orange light round">
					# 超级会员日
				</view>
				<view class="cu-tag bg-orange light round">
					# 618 必购
				</view>
			</view>
			<view class="padding text-black text-lg">
				评论 · 2
			</view>
			<view class="cu-bar search bg-white">
				<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big11010.jpg)"></view>
				<view class="search-form round padding-left">
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="添加一条评论呗"
					 confirm-type="search"></input>
				</view>
			</view>
			<view class="cu-list menu-avatar comment">
				<view class="cu-item">
					<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
					<view class="content">
						<view class="text-grey">莫甘娜</view>
						<view class="text-gray text-content text-df">
							凯尔，你被自己的光芒变的盲目。
						</view>
						<view class="text-gray text-sm margin-top-xs">2018年12月4日</view>
					</view>
				</view>
			</view>
			<view class="padding-sm solid-top text-center">
				<button class="cu-btn bg-orange light round sm">展开全部评论 <text class="icon-triangledownfill"></text> </button>
			</view>
			<view class="padding-lr text-black text-lg">
				关联商品
			</view>
			<!-- 缩略图单列 -->
			<view class="cu-card goods no-card">
				<view class="cu-item bg-white" v-for="(item,index) in 4" :key="index" @tap="toGoodsDetail()">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" mode="aspectFill"></image>
					<view class="content">
						<view class="title">
							<view class="text-line2cut">无意者 烈火焚身;以正义的烈火拔出黑暗。我有自己的正义，见证至高的烈火吧。</view>
						</view>
						<view class="margin-top-xs"> <text class="text-price text-red text-xl">199</text><text class="text-price text-gray text-del text-lg">259</text></view>
						<view class="flex justify-between align-end">
							<view class="text-gray text-sm flex-sub">月销量 720 件</view>
							<view class="padding-left-xl text-right">
								<button class="cu-btn bg-gradual-red round shadow sm">立即购买</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-title center-title margin-top">
			<view class="text-bold text-xl">
				更多动态
			</view>
			<!-- <view class="text-ABC text-orange text-sm">Guess you like</view> -->
		</view>
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
		
		<view class="cu-tabbar-height"></view>
		<view class="cu-bar foot search bg-white">
			<view class="search-form round">
				<text class="icon-wenxue"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="添加一条评论呗"
				 confirm-type="search"></input>
			</view>
			<view class="action">
				<view class="icon-xihuan padding-lr-sm"></view>
				<view class="icon-mark padding-lr-sm"></view>
				<view class="icon-forward padding-lr-sm"></view>
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
				swiperCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://img14.360buyimg.com/n1/s546x546_jfs/t1/17986/16/15158/138069/5cadc00eE4a1f4c49/b19abe2839f7a12b.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://img14.360buyimg.com/n1/s546x546_jfs/t1/35980/26/890/157465/5cadc00eE60333685/d0ed8e2d8bcc3a55.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://img14.360buyimg.com/n1/s546x546_jfs/t1/33552/24/2333/187869/5cadc00eEbea4d7aa/59bcde6c03d4d4e3.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://img14.360buyimg.com/n1/s546x546_jfs/t1/10936/5/6625/109240/5c24462fE8518daa9/199d809a2f8f24c9.jpg'
				}],
				dataInfo: '',
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
		onLoad() {
			this.getGoodsDetail();
		},
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
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			toMy() {
				uni.navigateTo({
					url: '/pages/find/my'
				});
			},
			swiperChange(e) {
				this.swiperCur = e.detail.current
			},
			getGoodsDetail() {
				let data =
					'<p>18赛季结束，这是韦德在NBA最后的一个赛季。可从近日的韦德中国行中我们可以看到，韦德的人气依然是所有球星中最足的一个，没办法，谁让韦德的人品和球技折服了很多中国球迷呢？SO，问题来了，韦德退役了，李宁还会更新发布韦德的签名鞋吗？那啥，还请诸君听我往下细细道来。</p><img src="https://img14.360buyimg.com/n1/s546x546_jfs/t1/10936/5/6625/109240/5c24462fE8518daa9/199d809a2f8f24c9.jpg" ><p><span class="bjh-h3">韦德和李宁的合作</p><p>2018年7月份，曾经和匡威、耐克有过合作的韦德，在经过和李宁的磨合后，双方认定对方是自己的真命天子，韦德和李宁签下了终生合同。虽然李宁并没有公布和韦德合同的具体金额，但是要知道韦德在12年和李宁签约的时候合同就是10年1亿美元加李宁的股份，此次该签成终身合同，其中的待遇肯定是更加优越的。</p><img src="https://img14.360buyimg.com/n1/s546x546_jfs/t1/10936/5/6625/109240/5c24462fE8518daa9/199d809a2f8f24c9.jpg" ><p><span class="bjh-h3">李宁还会更新发布韦德签名鞋呢？</p><p>为什么要先扯到韦德的合同。只是想告诉大家，为什么李宁在韦德的最后一赛季还愿意和韦德签下巨额的终生合同呢？相信我，没有一个商人是傻子。李宁之所以愿意和韦德签下终身合同，那时因为他们看好韦德这个IP，在合作的7年里面，韦德也为李宁带来足够的收益和影响力，这也是李宁愿意继续投资的地方。</p><img src="https://img14.360buyimg.com/n1/s546x546_jfs/t1/10936/5/6625/109240/5c24462fE8518daa9/199d809a2f8f24c9.jpg" ><p>很多球迷觉得韦德都退役了，影响力会越来越多，李宁实在不划算啊。从目前李宁的策略上来看，他们大有把韦德之道打造成AJ的感觉。韦德是韦德之道的最大IP，在这个基础上，李宁一定会在签下一些NBA球星，加入韦德之道的团队，比如李宁拿下了韦德的好友哈斯勒姆，未来韦德之道会成为NBA新秀的孵化器，韦德的名气将帮助新人，新人的表现将刺激韦德之道影响力的持续增加，所以李宁不会放弃这个IP的，未来很长一段时间里面，韦德之道依旧会是李宁的主打。</p><img src="https://img14.360buyimg.com/n1/s546x546_jfs/t1/10936/5/6625/109240/5c24462fE8518daa9/199d809a2f8f24c9.jpg" >'
				var dataInfo = data.replace(/\<img/gi, '<img class="img"');
				this.dataInfo = dataInfo.replace(/\<p/gi, '<p class="p"');
			},
		}
	}
</script>

<style>
	.cu-custom .cu-avatar {
		position: absolute;
		left: 80upx;
		margin-top: 5px;
	}

	.swiper-tag {
		position: relative;
		height: 0;
	}

	.swiper-tag .cu-tag.bg-white {
		position: absolute;
		z-index: 100;
		bottom: 15px;
		right: 15px;
	}

	.goods-content image {
		max-width: 100%;
		display: block;
		min-height: 100px;
		background-color: #FFFFFF;
	}

	.cu-list.comment .cu-item::after {
		border: none;
	}

	.cu-card.goods.no-card>.cu-item>image {
		width: 200upx;
		height: 200upx;
	}
</style>
