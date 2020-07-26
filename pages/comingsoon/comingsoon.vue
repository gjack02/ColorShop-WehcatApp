<template>
	<view>
		<custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
		</custom>
		<abnor :px="CustomBar" :upx="0" name="ComingSoon" title="敬请期待"></abnor>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
