import { defineStore } from "pinia";

export const dataStore = defineStore("statuses", {
	state: () => ({
		// Retrieve statuses from API in prod
		statusList: [
			{
				company: "Company",
				position: "Position",
				status: "Accepted",
				detail: "Detail",
			},
			{
				company: "Company2",
				position: "Position2",
				status: "Applied",
				detail: "Detail2",
			}
		],
	}),
});
