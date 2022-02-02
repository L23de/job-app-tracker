<template>
	<!-- Default Actions -->
	<div v-if="!editMode" class="actions">
		<!-- Enable edit mode -->
		<q-btn
			flat
			round
			icon="fas fa-pen"
			size="sm"
			@click="$emit('toggleEdit')"
		></q-btn>
		<!-- Toggle details -->
		<q-btn
			ref="detailToggleBtn"
			flat
			round
			:icon="detailIcon"
			size="sm"
			@click="toggleDetail()"
		></q-btn>
	</div>

	<!-- Edit actions -->
	<div v-else class="actions">
		<!-- Delete status -->
		<q-btn
			flat
			round
			icon="fas fa-trash-alt"
			size="sm"
			@click="$emit('deleteStatus')"
		></q-btn>
		<!-- Disable edit mode -->
		<q-btn
			flat
			round
			icon="fas fa-times"
			size="sm"
			@click="$emit('cancelEdit')"
		></q-btn>
		<!-- Confirm edit -->
		<q-btn
			flat
			round
			icon="fas fa-check"
			size="sm"
			@click="$emit('makeEdit')"
		></q-btn>
		<!-- Toggle details -->
		<q-btn
			ref="detailToggleBtn"
			flat
			round
			:icon="detailIcon"
			size="sm"
			@click="toggleDetail()"
		></q-btn>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	props: {
		editMode: { type: Boolean, required: true },
		detailMode: { type: Boolean, required: true },
	},
	setup(props) {
		// Detail mode vars
		const detailIcon = "fas fa-chevron-down";
		const detailAltIcon = "fas fa-chevron-up";

		return {
			detailIcon,
			detailAltIcon,
		};
	},
	methods: {
		toggleDetail() {
			this.$emit("toggleDetail");
			const tmp = this.detailAltIcon;
			this.detailAltIcon = this.detailIcon;
			this.detailIcon = tmp;
		},
	},
});
</script>

<style lang="scss">
.actions {
	margin-top: 12px;
	font-size: 16px;
	column-gap: 2px;

	@media (max-width: $breakpoint-sm) {
		align-items: center;
		margin-top: 0;
	}

	@media (max-width: 320px) {
		align-self: flex-start;
		margin-top: 6px;
	}
}
</style>
