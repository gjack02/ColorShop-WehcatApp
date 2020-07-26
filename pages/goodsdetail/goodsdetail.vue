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
		<!--  产品图 -->
		<view class="bg-white" :style="[{height:StatusBar + 'px'}]"></view>
		<swiper class="screen-swiper" :indicator-dots="false" :circular="true" :autoplay="true" :interval="5000" duration="500"
		 style="height:750upx" @change="swiperChange">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
			</swiper-item>
		</swiper>
		<view class='swiper-tag'>
			<view class="cu-tag radius bg-white">{{swiperCur+1}}/{{swiperList.length}}</view>
			<view class="cu-tag round vide-tag" @tap="showModal" data-target="videoShow">
				<text class="icon-videofill margin-right-xs"></text>
				00'40"
			</view>
		</view>
		<view class="cu-modal swiper-video" :class="modalName=='videoShow'?'show':''" v-if="modalName=='videoShow'">
			<view class="cu-dialog" :style="[{top:(CustomBar + 5) +'px'}]">
				<video src="https://jdvideo.300hu.com/vodtransgzp1251412368/5285890781375613996/v.f30.mp4?dockingId=0d1f06c1-0bd9-4b9d-9da3-1531c4430af1&storageSource=3"
				 autoplay muted objectFit="contain" show-mute-btn></video>
			</view>
			<button class="cu-btn line-white round ModalClose" @tap="hideModal" :style="[{top:ModalClose +'px'}]">关闭</button>
		</view>
		<!--  商品头 -->
		<view class='flex goodsHead'>
			<view class='bg-red padding-sm flex-sub'>
				<view class='price'>
					<text class='text-price'>149.00</text>
					<text class='text-price text-del'>169.00</text>
				</view>
				<view class="text-sm">累计已拼4567件/仅剩2467件</view>
			</view>
			<view class='bg-yellow padding-lr flex flex-direction justify-center align-center'>
				<view class='text-brown text-center padding-bottom-xs'>距离结束仅剩</view>
				<view class='time'>
					<view class="cu-tag bg-black radius">00</view>
					<text class=''>:</text>
					<view class="cu-tag bg-black radius">23</view>
					<text class=''>:</text>
					<view class="cu-tag bg-black radius">34</view>
				</view>
			</view>
		</view>
		<!--  商品简介 -->
		<view class='bg-white padding'>
			<view class='text-xl text-black text-bold text-line2cut'>
				李宁男鞋跑步鞋2019年春夏季新款减震耐磨休闲鞋运动鞋 新基础黑/银色 男42(265MM) 李宁夏季运动短袖/短裤
			</view>
			<view class='text-grey margin-top-sm'>李宁官方授权，支持防伪验货，假一赔十，下单赠运费险，购物无忧【加购收藏，优先发货】</view>
			<view class='padding-sm bg-orange light flex align-center radius margin-top-sm'>
				<view class="flex-sub text-sm">
					<text class="text-black"> 升级云店，价格再优惠，购物可返现高达</text> 1000 <text class="text-black"> 元</text>
				</view>
				<button class="cu-btn bg-orange sm">立即升级</button>
			</view>
		</view>

		<!--  规格选择 -->
		<view class="cu-list menu margin-top-sm" @tap="showTypeModal('type')">
			<view class="cu-item arrow">
				<view class='content text-df'>规格选择</view>
			</view>
			<view class="cu-item arrow">
				<view class='content text-df'>领取优惠券</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal typeBox" :class="modalName=='typeModal'?'show':''">
			<view class='cu-dialog'>
				<view class='modal-close' @tap='hideModal'>
					<text class='icon-close'></text>
				</view>
				<view class='modal-bd'>
					<view class='type-goods solid-bottom'>
						<image src='https://img14.360buyimg.com/n1/s546x546_jfs/t1/17986/16/15158/138069/5cadc00eE4a1f4c49/b19abe2839f7a12b.jpg'
						 mode='aspectFill' />
						<view class='flex-sub'>
							<view class='text-red text-price text-xxl'>149.00</view>
							<view>库存2344件</view>
							<view>已选 ‘ 新基础黑/银色 男42(265MM)’</view>
						</view>
					</view>
					<view class='padding-tb solid-bottom' v-for="(item,index) in spec" :key="index">
						<view class='margin-bottom-sm'>{{item.name}}</view>
						<view class='padding-xs'>
							<button class="cu-btn sm margin-xs" :class="value.checked?'bg-orange':'bg-grey'" v-for="(value,spec) in item.valueList"
							 :key="spec" @tap='selectSpec' :data-id="value.id" :data-name="value.specification">
								{{value.value}}
							</button>
						</view>
					</view>
					<view class='padding-tb flex align-center justify-between'>
						<view>数量</view>
						<stepper :value="cuntNumber" @change="CuntNumber" :min="1" :max="99"></stepper>
					</view>
				</view>
				<view class='cu-bar btn-group bg-white tabbar padding-lr-xl padding-bottom' v-if="TypeModal=='type'">
					<button class="cu-btn bg-orange lg shadow round margin-left">加入购物车</button>
					<button class="cu-btn bg-red lg shadow round margin-right">立即购买</button>
				</view>
				<view class='cu-bar btn-group bg-white tabbar padding-bottom' v-if="TypeModal!='type'">
					<button class="cu-btn bg-orange lg shadow round" v-if="TypeModal=='addCart'">确定</button>
					<button class="cu-btn bg-orange lg shadow round" v-if="TypeModal=='submit'">确定</button>
				</view>
			</view>
		</view>
		
		<!--  评论 -->
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="icon-titles text-orange"></text>
				<text>用户好评(20)</text>
			</view>
			<navigator url="/pages/goodsdetail/comment" class='action text-df text-gray' hover-class="none">更多 <text class="icon-right"></text></navigator>
		</view>
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

		<!-- 商品详情 -->
		<view class='goods-content margin-top-sm'>
			<rich-text :nodes="dataInfo" class='rich-text'></rich-text>
		</view>

		<!--  底部操作条 -->
		<view class="cu-bar bg-white tabbar border shop foot">
			<button class="action" open-type="contact">
				<view class="icon-service text-green">
					<view class="cu-tag badge"></view>
				</view> 客服
			</button>
			<view class="action">
				<view class="icon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange round shadow" @tap="showTypeModal('addCart')">加入购物车</button>
				<button class="cu-btn bg-red round shadow" @tap="showTypeModal('submit')">立即订购</button>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				scrollTop: 0,
				ModalClose: this.CustomBar + 35 + uni.upx2px(690),
				modalName: null,
				swiperCur: 0,
				dataInfo: '',
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
				cuntNumber: 1,
				spec: [{
					name: '选择颜色',
					valueList: [{
						id: 0,
						value: '新基础黑/银色',
						specification: '',
						checked:true
					}, {
						id: 1,
						value: '标准黑/黯淡灰/标准白',
						specification: ''
					}, {
						id: 2,
						value: '标准黑/凝雪灰/标准白',
						specification: ''
					}, {
						id: 3,
						value: 'RBL023新基础黑/银灰色',
						specification: ''
					}]
				}, {
					name: '选择尺码',
					valueList: [{
						id: 0,
						value: '男39(240 MM)',
						specification: '',
						checked:true
					}, {
						id: 1,
						value: '男40(250 MM)',
						specification: ''
					}, {
						id: 2,
						value: '男41(255 MM)',
						specification: ''
					}, {
						id: 3,
						value: '男42(265 MM)',
						specification: ''
					}, {
						id: 4,
						value: '男43 .5(275 MM)',
						specification: ''
					}, {
						id: 3,
						value: '男45(285 MM)',
						specification: ''
					}]
				}],
				TypeModal: 'type'
			}
		},
		onLoad() {
			this.getGoodsDetail();
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			swiperChange(e) {
				this.swiperCur = e.detail.current
			},
			getGoodsDetail() {
				let data =
					'<p><img src="//img30.360buyimg.com/popWaterMark/jfs/t23494/105/1909392231/841640/49606d5d/5b6e38e8N4ce09139.jpg"></p><p><img src="//img30.360buyimg.com/popWaterMark/jfs/t24727/231/407797945/344656/bc1fc324/5b6e38e9N038cd8bd.jpg"></p><p><img src="//img30.360buyimg.com/popWaterMark/jfs/t24421/137/1956006706/387195/65184306/5b6e38e8Nae53b2f9.jpg"></p><p><img src="//img30.360buyimg.com/popWaterMark/jfs/t23383/114/1935043210/360831/d3391ea/5b6e38e8N65db29b8.jpg" alt="" ></p><p><img src="//img30.360buyimg.com/popWaterMark/jfs/t23170/106/1945219303/381197/20944788/5b6e38e8N95b2d0b1.jpg" alt="" ></p><p><img src="//img30.360buyimg.com/popWaterMark/jfs/t23497/105/1952607065/370654/6e978c89/5b6e38e8Nc0ee8ad5.jpg" alt="" ></p><p><img src="//img30.360buyimg.com/popWaterMark/jfs/t25318/298/407486865/373172/5fd4155/5b6e38e9N20234b0f.jpg" alt="" ></p><p><img src="//img30.360buyimg.com/popWaterMark/jfs/t26047/14/398573828/404882/b202d068/5b6e38e9N0d4b32ea.jpg" alt="" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/30691/12/6603/129839/5c8f6253E8e4f7ac3/ff2a95f7d1dfaa5a.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/22277/7/11492/142001/5c8f6253E34c7cc7f/1ac92af06c5c433b.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/16151/29/11362/140139/5c8f6253E22f19148/8cffee634635c836.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/30622/16/6476/214306/5c8f6254E09a56252/4dd1fd79436b35dc.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/31134/37/6487/313924/5c8f6254Ed01ebd9e/10a73a6146b1baa8.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/19432/5/11410/205075/5c8f6254E77d413f9/1f7d6d32d7a42320.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/23337/18/11440/196456/5c8f6255Ec035fa11/a40df1a999cbc205.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/29846/25/11579/124671/5c8f6255E502189cb/a87cdac341b6e12d.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/10005/36/15102/106864/5c8f6255E7016bd14/805c4af73c4ffbed.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/16233/21/11592/255769/5c8f6255Ea013cc41/39e5a3850655ea6b.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/25638/31/11377/174332/5c8f6255E2eb2c341/af3d82e950a66106.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/25683/4/9064/150784/5c8f6255E6878e886/b7e1a40ae1a4de8f.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/17441/39/11289/186780/5c8f6256Ea3673d02/09680f32695aaf38.jpg" ></p><p><img src="//img10.360buyimg.com/imgzone/jfs/t1/10366/35/14947/152109/5c8f6256Ee72cf7be/bf1d45af543a9600.jpg" ></p>'
				var dataInfo = data.replace(/\<img/gi, '<img class="img"');
				this.dataInfo = dataInfo.replace(/\<p/gi, '<p class="p"');
			},

			CuntNumber(value) {
				this.cuntNumber = value
			},
			showTypeModal(e) {
				this.modalName = 'typeModal'
				this.TypeModal = e
			},
			selectSpec(){
				
			}
		}
	}
