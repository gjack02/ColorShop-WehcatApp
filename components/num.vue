<template>
	<view>
		{{numText}}
	</view>
</template>

<script>
	export default {
		name: 'num',
		computed: {
			numText() {
				let num = this.num;
				if (num > 1000 && num < 10000) {
					return parseInt(num / 1000) + ' 千'
				} else {
					if (num > 10000 && num < 10000000) {
						return parseInt(num / 10000) + '万'
					} else {
						if (num > 1000000) {
							return parseInt(num / 1000000) + '百万'
						} else {
							return num
						}
					}
				}
			}
		},
		props: {
			num: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style>

</style>
