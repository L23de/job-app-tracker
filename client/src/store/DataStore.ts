import { defineStore } from "pinia";

export const dataStore = defineStore("statuses", {
	state: () => ({
		// Retrieve statuses from API in prod
		statusList: [
			{
				company: "Company",
				position: "Position",
				status: 0,
				detail: "Detail",
			},
			{
				company: "Company2",
				position: "Position2",
				status: 0,
				detail: "Detail2",
			},
			{
				company: "Company3",
				position: "Position3",
				status: 0,
				detail: "Detail3",
			},
			{
				company: "Company4",
				position: "Position4",
				status: 0,
				detail: "Detail4",
			},
		],
	}),
});
