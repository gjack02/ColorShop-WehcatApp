<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的粉丝</block>
		</custom>
		<view class="bg-white nav fixed flex text-center" scroll-with-animation :scroll-left="scrollLeft" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in nav" :key="index"
			 @tap="tabSelect" :data-id="index">
				{{item}}(4)
			</view>
		</view>
		<view class="nav">
			<view class="cu-item"></view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item,index) in 10" :key="index">
				<view class="cu-avatar round lg" style="background-image:url(https://hbimg.huabanimg.com/68b31a50db076d4334f9cc608b8a8cfdcd389bcd1755-ix61xr_sq75sf);"></view>
				<view class="content">
					<view class="text-grey">
						<view class="text-cut">文晓港</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">
							手机号码：137****2345
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				TabCur: 0,
				nav: ['全部', '直推', '伞下'],
			}
		},
		onLoad(e) {
			if (e.nav) {
				this.TabCur = e.nav
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id
			},
		}
	}
</script>

<style>

</style>