</script>

<style>
	.cu-modal.swiper-video {
		background: rgba(0, 0, 0, 0.85);
	}

	.cu-modal.swiper-video .cu-dialog {
		width: 690upx;
		height: 690upx;
		position: fixed;
		padding: 5upx;
		left: 30upx;
		background: #000;
		border-radius: 10upx;
	}

	.cu-modal.swiper-video video {
		width: 680upx;
		height: 680upx;
	}

	.ModalClose {
		position: fixed;
		z-index: 1026;
		color: #FFFFFF;
		left: 0;
		right: 0;
		width: 160upx;
		margin: auto;

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

	.swiper-tag .cu-tag.vide-tag {
		position: absolute;
		z-index: 100;
		bottom: 15px;
		right: 0;
		left: 0;
		margin: auto;
		background-color: rgba(0, 0, 0, 0.6);
		width: 130upx;
		color: #FFFFFF;
	}

	.goodsHead .price text:first-child {
		font-size: 52upx;
		font-weight: bold;
		margin-right: 10upx;
		display: inline-block;
	}

	.goodsHead .time .cu-tag {
		font-size: 12px;
		padding: 0px 10upx;
		border-radius: 3px;
		margin: 0 2px;
		height: 36upx;
	}

	.goodsHead .bg-red {
		position: relative;
	}

	.goodsHead .bg-red::after {
		content: "\e6ea";
		font-family: "icon";
		position: absolute;
		font-size: 20px;
		transform: rotate(180deg);
		color: #f8c248;
		right: -11px;
		width: 20px;
		height: 20px;
		top: 50%;
		margin-top: -10px;
	}

	.cu-bar.foot {
		z-index: 1000;
	}

	.goods-content image {
		max-width: 100%;
		display: block;
		min-height: 100px;
		background-color: #FFFFFF;
	}

	.typeBox .cu-dialog {
		padding-top: 80upx;
		background-color: transparent;
	}

	.typeBox .modal-close {
		right: 10px;
		border-radius: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		background: #333;
		position: absolute;
		color: #fff;
		top: 0upx;
	}

	.typeBox .modal-bd {
		text-align: left;
		background: #fff;
	}

	.typeBox .modal-message {
		padding: 50upx 30upx;
	}

	.typeBox .modal-option {
		background: #fff;
		display: flex;
		text-align: center;
		border-top: 1upx solid #eee;
		align-items: center;
	}

	.typeBox .modal-option-btn {
		flex: 1;
		line-height: 100upx;
	}

	.typeBox .modal-option-btn+.modal-option-btn {
		border-left: 1upx solid #eee;
	}

	.typeBox .cu-modal.bottom-modal::before {
		vertical-align: bottom;
	}

	.typeBox .cu-modal.bottom-modal .modal-dialog {
		width: 100%;
		border-radius: 0;
	}

	.typeBox .cu-modal.bottom-modal {
		margin-bottom: -500px;
	}

	.typeBox .cu-modal.bottom-modal.cur {
		margin-bottom: 0;
	}

	.typeBox .modal-bd {
		padding: 20upx 20upx 0;
	}

	.type-goods {
		display: flex;
		padding-bottom: 15px;
	}

	.type-goods .flex-sub {
		padding-left: 10px;
		padding-top: 10px;
	}

	.type-goods image {
		width: 120px;
		height: 120px;
		margin-top: -40px;
		border-radius: 3px;
		border: 2px solid #fff;
	}
</style>
