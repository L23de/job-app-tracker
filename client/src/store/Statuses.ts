import { defineStore } from "pinia";

export const statusStore = defineStore("statuses", {
	state: () => ({
		// Retrieve statuses from API in prod
		company: "Company",
		position: "Position",
		status: "Accepted",
	})
});
