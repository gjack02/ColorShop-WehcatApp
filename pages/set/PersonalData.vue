<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"> 个人信息</block>
		</custom>
		<view class="cu-list menu">
			<view class="cu-item arrow">
				<view class="content">我的头像</view>
				<view class="action" @tap="ChooseImage">
					<view class="cu-avatar round" :style="[{backgroundImage:'url(' + avatar + ')'}]"></view>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">我的昵称</view>
				<view class="action" @tap="showModal" data-target="nameModal">
					{{nickename}}
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='nameModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">昵称</view>
						<view class="action" @tap="hideModal">
							<text class="icon-close text-red"></text>
						</view>
					</view>
					<view class="padding text-left">
						<view class="solid-bottom padding-tb-sm">
							<input type="text" :value="nickename" @input="inputNickname" />
						</view>
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub text-green" @tap="hideModal">取消</view>
						<view class="action margin-0 flex-sub  solid-left" @tap="DoneNickName">确定</view>
					</view>
				</view>
			</view>

			<view class="cu-item arrow">
				<view class="content">手机号码</view>
				<view class="action">
					173****8521
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">性别</view>
				<view class="action">
					<picker @change="SexChange" :value="sex" :range="sexArry">
						<view class="picker">
							{{sexArry[sex]}}
						</view>
					</picker>
				</view>
			</view>
			<navigator url="/pages/set/password?type=login" hover-class="none" class="cu-item arrow margin-top-sm">
				<view class="content">修改登录密码</view>
			</navigator>
			<navigator url="/pages/set/password?type=pay" hover-class="none" class="cu-item arrow">
				<view class="content">修改支付密码</view>
			</navigator>
			<view class="cu-item arrow">
				<view class="content">绑定支付宝账户</view>
				<view class="action">
					173****8521
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">绑定微信账户</view>
				<view class="action">
					WenXiaoGang
				</view>
			</view>
		</view>
		<view class="padding-xl">
			<button class="cu-btn bg-orange round shadow lg block">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
				nickename: '文晓港',
				tempnickename: '文晓港',
				sex:0,
				sexArry:['保密','男','女']
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.avatar = res.tempFilePaths
					}
				});
			},
			inputNickname(e) {
				this.tempnickename = e.detail.value
			},
			DoneNickName() {
				this.modalName = null;
				this.nickename = this.tempnickename
			},
			SexChange(e) {
				this.sex = e.detail.value
			},
		}
	}
</script>

<style>

</style>
