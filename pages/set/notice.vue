<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"> 消息提醒</block>
		</custom>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">用户消息</view>
				<view class="action">
					<switch @change="SwitchUser" :class="switchuser?'checked':''" :checked="switchuser?true:false"></switch>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">系统消息</view>
				<view class="action">
					<switch @change="SwitchSystem" :class="switchsystem?'checked':''" :checked="switchsystem?true:false"></switch>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">广播消息</view>
				<view class="action">
					<switch @change="SwitchRadio" :class="switchradio?'checked':''" :checked="switchradio?true:false"></switch>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchuser: true,
				switchsystem: true,
				switchradio: true,
			}
		},
		methods: {
			SwitchUser(e) {
				this.switchuser = e.detail.value
			},
			SwitchSystem(e) {
				this.switchsystem = e.detail.value
			},
			SwitchRadio(e) {
				this.switchradio = e.detail.value
			},
		}
	}
</script>

<style>

</style>
