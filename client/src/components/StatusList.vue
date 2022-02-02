<template>
	<div class="content-wrap">
		<div id="job-list" :key="update">
			<StandardCard
				v-for="(status, index) in statusList"
				:index="index"
				v-bind="status"
				@delete-status="deleteStatus"
			/>
		</div>

		<div class="add-button" @click="addStatus">
			<i class="fas fa-plus"></i>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import StandardCard from "./Cards/StandardCard.vue";
import { dataStore } from "@/store/DataStore";
import { storeToRefs } from "pinia";

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
			
		}
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
