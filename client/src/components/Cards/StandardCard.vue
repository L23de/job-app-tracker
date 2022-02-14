<!-- 
	StandardCard Component
	Used to define the layout of a single card in the statusList
	Contains actions for modifying a single status, but not other statuses in the statusList 
-->

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
				<!-- <q-chip class="status">Accepted</q-chip> -->
				<q-chip
					class="status"
					:key="statusField"
					:ripple="false"
					:style="
						'background-color: var(--statusColor' + statusField.toString() + ')'
					"
				>
					<q-select
						v-model="statusField"
						option-value="key"
						emit-value
						map-options
						:hide-dropdown-icon="!editMode"
						:readonly="!editMode"
						:options="options"
						options-dense
						borderless
					/>
				</q-chip>

				<!-- Card Actions -->
				<ExistingActions
					:editMode="editMode"
					:detailMode="detailMode"
					@toggle-detail="toggleDetail"
					@toggle-edit="editMode = !editMode"
					@delete-status="deleteStatus"
					@cancel-edit="cancelEdit"
					@make-edit="makeEdit"
				/>
			</div>
		</div>

		<!-- Known Bug: If editMode is true, and detailMode is toggled, the "temporary" edits are discarded -->
		<DetailCard
			ref="detailRef"
			v-if="detailMode"
			:editMode="editMode"
			:detail="detail"
		></DetailCard>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import DetailCard from "./DetailCard.vue";
import ExistingActions from "./ExistingActions.vue";

export default defineComponent({
	components: { DetailCard, ExistingActions },
	props: {
		index: { type: Number },
		company: { type: String, default: "" },
		position: { type: String, default: "" },
		status: { type: Number, default: 0 },
		detail: { type: String, default: "" },
		newEdit: { type: Boolean },
	},
	emits: ["deleteStatus"],
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

		// Status options
		const options = [
			{ key: 0, label: "Applied" },
			{ key: 1, label: "Screened" },
			{ key: 2, label: "Technical" },
			{ key: 3, label: "Behavioral" },
			{ key: 4, label: "Interview" },
			{ key: 5, label: "Offer Received" },
			{ key: 6, label: "Accepted" },
			{ key: 7, label: "Declined" },
			{ key: 8, label: "Rejected" },
		];

		return {
			editMode,
			companyInfo,
			positionInfo,
			statusInfo,
			companyField,
			positionField,
			statusField,
			detailMode,
			options,

			console: computed(() => console)
		};
	},
	methods: {
		toggleDetail() {
			this.detailMode = !this.detailMode;
		},

		cancelEdit() {
			this.companyField = this.companyInfo;
			this.positionField = this.positionInfo;
			this.statusField = this.statusInfo;

			if (this.detailMode) {
				(this.$refs.detailRef as InstanceType<typeof DetailCard>).cancelEdit();
			}

			this.editMode = false;
		},

		makeEdit() {
			// Make updates using API in prod
			this.companyInfo = this.companyField;
			this.positionInfo = this.positionField;
			this.statusInfo = this.statusField;

			if (this.detailMode) {
				(this.$refs.detailRef as InstanceType<typeof DetailCard>).makeEdit();
				// Can append to the single PUT request the details
			}

			this.editMode = false;
		},

		deleteStatus() {
			this.$emit("deleteStatus", this.index);
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
