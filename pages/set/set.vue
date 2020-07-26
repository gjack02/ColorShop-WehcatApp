<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"> 设置</block>
		</custom>
		<view class="cu-list menu sm-border">
			<navigator url="/pages/set/PersonalData" hover-class="none" class="cu-item arrow"><view class="content">个人信息</view></navigator>
			<navigator url="/pages/set/notice" hover-class="none" class="cu-item arrow"><view class="content">消息提醒</view></navigator>
			<view class="cu-item">
				<view class="content">清理缓存</view>
				<view class="action text-gray">2.97M</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">意见反馈</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">检查更新</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">关于我们</view>
				<view class="action text-gray">v2.0.1</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
