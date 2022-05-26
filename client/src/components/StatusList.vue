<!-- 
	StatusList Component
	Used to define how cards are laid out in the main web app and
	the interactivity of each card
-->

<template>
	<div class="content-wrap">
		<div id="job-list" :key="update" ref="jobListRef">
			<StandardCard
				v-for="(status, index) in statusList"
				:key="index"
				:index="index"
				v-bind="status"
				@delete-status="deleteStatus"
			/>
		</div>
		
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, createApp, h, render } from "vue";
import StandardCard from "./Cards/StandardCard.vue";
import { dataStore } from "@/store/DataStore";

export default defineComponent({
	components: { StandardCard },
	setup() {
		const newJob = ref(false);
		const store = dataStore();
		const update = 1;

		return {
			newJob,
			update,
			statusList: computed(() => store.statusList),
		};
	},
	methods: {
		updateList() {
			this.update++;
		},

		deleteStatus(index: number) {
			this.statusList.splice(index, 1);
			this.updateList();
		},

		addStatus() {
			this.newJob = true
		},
	},
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
</style>
