<!-- 
	DetailCard Component
	Used to define the layout of the expanded details section of a card
-->

<template>
	<div class="card-detail">
		<div class="divider"></div>
		<div class="notes">
			<p class="notes-header">Notes</p>
			<q-input
					v-model="detailField"
					:borderless="!editMode"
					:readonly="!editMode"
					class="notes-content"
					placeholder="Helpful notes about this position and/or company"
					type="textarea"
					dense
				></q-input>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	props: {
		editMode: { type: Boolean, required: true },
		detail: { type: String, required: true },
	},
	setup(props) {
		const detailInfo = props.detail;
		const detailField = ref(props.detail);

		return {
			detailInfo,
			detailField
		}
	},
	methods: {
		cancelEdit() {
			this.detailField = this.detailInfo;
		},

		makeEdit() {
			this.detailInfo = this.detailField;
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

			textarea {
				padding-block: 0;
			}
		}
	}
}
</style>
