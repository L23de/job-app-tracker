<template>
	<div class="content-wrap">
		<div id="job-list">
			<StandardCard />
		</div>

		<div class="add-button">
			<i class="fas fa-plus"></i>
		</div>

		<!-- <q-page-sticky position="bottom-right" class="fab-container">
			<q-btn
				fab
				icon="ion-add"
				color="primary"
				@click="newJob = true"
			/>
		</q-page-sticky> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import StandardCard from "./Cards/StandardCard.vue";

export default defineComponent({
	components: { StandardCard },
	data() {
		return {
			newJob : ref(false)
		}
	}
});
</script>

<style lang="scss">
#job-list {
	margin-top: $cardGap;
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: $cardGap;
}

.add-button {
	position: fixed;
	height: 50px;
	width: 50px;
	font-size: 30px;
	font-weight: 100;
	color: white;
	line-height: 50px;
	text-align: center;
	background: $primary;
	border-radius: 50%;
	bottom: 2 * $footerHeight;
	right: max(5vw, 50vw - 350px);
	// ^ This somehow works to correct a right fixed FAB
}
</style>
