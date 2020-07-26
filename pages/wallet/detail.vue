<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed bg-white text-black shadow" :style="[{height:CustomBar + 'px',paddingTop:StatusBar + 'px'}]">
				<view class="action" @tap="BackPage">
					<text class="icon-back"></text>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<view class="TypeTag">
						<view :class="type==0?'cur':''" @tap="typeChange(0)">收支明细</view>
						<view :class="type==1?'cur':''" @tap="typeChange(1)">提现记录</view>
					</view>
				</view>
			</view>
		</view>
		<block v-if="type==0">
			<view class="cu-bar fixed bg-gray" :style="[{top:CustomBar + 'px'}]">
				<view class="action">
					<button class="cu-btn bg-white round " @tap="showModal" data-target="searchTimeModal">筛选 <text class="icon-searchlist margin-left-xs"></text>
					</button>
					<button class="cu-btn bg-white round  margin-left" @tap="showModal" data-target="searchTypeModal">类别 <text class="icon-triangledownfill margin-left-xs"></text></button>
				</view>
			</view>
			<view class="cu-bar bg-gray"></view>
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>邀请好友明月</view>
						<view class="text-gray text-sm">2018年12月6号 10:13:03</view>
					</view>
					<view class="action text-orange">
						+￥15.00
					</view>
				</view>
				<view class="cu-item" v-for="(item,index) in 10" :key="index">
					<view class="content padding-tb-sm">
						<view>转入至明月</view>
						<view class="text-gray text-sm">2018年12月6号 10:13:03</view>
					</view>
					<view class="action text-orange">
						-￥15.00
					</view>
				</view>
			</view>

			<view class="cu-modal bottom-modal" :class="modalName=='searchTimeModal'?'show':''">
				<view class="cu-dialog" :style="[{height:'calc(100vh - ' + CustomBar + 'px'+')'}]">
					<view class="cu-bar bg-white">
						<view class="action text-blue" @tap="hideModal">取消</view>
						<view class="content">筛选时间</view>
						<view class="action text-green" @tap="hideModal">确定</view>
					</view>
					<view class="padding flex align-center text-center">
						<view class="bg-grey padding-sm radius flex-sub">
							<picker mode="date" :value="SearchStartTime" start="2015-09-01" :end="SearchEndTime" @change="setTimeStart">
								{{SearchStartTime}}
							</picker>
						</view>
						<view class="padding-lr">
							-
						</view>
						<view class="bg-grey padding-sm radius flex-sub">
							<picker mode="date" :value="SearchEndTime" :start="SearchStartTime" :end="EndTime" @change="setTimeEnd">
								{{SearchEndTime}}
							</picker>
						</view>
					</view>

				</view>
			</view>
			<view class="cu-modal bottom-modal" :class="modalName=='searchTypeModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="action text-blue" @tap="hideModal">取消</view>
						<view class="action text-green" @tap="hideModal">确定</view>
					</view>
					<view class="grid col-3 padding-lr-sm padding-bottom-sm bg-white">
						<view v-for="(item,index) in searchTypeList" class="padding-xs" :key="index">
							<view class="padding-sm radius" :class="item.checked?'bg-orange':'bg-gray'" @tap="ChooseTypeList" :data-value="item.value">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="type==1">
			<view class="cu-list menu">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>提现到微信</view>
						<view class="text-gray text-sm">2018年12月6号 10:13:03</view>
					</view>
					<view class="action text-orange">
						-￥15.00
					</view>
				</view>
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>提现到微信</view>
						<view class="text-gray text-sm">2018年12月6号 10:13:03</view>
					</view>
					<view class="action text-orange">
						-￥15.00
					</view>
				</view>
			</view>
		</block>

	</view>
</template>

<script>
	var util = require('../../utils/util');
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				type: 0,
				modalName: null,
				SearchStartTime: '2019-01-01',
				SearchEndTime: util.formatTime(new Date(), "yyyy-MM-dd"),
				EndTime: util.formatTime(new Date(), "yyyy-MM-dd"),
				searchType: 0,
				searchTypeList: [{
					value: 0,
					name: '全部',
					checked: false
				}, {
					value: 1,
					name: '全部收入',
					checked: true
				}, {
					value: 2,
					name: '全部支出',
					checked: true
				}, {
					value: 3,
					name: '分佣',
					checked: false
				}, {
					value: 4,
					name: '系统',
					checked: false
				}, {
					value: 5,
					name: '转账',
					checked: false
				}, {
					value: 6,
					name: '红包',
					checked: false
				}, {
					value: 7,
					name: '支付',
					checked: false
				}, {
					value: 8,
					name: '退货',
					checked: false
				}]
			}
		},
		onLoad(e) {
			if (e.type) {
				this.type = e.type
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			typeChange(e) {
				this.type = e
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			setTimeStart(e) {
				this.SearchStartTime = e.detail.value
			},
			setTimeEnd(e) {
				this.SearchEndTime = e.detail.value
			},
			ChooseTypeList(e) {
				let items = this.searchTypeList;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
			}
		}
	}
</script>

<style>
	.cu-custom .cu-bar .content {
		pointer-events: all;
	}

	.TypeTag {
		border: 1px solid #0076E1;
		border-radius: 6rpx;
		display: flex;
		font-size: 24upx;
		height: 60upx;
		text-align: center;
	}

	.TypeTag view {
		color: #0076E1;
		flex: 1;
	}

	.TypeTag view.cur {
		color: #FFFFFF;
		background: #0076E1;
	}
</style>
