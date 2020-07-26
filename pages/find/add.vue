<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">取消</block>
			<block slot="right">
				<view class="action"><button class="cu-btn bg-red round shadow">发布</button></view>
			</block>
		</custom>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item, index) in imgList" :key="index">
					<video :src="imgList[index]" :controls="false" objectFit="cover"></video>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index"><text class="icon-close"></text></view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length < 4"><text class="icon-cameraadd"></text></view>
			</view>
		</view>
		<view class=""></view>
		<view class="cu-form-group"><textarea maxlength="-1" :disabled="modalName != null" @input="textareaInput" placeholder="说说你此刻发生的事吧"></textarea></view>
		<view class="cu-form-group margin-top">
			<view class="padding-right">#</view>
			<view class="title">参与话题</view>
			<view class="arrow">
				<view class="">
					<view class="cu-tag bg-gray round">
						<text class="icon-presentfill text-red margin-right-xs"></text>
						关联话题更有机会上推荐哦
					</view>
				</view>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="icon-goods padding-right-sm"></view>
			<view class="title">关联商品</view>
			<view class="arrow"><view class="">去关联</view></view>
		</view>
		<view class="padding-xl text-center"><button class="cu-btn bg-orange round shadow">关联一个商品</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgList: [],
			modalName: null,
			textareaValue: ''
		};
	},
	methods: {
		ChooseImage() {
			uni.chooseVideo({
				count: 1, //默认9
				sourceType: ['camera', 'album'],
				success: res => {	
					console.log(res)
					this.imgList = this.imgList.concat(res.tempFilePath);
				}
			});
			// uni.chooseImage({
			// 	count: 4, //默认9
			// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			// 	sourceType: ['album'], //从相册选择
			// 	success: (res) => {
			// 		if (this.imgList.length != 0) {
			// 			this.imgList = this.imgList.concat(res.tempFilePaths)
			// 		} else {
			// 			this.imgList = res.tempFilePaths
			// 		}
			// 	}
			// });
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
						this.imgList.splice(e.currentTarget.dataset.index, 1);
					}
				}
			});
		},
		textareaInput(e) {
			this.textareaValue = e.detail.value;
		}
	}
};
</script>

<style>
.cu-form-group textarea {
	margin-top: 10upx;
}
</style>
