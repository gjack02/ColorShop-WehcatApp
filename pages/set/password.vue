<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{type=='login'?'修改登录密码':'修改支付密码'}}</block>
		</custom>
		<block v-if="verif">
			<view class="padding text-lg">
				请完成以下认证
			</view>
			<view class="padding-lr padding-bottom text-sm">
				请输入173****8521收到的验证码
			</view>
			<view class='cu-form-group'>
				<view class="title">
					<text class="icon-safe"></text>
				</view>
				<input type="number" placeholder="短信验证码" :value="code" @input="bindCodeInput"></input>
				<button class='cu-btn line-orange shadow' @tap="sendCode" :disabled='timeOut'>{{timeText}}</button>
			</view>
			<view class="padding-xl">
				<button class="cu-btn bg-gradual-orange round lg block shadow" @tap="nextStep">下一步</button>
			</view>
		</block>
		<block v-else>
			<block v-if="type=='login'">
				<view class="padding text-lg margin-top">
					请设置您的新登录密码
				</view>
				<view class="cu-form-group">
					<view class="title">
						<text class="icon-lock"></text>
					</view>
					<input type="password" value="" placeholder="请输入新密码" />
				</view>
				<view class="cu-form-group">
					<view class="title">
						<text class="icon-lock"></text>
					</view>
					<input type="password" value="" placeholder="请再次输入新密码" />
				</view>
				<view class="padding-xl">
					<button class="cu-btn bg-gradual-orange round lg block shadow">确定</button>
				</view>
			</block>
			<block v-else>
				<view class="padding text-lg margin-top">
					请设置您的新支付密码
				</view>
				<view class="cu-form-group">
					<view class="title">
						<text class="icon-lock"></text>
					</view>
					<input type="number" :password="true" value="" placeholder="请设置6位新密码" />
				</view>
				<view class="padding-xl">
					<button class="cu-btn bg-gradual-orange round lg block shadow">确定</button>
				</view>
			</block>
		</block>
	</view>
</template>

<script>
	var api = require('../../utils/api.js');
	var util = require('../../utils/util.js');
	export default {
		data() {
			return {
				type: 'login',
				verif: true,
				code: '',
				timeOut: false,
				timeText: '获取验证码',
				timeNum: 30
			}
		},
		onLoad(e) {
			if (e.type) {
				this.type = e.type
			}
		},
		methods: {
			sendCode() {
				let that = this;
				util.showErrorToast("验证码已发送")
				that.timeOut = true
				that.TimeOutDown();
				// util.request(api.AuthRegisterCaptcha, {
				// 	mobile: Mobile
				// }, 'POST').then(function(res) {
				// 	console.log(Mobile, res)
				// 	if (res.errno == 0) {
				// 		util.showErrorToast("验证码已发送")
				// 		that.timeOut = true
				// 		that.TimeOutDown();
				// 	} else {
				// 		util.showErrorToast(res.errmsg)
				// 	}
				// })
			},
			TimeOutDown() {
				let that = this;
				setTimeout(function() {
					if (that.timeNum > 0) {
						let text = '稍等' + that.timeNum + '秒';
						that.timeText = text;
						that.timeNum = that.timeNum - 1
						that.TimeOutDown();
					} else {
						that.timeOut = false;
						that.timeText = '获取验证码';
						that.timeNum = 30
					}
				}, 1000)
			},
			bindCodeInput(e) {
				this.code = e.detail.value
			},
			nextStep() {
				this.verif = false
			}
		}
	}
</script>

<style>

</style>
