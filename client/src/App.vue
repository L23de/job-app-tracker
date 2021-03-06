<!-- 
	App Component
	Used to define the layout of the whole web app
-->

<template>
	<div class="page-container">
		<header class="header">Job App Tracker</header>

		<StatusList ref="statusListRef"> </StatusList>
		<div class="add-button" @click="addStatus">
			<i class="fas fa-plus"></i>
		</div>

		<footer class="footer">
			<a href="https://github.com/L23de/job-app-tracker" target="_blank"
				>View on Github <span class="fab fa-github"></span
			></a>
		</footer>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StatusList from "@/components/StatusList.vue";
import StandardCard from "./components/Cards/StandardCard.vue";

export default defineComponent({
	name: "App",
	components: {
		StatusList,
		StandardCard
	},
	mounted() {
		// Header is guaranteed to be in the DOM, so use '!' to override nullness of querySelector()
		const header: Element = document.querySelector(".header")!;
		let lastScrollY: number = window.scrollY;

		window.addEventListener("scroll", () => {
			if (lastScrollY > 30 && lastScrollY < window.scrollY) {
				// User scrolled down
				header.classList.add("header--hidden");
			} else {
				// User scrolled back up
				header.classList.remove("header--hidden");
			}
			lastScrollY = window.scrollY;
		});
	},
	methods: {
		addStatus() {
			(this.$refs.statusListRef  as InstanceType<typeof StatusList>).addStatus();
		}
	},
});
</script>

<style lang="scss">
.header {
	position: fixed;
	top: 0;
	left: 0;
	text-align: center;
	background: $primary;
	font-size: $navHeight * 0.5;
	color: white;
	width: 100%;
	height: $navHeight;
	line-height: $navHeight;
	z-index: 10; // Makes header appear on top of everything
	transition: transform 0.4s;
	overflow: hidden;
}

.header--hidden {
	transform: translateY(#{-1 * $navHeight});
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

.footer {
	font-family: $monoFont;
	background: $background;
	box-shadow: 0 -13px 10px $background;
	padding-top: 0;
	padding-bottom: 8px;
	text-align: center;
	position: fixed;
	bottom: 0;
	width: 100%;
}
</style>
