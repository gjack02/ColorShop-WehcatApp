<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">收货地址</block>
		</custom>

		<view class="cu-list menu" v-if="addressList.length > 0">
			<view class="cu-item" :class="item.isDefault?'cur':''" v-for="(item,index) in addressList" :key="index" @tap="addressAddOrUpdate"
			 :data-address-id="item.id">
				<view class='content padding-tb-sm'>
					<view class='margin-bottom-sm'>
						<text class='text-bold'>{{item.name}}</text>
						<text class='margin-lr-sm'>{{item.mobile}}</text>
						<view class='cu-tag line-orange radius' v-if="item.isDefault">默认</view>
					</view>
					<view class='text-gray text-sm text-cut' style="width: 600rpx;">
						{{item.detailedAddress}}</view>
				</view>
				<view class='action' @tap.stop="deleteAddress" :data-address-id="item.id">
					<text class='icon-delete text-orange text-xxl'></text>
				</view>
			</view>
		</view>

		<view class="cu-bar bg-white foot justify-center">
			<button class='cu-btn bg-orange round shadow' @tap="addressAddOrUpdate" data-address-id="0">
				<text class='icon-add'> </text> 新建地址
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// addressList: [],
				addressList: [{
					id: 12,
					name: "WXG",
					mobile: '12312312312',
					isDefault: true,
					detailedAddress: '广东省广州市荔湾区爱上大声回答'
				}, {
					id: 11,
					name: "WXG",
					mobile: '12312312312',
					isDefault: false,
					detailedAddress: '广东省广州市荔湾区爱上大声回答'
				}],
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
			}
		},

		methods: {
			toAdd() {
				uni.navigateTo({
					url: 'edit'
				})
			},
			getAddressList() {
				let that = this;
				util.request(api.AddressList).then(function(res) {
					console.log(res)
					if (res.errno === 0) {
						that.addressList = res.data
					}
				});
			},
			addressAddOrUpdate(event) {
				console.log(event)
				//返回之前，先取出上一页对象，并设置addressId
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2];

				if (prevPage.route == "pages/cart/form" && event.currentTarget.dataset.addressId != 0) {
					try {
						uni.setStorageSync('addressId', event.currentTarget.dataset.addressId);
					} catch (e) {

					}

					uni.navigateBack();
				} else {
					console.log('/pages/address/edit?id=' + event.currentTarget.dataset.addressId)
					uni.navigateTo({
						url: '/pages/address/edit?id=' + event.currentTarget.dataset.addressId
					})
				}
			},
			deleteAddress(event) {
				console.log(event.currentTarget)
				let that = this;
				uni.showModal({
					title: '',
					content: '确定要删除地址？',
					success(res) {
						if (res.confirm) {
							let addressId = event.currentTarget.dataset.addressId;
							util.request(api.AddressDelete, {
								id: addressId
							}, 'POST').then(function(res) {
								console.log(res)
								if (res.errno === 0) {
									that.getAddressList();
									uni.removeStorage({
										key: 'addressId',
										success(res) {},
									})
								}
							});
						}
					}
				})
				return false;
			}
		}

	}
</script>

<style>

</style>
