<template>
	<div class="card-detail">
		<div class="divider"></div>
		<div class="notes">
			<p class="notes-header">Notes</p>
			<p class="notes-content">{{notes}}</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	setup() {
		const notes = ref('Lorem ipsum')

		return {
			notes
		}
	}
});
</script>

<style lang="scss">
.card-detail {
	.divider {
		background: rgb(114, 114, 114);
		border-radius: 2px;
		width: 100%;
		height: 2px;
		margin-top: 15px;
		margin-bottom: 10px;
	}

	.notes {
		.notes-header {
			font-size: 1.2rem;
		}

		.notes-content {
			font-size: 0.875rem;
		}
	}
}
</style>
