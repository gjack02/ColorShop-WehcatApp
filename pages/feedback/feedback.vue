<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">意见反馈</block>
		</custom>
		<view class="cu-form-group margin-top">
			<view class="title">问题类型</view>
			<picker @change="PickerChange" :value="index" :range="picker">
				<view class="picker">
					商品需求
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaInput" placeholder="请详细描述你的问题和意见..."></textarea>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='icon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
					<text class='icon-cameraadd'></text>
				</view>
			</view>
		</view>
		<view class="padding-xl">
			<button class="cu-btn bg-orange lg block round shadow">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				picker: ['商品需求', '订单相关', '资金问题', '售后问题', '账户问题', '	其他问题'],
				imgList: [],
				modalName: null,
				textareaValue: '',
			}
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaInput(e) {
				this.textareaValue = e.detail.value
			},
		}
	}
</script>

<style>

</style>
