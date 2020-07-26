<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</custom>
		<view class="cu-form-group margin">
			<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaInput" :placeholder="placeholder"></textarea>
		</view>
		<view class="padding-lr">
			<button class="cu-btn bg-orange shadow lg block">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '编辑',
				placeholder:'请输入内容',
				textareaValue:''
			}
		},
		onLoad(e) {
			if (e.type == 'mydesc') {
				this.title = '个人简介';
				this.placeholder = '优秀的个人简介更容易让别人关注哦~';
			}
		},
		methods: {
			textareaInput(e) {
				this.textareaValue= e.detail.value
			},
		}
	}
</script>

<style>

</style>
