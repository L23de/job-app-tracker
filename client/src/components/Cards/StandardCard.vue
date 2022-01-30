<template>
	<div class="card">
		<div class="left">
			<p class="company">Millennium Management</p>
			<p class="position">QA Intern</p>
		</div>
		<div class="separator"></div>
		<div class="right">
			<q-chip class="status">Accepted</q-chip>
			<div class="actions">
				<i class="fas fa-pen"></i>
				<i class="fas fa-chevron-down"></i>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
.card {
	p {
		margin: 0;
	}

	.left {
		flex-grow: 3; 

		.company {
			font-size: 2rem;
		}

		.position {
			font-size: 1rem;
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
			column-gap: 8px;

			@media (max-width: $breakpoint-sm) {
				align-items: center;
				margin-top: 0;
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
