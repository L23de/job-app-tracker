<template>
	<div class="card">
		<div class="card-basic">
			<div class="left">
				<q-input
					v-model="companyField"
					class="company"
					placeholder="Company"
					:autogrow="false"
					:borderless="!editMode"
					:readonly="!editMode"
					dense
				></q-input>
				<q-input
					v-model="positionField"
					class="position"
					placeholder="Position"
					:autogrow="false"
					:borderless="!editMode"
					:readonly="!editMode"
					dense
				></q-input>
			</div>

			<div class="separator"></div>

			<div class="right">
				<!-- Card Status -->
				<q-chip class="status">Accepted</q-chip>
				<!-- <q-chip class="status">
					<q-input>
					</q-input>
				</q-chip> -->

				<!-- Card Actions -->
				<div v-if="!editMode" class="actions">
					<!-- Default Actions -->
					<!-- Enable edit mode -->
					<q-btn
						flat
						round
						icon="fas fa-pen"
						size="sm"
						@click="editMode = true"
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

				<div v-else class="actions">
					<!-- Edit actions -->
					<!-- Delete status -->
					<q-btn
						flat
						round
						icon="fas fa-trash-alt"
						size="sm"
						@click="deleteStatus()"
					></q-btn>
					<!-- Disable edit mode -->
					<q-btn
						flat
						round
						icon="fas fa-times"
						size="sm"
						@click="cancelEdit()"
					></q-btn>
					<!-- Confirm edit -->
					<q-btn
						flat
						round
						icon="fas fa-check"
						size="sm"
						@click="makeEdit()"
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
			</div>
		</div>

		<!-- Known Bug: If editMode is true, and detailMode is toggled, the "temporary" edits are discarded -->
		<DetailCard
			ref="detail"
			v-if="detailMode"
			:editMode="editMode"
			:detail="detail"
		></DetailCard>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DetailCard from "./DetailCard.vue";

export default defineComponent({
	components: { DetailCard },
	props: {
		index: { type: Number, required: true },
		company: { type: String, required: true },
		position: { type: String, required: true },
		status: { type: String, required: true },
		detail: { type: String, required: true },
	},
	emits: [
		'deleteStatus'
	],
	setup(props) {
		// Edit mode vars
		const editMode = ref(false);

		// Temp storage vars (Marked by XInfo)
		const companyInfo = props.company;
		const positionInfo = props.position;
		const statusInfo = props.status;

		// Edit form vars (Marked by XField)
		const companyField = ref(props.company);
		const positionField = ref(props.position);
		const statusField = ref(props.status);

		// Detail mode vars
		const detailMode = ref(false);
		const detailIcon = "fas fa-chevron-down";
		const detailAltIcon = "fas fa-chevron-up";

		return {
			editMode,
			companyInfo,
			positionInfo,
			statusInfo,
			companyField,
			positionField,
			statusField,
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

		cancelEdit() {
			this.companyField = this.companyInfo;
			this.positionField = this.positionInfo;
			this.statusField = this.statusInfo;

			if (this.detailMode) {
				(this.$refs.detail as InstanceType<typeof DetailCard>).cancelEdit();
			}

			this.editMode = false;
		},

		makeEdit() {
			// Make updates using API in prod
			this.companyInfo = this.companyField;
			this.positionInfo = this.positionField;
			this.statusInfo = this.statusField;

			if (this.detailMode) {
				(this.$refs.detail as InstanceType<typeof DetailCard>).makeEdit();
			}

			this.editMode = false;
		},

		deleteStatus() {
			this.$emit('deleteStatus', this.index);
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
		flex: 5;
		overflow: hidden;

		.company {
			font-size: 2rem;

			input {
				padding-top: 10px;
			}
		}

		.position {
			font-size: 1.4rem;
			font-style: italic;

			input {
				padding-bottom: 2px;
			}
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
