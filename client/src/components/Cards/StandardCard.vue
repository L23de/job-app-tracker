<template>
	<!-- Normal showcase card -->
	<div v-if="!editMode" class="card">
		<div class="card-basic">
			<div class="left">
				<p class="company">Millennium</p>
				<p class="position">QA Intern</p>
			</div>
			<div class="separator"></div>
			<div class="right">
				<q-chip class="status" label="Accepted"></q-chip>
				<div class="actions">
					<!-- Default checkbox is unchecked -->
					<!-- <label class="checkbox">
						<input type="checkbox" v-model="editMode" />
						<i class="fas fa-pen unchecked"></i>
						<i class="fas fa-trash-alt checked"></i>
						<i class="fas fa-times checked"></i>
						<i class="fas fa-check checked"></i>
					</label>
					<label class="checkbox">
						<input type="checkbox" v-model="detailMode" />
						<i class="fas fa-chevron-down unchecked"></i>
						<i class="fas fa-chevron-up checked"></i>
					</label> -->

					<q-btn
						flat
						round
						icon="fas fa-pen"
						size="sm"
						@click="editMode = true"
					></q-btn>
					<q-btn
						ref="detailToggleBtn"
						flat
						round
						:icon="detailIcon"
						size="sm"
						@click="toggleDetail()"
					></q-btn>
				</div>
			</div>
		</div>

		<DetailCard v-if="detailMode"></DetailCard>
	</div>

	<!-- Edit Card -->
	<div v-if="editMode" class="card">
		<div class="card-basic">
			<div class="left">
				<p class="company">Millennium</p>
				<p class="position">QA Intern</p>
			</div>
			<div class="separator"></div>
			<div class="right">
				<q-chip class="status">Accepted</q-chip>
				<div class="actions">
					<q-btn flat round icon="fas fa-trash-alt" size="sm"></q-btn>
					<q-btn
						flat
						round
						icon="fas fa-times"
						size="sm"
						@click="editMode = false"
					></q-btn>
					<q-btn flat round icon="fas fa-check" size="sm"></q-btn>

					<q-btn
						ref="detailToggleBtn"
						flat
						round
						:icon="detailIcon"
						size="sm"
						@click="toggleDetail()"
					></q-btn>
				</div>
			</div>
		</div>

		<DetailCard v-if="detailMode"></DetailCard>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DetailCard from "./DetailCard.vue";

export default defineComponent({
	components: { DetailCard },
	setup() {
		// Edit mode vars
		const editMode = ref(false);

		// Detail mode vars
		const detailMode = ref(false);
		const detailIcon = "fas fa-chevron-down";
		const detailAltIcon = "fas fa-chevron-up";

		return {
			editMode,
			detailMode,
			detailIcon,
			detailAltIcon,
		};
	},
	methods: {
		toggleDetail() {
			this.detailMode = !this.detailMode;
			const tmp = this.detailAltIcon;
			this.detailAltIcon = this.detailIcon;
			this.detailIcon = tmp;
		},
	},
});
</script>

<style lang="scss">
.card-basic {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	flex-direction: row;

	.left {
		flex-grow: 3;

		.company {
			font-size: 2rem;
		}

		.position {
			font-size: 1.4rem;
			font-style: italic;
		}
	}

	.right {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: flex-end;

		.status {
			// Makes it inline with the company
			display: flex;
			margin-top: 4px;
			margin-bottom: 4px;
			// margin-left: 35px;
			font-size: 1rem;

			@media (max-width: $breakpoint-sm) {
				margin: 0;
				margin-top: 5px;
			}

			@media (max-width: 320px) {
				align-self: flex-start;
			}
		}

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

		@media (min-width: 321px) and (max-width: $breakpoint-sm) {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		@media (max-width: 320px) {
			flex-direction: column;
			justify-content: flex-start;
			margin-top: 0;
		}
	}

	.separator {
		flex-grow: 2;
	}

	// Helps prevent the separator from occupying a second row with the status
	@media (max-width: $breakpoint-sm) {
		flex-direction: column;
	}
}
</style>
