<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</custom>
		<view class="cu-list menu-avatar">
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf);"></view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">文晓港</view>
						<view class="cu-tag round bg-orange sm">邀请人</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							Ta比较懒，还没有个人简介
						</view>
					</view>
				</view>
				<view class="action padding-left">
					<button class="cu-btn line-gray round">已关注</button>
				</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf);"></view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">文晓港</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							Ta比较懒，还没有个人简介
						</view>
					</view>
				</view>
				<view class="action padding-left">
					<button class="cu-btn line-gray round">已关注</button>
				</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf);"></view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">文晓港</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							Ta比较懒，还没有个人简介
						</view>
					</view>
				</view>
				<view class="action padding-left">
					<button class="cu-btn line-gray round">已关注</button>
				</view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf);"></view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">文晓港</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							Ta比较懒，还没有个人简介
						</view>
					</view>
				</view>
				<view class="action padding-left">
					<button class="cu-btn bg-orange light round">关 注</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '关注列表',
				list: []
			}
		},
		onLoad(e) {
			if (e.type == 'follow') {
				this.title = '我的关注';
				this.getFollowList()
			} else {
				this.title = '关注我的'
				this.getFansList()
			}
		},
		methods: {
			getFollowList() {

			},
			getFansList() {

			},
		}
	}
</script>

<style>

</style>
