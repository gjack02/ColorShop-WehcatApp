<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</custom>
		<form>
			<view class='cu-form-group'>
				<view class='title'>收货人</view>
				<input :value="address.name" auto-focus type="text" placeholder="请填写收货人" class='form-input' @input="bindinputName"></input>
			</view>
			<view class='cu-form-group'>
				<view class='title'>手机号码</view>
				<input @input="bindinputMobile" :value="address.mobile" type="number" placeholder="请填写11位手机号" class='form-input'></input>
			</view>
			<view class='cu-form-group'>
				<view class='title'>选择地区</view>
				<view class="arrow" @tap='chooseRegion'>
					<view class="flex-sub">{{address.provinceName?address.provinceName +','+  address.cityName + ','+address.areaName:'选择省份、城市、区县'}}</view>
				</view>
			</view>
			<view class="cu-form-group margin-top-sm">
				<view class='title'>详细地址</view>
			</view>
			<view class="cu-form-group">
				<textarea :disabled="modalName!=null" @input="bindinputAddress" :value="address.address" placeholder="详细地址, 如街道、楼盘号等"
				 maxlength="-1"></textarea>
			</view>
			<view class='cu-form-group margin-top-sm justify-between'>
				<view class='title'>设为默认</view>
				<switch @change="bindIsDefault" :class="address.isDefault == 1 ?'checked':''" :checked="address.isDefault == 1 ?true:false"></switch>
			</view>
			<view class='padding'>
				<button class='cu-btn bg-orange block lg' @tap="saveAddress">保存</button>
			</view>
		</form>
		<view class="cu-modal bottom-modal" :class="modalName=='regionModal'?'show':''">
			<view class='cu-dialog'>
				<view class="cu-bar bg-white shadow">
					<view class="flex action">
						<view class="margin-lr-xs text-sm text-cut" :class="[item.id == 0 ? 'disabled' : '',(regionType -1) === index ? 'text-orange' : '']"
						 @tap="selectRegionType" :data-region-type-index="index" v-for="(item,index) in selectRegionList" :key="index">
							{{item.name}}
						</view>
					</view>
					<view class="text-blue action" @tap="doneSelectRegion">
						确定
					</view>
				</view>
				<scroll-view scroll-y class="region-list">
					<view class="cu-list menu">
						<view class="cu-item arrow" @tap="selectRegion" :data-region-index="index" v-for="(item,index) in regionList"
						 :key="index">
							<view class="content" :class="item.selected ? 'text-orange' : ''">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	var util = require('../../utils/util');
	var api = require('../../utils/api');
	var check = require('../../utils/check.js');
	export default {
		data() {
			return {
				title: '编辑地址',
				address: {
					id: 0,
					provinceId: 0,
					cityId: 0,
					areaId: 0,
					address: '',
					name: '',
					mobile: '',
					isDefault: 0,
					provinceName: '',
					cityName: '',
					areaName: '',
					region: ''
				},
				addressId: 0,
				modalName: null,
				selectRegionList: [{
						id: 0,
						name: '省份',
						pid: 1,
						type: 1
					},
					{
						id: 0,
						name: '城市',
						pid: 1,
						type: 2
					},
					{
						id: 0,
						name: '区县',
						pid: 1,
						type: 3
					}
				],
				regionType: 1,
				regionList: [],
				selectRegionDone: false
			}
		},
		onLoad(options) {
			if (options.id && options.id != 0) {
				this.addressId = options.id
				this.getAddressDetail();
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.modal;
			},
			closeModal(e) {
				this.modalName = null
			},
			choseRegion(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				let address = this.address;
				address.region = e.detail.value;
				this.region = e.detail.value;
				this.address = address
			},
			bindinputMobile(event) {
				let address = this.address;
				address.mobile = event.detail.value;
				this.address = address
			},
			bindinputName(event) {
				let address = this.address;
				address.name = event.detail.value;
				this.address = address
			},
			bindinputAddress(event) {
				let address = this.address;
				address.address = event.detail.value;
				this.address = address
			},
			bindIsDefault() {
				let address = this.address;
				address.isDefault = !address.isDefault;
				this.address = address
			},
			getAddressDetail() {
				let that = this;
				util.request(api.AddressDetail, {
					id: that.addressId
				}).then(function(res) {
					if (res.errno === 0) {
						if (res.data) {
							that.address = res.data
						}
					}
				});
			},
			setRegionDoneStatus() {
				let that = this;
				let doneStatus = that.selectRegionList.every(item => {
					return item.id != 0;
				});

				that.selectRegionDone = doneStatus

			},
			chooseRegion() {
				let that = this;
				this.modalName = 'regionModal'

				//设置区域选择数据
				let address = this.address;
				if (address.provinceId > 0 && address.cityId > 0 && address.areaId > 0) {
					let selectRegionList = this.selectRegionList;
					selectRegionList[0].id = address.provinceId;
					selectRegionList[0].name = address.provinceName;
					selectRegionList[0].pid = 0;

					selectRegionList[1].id = address.cityId;
					selectRegionList[1].name = address.cityName;
					selectRegionList[1].pid = address.provinceId;

					selectRegionList[2].id = address.areaId;
					selectRegionList[2].name = address.areaName;
					selectRegionList[2].pid = address.cityId;

					this.selectRegionList = selectRegionList;
					this.regionType = 3

					this.getRegionList(address.cityId);
				} else {
					this.selectRegionList = [{
							id: 0,
							name: '省份',
							pid: 0,
							type: 1
						},
						{
							id: 0,
							name: '城市',
							pid: 0,
							type: 2
						},
						{
							id: 0,
							name: '区县',
							pid: 0,
							type: 3
						}
					];
					this.regionType = 1
					this.getRegionList(0);
				}

				this.setRegionDoneStatus();

			},
			selectRegionType(event) {
				let that = this;
				let regionTypeIndex = event.currentTarget.dataset.regionTypeIndex;
				let selectRegionList = that.selectRegionList;

				//判断是否可点击
				if (regionTypeIndex + 1 == this.regionType || (regionTypeIndex - 1 >= 0 && selectRegionList[regionTypeIndex -
						1].id <= 0)) {
					return false;
				}

				this.regionType = regionTypeIndex + 1;

				let selectRegionItem = selectRegionList[regionTypeIndex];

				this.getRegionList(selectRegionItem.pid);

				this.setRegionDoneStatus();

			},
			selectRegion(event) {
				let that = this;
				let regionIndex = event.currentTarget.dataset.regionIndex;
				let regionItem = this.regionList[regionIndex];
				let regionType = regionItem.type;
				let selectRegionList = this.selectRegionList;
				selectRegionList[regionType - 1] = regionItem;

				if (regionType != 3) {
					this.selectRegionList = selectRegionList;
					this.regionType = regionType + 1
					this.getRegionList(regionItem.id);
				} else {
					this.selectRegionList = selectRegionList
				}

				//重置下级区域为空
				selectRegionList.map((item, index) => {
					if (index > regionType - 1) {
						item.id = 0;
						item.name = index == 1 ? '城市' : '区县';
						item.pid = 0;
					}
					return item;
				});

				this.selectRegionList = selectRegionList;

				that.regionList = that.regionList.map(item => {
					//标记已选择的
					if (that.regionType == item.type && that.selectRegionList[that.regionType - 1].id == item.id) {
						item.selected = true;
					} else {
						item.selected = false;
					}

					return item;
				})

				this.setRegionDoneStatus();

			},
			doneSelectRegion() {
				if (this.selectRegionDone === false) {
					return false;
				}

				let address = this.address;
				let selectRegionList = this.selectRegionList;
				address.provinceId = selectRegionList[0].id;
				address.cityId = selectRegionList[1].id;
				address.areaId = selectRegionList[2].id;
				address.provinceName = selectRegionList[0].name;
				address.cityName = selectRegionList[1].name;
				address.areaName = selectRegionList[2].name;

				this.address = address;
				this.modalName = null;

			},
			cancelSelectRegion() {
				this.modalName = null;
				his.regionType = this.regionDoneStatus ? 3 : 1

			},
			getRegionList(regionId) {
				let that = this;
				let regionType = that.regionType;
				util.request(api.RegionList, {
					pid: regionId
				}).then(function(res) {
					if (res.errno === 0) {
						that.regionList = res.data.map(item => {
							//标记已选择的
							if (regionType == item.type && that.selectRegionList[regionType - 1].id == item.id) {
								item.selected = true;
							} else {
								item.selected = false;
							}
							return item;
						})
					}
				});
			},
			cancelAddress() {
				uni.navigateBack();
			},
			saveAddress() {
				let address = this.address;

				console.log(address)
				if (address.name == '') {
					util.showErrorToast('请输入姓名');

					return false;
				}

				if (address.mobile == '') {
					util.showErrorToast('请输入手机号码');
					return false;
				}


				if (address.areaId == '') {
					util.showErrorToast('请输入省市区');
					return false;
				}

				if (address.address == '') {
					util.showErrorToast('请输入详细地址');
					return false;
				}

				if (!check.isValidPhone(address.mobile)) {
					util.showErrorToast('手机号不正确');
					return false;
				}

				let that = this;
				util.request(api.AddressSave, {
					id: address.id,
					name: address.name,
					mobile: address.mobile,
					provinceId: address.provinceId,
					cityId: address.cityId,
					areaId: address.areaId,
					address: address.address,
					isDefault: address.isDefault,
					provinceName: address.provinceName,
					cityName: address.cityName,
					countyName: address.areaName
				}, 'POST').then(function(res) {
					if (res.errno === 0) {
						//返回之前，先取出上一页对象，并设置addressId
						var pages = getCurrentPages();
						var prevPage = pages[pages.length - 2];
						if (prevPage.route == "pages/cart/form") {
							prevPage.addressId = res.data

							try {
								uni.setStorageSync('addressId', res.data);
							} catch (e) {

							}
						}
						uni.navigateBack();
					}
				});

			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 100upx;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.cu-bar {
		position: relative;
		z-index: 1;
		/* margin-bottom: 10upx; */
	}

	.region-list {
		height: 660upx;
		position: relative;
		z-index: 0;
	}
</style>
