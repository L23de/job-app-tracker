<template>
	<div class="card">
		<div class="card-basic">
			<div class="left">
				<p class="company">Millennium</p>
				<p class="position">QA Intern</p>
			</div>
			<div class="separator"></div>
			<div class="right">
				<q-chip class="status">Accepted</q-chip>
				<div class="actions">
					<!-- Default checkbox is unchecked -->
					<label class="checkbox">
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
					</label>
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
	setup() {
		const editMode = ref(false);
		const detailMode = ref(false);

		return {
			editMode,
			detailMode,
		};
	},
	components: { DetailCard },
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
		flex-shrink: 1;

		.status {
			// Makes it inline with the company
			margin-inline: 0;
			margin-top: 12px;
			margin-bottom: 0;
			font-size: 1rem;

			@media (max-width: $breakpoint-sm) {
				margin: 0;
				margin-top: 5px;
			}
		}

		.actions {
			display: flex;
			margin-top: 12px;
			margin-right: 4px;
			justify-content: flex-end;
			font-size: 16px;
			column-gap: 8px;

			@media (max-width: $breakpoint-sm) {
				align-items: center;
				margin-top: 0;
			}

			label {
				display: flex;
				column-gap: 8px;
			}

			.checkbox {
				input[type="checkbox"],
				.checked {
					display: none;
				}

				input[type="checkbox"]:checked ~ .checked {
					display: inline;
				}

				input[type="checkbox"]:checked ~ .unchecked {
					display: none;
				}
			}
		}

		@media (max-width: $breakpoint-sm) {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
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
